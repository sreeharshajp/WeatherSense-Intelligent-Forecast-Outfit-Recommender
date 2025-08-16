from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

def get_clothing_recommendation(temperature, weather_description):
    """
    Intelligent rule-based clothing recommendation system
    Optimized for Indian weather patterns
    """
    try:
        temp = float(temperature)
        weather = weather_description.lower()
        
        # Rain conditions - prioritize waterproof items
        rain_keywords = ['rain', 'drizzle', 'shower', 'thunderstorm', 'storm', 'precipitation']
        if any(keyword in weather for keyword in rain_keywords):
            if temp >= 28:
                return "☔ Umbrella (essential!), light raincoat, quick-dry cotton t-shirt, water-resistant sandals. Stay dry and cool in warm monsoon weather!"
            elif temp >= 20:
                return "☔ Umbrella (essential!), waterproof jacket, long pants, waterproof shoes. Perfect gear for moderate rainy weather."
            else:
                return "☔ Umbrella (essential!), heavy raincoat, warm layers, waterproof boots, rain gloves. Stay warm and completely dry!"
        
        # Snow and extreme cold conditions
        snow_keywords = ['snow', 'blizzard', 'sleet', 'frost']
        if any(keyword in weather for keyword in snow_keywords):
            return "❄️ Heavy winter coat, thermal undergarments, insulated boots, winter gloves, warm hat, scarf. Essential gear for snowy conditions!"
        
        # Fog and mist conditions
        fog_keywords = ['fog', 'mist', 'haze']
        if any(keyword in weather for keyword in fog_keywords):
            if temp >= 20:
                return "🌫️ Light jacket (visibility gear), long pants, closed shoes, consider bright colors for safety in fog."
            else:
                return "🌫️ Warm jacket with reflective elements, long pants, sturdy shoes, layers for changing fog conditions."
        
        # Wind conditions
        wind_keywords = ['windy', 'gusty', 'breezy']
        if any(keyword in weather for keyword in wind_keywords):
            if temp >= 25:
                return "💨 Fitted t-shirt (avoid loose clothing), comfortable pants, secure shoes, light jacket for wind protection."
            else:
                return "💨 Windproof jacket, fitted clothing, warm layers, sturdy shoes with good grip."
        
        # Temperature-based recommendations with Indian context
        if temp >= 40:
            return "🔥 Ultra-light cotton kurta/t-shirt, loose cotton pants/shorts, breathable sandals, wide-brim hat, sunglasses, carry water. Extreme heat protection!"
        elif temp >= 35:
            return "☀️ Light cotton clothing, shorts or breathable pants, open sandals, hat, sunglasses. Stay cool in intense heat!"
        elif temp >= 30:
            return "🌞 Cotton t-shirt/kurta, light pants or shorts, breathable shoes, sunglasses. Perfect for warm Indian weather!"
        elif temp >= 25:
            return "😊 Comfortable cotton t-shirt, jeans or light pants, sneakers or casual shoes. Ideal weather for outdoor activities!"
        elif temp >= 20:
            return "🌤️ Light sweater or full-sleeve shirt, jeans, comfortable shoes. Pleasant mild weather - perfect for sightseeing!"
        elif temp >= 15:
            return "🧥 Sweater or hoodie, long pants, closed shoes, light jacket for evening. Cool and comfortable weather!"
        elif temp >= 10:
            return "🧣 Warm sweater, long pants, jacket, closed shoes, consider a scarf. Chilly weather - dress warmly!"
        elif temp >= 5:
            return "❄️ Heavy sweater or coat, warm pants, boots, gloves, winter accessories. Cold weather gear needed!"
        elif temp >= 0:
            return "🥶 Heavy winter coat, thermal layers, insulated boots, gloves, warm hat. Very cold conditions!"
        else:
            return "🧊 Multiple heavy layers, thermal undergarments, insulated winter boots, gloves, warm hat, scarf. Extreme cold protection!"
            
    except (ValueError, TypeError):
        return "👕 Dress according to your local weather conditions and personal comfort. Check the temperature and weather description for guidance!"

@app.route('/')
def home():
    return {
        "message": "WeatherSense AI Clothing Recommendation API is running!",
        "status": "online",
        "version": "2.0",
        "features": [
            "Intelligent weather-based clothing recommendations",
            "Indian weather pattern optimization", 
            "Rain, snow, fog, and wind condition handling",
            "Temperature-specific suggestions",
            "Cultural clothing preferences"
        ]
    }

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        data = request.get_json()
        temperature = data.get('temperature')
        weather_description = data.get('weather_description')
        
        if temperature is None or weather_description is None:
            return jsonify({
                'error': 'Missing required parameters',
                'required': ['temperature', 'weather_description'],
                'received': data
            }), 400
            
        recommendation = get_clothing_recommendation(temperature, weather_description)
        
        return jsonify({
            'recommendation': recommendation,
            'temperature': temperature,
            'weather': weather_description,
            'api_version': '2.0'
        })
        
    except Exception as e:
        return jsonify({
            'error': 'Internal server error',
            'message': str(e),
            'fallback_recommendation': 'Dress comfortably according to your local weather conditions.'
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'service': 'WeatherSense AI Backend',
        'timestamp': '2025-08-17'
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
