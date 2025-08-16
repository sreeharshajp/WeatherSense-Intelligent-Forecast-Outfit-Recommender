# WeatherSense - Intelligent Forecast & Outfit Recommender

An intelligent weather application that provides real-time weather data and AI-powered clothing recommendations based on current weather conditions.

## 🌟 Features

- **Real-time Weather Data**: Get current weather information for any city worldwide
- **5-Day Forecast**: View detailed weather forecasts for the next 5 days
- **AI Clothing Recommendations**: Get intelligent outfit suggestions based on temperature and weather conditions
- **Air Quality Index**: Monitor air pollution levels in your area
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Live Demo

**GitHub Pages (Frontend)**: [https://sreeharshajp.github.io/WeatherSense-Intelligent-Forecast-Outfit-Recommender/launcher.html](https://sreeharshajp.github.io/WeatherSense-Intelligent-Forecast-Outfit-Recommender/launcher.html)

**Backend API**: [https://weathersense-api-v2.onrender.com](https://weathersense-api-v2.onrender.com)

## 📱 How to Use

1. **Visit the Launcher Page**: Go to the GitHub Pages link above
2. **Check Frontend**: Click "Check Frontend" to verify the app is ready
3. **Wake Up Backend**: Click "Wake Up Backend" to start the API server (may take 30-60 seconds)
4. **Launch App**: Once both systems are ready, click "Launch WeatherSense App"
5. **Search for Weather**: Enter any city name and get weather data with clothing recommendations

## 🛠️ Technology Stack

### Frontend
- **HTML5/CSS3**: Modern responsive design
- **JavaScript (ES6+)**: Asynchronous API calls and DOM manipulation
- **Bootstrap 5**: UI components and responsive layout
- **jQuery**: DOM manipulation and AJAX requests
- **Font Awesome**: Icons and visual elements

### Backend
- **Python 3.11**: Core programming language
- **Flask**: Web framework for REST API
- **Flask-CORS**: Cross-origin resource sharing
- **Gunicorn**: WSGI HTTP server for production

### APIs Used
- **OpenWeatherMap API**: Weather data and forecasts
- **OpenWeatherMap Air Pollution API**: Air quality information

### Deployment
- **GitHub Pages**: Frontend hosting
- **Render.com**: Backend API hosting with Docker
- **Docker**: Containerized backend deployment

## 🏗️ Project Structure

```
├── launcher.html          # Landing page with system status checks
├── index.html            # Main weather application
├── index.css             # Stylesheet for the main app
├── index.js              # Frontend JavaScript logic
├── backend/
│   ├── app.py           # Flask backend API
│   └── requirements.txt # Python dependencies
├── Dockerfile           # Docker configuration for backend
├── render.yaml          # Render.com deployment config
└── assets/              # Images and icons
```

## 🔧 Setup Instructions

### Prerequisites
- Python 3.11+
- Git
- OpenWeatherMap API key

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sreeharshajp/WeatherSense-Intelligent-Forecast-Outfit-Recommender.git
   cd WeatherSense-Intelligent-Forecast-Outfit-Recommender
   ```

2. **Set up the backend**:
   ```bash
   cd backend
   pip install -r requirements.txt
   python app.py
   ```

3. **Update API configuration**:
   - Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)
   - Replace the API key in `index.js` line 10

4. **Run the frontend**:
   - Open `index.html` in a web browser
   - Or use a local server: `python -m http.server 8000`

### GitHub Pages Deployment

1. **Fork/Clone this repository**
2. **Go to repository Settings → Pages**
3. **Set source to "Deploy from a branch"**
4. **Select "main" branch and "/ (root)" folder**
5. **Your app will be available at**: `https://yourusername.github.io/WeatherSense-Intelligent-Forecast-Outfit-Recommender/launcher.html`

### Backend Deployment (Render.com)

1. **Connect your GitHub repository to Render.com**
2. **Create a new Web Service**
3. **Use the included Dockerfile for deployment**
4. **Update the backend URL in `index.js` and `launcher.html`**

## 🎯 Key Features Explained

### Intelligent Clothing Recommendations
The AI recommendation system considers:
- **Temperature ranges**: From extreme cold to extreme heat
- **Weather conditions**: Rain, snow, fog, wind, clear skies
- **Regional preferences**: Optimized for various climate zones
- **Activity suitability**: Recommendations for different activities

### Weather Metrics
- **Temperature**: Current, feels-like, min/max
- **Wind**: Speed, direction, gusts
- **Visibility**: Fog and mist conditions
- **Air Quality**: NO2, O3, CO, SO2 levels

## 🔗 API Endpoints

### Backend API (`https://weathersense-api-v2.onrender.com`)

- `GET /health` - Health check endpoint
- `POST /recommend` - Get clothing recommendations
  ```json
  {
    "temperature": 25,
    "weather_description": "clear sky"
  }
  ```

## 📊 Performance Optimizations

- **CDN Integration**: Bootstrap and jQuery loaded from CDN
- **Asynchronous Loading**: Non-blocking API calls
- **Error Handling**: Graceful degradation for API failures
- **Responsive Design**: Optimized for all screen sizes
- **Production Ready**: Dockerized backend with Gunicorn

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenWeatherMap**: For providing comprehensive weather APIs
- **Render.com**: For reliable backend hosting
- **GitHub Pages**: For frontend hosting
- **Bootstrap Team**: For the responsive UI framework

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the browser console for error messages
- Ensure your API keys are valid and properly configured

---

**Made with ❤️ by [Sreeharsha JP](https://github.com/sreeharshajp)**

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
