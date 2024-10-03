from flask import Flask, jsonify, request
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Load the trained model (make sure this file exists)
model = joblib.load('Predict.pickle')  # Check that Predict.pickle is in the right location

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

        # Convert incoming data to appropriate format, including one-hot encoded values
        features = np.array([
            float(data['LotArea']),
            float(data['totalsf']),
            float(data['totalporchsf']),
            float(data['totalarea']),
            float(data['OverallQual']),
            central_air,
            float(data['totalbaths']),
            float(data['BedroomAbvGr']),
            float(data['KitchenAbvGr']),
            float(data['TotRmsAbvGrd']),
            float(data['Fireplaces']),
            float(data['GarageCars']),
            garage_type_attached,
            sale_type_new,
            house_style_1story,
            house_style_2story
        ]).reshape(1, -1)  # Reshape to match model input

        # Make prediction
        predicted_price = model.predict(features)[0]

        # Return the predicted price
        return jsonify({'predicted_price': round(predicted_price, 2)})
    
    except Exception as e:
        return jsonify({'error': f'Error during prediction: {str(e)}'}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, port=8080)
