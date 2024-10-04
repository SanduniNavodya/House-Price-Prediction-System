import './App.css';
import { useState } from 'react';

function App() {
  // State variables for all input fields
  const [LotArea, setLotArea] = useState('');
  const [HouseStyle, setHouseStyle] = useState('');
  const [totalsf, setTotalSF] = useState('');
  const [totalporchsf, setTotalPorchSF] = useState('');
  const [totalarea, setTotalArea] = useState('');
  const [OverallQual, setOverallQual] = useState('');
  const [CentralAir, setCentralAir] = useState('');
  const [totalbaths, setTotalBaths] = useState('');
  const [BedroomAbvGr, setBedroomAbvGr] = useState('');
  const [KitchenAbvGr, setKitchenAbvGr] = useState('');
  const [TotRmsAbvGrd, setTotRmsAbvGrd] = useState('');
  const [Fireplaces, setFireplaces] = useState('');
  const [GarageCars, setGarageCars] = useState('');
  const [GarageType, setGarageType] = useState('');
  const [SaleType, setSaleType] = useState('');
  const [predictedPrice, setPredictedPrice] = useState('');
  const [errors, setErrors] = useState({}); // State for form errors

  const fields = [
    {
      title: "General Property Information", fields: [
        { label: "Lot Area (sq ft)", value: LotArea, setter: setLotArea, type: "number" },
        { label: "House Style", value: HouseStyle, setter: setHouseStyle, type: "select", options: [{ value: "", label: "Select house style" }, { value: "1Story", label: "2 Story" }, { value: "2Story", label: "1 Story" }] }
      ]
    },
    {
      title: "Size and Structure", fields: [
        { label: "Total Square Footage (sq ft)", value: totalsf, setter: setTotalSF, type: "number" },
        { label: "Total Porch Area (sq ft)", value: totalporchsf, setter: setTotalPorchSF, type: "number" },
        { label: "Living Area (sq ft)", value: totalarea, setter: setTotalArea, type: "number" },
        { label: "Overall Quality", value: OverallQual, setter: setOverallQual, type: "select", options: [{ value: "", label: "Select overall quality" }, { value: 10, label: "Very Excellent" }, { value: 9, label: "Excellent" }, { value: 8, label: "Very Good" }, { value: 7, label: "Good" }, { value: 6, label: "Above Average" }, { value: 5, label: "Average" }, { value: 4, label: "Below Average" }, { value: 3, label: "Fair" }, { value: 2, label: "Poor" }, { value: 1, label: "Very Poor" }] }
      ]
    },
    {
      title: "Interior Features", fields: [
        { label: "Total Baths", value: totalbaths, setter: setTotalBaths, type: "number" },
        { label: "Total Bedrooms", value: BedroomAbvGr, setter: setBedroomAbvGr, type: "number" },
        { label: "Total Kitchens", value: KitchenAbvGr, setter: setKitchenAbvGr, type: "number" },
        { label: "Total Rooms", value: TotRmsAbvGrd, setter: setTotRmsAbvGrd, type: "number" },
        { label: "Number of Fireplaces", value: Fireplaces, setter: setFireplaces, type: "number" }
      ]
    },
    {
      title: "Amenities Information", fields: [
        { label: "Central Air", value: CentralAir, setter: setCentralAir, type: "radio", options: ["Yes", "No"] },
      ]
    },
    {
      title: "Garage Information", fields: [
        { label: "Garage Capacity (in cars)", value: GarageCars, setter: setGarageCars, type: "number" },
        { label: "Garage Type", value: GarageType, setter: setGarageType, type: "radio", options: ["Attached", "Detached"] }
      ]
    },
    {
      title: "Sale Information", fields: [
        { label: "Sale Type", value: SaleType, setter: setSaleType, type: "select", options: [{ value: "", label: "Select sale type" }, { value: "New", label: "New" }, { value: "Other", label: "Other" }] }
      ]
    }
  ];

  const validateForm = () => {
    let currentErrors = {};
    let isValid = true;

    fields.forEach(group => {
      group.fields.forEach(field => {
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
        // Check for negative values in number fields
        if (field.type === 'number' && field.value < 0) {
          currentErrors[field.label] = `${field.label} cannot be negative`;
          isValid = false;
        }
      });
    });

    setErrors(currentErrors);
    return isValid;
  };

  const handlePrediction = async () => {
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:8080/api/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            LotArea,
            HouseStyle,
            totalsf,
            totalporchsf,
            totalarea,
            OverallQual,
            CentralAir,
            totalbaths,
            BedroomAbvGr,
            KitchenAbvGr,
            TotRmsAbvGrd,
            Fireplaces,
            GarageCars,
            GarageType,
            SaleType,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        setPredictedPrice(`Predicted Price: $${data.predicted_price.toLocaleString()}`);
      } catch (error) {
        console.error('Error:', error);
        setPredictedPrice('An error occurred while predicting the price.');
      }
    } else {
      setPredictedPrice('Please fill in all fields to predict the price.');
    }
  };
  

  return (
    <div
      className="bg-image"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/Images/house.jpg')`,
        minHeight: '200vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="mask d-flex align-items-center h-100">
        <div className="container">
          {/* Title */}
          <div className="text-center text-white mb-5">
            <h1 className="display-4" style={{ fontFamily: 'Georgia, serif', fontSize: '3rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'capitalize', paddingTop:"15px" }}>
              House Price Prediction
            </h1>
            <p className="lead">Enter the details below to predict the house price</p>
          </div>

          {/* Form */}
          <div className="container-fluid vh-100">
            <div className="row justify-content-center align-items-center">
              <div className="col-md-8 bg-light rounded p-4 shadow-lg" style={{ maxWidth: '700px', margin: 'auto' }}>
                <form>
                  {fields.map((group, groupIndex) => (
                    <div key={groupIndex} className="mb-4">
                      <h2
                        className="mb-3"
                        style={{ fontSize: '1.2rem', marginBottom: '1rem' }}
                      >
                        {group.title}
                      </h2>
                      {group.fields.map((field, index) => {
                        // Place fields in pairs or groups as specified
                        const rowClasses = index % 2 === 0 ? 'row' : ''; // Apply row class to every first field of a pair
                        return (
                          <div key={index} className={`mb-3 ${rowClasses}`}>
                            {index % 2 === 0 && (
                              <>
                                <div className="col-md-6">
                                  <label className="form-label">{field.label}</label>
                                  {field.type === 'select' ? (
                                    <select
                                      className="form-select"
                                      value={field.value}
                                      onChange={(e) => field.setter(e.target.value)}
                                    >
                                      {field.options.map((option, optIndex) => (
                                        <option key={optIndex} value={option.value}>
                                          {option.label}
                                        </option>
                                      ))}
                                    </select>
                                  ) : field.type === 'radio' ? (
                                    <div>
                                      {field.options.map((option, optIndex) => (
                                        <div key={optIndex} className="form-check form-check-inline">
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name={field.label}
                                            value={option}
                                            checked={field.value === option}
                                            onChange={(e) => field.setter(e.target.value)}
                                          />
                                          <label className="form-check-label">{option}</label>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <input
                                      type={field.type}
                                      className="form-control"
                                      value={field.value}
                                      onChange={(e) => field.setter(e.target.value)}
                                      min="0" // Prevent negative numbers
                                    />
                                  )}
                                  {errors[field.label] && (
                                    <div className="text-danger">{errors[field.label]}</div>
                                  )}
                                </div>

                                {/* Align the second field of a pair in the same row */}
                                {group.fields[index + 1] && (
                                  <div className="col-md-6">
                                    <label className="form-label">{group.fields[index + 1].label}</label>
                                    {group.fields[index + 1].type === 'select' ? (
                                      <select
                                        className="form-select"
                                        value={group.fields[index + 1].value}
                                        onChange={(e) => group.fields[index + 1].setter(e.target.value)}
                                      >
                                        {group.fields[index + 1].options.map((option, optIndex) => (
                                          <option key={optIndex} value={option.value}>
                                            {option.label}
                                          </option>
                                        ))}
                                      </select>
                                    ) : group.fields[index + 1].type === 'radio' ? (
                                      <div>
                                        {group.fields[index + 1].options.map((option, optIndex) => (
                                          <div key={optIndex} className="form-check form-check-inline">
                                            <input
                                              className="form-check-input"
                                              type="radio"
                                              name={group.fields[index + 1].label}
                                              value={option}
                                              checked={group.fields[index + 1].value === option}
                                              onChange={(e) => group.fields[index + 1].setter(e.target.value)}
                                            />
                                            <label className="form-check-label">{option}</label>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <input
                                        type={group.fields[index + 1].type}
                                        className="form-control"
                                        value={group.fields[index + 1].value}
                                        onChange={(e) => group.fields[index + 1].setter(e.target.value)}
                                      />
                                    )}
                                    {errors[group.fields[index + 1].label] && (
                                      <div className="text-danger">{errors[group.fields[index + 1].label]}</div>
                                    )}
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-primary mt-3"
                      onClick={handlePrediction}
                    >
                      Predict Price
                    </button>
                  </div>
                  {predictedPrice && (
                    <div className="mt-4 alert alert-custom d-flex justify-content-center align-items-center">
                      <span className="icon">💰</span> {/* Example icon */}
                      <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#B8860B' }}>{predictedPrice}</span> {/* Darker gold color */}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

