import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
    toast.success("Note deleted 🗑️");
  }

  return (
    <div className="min-h-screen w-full px-6 py-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <h1 className="text-3xl font-bold text-center mb-6">📂 My Saved Notes</h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          className="w-full max-w-lg px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
          type="search"
          placeholder="🔍 Search notes by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Notes Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id}
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-lg flex flex-col justify-between hover:scale-[1.02] transition-transform"
            >
              {/* Title */}
              <h2 className="text-xl font-semibold text-blue-300 mb-2 truncate">
                {paste.title}
              </h2>

              {/* Content preview */}
              <p className="text-sm text-gray-200 mb-4 line-clamp-4">
                {paste.content}
              </p>

              {/* Created At */}
              <p className="text-xs text-gray-400 mb-3">
                Created: {new Date(paste.createdAt).toLocaleString()}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <a href={`/?pasteId=${paste?._id}`} className="btn">
                  Edit
                </a>
                <a href={`/pastes/${paste?._id}`} className="btn btn-green">
                  View
                </a>
                <button
                  onClick={() => handleDelete(paste?._id)}
                  className="btn btn-red"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success("Copied to clipboard 📋");
                  }}
                  className="btn btn-yellow"
                >
                  Copy
                </button>
                <button
                  onClick={() => {
                    const shareUrl = window.location.origin + "/pastes/" + paste._id;
                    navigator.clipboard.writeText(shareUrl);
                    toast.success("Share link copied 📎");
                  }}
                  className="btn btn-purple"
                >
                  Share
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-full">
            No notes found. Try creating one!
          </p>
        )}
      </div>
    </div>
  );
};

export default Paste;
