from flask import Flask,request,jsonify
import numpy as np 
import pandas as pd
import pickle
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
model = pickle.load(open('model.pkl','rb'))
scaler = pickle.load(open('scaler.pkl','rb'))
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
    message = "THE PERSON IS DIABETIC" if prediction[0] == 1 else "The person is not diabetic"
    response_data = {"message": message}
    return jsonify(response_data)



if(__name__ == '__main__'):
    app.run(port='5000',debug=True)
