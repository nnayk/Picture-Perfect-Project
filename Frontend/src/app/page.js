"use client";

import Image from 'next/image'
import React, { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the text. For now, we'll just log it.
    console.log(text);
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
  </div>
  )

}
