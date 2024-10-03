import pandas as pd
import numpy as np
from flask import Flask, jsonify, request
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)

# Load the trained model from the pickle file
model = joblib.load('Predict_ridge_new.pickle')

# Define the /api/predict route for POST requests
@app.route('/api/predict', methods=['POST'])
def predict_price():
    data = request.get_json()

    # Required fields
    required_fields = [
        'LotArea', 'HouseStyle', 'totalsf', 'totalporchsf', 'totalarea',
        'OverallQual', 'CentralAir', 'totalbaths', 'BedroomAbvGr',
        'KitchenAbvGr', 'TotRmsAbvGrd', 'Fireplaces', 'GarageCars',
        'GarageType', 'SaleType'
    ]
    
    # Check if all fields are present
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing field: {field}'}), 400

    try:
        # Handle one-hot encoding for HouseStyle
        house_style = data['HouseStyle']

        # Initialize one-hot encoded variables
        house_style_1story = 0
        house_style_2story = 0

        # Set the one-hot encoded variables based on the selected house style
        if house_style == '1Story':
            house_style_1story = 1
        elif house_style == '2Story':
            house_style_2story = 1

        # Binary encoding for CentralAir
        central_air = 1 if data['CentralAir'] == 'Yes' else 0

        # Binary encoding for GarageType (assuming only 'Attached' matters)
        garage_type_attached = 1 if data['GarageType'] == 'Attached' else 0

        # Binary encoding for SaleType (assuming only 'New' matters)
        sale_type_new = 1 if data['SaleType'] == 'New' else 0

        # Create a DataFrame for the features with proper column names
        features = pd.DataFrame({
            'LotArea': [float(data['LotArea'])],
            'OverallQual': [float(data['OverallQual'])],
            'CentralAir': [central_air],
            'BedroomAbvGr': [float(data['BedroomAbvGr'])],
            'KitchenAbvGr': [float(data['KitchenAbvGr'])],
            'TotRmsAbvGrd': [float(data['TotRmsAbvGrd'])],
            'Fireplaces': [float(data['Fireplaces'])],
            'GarageCars': [float(data['GarageCars'])],
            'totalsf': [float(data['totalsf'])],
            'totalarea': [float(data['totalarea'])],
            'totalbaths': [float(data['totalbaths'])],
            'totalporchsf': [float(data['totalporchsf'])],
            'HouseStyle_1Story': [house_style_1story],
            'HouseStyle_2Story': [house_style_2story],
            'SaleType_New': [sale_type_new],
            'GarageType_Attchd': [garage_type_attached]
        })

        # Make prediction
        predicted_price = model.predict(features)[0]

        # Return the predicted price
        return jsonify({'predicted_price': round(predicted_price, 2)})
    
    except Exception as e:
        return jsonify({'error': f'Error during prediction: {str(e)}'}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, port=8080)

