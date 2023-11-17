import Link from "next/link";
import { useState, useEffect } from "react";
import eloRating from "elo-rating";

export default function Vote() {
  const [eloOne, setEloOne] = useState(1000);
  const [eloTwo, setEloTwo] = useState(1000);
  const [imageOne, setImageOne] = useState("/path/to/dummy/image1.jpg");
  const [imageTwo, setImageTwo] = useState("/path/to/dummy/image2.jpg");

  // Function to calculate ELO exchange
  const vote = (winner) => {
    let result = eloRating.calculate(eloOne, eloTwo, winner === 1);
    setEloOne(result.playerRating);
    setEloTwo(result.opponentRating);
  };

  // Function to load new images and reset ELO on each page load
  useEffect(() => {
    setImageOne("/image1.png");
    setImageTwo("/image2.webp");
    setEloOne(1000);
    setEloTwo(1000);
  }, []);

  return (
    <div className="p-6">
      <nav className="mb-8 flex justify-between items-center bg-gray-800 p-4 text-white rounded-lg">
        <Link href="/portfolio" className="hover:text-blue-300">Portfolio</Link>
        <Link href="/vote" className="hover:text-blue-300">Vote</Link>
        <Link href="/leaderboard" className="hover:text-blue-300">Leaderboard</Link>
        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Sign Out
        </button>
      </nav>
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-700">Voting</h1>
      <div className="flex justify-center gap-10 mb-4">
        <div className="text-center">
          <img src={imageOne} alt="Image One" className="w-60 h-60 object-cover rounded-lg shadow-lg hover:shadow-2xl cursor-pointer" onClick={() => vote(1)} />
          <p className="mt-2 text-lg font-semibold">ELO: {eloOne}</p>
        </div>
        <div className="text-center">
          <img src={imageTwo} alt="Image Two" className="w-60 h-60 object-cover rounded-lg shadow-lg hover:shadow-2xl cursor-pointer" onClick={() => vote(2)} />
          <p className="mt-2 text-lg font-semibold">ELO: {eloTwo}</p>
        </div>
      </div>
    </div>
  );
}
