import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
import joblib
import numpy as np

def train_model():
    # Comprehensive data: weather conditions and corresponding clothing recommendations
    # Temperature ranges from very cold to very hot with detailed clothing suggestions
    temperatures = []
    weather_conditions = []
    clothing_recommendations = []
    
    # Clear/Sunny weather conditions
    clear_data = [
        (0, 'Heavy winter jacket, woolen sweater, thermal wear, warm pants, and gloves'),
        (5, 'Winter jacket, sweater, long pants, closed shoes, and scarf'),
        (10, 'Light jacket or hoodie, full-sleeve shirt, jeans or track pants, and sneakers'),
        (15, 'Windcheater or light jacket, full-sleeve shirt, comfortable pants, and casual shoes'),
        (18, 'Full-sleeve shirt or light sweater, track pants or jeans, and comfortable shoes'),
        (22, 'Comfortable cotton shirt, jeans or chinos, and casual footwear'),
        (25, 'Light cotton t-shirt, comfortable pants or shorts, and breathable shoes'),
        (28, 'Breathable cotton t-shirt, shorts or light pants, sandals, and sunglasses'),
        (32, 'Light, breathable cotton clothes, shorts, hat, sunglasses, and stay hydrated'),
        (35, 'Very light, loose cotton clothes, shorts, hat, sunglasses, and frequent water breaks'),
        (38, 'Minimal light cotton clothing, shorts, wide-brim hat, sunglasses, avoid direct sun'),
        (42, 'Ultra-light breathable fabrics, shorts, hat, sunglasses, stay indoors if possible')
    ]
    
    # Rainy weather conditions  
    rain_data = [
        (5, 'Waterproof jacket, warm clothes underneath, rain boots, umbrella, and waterproof bag'),
        (10, 'Raincoat, light sweater, waterproof pants, umbrella, and rain boots'),
        (15, 'Light raincoat, full-sleeve shirt, umbrella, waterproof shoes, and quick-dry pants'),
        (18, 'Light rain jacket, breathable shirt, umbrella, waterproof footwear, and light layers'),
        (22, 'Light waterproof layer, cotton shirt, umbrella, water-resistant shoes, and quick-dry bottoms'),
        (25, 'Light rain protection, breathable t-shirt, umbrella, quick-dry pants, and waterproof sandals'),
        (28, 'Minimal rain gear, light clothes, umbrella, quick-dry shorts, and waterproof slippers'),
        (32, 'Light rain protection, breathable cotton, umbrella, quick-dry clothes, and stay cool'),
        (35, 'Minimal waterproof layer, very light clothes, umbrella, and hydration priority')
    ]
    
    # Cloudy/Overcast conditions
    cloudy_data = [
        (10, 'Light jacket, comfortable shirt, long pants, and closed shoes'),
        (15, 'Light sweater or windcheater, comfortable pants, and casual footwear'),
        (18, 'Full-sleeve shirt, track pants or jeans, and comfortable shoes'),
        (22, 'Cotton shirt, comfortable pants, and casual footwear'),
        (25, 'Light t-shirt, jeans or chinos, and breathable shoes'),
        (28, 'Breathable cotton t-shirt, comfortable bottoms, and light footwear'),
        (32, 'Light cotton clothes, shorts or light pants, and sandals'),
        (35, 'Very light cotton, shorts, hat for sun protection, and stay hydrated')
    ]
    
    # Windy conditions
    windy_data = [
        (10, 'Windproof jacket, warm layers, long pants, closed shoes, and secure accessories'),
        (15, 'Windbreaker, full-sleeve shirt, track pants, and avoid loose clothing'),
        (18, 'Light windbreaker, comfortable shirt, long pants, and secure footwear'),
        (22, 'Light layer to block wind, cotton shirt, pants, and minimal loose accessories'),
        (25, 'Light windproof layer, t-shirt, comfortable bottoms, and secure hat if needed'),
        (28, 'Minimal wind protection, breathable clothes, and avoid loose items'),
        (32, 'Light wind protection, cotton clothes, and stay protected from dust')
    ]
    
    # Humid conditions (common in India)
    humid_data = [
        (22, 'Moisture-wicking cotton shirt, breathable pants, and ventilated footwear'),
        (25, 'Light, breathable cotton t-shirt, shorts or light pants, and open sandals'),
        (28, 'Ultra-breathable cotton, loose-fitting clothes, shorts, and frequent water intake'),
        (32, 'Very light cotton, loose shorts, breathable footwear, stay in shade, and hydrate often'),
        (35, 'Minimal light cotton, shorts, open sandals, frequent hydration, and avoid outdoor activities'),
        (38, 'Ultra-light breathable fabrics, minimal clothing, stay indoors, and constant hydration')
    ]
    
    # Foggy/Misty conditions
    foggy_data = [
        (5, 'Warm jacket, layers for warmth, long pants, closed shoes, and be cautious of visibility'),
        (10, 'Light jacket, comfortable layers, long pants, and extra caution while moving'),
        (15, 'Light sweater, comfortable clothing, and be mindful of reduced visibility'),
        (18, 'Full-sleeve shirt, comfortable pants, and take care in low visibility'),
        (22, 'Light layers, comfortable clothing, and drive/walk carefully')
    ]
    
    # Thunderstorm conditions
    storm_data = [
        (15, 'Waterproof jacket, avoid metal accessories, stay indoors, umbrella not recommended'),
        (20, 'Rain protection, avoid open areas, waterproof clothes, and seek indoor shelter'),
        (25, 'Light rain gear, avoid tall objects, stay indoors, and avoid umbrellas in lightning'),
        (30, 'Minimal rain protection, prioritize safety, stay indoors, and avoid electrical items')
    ]
    
    # Compile all data
    for temp, clothing in clear_data:
        temperatures.append(temp)
        weather_conditions.append('clear')
        clothing_recommendations.append(clothing)
    
    for temp, clothing in rain_data:
        temperatures.append(temp)
        weather_conditions.append('rain')
        clothing_recommendations.append(clothing)
    
    for temp, clothing in cloudy_data:
        temperatures.append(temp)
        weather_conditions.append('clouds')
        clothing_recommendations.append(clothing)
    
    for temp, clothing in windy_data:
        temperatures.append(temp)
        weather_conditions.append('wind')
        clothing_recommendations.append(clothing)
    
    for temp, clothing in humid_data:
        temperatures.append(temp)
        weather_conditions.append('humid')
        clothing_recommendations.append(clothing)
    
    for temp, clothing in foggy_data:
        temperatures.append(temp)
        weather_conditions.append('fog')
        clothing_recommendations.append(clothing)
    
    for temp, clothing in storm_data:
        temperatures.append(temp)
        weather_conditions.append('storm')
        clothing_recommendations.append(clothing)
    
    data = {
        'temperature': temperatures,
        'weather': weather_conditions,
        'clothing': clothing_recommendations
    }
    df = pd.DataFrame(data)

    # Convert categorical variables to numerical
    df['weather'] = df['weather'].astype('category').cat.codes

    X = df[['temperature', 'weather']]
    y = df['clothing']

    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Create and train the decision tree classifier
    model = DecisionTreeClassifier(random_state=42, max_depth=10)
    model.fit(X_train, y_train)

    # Save the trained model
    joblib.dump(model, 'clothing_model.pkl')
    
    return model

def get_clothing_recommendation(temperature, weather_description):
    # Always retrain the model to ensure fresh data
    model = train_model()

    # Map weather descriptions to our categories with better logic
    weather_code = 0  # Default to 'clear'
    weather_desc_lower = weather_description.lower()
    
    # Check for rain first (most specific) - this should override everything else
    if any(word in weather_desc_lower for word in ['rain', 'drizzle', 'shower', 'precipitation', 'light rain', 'heavy rain', 'moderate rain']):
        weather_code = 1  # rain
        print(f"DEBUG: Weather '{weather_description}' mapped to RAIN (code: {weather_code})")
        
        # For rain conditions, provide specific rain recommendations based on temperature
        if temperature <= 10:
            return "Raincoat, light sweater, waterproof pants, umbrella, and rain boots"
        elif temperature <= 18:
            return "Light rain jacket, breathable shirt, umbrella, waterproof footwear, and light layers"
        elif temperature <= 25:
            return "Light waterproof layer, cotton shirt, umbrella, water-resistant shoes, and quick-dry bottoms"
        elif temperature <= 30:
            return "Light rain protection, breathable t-shirt, umbrella, quick-dry pants, and waterproof sandals"
        else:
            return "Minimal rain gear, light breathable clothes, umbrella, quick-dry shorts, and stay cool"
            
    elif any(word in weather_desc_lower for word in ['storm', 'thunder', 'lightning']):
        weather_code = 6  # storm
        print(f"DEBUG: Weather '{weather_description}' mapped to STORM (code: {weather_code})")
        # For storms, provide direct recommendations
        if temperature <= 20:
            return "Rain protection, avoid open areas, waterproof clothes, seek indoor shelter, no umbrella due to lightning"
        else:
            return "Light rain gear, avoid tall objects, stay indoors, avoid umbrellas in lightning, prioritize safety"
            
    elif any(word in weather_desc_lower for word in ['fog', 'mist', 'haze', 'misty']):
        weather_code = 5  # fog
        print(f"DEBUG: Weather '{weather_description}' mapped to FOG (code: {weather_code})")
    elif any(word in weather_desc_lower for word in ['wind', 'breeze', 'breezy', 'gusty']):
        weather_code = 3  # wind
        print(f"DEBUG: Weather '{weather_description}' mapped to WIND (code: {weather_code})")
    elif any(word in weather_desc_lower for word in ['cloud', 'overcast', 'partly cloudy', 'cloudy']):
        weather_code = 2  # clouds
        print(f"DEBUG: Weather '{weather_description}' mapped to CLOUDS (code: {weather_code})")
    elif any(word in weather_desc_lower for word in ['humid', 'muggy', 'sticky']):
        weather_code = 4  # humid
        print(f"DEBUG: Weather '{weather_description}' mapped to HUMID (code: {weather_code})")
    elif any(word in weather_desc_lower for word in ['clear', 'sunny', 'sun', 'bright']):
        weather_code = 0  # clear
        print(f"DEBUG: Weather '{weather_description}' mapped to CLEAR (code: {weather_code})")
    else:
        print(f"DEBUG: Weather '{weather_description}' defaulted to CLEAR (code: {weather_code})")
    
    # For non-rain conditions, use the model prediction
    recommendation = model.predict([[temperature, weather_code]])
    print(f"DEBUG: Final recommendation: {recommendation[0]}")
    return recommendation[0]

if __name__ == '__main__':
    # Example usage
    train_model()
    temp = 12
    weather = 'light rain'
    print(f"Recommendation for {temp}°C and {weather}: {get_clothing_recommendation(temp, weather)}")

    temp = 28
    weather = 'sunny'
    print(f"Recommendation for {temp}°C and {weather}: {get_clothing_recommendation(temp, weather)}")
