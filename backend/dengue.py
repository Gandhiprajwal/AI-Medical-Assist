import sys
import numpy as np
import pandas as pd
import joblib
import json
import os

# Step 1: Validate input arguments
if len(sys.argv) < 2:
    print(json.dumps({"error": "No input data provided"}))
    sys.exit(1)

# Step 2: Read and debug input
raw_input = sys.argv[1]
print(f"Raw input received: {raw_input}")  # This will print the raw input


try:
    data_dict = json.loads(raw_input)  # Expecting JSON string as input
    print("Input data parsed successfully:", data_dict)  # Debug: Print input data
except json.JSONDecodeError as e:
    print(json.dumps({"error": f"Invalid JSON input: {str(e)}"}))
    sys.exit(1)

# Step 3: Validate required keys and their types
required_keys = ['Sex', 'Haemoglobin', 'Differential Count', 'RBC PANEL', 'PDW', 'Age_Group']

missing_keys = [key for key in required_keys if key not in data_dict]
if missing_keys:
    print(json.dumps({"error": f"Missing keys in input: {missing_keys}"}))
    sys.exit(1)

# Debugging: Check the types of values
for key, value in data_dict.items():
    print(f"Key: {key}, Value: {value}, Type: {type(value)}")  # Debug: Print key, value, and type

# Step 4: Load the model and preprocessor
model_path = './aimodels/dengue_classifier.pkl'
preprocessor_path = './aimodels/dengue_pipeline (1).pkl'

if not os.path.exists(model_path) or not os.path.exists(preprocessor_path):
    print(json.dumps({"error": "Model or preprocessor file not found"}))
    sys.exit(1)

try:
    model = joblib.load(model_path)
    preprocessor = joblib.load(preprocessor_path)
    print("Model and preprocessor loaded successfully.")  # Debug: Confirm successful loading
except Exception as e:
    print(json.dumps({"error": f"Model loading failed: {str(e)}"}))
    sys.exit(1)

# Step 5: Convert input to DataFrame and process
try:
    # Convert input dictionary to DataFrame
    input_df = pd.DataFrame([data_dict])
    print("Dataframe created successfully:", input_df)  # Debug: Print the dataframe

    # Apply preprocessing (excluding final model)
    preprocessor = preprocessor[:-1]
    input_df_transformed = preprocessor.transform(input_df)
    print("Data transformed successfully:", input_df_transformed)  # Debug: Print transformed data

    # Make prediction
    prediction = model.predict(input_df_transformed)
    print("Prediction:", prediction)  # Debug: Print the prediction

    # Convert prediction to label
    result = "positive" if prediction[0] == 1 else "negative"
    print(json.dumps({"prediction": result}))

except Exception as e:
    print(json.dumps({"error": f"Processing error: {str(e)}"}))
    sys.exit(1)
