import React from 'react';
import Spline from '@splinetool/react-spline';
import { useState } from 'react';

const DiabetesForm = () => {
    const [isLoading, setIsloading] = useState(false);
    const [showSpan, setShowSpan] = useState(false);
    const [result, setResult] = useState("");
    
    const [formData, setFormData] = useState({
      Pregnancies: '',
      Glucose: '',
      BloodPressure: '',
      SkinThickness: '',
      Insulin: '',
      BMI: '',
      DiabetesPedigreeFunction: '',
      Age: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const url = "http://localhost:5000/predict";
      setIsloading(true);
      const jsonData = JSON.stringify(formData);
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
  
    const handleReset = () => {
      setFormData({
        Pregnancies: '',
        Glucose: '',
        BloodPressure: '',
        SkinThickness: '',
        Insulin: '',
        BMI: '',
        DiabetesPedigreeFunction: '',
        Age: ''
      });
    };

    return (
        <div>
          <h1 className="text-center font-serif text-5xl font-semibold text-black p-6 bg-pri">Diabetes Predictor</h1>
        <div className="min-h-screen h-auto w-auto bg-pri flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-4">
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-gray-500 shadow-md rounded-md">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Pregnancies:
                  <input
                    type="number"
                    name="Pregnancies"
                    value={formData.Pregnancies}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Glucose:
                  <input
                    type="number"
                    name="Glucose"
                    value={formData.Glucose}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  BloodPressure:
                  <input
                    type="number"
                    name="BloodPressure"
                    value={formData.BloodPressure}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  SkinThickness:
                  <input
                    type="number"
                    name="SkinThickness"
                    value={formData.SkinThickness}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Insulin:
                  <input
                    type="number"
                    name="Insulin"
                    value={formData.Insulin}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  BMI:
                  <input
                    type="number"
                    name="BMI"
                    value={formData.BMI}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Diabetes Pedigree Function:
                  <input
                    type="number"
                    name="DiabetesPedigreeFunction"
                    value={formData.DiabetesPedigreeFunction}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Age:
                  <input
                    type="number"
                    name="Age"
                    value={formData.Age}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
                </label>
              </div>
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
          <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-700">
            <Spline scene="https://prod.spline.design/ENf-ThsBs-cTn3kj/scene.splinecode" className="w-full h-full md:max-w-none md:max-h-none max-w-xs max-h-xs" />
          </div>
        </div>
        {showSpan && (
              <div id="prediction" className="pt-16 pb-16 text-center text-black text-2xl md:text-5xl bg-pri font-mono font-normal">
                {result ? <p class="p-2 bg-gray-900 text-white">{result}</p> : <p>Please fill out each field in the form completely</p>}
              </div>
            )}
        </div>
      );
    };
    
    export default DiabetesForm;
    