import './App.css';
import { useState } from 'react';

function App() {
  // State variables for all input fields
  const [MSZoning, setMSZoning] = useState('');
  const [LotArea, setLotArea] = useState('');
  const [HouseStyle, setHouseStyle] = useState('');
  const [totalsf, setTotalSF] = useState('');
  const [totalporchsf, setTotalPorchSF] = useState('');
  const [totalarea, setTotalArea] = useState('');
  const [OverallQual, setOverallQual] = useState('');
  const [CentralAir, setCentralAir] = useState('');
  const [Electrical, setElectrical] = useState('');
  const [totalbaths, setTotalBaths] = useState('');
  const [BedroomAbvGr, setBedroomAbvGr] = useState('');
  const [KitchenAbvGr, setKitchenAbvGr] = useState('');
  const [TotRmsAbvGrd, setTotRmsAbvGrd] = useState('');
  const [Fireplaces, setFireplaces] = useState('');
  const [GarageCars, setGarageCars] = useState('');
  const [SaleType, setSaleType] = useState('');
  const [SaleCondition, setSaleCondition] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [predictedPrice, setPredictedPrice] = useState("");
  const [errors, setErrors] = useState({}); // State for form errors

  const steps = [
    {
      title: "General Property Information", fields: [
        { label: "Zoning Classification", value: MSZoning, setter: setMSZoning, type: "select", options: [{ value: "", label: "Select Zoning" }, { value: "RL", label: "Residential" }, { value: "other", label: "Other" }] },
        { label: "Lot Area (sq ft)", value: LotArea, setter: setLotArea, type: "number" },
        { label: "House Style", value: HouseStyle, setter: setHouseStyle, type: "select", options: [{ value: "", label: "Select house style" }, { value: "2Story", label: "2 Story" }, { value: "Other", label: "Other" }] },
      ]
    },
    {
      title: "Size and Structure", fields: [
        { label: "Total Square Footage (sq ft)", value: totalsf, setter: setTotalSF, type: "number" },
        { label: "Total Porch Area (sq ft)", value: totalporchsf, setter: setTotalPorchSF, type: "number" },
        { label: "Total Area (sq ft)", value: totalarea, setter: setTotalArea, type: "number" },
        { label: "Overall Quality", value: OverallQual, setter: setOverallQual, type: "select", options: [{ value: "", label: "Select overall quality" }, { value: 10, label: "Very Excellent" }, { value: 9, label: "Excellent" }, { value: 8, label: "Very Good" }, { value: 7, label: "Good" }, { value: 6, label: "Above Average" }, { value: 5, label: "Average" }, { value: 4, label: "Below Average" }, { value: 3, label: "Fair" }, { value: 2, label: "Poor" }, { value: 1, label: "Very Poor" }] },
      ]
    },
    {
      title: "Interior Features", fields: [
        { label: "Total Baths", value: totalbaths, setter: setTotalBaths, type: "number" },
        { label: "Total Bedrooms", value: BedroomAbvGr, setter: setBedroomAbvGr, type: "number" },
        { label: "Total Kitchens", value: KitchenAbvGr, setter: setKitchenAbvGr, type: "number" },
        { label: "Total Rooms", value: TotRmsAbvGrd, setter: setTotRmsAbvGrd, type: "number" },
        { label: "Number of Fireplaces", value: Fireplaces, setter: setFireplaces, type: "number" },
      ]
    },
    {
      title: "Utilities, Amenities, and Garage Information", fields: [
        { label: "Central Air", value: CentralAir, setter: setCentralAir, type: "radio", options: ["Yes", "No"] },
        { label: "Electrical", value: Electrical, setter: setElectrical, type: "select", options: [{ value: "", label: "Select electrical" }, { value: "SBrkr", label: "Standard Breaker" }, { value: "Other", label: "Other" }] },
        { label: "Garage Capacity (in cars)", value: GarageCars, setter: setGarageCars, type: "number" },
      ]
    },
    {
      title: "Sale Information", fields: [
        { label: "Sale Type", value: SaleType, setter: setSaleType, type: "select", options: [{ value: "", label: "Select sale type" }, { value: "New", label: "New" }, { value: "Other", label: "Other" }] },
        { label: "Sale Condition", value: SaleCondition, setter: setSaleCondition, type: "select", options: [{ value: "", label: "Select sale condition" }, { value: "Partial", label: "Partial" }, { value: "Other", label: "Other" }] },
      ]
    },
  ];

  const validateStep = () => {
    const currentFields = steps[currentStep].fields;
    let currentErrors = {};
    let isValid = true;

    currentFields.forEach(field => {
      // Check for empty select options
      if ((field.type === 'select' && field.value === '') || (field.type === 'radio' && !field.value)) {
        currentErrors[field.label] = `${field.label} is required`;
        isValid = false;
      }
      // Check for empty number fields
      if (field.type === 'number' && field.value === '') {
        currentErrors[field.label] = `${field.label} is required`;
        isValid = false;
      }
    });

    setErrors(currentErrors);
    return isValid;
  };

  const handlePrediction = () => {
    // Check if all fields are filled in
    if (LotArea && OverallQual && CentralAir && TotRmsAbvGrd && Fireplaces && GarageCars &&
      totalsf && totalarea && totalbaths && totalporchsf &&
      MSZoning !== '' && HouseStyle !== '') {

      // Placeholder logic for generating a predicted price
      const price = Math.floor(Math.random() * 1000000 + 100000); // Replace this with actual prediction logic
      setPredictedPrice(`Predicted Price: $${price.toLocaleString()}`);
      console.log(`Prediction generated with input data.`);
    } else {
      setPredictedPrice("Please fill in all fields to predict the price.");
    }
  };

  // Navigate to next step
  const nextStep = () => {
    if (validateStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        setErrors({}); // Clear errors when moving to the next step
      } else {
        handlePrediction();
      }
    }
  };

  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setErrors({}); // Clear errors when moving back
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
            <h1 className="display-4" style={{ fontFamily: 'Georgia, serif', fontSize: '3rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'capitalize' }}>
              House Price Prediction
            </h1>
            <p className="lead">Enter the details below to predict the house price</p>
          </div>

          {/* Form */}
          <div className="container-fluid vh-100">
            <div className="row justify-content-center align-items-center">
              <div className="col-md-6 bg-light rounded p-3 shadow-lg">
                <h2 className="mb-4">{steps[currentStep].title}</h2>
                <form>
                  {steps[currentStep].fields.map((field, index) => (
                    <div className="mb-3" key={index}>
                      <label className="form-label">{field.label}</label>
                      {field.type === 'select' ? (
                        <select className="form-select" value={field.value} onChange={(e) => field.setter(e.target.value)}>
                          {field.options.map((option, idx) => (
                            <option key={idx} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      ) : field.type === 'radio' ? (
                        field.options.map((option, idx) => (
                          <div key={idx} className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name={field.label}
                              value={option}
                              checked={field.value === option}
                              onChange={() => field.setter(option)}
                            />
                            <label className="form-check-label">{option}</label>
                          </div>
                        ))
                      ) : (
                        <input
                          type={field.type}
                          className="form-control"
                          value={field.value}
                          onChange={(e) => field.setter(e.target.value)}
                        />
                      )}
                      {errors[field.label] && <div className="text-danger">{errors[field.label]}</div>}
                    </div>
                  ))}
                  <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-secondary" onClick={prevStep} disabled={currentStep === 0}>
                      Back
                    </button>
                    <button type="button" className="btn btn-primary" onClick={nextStep}>
                      {currentStep < steps.length - 1 ? 'Next' : 'Predict'}
                    </button>
                  </div>
                </form>
                {predictedPrice && (
                  <div className="mt-4 alert alert-custom d-flex justify-content-center align-items-center">
                    <span className="icon">💰</span> {/* Example icon */}
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#B8860B' }}>{predictedPrice}</span> {/* Darker gold color */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
