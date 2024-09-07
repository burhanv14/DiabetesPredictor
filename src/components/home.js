import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import env from "react-dotenv";

const Home = () => {
  // State variables
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState(''); // To store the result from the API
//   const dotenv = require('dotenv');
  // Function to handle the submit button click
  async function generateAnswer() {
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBmfIVI2Z9euAXJ6aVFQD2rTWBBeg1h1qU`,
        method: 'POST',
        data: {
          contents: [
            {
              role: 'user',
              parts: [{ text: `Based on symptoms: ${symptoms}, give me a one-word answer: more probable Diabetes or Heart Disease` }],
            },
          ],
        },
      });
      const generatedText = response["data"]["candidates"][0]["content"]["parts"][0]["text"]; // Assuming this is where the result is
      setResult(generatedText); // Set the result in state to display it
    } catch (error) {
      console.error('Error:', error);
      setResult('Error generating result.'); // Set an error message
    }
  }

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center text-white p-5">
      {/* Heading */}
      <motion.h1
        className="text-5xl font-bold mb-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        HealthSafe
      </motion.h1>

      {/* Input Box */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <label htmlFor="symptoms" className="block text-lg mb-2">
          Enter Your Symptoms:
        </label>
        <input
          type="text"
          id="symptoms"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          className="w-full px-4 py-2 text-black rounded-lg mb-4"
          placeholder="Type your symptoms here..."
        />

        {/* Submit Button */}
        <motion.button
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg w-1/4 mb-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generateAnswer}
        >
          Submit
        </motion.button>

        {/* Display the Result */}
        {result && (
          <div className="mt-4 p-4 bg-gray-700 rounded-lg">
            <p className="text-xl">Result: {result}</p>
          </div>
        )}
      </div>

      {/* Button Container Below the Box */}
      <div className="mt-10 space-x-5">
        {/* Diabetes Predictor Button */}
        <motion.button
          className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg shadow-lg text-xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.location.href = '/diabetes'}
        >
          Diabetes Predictor
        </motion.button>

        {/* Heart Disease Predictor Button */}
        <motion.button
          className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg shadow-lg text-xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.location.href = '/heart'}
        >
          Heart Disease Predictor
        </motion.button>
      </div>
    </div>
  );
};

export default Home;
