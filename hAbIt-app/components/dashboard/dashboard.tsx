'use client';

import { useState } from "react";

export default function Dashboard() {
  const [feedback, setFeedback] = useState('');
  {/*'http://localhost:8000/api/feedback'*/}
  const handleFeedbackRequest = async () => {
    const response = await fetch('/backend/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        persona: 'Personal Trainer',
        habit_name: 'Running',
        progress_summary: 'User has completed 3 runs this week.'
      }),
    });
    const data = await response.json();
    setFeedback(data.feedback);
  };

  return (
    <div className="flex flex-col">
      <button
        onClick={handleFeedbackRequest}
        className="mt-4 bg-blue-500 text-white rounded px-4 py-2"
      >
        Get Feedback
      </button>
      <div className="mt-4 p-4 border rounded-lg bg-gray-100">
        <h2 className="font-semibold">Feedback:</h2>
        <p>{feedback}</p>
      </div>
    </div>
  );
}

