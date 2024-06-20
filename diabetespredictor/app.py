from flask import Flask,render_template,request
import pickle
import pandas as pd
import numpy as np
import warnings

app = Flask(__name__)

classifier = pickle.load(open('model.pkl','rb'))

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict',methods=['POST'])
def predict():
    pregnancies=request.form.get('Pregnancies')
    glucose=request.form.get('Glucose')
    bloodpressure=request.form.get('BloodPressure')
    skinThickness=request.form.get('SkinThickness')
    insuling=requst.form.get('Insulin')
    bmi=request.form.get('BMI')
    diabetesPedigreeFunction=request.form.get('DiabetesPedigreeFunction')
    age=request.form.get('Age') 
    ans = claassifier.predict([[pregnancies,glucose,bloodpressure,skinThickness,insuling,bmi,diabetesPedigreeFunction,age]])
    if ans==0 :
        return "The person is diabetic"
    else :
        return "The person is not diabetic"

if  __name__=='__main__':
    app.run(debug=True)
