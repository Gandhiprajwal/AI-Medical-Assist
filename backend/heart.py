# heart_predict.py
import sys
import numpy as np
import joblib
import json

# Step 1: Load the model and scaler
model = joblib.load('./aimodels/heart.pkl')
scaler = joblib.load('./aimodels/heart_scaler.pkl')

# Step 2: Load data from sys.argv and convert it to list of values
data_dict = json.loads(sys.argv[1])  # Expecting JSON string as first argument
data_list = list(data_dict.values())

# Step 3: Identify continuous columns
continuous_cols = ['Age', 'Heart rate', 'Systolic blood pressure', 'Diastolic blood pressure',
                   'Blood sugar', 'CK-MB', 'Troponin']

# Step 4: Prepare numpy array and scale continuous values
data_array = np.array(data_list).reshape(1, -1)

# Split into continuous and categorical (Gender)
# Assuming Gender is always at index 1 based on your order
gender = data_array[0][1]  # Extract gender separately
continuous_indices = [0, 2, 3, 4, 5, 6, 7]
continuous_values = data_array[0][continuous_indices].reshape(1, -1)
scaled_continuous = scaler.transform(continuous_values)

# Step 5: Reconstruct final array with scaled values and gender
# Insert gender value at the correct index (1)
final_input = np.insert(scaled_continuous, 1, gender, axis=1)

# Step 6: Make prediction
prediction = model.predict(final_input)

# Step 7: Convert prediction to label
def convert_int_category(pred):
    mapping = {0: "negative", 1: "positive"}
    return mapping.get(pred)

result = convert_int_category(prediction[0])

# Step 8: Output result
print(json.dumps({"prediction": result}))
