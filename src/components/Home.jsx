import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice.js';

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-white/20">
        
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          📝 {pasteId ? "Edit Your Note" : "Create a New Note"}
        </h1>

        {/* Title + Button */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          <input
            className="flex-1 px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
            type="text"
            placeholder="Enter title here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-lg hover:scale-105 transform transition-all duration-200"
            onClick={createPaste}
          >
            {pasteId ? "Update Note" : "Save Note"}
          </button>
        </div>

        {/* Text Area */}
        <textarea
          className="w-full rounded-xl bg-white/20 text-white placeholder-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md resize-none"
          value={value}
          placeholder="Write your content here..."
          onChange={(e) => setValue(e.target.value)}
          rows={15}
        />
      </div>
    </div>
  );
};

export default Home;
