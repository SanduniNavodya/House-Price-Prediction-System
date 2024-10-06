# **House Price Prediction System**

## **Overview**

The **House Price Prediction System** is a web application designed to predict house prices based on various property features using **regression analysis** and **machine learning techniques**. It utilizes a **React** frontend, integrated with **Vite** for a fast development experience, and a **Flask** backend to handle predictions. By entering general property information, size and structure, interior features, and sale details, users can get an estimated sale price for a house.

---

## **Features**

- **Predict House Prices:** Enter key property details, such as area, style, number of bedrooms, and more to get an accurate price estimate.
- **Easy Input Interface:** The app uses a simple and intuitive form to gather necessary property data.
- **Instant Results:** After submitting the form, the predicted price is displayed immediately.
- **Fast Development with Vite:** The project leverages Vite for quick builds and optimized front-end performance.
- **Backend using Flask:** The backend is built using Flask, which serves the machine learning model that generates price predictions.

---

## **Technologies Used**

### **Regression Analysis & Machine Learning Techniques**
The system employs various regression techniques, such as **Linear Regression** and **Random Forest Regression**, to analyze the relationships between the features of the house and its price. By training the model on historical data, it can accurately predict prices based on the user input.

### **Frontend (React + Vite)**
- **React:** For building the user interface.
- **Vite:** For fast development builds and optimized performance.
- **CSS:** For styling the web pages.

### **Backend (Flask)**
- **Flask:** As the backend framework handling HTTP requests and interfacing with the prediction model.
- **Machine Learning Model:** A trained model to predict house prices based on input data.

---

## **Demonstration Video**

Watch a demonstration of the **House Price Prediction System** to see how it works:

[![House Price Prediction Demo]](https://1drv.ms/v/s!AtI3eMBieNF5mOc6GyFvkjbZTGqinA?e=OeOeZt)


---

## **How to Run Locally**

### **Prerequisites**

1. **Node.js** and **npm** installed for React.
2. **Python** installed for Flask.

### **Setup Instructions**

#### **1. Clone the repository**
```bash
git clone <repository-url>
cd house-price-prediction
```

#### **2. Frontend Setup (React + Vite)**

- Navigate to the frontend directory:

```bash
cd client
```

- Install the required dependencies:

```bash
npm install
```

- Start the development server:

```bash
npm run dev
```

Vite will start a local development server at `http://localhost:3000`.

#### **3. Backend Setup (Flask)**

- Navigate to the backend directory:

```bash
cd server
```

- Create a virtual environment and activate it:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

- Install the required dependencies:

```bash
pip install -r requirements.txt
```

- Start the Flask server:

```bash
python app.py
```

The Flask server will run at `http://localhost:5000`.

---

## **Usage**

1. **Enter Property Details:**
   Fill out the form with the necessary house details such as **Lot Area**, **House Style**, **Living Area**, **Total Rooms**, **Garage Information**, and more.

2. **Get the Predicted Price:**
   After submitting the form, the predicted price for the house will be displayed immediately on the screen.

### **Form Fields**

- **General Property Information:**
  - Lot Area (sq ft)
  - House Style
- **Size and Structure:**
  - Total Square Footage (sq ft)
  - Total Porch Area (sq ft)
  - Living Area (sq ft)
  - Overall Quality
- **Interior Features:**
  - Total Baths
  - Total Bedrooms
  - Total Kitchens
  - Total Rooms
  - Number of Fireplaces
- **Amenities Information:**
  - Central Air (Yes/No)
- **Garage Information:**
  - Garage Capacity (in cars)
  - Garage Type (Attached/Detached)
- **Sale Information:**
  - Sale Type (New, Resale)

---

## **Sample Output**

Once the user inputs the required property information, the system will generate a predicted price.

- **Predicted Price Example:**
  ```
  Predicted Price: $203,791.82
  ```

---

## **Contributing**

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/new-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/new-feature`.
5. Open a pull request.

