# WeatherSense - Intelligent Forecast & Outfit Recommender

**WeatherSense** is an advanced weather application that combines real-time weather data with intelligent clothing recommendations using machine learning. Get accurate weather forecasts and AI-powered outfit suggestions tailored to current weather conditions.

## 🌟 Features

- **Real-time Weather Data**: Current weather, 5-day forecast, and detailed metrics
- **AI Clothing Recommendations**: Machine learning model suggests appropriate clothing based on weather conditions
- **Modern Glass-morphism UI**: Beautiful, responsive design with smooth animations
- **Comprehensive Weather Metrics**: Temperature, humidity, wind speed, AQI, and more
- **Mobile-First Responsive Design**: Optimized for all device sizes
- **Interactive Icons**: Font Awesome icons with hover animations

## 🚀 Live Demo

- **Frontend**: [https://sreeharshajp.github.io/WeatherSense-Intelligent-Forecast-Outfit-Recommender/](https://sreeharshajp.github.io/WeatherSense-Intelligent-Forecast-Outfit-Recommender/)
- **Backend API**: [https://weathersense-backend.onrender.com](https://weathersense-backend.onrender.com)

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Bootstrap 5.2.3
- jQuery 3.7.1
- Font Awesome 6.4.0
- Glass-morphism design principles

### Backend
- Python 3.11
- Flask web framework
- scikit-learn (Machine Learning)
- pandas (Data processing)
- Flask-CORS (Cross-origin requests)

### APIs & Services
- OpenWeatherMap API
- GitHub Pages (Frontend hosting)
- Render (Backend hosting)

## 🤖 Machine Learning Model

The clothing recommendation system uses a Decision Tree Classifier trained on weather patterns and appropriate clothing choices:

- **Input Features**: Temperature, weather conditions, humidity
- **Training Data**: Comprehensive dataset with Indian weather patterns
- **Output**: Intelligent clothing suggestions including seasonal wear and rain protection
- **Special Logic**: Direct recommendations for rain conditions (umbrellas, raincoats)

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- Git
- Modern web browser

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/sreeharshajp/WeatherSense-Intelligent-Forecast-Outfit-Recommender.git
   cd WeatherSense-Intelligent-Forecast-Outfit-Recommender
   ```

2. **Set up Python environment**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Train the ML model**
   ```bash
   python clothing_model.py
   ```

4. **Start the Flask backend**
   ```bash
   python app.py
   ```

5. **Open the frontend**
   - Open `index.html` in your browser
   - Or use a local server like Live Server extension in VS Code

## 🌐 Deployment

### Frontend (GitHub Pages)
The frontend is automatically deployed to GitHub Pages from the main branch.

### Backend (Render)
The Flask backend is deployed on Render with the following configuration:
- **Build Command**: `cd backend && pip install -r requirements.txt && python clothing_model.py`
- **Start Command**: `cd backend && python app.py`
- **Environment**: Python 3.11

## 📊 API Endpoints

### Backend API
- `GET /` - Health check endpoint
- `POST /recommend` - Get clothing recommendations
  ```json
  {
    "temperature": 25,
    "weather_description": "clear sky"
  }
  ```

### External APIs
- OpenWeatherMap API for weather data
- Geolocation API for location detection

## 🎨 Design Features

- **Glass-morphism Effects**: Modern semi-transparent containers with backdrop blur
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Custom Animations**: Smooth transitions and hover effects
- **Typography**: Clean, readable fonts with proper hierarchy
- **Color Scheme**: Weather-themed gradients and colors

## 🔧 Configuration

### Environment Variables
- `PORT`: Server port (default: 5000)
- `PYTHON_VERSION`: Python version for deployment

### API Keys
- OpenWeatherMap API key is included for demo purposes
- Replace with your own API key for production use

## 📈 Performance

- **Fast Loading**: Optimized assets and minimal dependencies
- **Responsive**: Smooth performance across all device types
- **Efficient API Calls**: Batched weather data requests
- **Error Handling**: Graceful fallbacks for API failures

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sreeharsha JP**
- GitHub: [@sreeharshajp](https://github.com/sreeharshajp)
- LinkedIn: [Sreeharsha JP](https://linkedin.com/in/sreeharshajp)

## 🙏 Acknowledgments

- OpenWeatherMap for weather data API
- Font Awesome for beautiful icons
- Bootstrap for responsive framework
- GitHub Pages and Render for hosting services

---

⭐ **Star this repository if you found it helpful!**
