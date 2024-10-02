from flask import Flask, jsonify, request  # Import necessary modules from Flask
from flask_cors import CORS  # Import CORS for handling cross-origin requests
import joblib  # Import joblib for loading the trained model
import numpy as np  # Import numpy for numerical operations

# Initialize Flask app
app = Flask(__name__)
CORS(app, origins='*')  # Enable CORS for all origins

model = joblib.load('predictor.pickle')  # Load the trained model from the pickle file

# Define the /api/predict route for POST requests
@app.route('/api/predict', methods=['POST'])
def predict_price():
    # Extract JSON data from the request
    data = request.get_json()

    # Check if all required fields are present in the incoming JSON
    required_fields = [
        'LotArea', 'HouseStyle', 'totalsf', 'totalporchsf', 'totalarea',
        'OverallQual', 'CentralAir', 'totalbaths', 'BedroomAbvGr',
        'KitchenAbvGr', 'TotRmsAbvGrd', 'Fireplaces', 'GarageCars',
        'GarageType', 'SaleType'
    ]
    
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing field: {field}'}), 400
    
    try:
        # Extract and convert input values to appropriate types
        features = [
            float(data['LotArea']),
            float(data['totalsf']),
            float(data['totalporchsf']),
            float(data['totalarea']),
            float(data['OverallQual']),
            1.0 if data['CentralAir'] == 'Yes' else 0.0,  # Convert Yes/No to 1/0
            float(data['totalbaths']),
            float(data['BedroomAbvGr']),
            float(data['KitchenAbvGr']),
            float(data['TotRmsAbvGrd']),
            float(data['Fireplaces']),
            float(data['GarageCars']),
            1.0 if data['GarageType'] == 'Attached' else 0.0,  # Convert Attached/Detached to 1/0
            1.0 if data['SaleType'] == 'New' else 0.0  # Convert New/Other to 1/0
        ]

        # Convert features list to a numpy array and reshape to 2D array for model prediction
        features_array = np.array([features])

        # Predict the house price using the loaded model
        prediction = model.predict(features_array)[0]

        # Return the predicted price as a JSON response
        return jsonify({'predicted_price': prediction}), 200

    except Exception as e:
        # If an error occurs, return a 500 error with the exception message
        return jsonify({'error': str(e)}), 500

# Test route to verify API is working
@app.route('/api/users', methods=['GET'])
def get_users():
    return jsonify({
        'users': ['user1', 'user2', 'user3']
    })

# Main entry point for the Flask app
if __name__ == '__main__':
    # Run the Flask app on port 8080 in debug mode
    app.run(debug=True, port=8080)
