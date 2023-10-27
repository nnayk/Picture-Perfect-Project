import React, { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [url, setUrl] = useState(''); // To store the URL

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/generateURL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputValue: text,
        }),
      });

      const data = await response.json();

      if (data.url) {
        setUrl(data.url);
      } else {
        console.error('Failed to get URL.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit} className="p-8 bg-white shadow-lg rounded-lg">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter some text"
          className="border border-gray-300 p-2 rounded w-full mb-4"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Submit
        </button>
      </form>

      {url && (
        <div className="mt-8">
          <img className="rounded-lg shadow" src={url} alt="Generated from input" />
        </div>
      )}
    </div>
  );
}
