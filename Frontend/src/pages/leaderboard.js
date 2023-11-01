// src/pages/leaderboard.js

import Link from 'next/link';

export default function Leaderboard() {
  return (
    <div className="p-6">
      <nav className="mb-4 flex justify-between">
        <Link href="/portfolio">Portfolio</Link>
        <Link href="/vote">Vote</Link>
        <Link href="/leaderboard">Leaderboard</Link>
        <button className="bg-blue-500 text-white py-1 px-3 rounded">Sign Out</button>
      </nav>
      <h1 className="text-2xl mb-4">Leaderboard</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Rank</th>
          </tr>
        </thead>
        <tbody>
          {/* You can map through your data here */}
        </tbody>
      </table>
    </div>
  );
}
