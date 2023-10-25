// src/app/VotingPage.js
import { useState, useEffect } from 'react';

function VotingPage() {
  const [images, setImages] = useState([null, null]);
  const [votes, setVotes] = useState([0, 0]);

  // Assume fetchData is a function that talks to your backend to get random images
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/getRandomImages');
      const data = await res.json();
      setImages(data.images);
    }

    fetchData();
  }, []);

  async function handleVote(index) {
    const res = await fetch(`/api/vote?image=${index}`);
    const data = await res.json();
    setVotes(data.votes);
  }

  return (
    <div className="voting-page">
      {images[0] && (
        <div className="image-container">
          <img src={images[0]} alt="Image 1" />
          <button onClick={() => handleVote(0)}>Vote for Image 1</button>
        </div>
      )}
      {images[1] && (
        <div className="image-container">
          <img src={images[1]} alt="Image 2" />
          <button onClick={() => handleVote(1)}>Vote for Image 2</button>
        </div>
      )}
      <div className="results">
        <p>Image 1: {votes[0]} votes</p>
        <p>Image 2: {votes[1]} votes</p>
      </div>
    </div>
  );
}

export default VotingPage;
