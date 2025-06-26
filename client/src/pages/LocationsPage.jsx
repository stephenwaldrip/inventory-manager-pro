import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LocationsPage = () => {
  const [locations, setLocations] = useState([]);
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const fetchLocations = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/locations', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLocations(res.data);
    } catch (err) {
      console.error('Failed to fetch locations:', err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/locations',
        { name: newName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewName('');
      fetchLocations();
    } catch (err) {
      console.error('Failed to add location:', err);
    }
  };

  const startEdit = (loc) => {
    setEditingId(loc._id);
    setEditName(loc.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
  };

  const handleSave = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `/api/locations/${id}`,
        { name: editName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingId(null);
      setEditName('');
      fetchLocations();
    } catch (err) {
      console.error('Failed to update location:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/locations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchLocations();
    } catch (err) {
      console.error('Failed to delete location:', err);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Locations</h2>

      <form onSubmit={handleAdd} className="mb-4">
        <input
          type="text"
          placeholder="New location name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border p-2 mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Location
        </button>
      </form>

      <ul className="space-y-2">
        {locations.map((loc) => (
          <li key={loc._id} className="border p-2 rounded bg-gray-100 flex justify-between items-center">
            {editingId === loc._id ? (
              <>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="border p-1 mr-2"
                />
                <div>
                  <button
                    onClick={() => handleSave(loc._id)}
                    className="text-green-500 hover:underline mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="text-gray-500 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <span>{loc.name}</span>
                <div>
                  <button
                    onClick={() => startEdit(loc)}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(loc._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationsPage;
