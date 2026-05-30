"use client";

import { useState } from "react";

export default function FeedbackForm({ tool }: { tool: string }) {
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      setStatus("Please enter feedback");
      return;
    }

    try {
      // Example API call (replace with your backend later)
      console.log("Tool:", tool);
      console.log("Feedback:", feedback);

      setStatus("Thank you for your feedback!");
      setFeedback("");

    } catch (error) {
      setStatus("Something went wrong");
    }
  };

  return (
    <div className="mt-10 p-4 border rounded-lg bg-gray-50 space-y-3">

      <h2 className="text-lg font-semibold">
        Give Feedback
      </h2>

      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Write your feedback..."
        className="w-full border rounded-lg px-3 py-2 h-24"
      />

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        className="
          bg-blue-600
          text-white
          px-4 py-2
          rounded
          hover:bg-blue-700
          cursor-pointer
          transition
        "
      >
        Submit Feedback
      </button>

      {/* STATUS MESSAGE */}
      {status && (
        <p className="text-sm text-gray-700">
          {status}
        </p>
      )}

    </div>
  );
}