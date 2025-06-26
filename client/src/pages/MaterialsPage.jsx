import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MaterialsPage = () => {
  const [materials, setMaterials] = useState([]);
  const [newName, setNewName] = useState('');

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

  const handleAddMaterial = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/materials',
        { name: newName }, // ✅ This must match your backend expectation
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setNewName('');
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

  useEffect(() => {
    fetchMaterials();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Materials</h2>

      <form onSubmit={handleAddMaterial} className="mb-4">
        <input
          type="text"
          placeholder="New material name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border p-2 mr-2"
          required
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Add Material
        </button>
      </form>

      <ul className="space-y-2">
        {materials.map((mat) => (
          <li key={mat._id} className="border p-2 rounded bg-gray-100 flex justify-between items-center">
            <span>{mat.name}</span>
            <button
              onClick={() => handleDelete(mat._id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaterialsPage;
