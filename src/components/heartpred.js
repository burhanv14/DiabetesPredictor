import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';

const HeartPred = () => {
  const [isLoading, setIsloading] = useState(false);
  const [showSpan, setShowSpan] = useState(false);
  const [result, setResult] = useState("");

  // Form state variables
  const [formData, setFormData] = useState({
    age: '',
    sex: 'male', // Default value is 'male'
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: ''
  });

  // Handle input changes and update formData state
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Check if the input field is 'sex' and set the value accordingly
    if (name === 'sex') {
      setFormData({
        ...formData,
        sex: value === 'male' ? 1 : 0
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert 'sex' value to 1 (male) or 0 (female)
    const updatedFormData = {
      ...formData,
      sex: formData.sex === 'male' ? 1 : 0
    };

    const url = "http://localhost:5000/heartpredict"; // Backend URL
    setIsloading(true);

    const jsonData = JSON.stringify(updatedFormData);

    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: jsonData,
    })
      .then((response) => response.json())
      .then((response) => {
        setResult(response.message);
        setIsloading(false);
        setShowSpan(true);
      });
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      age: '',
      sex: 'male',
      cp: '',
      trestbps: '',
      chol: '',
      fbs: '',
      restecg: '',
      thalach: '',
      exang: '',
      oldpeak: '',
      slope: '',
      ca: '',
      thal: ''
    });
  };

  return (
    <div>
      <h1 className="text-center font-serif text-5xl font-semibold text-black p-6 bg-pri">Heart Disease Predictor</h1>
      <div className="min-h-screen h-auto w-auto bg-pri flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-4">
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-gray-500 shadow-md rounded-md">
            
            {/* Age input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Age:
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </label>
            </div>

            {/* Sex input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Sex:
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </label>
            </div>

            {/* Other form inputs */}
            {[
              { name: 'cp', label: 'Chest Pain Type (cp)' },
              { name: 'trestbps', label: 'Resting Blood Pressure (trestbps)' },
              { name: 'chol', label: 'Cholesterol (chol)' },
              { name: 'fbs', label: 'Fasting Blood Sugar (fbs)' },
              { name: 'restecg', label: 'Resting ECG (restecg)' },
              { name: 'thalach', label: 'Max Heart Rate (thalach)' },
              { name: 'exang', label: 'Exercise Induced Angina (exang)' },
              { name: 'oldpeak', label: 'ST Depression (oldpeak)' },
              { name: 'slope', label: 'Slope of ST Segment (slope)' },
              { name: 'ca', label: 'Number of Major Vessels (ca)' },
              { name: 'thal', label: 'Thalassemia (thal)' }
            ].map((inputField) => (
              <div className="mb-4" key={inputField.name}>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {inputField.label}:
                  <input
                    type="number"
                    name={inputField.name}
                    value={formData[inputField.name]}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
                </label>
              </div>
            ))}

            {/* Submit and Reset buttons */}
            <div className="flex items-center justify-between">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Submit
              </button>
              <button type="button" onClick={handleReset} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Spline visualization */}
        <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-700">
          <Spline scene="https://prod.spline.design/ENf-ThsBs-cTn3kj/scene.splinecode" className="w-full h-full md:max-w-none md:max-h-none max-w-xs max-h-xs" />
        </div>
      </div>

      
      {/* Display prediction result */}
      {showSpan && (
        <div id="prediction" className="pt-16 pb-16 text-center text-black text-2xl md:text-5xl bg-pri font-mono font-normal">
          {result ? <p className="p-2 bg-gray-900 text-white">{result}</p> : <p>Please fill out each field in the form completely</p>}
        </div>
      )}
    </div>
  );
};

export default HeartPred;
