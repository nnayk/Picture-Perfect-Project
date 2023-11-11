import React, { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [isImageAccepted, setImageAccepted] = useState(null); // null = not decided, true = accepted, false = rejected

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/generateURL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputValue: text,
        }),
      });

      const data = await response.json();

      if (data.url) {
        setUrl(data.url);
        setImageAccepted(null); // Reset the decision state when a new image is fetched
      } else {
        console.error("Failed to get URL.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAccept = () => {
    setImageAccepted(true);
    // You can add any additional logic here for when the image is accepted
  };

  const handleReject = () => {
    setImageAccepted(false);
    setUrl(""); // Clear the image if rejected, or add any other logic if needed
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white shadow-lg rounded-lg"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter some text"
          className="border border-gray-300 p-2 rounded w-full mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>

      {url && isImageAccepted === null && (
        <div className="mt-8">
          <img
            className="rounded-lg shadow"
            src={url}
            alt="Generated from input"
          />
          <div className="mt-4 flex gap-4">
            <button
              onClick={handleAccept}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Accept
            </button>
            <button
              onClick={handleReject}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Reject
            </button>
          </div>
        </div>
      )}

      {isImageAccepted === true && (
        <p className="mt-8 text-green-500">Image accepted!</p>
      )}
      {isImageAccepted === false && (
        <p className="mt-8 text-red-500">Image rejected.</p>
      )}
    </div>
  );
}
