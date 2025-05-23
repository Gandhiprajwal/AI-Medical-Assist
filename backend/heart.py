import sys
import numpy as np
import pandas as pd
import joblib
import json

# Step 1: Validate input arguments
if len(sys.argv) < 2:
    print(json.dumps({"error": "No input data provided"}))
    sys.exit(1)

# Step 2: Read and debug input
raw_input = sys.argv[1]

try:
    data_dict = json.loads(raw_input)  # Expecting JSON string as input
except json.JSONDecodeError as e:
    print(json.dumps({"error": f"Invalid JSON input: {str(e)}"}))
    sys.exit(1)

# Step 3: Validate required keys in JSON
required_keys = ["Age", "Gender", "Heart rate", "Systolic blood pressure", 
                 "Diastolic blood pressure", "Blood sugar", "CK-MB", "Troponin"]

missing_keys = [key for key in required_keys if key not in data_dict]
if missing_keys:
    print(json.dumps({"error": f"Missing keys in input: {missing_keys}"}))
    sys.exit(1)

# Step 4: Load the model and scaler
try:
    model = joblib.load('./aimodels/heart.pkl')
    scaler = joblib.load('./aimodels/heart_scaler.pkl')
except Exception as e:
    print(json.dumps({"error": f"Model loading failed: {str(e)}"}))
    sys.exit(1)

# Step 5: Convert input to DataFrame to preserve feature names
try:
    # Convert input dictionary to DataFrame
    input_df = pd.DataFrame([data_dict])  

    # Separate categorical and continuous features
    categorical_cols = ["Gender"]
    continuous_cols = ["Age", "Heart rate", "Systolic blood pressure", "Diastolic blood pressure",
                       "Blood sugar", "CK-MB", "Troponin"]

    # Scale only continuous features
    input_df[continuous_cols] = scaler.transform(input_df[continuous_cols])

    # Make prediction
    prediction = model.predict(input_df)

    # Convert prediction to label
    def convert_int_category(pred):
        mapping = {0: "negative", 1: "positive"}
        return mapping.get(pred, "unknown")

    result = convert_int_category(prediction[0])

    # Output result
    print(json.dumps({"prediction": result}))

except Exception as e:
    print(json.dumps({"error": f"Processing error: {str(e)}"}))
    sys.exit(1)
