import './App.css';
import { useState } from 'react';

function App() {
  const [floorArea, setFloorArea] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [location, setLocation] = useState('');
  const [predictedPrice, setPredictedPrice] = useState("Input values to predict the price");

  const handlePrediction = () => {
    // Validate input fields
    if (floorArea && bedrooms && location) {
      // Placeholder logic for generating a predicted price
      const price = Math.floor(Math.random() * 1000000 + 100000); // Replace this with actual prediction logic
      setPredictedPrice(`Predicted Price: $${price.toLocaleString()}`);
    } else {
      setPredictedPrice("Please fill in all fields to predict the price.");
    }
  };

  return (
    <div
      className="bg-image"
      style={{
        backgroundImage: `url('/Images/house.jpg')`,
        height: '100vh', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="mask d-flex align-items-center h-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
        <div className="container">
          {/* Title */}
          <div className="text-center text-white mb-5">
            <h1 className="display-4">House Price Prediction</h1>
            <p className="lead">Enter the details below to predict the house price</p>
          </div>

          {/* Form Card */}
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow-lg">
                <div className="card-body">
                  <form onSubmit={(e) => e.preventDefault()}> {/* Prevent page refresh on submit */}
                    {/* Floor Area */}
                    <div className="mb-3">
                      <label htmlFor="floorArea" className="form-label">
                        Floor Area (sq ft)
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="floorArea"
                        placeholder="Enter floor area"
                        value={floorArea}
                        onChange={(e) => setFloorArea(e.target.value)}
                      />
                    </div>

                    {/* Number of Bedrooms */}
                    <div className="mb-3">
                      <label htmlFor="bedrooms" className="form-label">
                        Number of Bedrooms
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="bedrooms"
                        placeholder="Enter number of bedrooms"
                        value={bedrooms}
                        onChange={(e) => setBedrooms(e.target.value)}
                      />
                    </div>

                    {/* Location */}
                    <div className="mb-3">
                      <label htmlFor="location" className="form-label">
                        Location
                      </label>
                      <select className="form-select" id="location" value={location} onChange={(e) => setLocation(e.target.value)}>
                        <option value="">Select Location</option>
                        <option value="City Center">City Center</option>
                        <option value="Suburbs">Suburbs</option>
                        <option value="Rural">Rural</option>
                      </select>
                    </div>

                    {/* Predict Button */}
                    <div className="d-grid">
                      <button
                        type="button"
                        className="btn btn-primary btn-block"
                        onClick={handlePrediction}
                      >
                        Predict Price
                      </button>
                    </div>
                  </form>

                  {/* Predicted Price Message */}
                  <div className="mt-4 text-center text-light">
                    <h4>{predictedPrice}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
