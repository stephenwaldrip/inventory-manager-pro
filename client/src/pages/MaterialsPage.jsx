// client/src/pages/MaterialsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MaterialsPage = () => {
  const [materials, setMaterials] = useState([]);
  const [newMaterial, setNewMaterial] = useState({ name: '', type: '', location: '' });
  const [editingId, setEditingId] = useState(null);
  const [editingMaterial, setEditingMaterial] = useState({ name: '', type: '', location: '' });

  const fetchMaterials = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/materials', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMaterials(res.data);
    } catch (err) {
      console.error('Failed to fetch materials:', err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/materials', newMaterial, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewMaterial({ name: '', type: '', location: '' });
      fetchMaterials();
    } catch (err) {
      console.error('Failed to add material:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/materials/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMaterials();
    } catch (err) {
      console.error('Failed to delete material:', err);
    }
  };

  const handleEditClick = (material) => {
    setEditingId(material._id);
    setEditingMaterial({
      name: material.name,
      type: material.type,
      location: material.location,
    });
  };

  const handleEditChange = (e) => {
    setEditingMaterial({ ...editingMaterial, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/materials/${id}`, editingMaterial, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingId(null);
      fetchMaterials();
    } catch (err) {
      console.error('Failed to update material:', err);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Materials</h2>

      <form onSubmit={handleAdd} className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="Name"
          value={newMaterial.name}
          onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Type"
          value={newMaterial.type}
          onChange={(e) => setNewMaterial({ ...newMaterial, type: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={newMaterial.location}
          onChange={(e) => setNewMaterial({ ...newMaterial, location: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add Material
        </button>
      </form>

      <ul className="space-y-2">
        {materials.map((mat) => (
          <li key={mat._id} className="border p-2 rounded bg-gray-100">
            {editingId === mat._id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  name="name"
                  value={editingMaterial.name}
                  onChange={handleEditChange}
                  className="border p-1 w-full"
                />
                <input
                  type="text"
                  name="type"
                  value={editingMaterial.type}
                  onChange={handleEditChange}
                  className="border p-1 w-full"
                />
                <input
                  type="text"
                  name="location"
                  value={editingMaterial.location}
                  onChange={handleEditChange}
                  className="border p-1 w-full"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleUpdate(mat._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <strong>{mat.name}</strong> — {mat.type}, {mat.location}
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEditClick(mat)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(mat._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaterialsPage;
