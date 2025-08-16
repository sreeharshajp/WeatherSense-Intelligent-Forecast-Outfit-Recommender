def get_clothing_recommendation(temperature, weather_description):
    """
    Simple rule-based clothing recommendation system
    No machine learning dependencies required
    """
    try:
        temp = float(temperature)
        weather = weather_description.lower()
        
        # Rain conditions - prioritize waterproof items
        rain_keywords = ['rain', 'drizzle', 'shower', 'thunderstorm', 'storm']
        if any(keyword in weather for keyword in rain_keywords):
            if temp >= 25:
                return "Umbrella (essential!), light raincoat, quick-dry t-shirt, water-resistant shoes. Stay dry in warm rain!"
            elif temp >= 15:
                return "Umbrella (essential!), waterproof jacket, long pants, waterproof boots. Perfect for moderate rain."
            else:
                return "Umbrella (essential!), heavy raincoat, warm layers, waterproof boots, rain gloves. Stay warm and dry!"
        
        # Snow conditions
        snow_keywords = ['snow', 'blizzard', 'sleet']
        if any(keyword in weather for keyword in snow_keywords):
            return "Heavy winter coat, thermal layers, warm boots, gloves, winter hat, scarf. Stay warm in the snow!"
        
        # Temperature-based recommendations
        if temp >= 35:
            return "Very light cotton t-shirt, shorts, sandals, hat, sunglasses. Stay cool in extreme heat!"
        elif temp >= 30:
            return "Light cotton t-shirt, shorts or light pants, breathable shoes, sunglasses. Great for hot weather!"
        elif temp >= 25:
            return "Cotton t-shirt, comfortable jeans or light pants, sneakers. Perfect weather for outdoor activities!"
        elif temp >= 20:
            return "Light sweater or long-sleeve shirt, jeans, comfortable shoes. Nice mild weather!"
        elif temp >= 15:
            return "Sweater or hoodie, long pants, closed shoes, light jacket for evening. Cool and comfortable!"
        elif temp >= 10:
            return "Warm sweater, long pants, jacket, closed shoes. A bit chilly, dress warmly!"
        elif temp >= 5:
            return "Heavy sweater or coat, warm pants, boots, gloves. Cold weather gear needed!"
        elif temp >= 0:
            return "Heavy winter coat, thermal layers, warm boots, gloves, winter hat. Very cold!"
        else:
            return "Heavy winter gear, multiple layers, insulated boots, winter gloves, warm hat, scarf. Extremely cold!"
            
    except (ValueError, TypeError):
        return "Dress according to your local weather conditions and comfort level."

# For compatibility with the existing app structure
def train_model():
    """
    Placeholder function - no training needed for rule-based system
    """
    print("Rule-based clothing recommendation system initialized!")
    print("No machine learning training required.")
    return True

if __name__ == "__main__":
    train_model()
    
    # Test the function
    print("\nTesting recommendations:")
    print(f"25°C, clear sky: {get_clothing_recommendation(25, 'clear sky')}")
    print(f"10°C, cloudy: {get_clothing_recommendation(10, 'cloudy')}")
    print(f"20°C, light rain: {get_clothing_recommendation(20, 'light rain')}")
