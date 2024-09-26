import './App.css';
import { useState } from 'react';

function App() {
  const [totalBsmtSF, setTotalBsmtSF] = useState('');
  const [firstFlrSF, setFirstFlrSF] = useState('');
  const [grLivArea, setGrLivArea] = useState('');
  const [fullBath, setFullBath] = useState('');
  const [halfBath, setHalfBath] = useState('');
  const [bedroomAbvGr, setBedroomAbvGr] = useState('');
  const [kitchenQual, setKitchenQual] = useState('');
  const [garageType, setGarageType] = useState('');
  const [garageCars, setGarageCars] = useState('');
  const [pavedDrive, setPavedDrive] = useState('');
  const [heating, setHeating] = useState('');
  const [centralAir, setCentralAir] = useState('');
  const [saleType, setSaleType] = useState('');
  const [yearBuilt, setYearBuilt] = useState('');
  const [yearRemodAdd, setYearRemodAdd] = useState('');
  const [roofStyle, setRoofStyle] = useState('');
  const [exterQual, setExterQual] = useState('');
  const [bsmtQual, setBsmtQual] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [predictedPrice, setPredictedPrice] = useState("");

  const steps = [
    { title: "Structural Information", fields: [
      { label: "Style of House", value: "", setter: () => {}, type: "select", options: ["Select Style", "1Story", "2Story"] },
      { label: "Quality Rating (1-5)", value: "", setter: () => {}, type: "select", options: ["Select Quality", "1", "2", "3", "4", "5"] },
      { label: "Year Constructed", value: yearBuilt, setter: setYearBuilt, type: "number" },
      { label: "Year of Renovation", value: yearRemodAdd, setter: setYearRemodAdd, type: "number" },
      { label: "Type of Roof", value: roofStyle, setter: setRoofStyle, type: "select", options: ["Select Roof Style", "Flat", "Gable", "Hip"] },
      { label: "Exterior Condition", value: exterQual, setter: setExterQual, type: "select", options: ["Select Quality", "Low", "Medium", "High"] },
      { label: "Basement Condition", value: bsmtQual, setter: setBsmtQual, type: "select", options: ["Select Quality", "Low", "Medium", "High"] },
      { label: "Total Basement Area (sq ft)", value: totalBsmtSF, setter: setTotalBsmtSF, type: "number" },
    ]},
    { title: "Interior Features", fields: [
      { label: "First Floor Area (sq ft)", value: firstFlrSF, setter: setFirstFlrSF, type: "number" },
      { label: "Living Area Above Ground (sq ft)", value: grLivArea, setter: setGrLivArea, type: "number" },
      { label: "Number of Full Bathrooms", value: fullBath, setter: setFullBath, type: "number" },
      { label: "Number of Half Bathrooms", value: halfBath, setter: setHalfBath, type: "number" },
      { label: "Number of Bedrooms", value: bedroomAbvGr, setter: setBedroomAbvGr, type: "number" },
      { label: "Kitchen Condition", value: kitchenQual, setter: setKitchenQual, type: "select", options: ["Select Quality", "Poor", "Fair", "Good", "Excellent"] },
    ]},
    { title: "Garage Information", fields: [
      { label: "Type of Garage", value: garageType, setter: setGarageType, type: "select", options: ["Select Garage Type", "Attached", "Detached", "Built-In"] },
      { label: "Garage Capacity (Number of Cars)", value: garageCars, setter: setGarageCars, type: "number" },
      { label: "Paved Driveway?", value: pavedDrive, setter: setPavedDrive, type: "select", options: ["Select Driveway Type", "Yes", "No"] }
    ]},
    { title: "Heating and Cooling", fields: [
      { label: "Type of Heating System", value: heating, setter: setHeating, type: "select", options: ["Select Heating Type", "Gas", "Electric"] },
      { label: "Central Air Conditioning Available?", value: centralAir, setter: setCentralAir, type: "radio", options: ["Yes", "No"] }
    ]},
    { title: "Sale Information", fields: [
      { label: "Type of Sale", value: saleType, setter: setSaleType, type: "select", options: ["Select Sale Type", "Normal", "Abnormal"] }
    ]}
  ];
  
  const handlePrediction = () => {
    // Validate input fields
    if (totalBsmtSF && firstFlrSF && grLivArea && fullBath && halfBath && bedroomAbvGr && kitchenQual && garageType && garageCars && pavedDrive && heating && centralAir && saleType && yearBuilt && yearRemodAdd) {
      const currentYear = new Date().getFullYear();
      const ageOfHouse = currentYear - yearBuilt; // Age of the house
      const totalBathrooms = parseInt(fullBath) + parseInt(halfBath); // Total bathrooms
      
      // Placeholder logic for generating a predicted price
      const price = Math.floor(Math.random() * 1000000 + 100000); // Replace this with actual prediction logic
      setPredictedPrice(`Predicted Price: $${price.toLocaleString()}`);
      console.log(`Derived Features - Age of House: ${ageOfHouse}, Total Bathrooms: ${totalBathrooms}`); // For debugging
    } else {
      setPredictedPrice("Please fill in all fields to predict the price.");
    }
  };

  // Navigate to next step
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handlePrediction();
    }
  };

  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div
      className="bg-image"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/Images/house.jpg')`,
        minHeight: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="mask d-flex align-items-center h-100">
        <div className="container">
          {/* Title */}
          <div className="text-center text-white mb-5">
            <h1 className="display-4">House Price Prediction</h1>
            <p className="lead">Enter the details below to predict the house price</p>
          </div>

          {/* Form Card */}
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card shadow-lg">
                <div className="card-body">
                  <form onSubmit={(e) => e.preventDefault()}> {/* Prevent page refresh on submit */}
                    <h5 className="text-black mb-4">{steps[currentStep].title}</h5>
                    {steps[currentStep].fields.map((field, index) => (
                      <div className="mb-3" key={index}>
                        <label className="form-label">{field.label}</label>
                        {field.type === 'select' ? (
                          <select
                            className="form-select"
                            value={field.value}
                            onChange={(e) => field.setter(e.target.value)}
                          >
                            {field.options.map((option, i) => (
                              <option key={i} value={option}>{option}</option>
                            ))}
                          </select>
                        ) : field.type === 'radio' ? (
                          <div>
                            {field.options.map((option, i) => (
                              <label className="form-check-label me-3" key={i}>
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  name={field.label}
                                  value={option}
                                  checked={field.value === option}
                                  onChange={() => field.setter(option)}
                                />
                                {option}
                              </label>
                            ))}
                          </div>
                        ) : (
                          <input
                            type={field.type}
                            className="form-control"
                            value={field.value}
                            onChange={(e) => field.setter(e.target.value)}
                          />
                        )}
                      </div>
                    ))}

                    {/* Navigation Buttons */}
                    <div className="d-flex justify-content-between">
                      <button type="button" className="btn btn-secondary" onClick={prevStep} disabled={currentStep === 0}>Back</button>
                      <button type="button" className="btn btn-primary" onClick={nextStep}>
                        {currentStep < steps.length - 1 ? 'Next' : 'Predict Price'}
                      </button>
                    </div>

                    {/* Display predicted price */}
                    {predictedPrice && <div className="mt-4 text-white">{predictedPrice}</div>}
                  </form>
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
