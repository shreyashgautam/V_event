import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMerch,
  addMerch,
  editMerch,
  deleteMerch,
} from '../../stores/admin/admin-merch-slice';
import axios from 'axios';

const initialFormState = {
  name: '',
  org: '',
  price: '',
  merchId: '',
  type: 'tshirt',
  noOfPieces: '',
  image: '',
};

const AdminMerchandise = () => {
  const dispatch = useDispatch();
  const { merch, loading, error } = useSelector((state) => state.adminMerch);

  const [form, setForm] = useState(initialFormState);
  const [file, setFile] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchMerch());
  }, [dispatch]);

  const handleUpload = async () => {
    const data = new FormData();
    data.append('my_file', file);
    const res = await axios.post('http://localhost:5001/api/admin/merch/upload-image', data);
    return res.data.result.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = form.image;
      if (file) imageUrl = await handleUpload();

      const merchData = { ...form, image: imageUrl };

      if (isEdit) {
        dispatch(editMerch({ id: editId, updatedData: merchData }));
      } else {
        dispatch(addMerch(merchData));
      }

      setForm(initialFormState);
      setFile(null);
      setIsEdit(false);
      setEditId(null);
    } catch (err) {
      alert('Image upload or save failed');
      console.error(err);
    }
  };

  const handleEdit = (m) => {
    setForm({ ...m });
    setFile(null);
    setIsEdit(true);
    setEditId(m.merchId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (merchId) => {
    if (window.confirm('Are you sure you want to delete this merch?')) {
      dispatch(deleteMerch(merchId));
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 🎨 Beautiful Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4 shadow-lg">
            <span className="text-3xl">🛍️</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Merchandise Management
          </h1>
          <p className="text-gray-600 text-lg">Manage your store inventory with style</p>
        </div>

        {/* 📦 Enhanced Add/Edit Form */}
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl border border-white/20 p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
              <span className="text-white text-xl">{isEdit ? '✏️' : '➕'}</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {isEdit ? 'Edit Merchandise' : 'Add New Merchandise'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  name="name"
                  placeholder="Enter product name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-white/50"
                  required
                />
              </div>

              {/* Organization Input */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Organization
                </label>
                <input
                  name="org"
                  placeholder="Enter organization name"
                  value={form.org}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-white/50"
                  required
                />
              </div>

              {/* Price Input */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price (₹)
                </label>
                <input
                  name="price"
                  type="number"
                  placeholder="0"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-white/50"
                  required
                />
              </div>

              {/* Merch ID Input */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Merchandise ID
                </label>
                <input
                  name="merchId"
                  placeholder="Enter unique ID"
                  value={form.merchId}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-white/50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  required
                  disabled={isEdit}
                />
              </div>

              {/* Type Select */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Type
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-white/50"
                  required
                >
                  <option value="tshirt">👕 T-Shirt</option>
                  <option value="cap">🧢 Cap</option>
                  <option value="hoodies">🧥 Hoodie</option>
                </select>
              </div>

              {/* Pieces Input */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of Pieces
                </label>
                <input
                  name="noOfPieces"
                  type="number"
                  placeholder="0"
                  value={form.noOfPieces}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-white/50"
                  required
                />
              </div>
            </div>

            {/* File Upload */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="text-4xl mb-2">📸</div>
                  <p className="text-gray-500">Click to upload image</p>
                </label>
              </div>
            </div>

            {/* Image Preview */}
            {(file || form.image) && (
              <div className="flex justify-center">
                <div className="relative">
                  <img
                    src={file ? URL.createObjectURL(file) : form.image}
                    alt="preview"
                    className="w-40 h-40 object-cover rounded-2xl shadow-lg border-4 border-white"
                  />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6">
              {isEdit && (
                <button
                  type="button"
                  onClick={() => {
                    setForm(initialFormState);
                    setFile(null);
                    setIsEdit(false);
                    setEditId(null);
                  }}
                  className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {isEdit ? '✨ Update' : '🚀 Add Product'}
              </button>
            </div>
          </form>
        </div>

        {/* 📄 Enhanced Merchandise Grid */}
        <div className="mb-8">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
              <span className="text-white text-xl">📦</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">All Merchandise</h2>
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading amazing products...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-red-600 font-semibold">⚠️ {error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {merch.map((m) => (
              <div
                key={m.merchId}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-sm font-bold text-purple-600">₹{m.price}</span>
                  </div>
                  <div className="absolute top-4 left-4 bg-purple-500 text-white rounded-full px-3 py-1">
                    <span className="text-sm font-semibold">
                      {m.type === 'tshirt' ? '👕' : m.type === 'cap' ? '🧢' : '🧥'}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                    {m.name}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600 flex items-center">
                      <span className="w-4 h-4 bg-purple-100 rounded-full mr-2 flex items-center justify-center">
                        🏢
                      </span>
                      {m.org}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <span className="w-4 h-4 bg-green-100 rounded-full mr-2 flex items-center justify-center">
                        📦
                      </span>
                      {m.noOfPieces} pieces
                    </p>
                    <p className="text-sm text-gray-500 flex items-center">
                      <span className="w-4 h-4 bg-blue-100 rounded-full mr-2 flex items-center justify-center">
                        🏷️
                      </span>
                      ID: {m.merchId}
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleEdit(m)}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(m.merchId)}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-pink-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {merch.length === 0 && !loading && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">No merchandise yet</h3>
              <p className="text-gray-500">Add your first product to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMerchandise;