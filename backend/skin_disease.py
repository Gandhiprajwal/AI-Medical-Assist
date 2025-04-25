import sys
import torch
from PIL import Image
from torchvision import transforms, models
import torch.nn as nn

def preprocess_image(image_path):
    transform = transforms.Compose([
        transforms.Resize((244, 244)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
    ])
    img = Image.open(image_path).convert("RGB")
    img_tensor = transform(img).unsqueeze(0)  # shape: [1, 3, 244, 244]
    return img_tensor

def load_skin_model(model_path, num_classes=4):
    model = models.efficientnet_b4(pretrained=False)
    num_features = model.classifier[1].in_features
    model.classifier = nn.Sequential(
        nn.Dropout(0.3),
        nn.Linear(num_features, num_classes)
    )
    
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.load_state_dict(torch.load(model_path, map_location=device), strict=True)
    model = model.to(device)
    model.eval()
    return model, device

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python predict_skin_disease.py <image_path>")
        sys.exit(1)

    image_path = sys.argv[1]
    model_path = "./aimodels/efficientnet_b4_best.pt"  # Update this path to match your model location
    class_names = ['Chickenpox', 'Measles', 'Monkeypox', 'Normal']
    
    try:
        # Load model
        model, device = load_skin_model(model_path)
        
        # Preprocess the image
        img_tensor = preprocess_image(image_path).to(device)
        
        # Perform prediction
        with torch.no_grad():
            output = model(img_tensor)
            probabilities = torch.softmax(output, dim=1)[0]
            predicted_class = torch.argmax(output, dim=1).item()
        
        # Return the prediction probabilities and class
        print(f"Prediction: {class_names[predicted_class]}")
        print(f"Probabilities: {probabilities.tolist()}")
    except Exception as e:
        print("Error:", e)
        sys.exit(1)