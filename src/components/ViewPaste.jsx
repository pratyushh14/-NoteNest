import React from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        ❌ Note not found
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex justify-center px-6 py-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-8">
        
        {/* Title */}
        <h1 className="text-3xl font-bold mb-2 text-blue-300">{paste.title}</h1>
        
        {/* Date */}
        <p className="text-sm text-gray-400 mb-6">
          Created on {new Date(paste.createdAt).toLocaleString()}
        </p>

        {/* Content */}
        <div className="whitespace-pre-wrap text-gray-200 leading-relaxed mb-6">
          {paste.content}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              navigator.clipboard.writeText(paste.content);
              toast.success("Copied to clipboard 📋");
            }}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-yellow-400 to-orange-500 hover:opacity-90"
          >
            Copy
          </button>

          <button
            onClick={() => {
              const shareUrl = window.location.origin + "/pastes/" + paste._id;
              navigator.clipboard.writeText(shareUrl);
              toast.success("Share link copied 📎");
            }}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
          >
            Share
          </button>

          <a
            href={`/?pasteId=${paste._id}`}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-500 to-indigo-500 hover:opacity-90"
          >
            Edit
          </a>
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
