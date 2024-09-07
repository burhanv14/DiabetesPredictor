from flask import Flask,request,jsonify
import numpy as np 
import pandas as pd
import pickle
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
model = pickle.load(open('model.pkl','rb'))
scaler = pickle.load(open('scaler.pkl','rb'))
hmodel = pickle.load(open('hmodel.pkl','rb'))
standardscaler = pickle.load(open('standardscaler.pkl','rb'))
@app.route('/', methods=['GET'])
def get_data():
    data = {
        "message":"API is Running"
    }
    return jsonify(data)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    query_df = pd.DataFrame([data])
    input_data_as_numpy_array = np.asarray(query_df, dtype=np.float64)
    input_data_reshaped = input_data_as_numpy_array.reshape(1, -1)
    std_data = scaler.transform(input_data_reshaped)
    prediction = model.predict(std_data)    
    message = "The person is Diabetic" if prediction[0] == 1 else "The person is not Diabetic"
    response_data = {"message": message}
    return jsonify(response_data)

@app.route('/heartpredict', methods=['POST'])
def heartpredict():
    data = request.get_json()

    # All expected input fields
    expected_features = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 
                         'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal']

    # Check if all necessary features are provided
    if not all(feature in data for feature in expected_features):
        return jsonify({"message": "Missing input fields"}), 400

    # Extract the relevant features for scaling
    scaling_features = ['age', 'trestbps', 'chol', 'thalach', 'oldpeak']
    scaling_values = [data[feature] for feature in scaling_features]
    
    # Convert to numpy array and reshape for scaling
    scaling_values_as_array = np.array(scaling_values, dtype=np.float64).reshape(1, -1)
    
    # Scale the required fields
    scaled_values = standardscaler.fit_transform(scaling_values_as_array)[0]

    #  Replace the original values with the scaled values in the data
    # for i, feature in enumerate(scaling_features):
    #     data[feature] = scaled_values[i]
    
    # Convert the updated data into a DataFrame
    query_df = pd.DataFrame([data])
    
    # Convert the DataFrame into a numpy array
    input_data_as_numpy_array = np.asarray(query_df, dtype=np.float64)

    # Reshape the data to be suitable for model input
    input_data_reshaped = input_data_as_numpy_array.reshape(1, -1)
    
    # Make the prediction using the heart disease model
    prediction = hmodel.predict(input_data_reshaped)
    
    # Prepare the response message
    message = "The person has a Heart Disease" if prediction[0] == 1 else "The person is healthy! ;)"
    response_data = {"message": message}
    
    return jsonify(response_data)



if(__name__ == '__main__'):
    app.run(port='5000',debug=True)
