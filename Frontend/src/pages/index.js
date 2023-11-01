// src/pages/index.js

import Link from 'next/link';

export default function InitialLanding() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Picture Perfect</h1>
      <div className="space-y-4">
        <Link href="/register" passHref>
          <button className="inline-block px-6 py-2 text-sm font-medium leading-6 text-center text-white uppercase transition bg-blue-500 rounded shadow ripple hover:shadow-lg focus:outline-none hover:bg-blue-600">
            Sign Up
          </button>
        </Link>
        <Link href="/login" passHref>
          <button className="inline-block px-6 py-2 text-sm font-medium leading-6 text-center text-blue-600 uppercase transition border border-blue-500 rounded ripple hover:text-white hover:bg-blue-500 focus:outline-none">
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
}
