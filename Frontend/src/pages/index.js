import Image from 'next/image';
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter some text"
        />
        <button type="submit">Submit</button>
      </form>

      {url && (
        <div>
          <img src={url} alt="Generated from input" />

        </div>
      )}
    </div>
  );
}
