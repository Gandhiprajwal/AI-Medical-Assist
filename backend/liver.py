
# liver_predict.py

import sys
import numpy as np
import pandas as pd
import joblib
import json
import re  # Import regex module

# Optional: Print version info for debugging
# print("Python version:", sys.version)
# print("Python executable path:", sys.executable)

# Load pipeline and model
with open('./aimodels/liver_pipeline.pkl', 'rb') as pipeline_file:
    pipeline = joblib.load(pipeline_file)

with open('./aimodels/liver.pkl', 'rb') as model_file:
    model = joblib.load(model_file)

# Load input JSON from command line argument
# input: '{"Age": 65, "Gender": "Female", "TB": 0.7, "DB": 0.1, "Alkphos": 187, "Sgpt": 16, "Sgot": 18, "TP": 6.8, "ALB": 3.3, "A/G Ratio": 0.9}'

if len(sys.argv) < 4:
    print("No input JSON provided")
    sys.exit(1)

try:
    # print("Raw input from sys.argv[3]:", sys.argv[3])
    input_data = json.loads(sys.argv[3])
except Exception as e:
    print("Error parsing input JSON:", e)
    sys.exit(1)


input_df = pd.DataFrame([input_data])  # convert dict to DataFrame

# print("liver.py - Input data:\n", input_df)

# print("Input DataFrame before pipeline transform:")
# print(input_df)
# print("Columns:", input_df.columns.tolist())

# Preprocess the input
transformed_data = pipeline.transform(input_df)
# print("liver.py - Transformed data:\n", transformed_data)

# Predict
processed_input = pd.DataFrame(transformed_data, columns=['Gender', 'Age', 'TB', 'DB', 'Alkphos', 'Sgpt', 'Sgot', 'TP', 'ALB', 'A/G Ratio'])

prediction = model.predict(processed_input)
# print("liver.py - Prediction:\n", prediction)
# Extract only the first prediction value
prediction_str = str(prediction)
match = re.search(r'\d+', prediction_str)  # Extract first number
predicted_value = match.group(0) if match else "Unknown"

# Print only the prediction value in JSON format

# Output prediction in JSON format
print(json.dumps(prediction.tolist()))
