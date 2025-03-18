# liver_predict.py

import sys
import numpy as np
import pandas as pd
import joblib
import json

# Optional: Print version info for debugging
print("Python version:", sys.version)
print("Python executable path:", sys.executable)

# Load pipeline and model
with open('./aimodels/liver_pipeline.pkl', 'rb') as pipeline_file:
    pipeline = joblib.load(pipeline_file)

with open('./aimodels/liver.pkl', 'rb') as model_file:
    model = joblib.load(model_file)

# Load input JSON from command line argument
# input: '{"Age": 65, "Gender": "Female", "TB": 0.7, "DB": 0.1, "Alkphos": 187, "Sgpt": 16, "Sgot": 18, "TP": 6.8, "ALB": 3.3, "A/G Ratio": 0.9}'
input_data = json.loads(sys.argv[1])
input_df = pd.DataFrame([input_data])  # convert dict to DataFrame

# Preprocess the input
transformed_data = pipeline.transform(input_df)

# Predict
prediction = model.predict(transformed_data)

# Output prediction in JSON format
print(json.dumps(prediction.tolist()))



