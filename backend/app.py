from flask import Flask, request, jsonify
from clothing_model_simple import get_clothing_recommendation
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "WeatherSense Clothing Recommendation API is running!"

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        data = request.get_json()
        temperature = data.get('temperature')
        weather_description = data.get('weather_description')
        
        if temperature is None or weather_description is None:
            return jsonify({'error': 'Missing temperature or weather_description'}), 400
            
        recommendation = get_clothing_recommendation(temperature, weather_description)
        
        return jsonify({'recommendation': recommendation})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
