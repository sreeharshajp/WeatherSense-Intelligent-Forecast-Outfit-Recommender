async function fetchData() {
    try {
        let cityName = $(".inputfield")[0].value.trim();
        if (!cityName) {
            alert("Please enter a city name.");
            return;
        }

        // here we have usen String formats (``) escape under key. and use the $(keyvalue) to update accordingly for each city.
        let requestData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=832c05c13ec70f0f3f55c83726af3247&units=metric`);
        let formattedData = await requestData.json();

        if (formattedData.cod !== 200) {
            alert("City not found. Please enter a valid city name.");
            return;
        }

        // City name and all those leftrow 1
        let responsecityName = formattedData.name;
        let responseTemp = formattedData.main.temp;
        let responseskyDesciprtion = formattedData.weather[0].description;

        $('#cityName').text(responsecityName);
        $('#cityTemp').text(`${responseTemp} °C`);
        $('#skyDescription').text(responseskyDesciprtion);

        
        // For Time stamos conversion this functio usefull.
        function dateFormat(unixTimestamp) {
            const date = new Date(unixTimestamp * 1000);
            return date.toLocaleString();
        }

        let properDate = dateFormat(formattedData.dt);
        let [date, time] = properDate.split(', ');

        $("#date").text(date);
        $("#time").text(time);

        let sunriseTime = dateFormat(formattedData.sys.sunrise).split(', ')[1];
        let sunsetTime = dateFormat(formattedData.sys.sunset).split(', ')[1];

        $("#sunriseTime").text(sunriseTime);
        $("#sunsetTime").text(sunsetTime);

        let lat = formattedData.coord.lat;
        let lon = formattedData.coord.lon;

        fetchAQIData(lat, lon);
        nextFiveDays(lat, lon);
        todayTemps(lat, lon);
        fetchMetrics(lat, lon);
        fetchClothingRecommendation(responseTemp, responseskyDesciprtion);

    } catch (error) {
        console.error("Error fetching weather data: ", error);
        alert("Something went wrong while fetching data.");
    }
}


//Left Row 2 5 days Temperatures
async function nextFiveDays(lat, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=832c05c13ec70f0f3f55c83726af3247&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch forecast data");
        const data = await response.json();

        let dailyForecasts = {};
        data.list.forEach(item => {
            let date = item.dt_txt.split(" ")[0];
            if (!dailyForecasts[date]) {
                dailyForecasts[date] = {
                    temp: item.main.temp.toFixed(1),
                    icon: item.weather[0].icon,
                    day: new Date(date).toLocaleDateString('en-US', { weekday: 'long' })
                };
            }
        });

        let forecastHtml = "";
        Object.keys(dailyForecasts).slice(0, 5).forEach(date => {
            let forecast = dailyForecasts[date];
            forecastHtml += `
                <div class="forecastRow d-flex align-items-center justify-content-between">
                    <div class="d-flex gap-1 align-items-center">
                        <img src="https://openweathermap.org/img/wn/${forecast.icon}.png" alt="Weather icon" width="35px">
                        <h6 class="m-0">${forecast.temp} &deg;C</h6>
                    </div>
                    <h6 class="m-0">${forecast.day}</h6>
                    <h6 class="m-0">${date}</h6>
                </div>
            `;
        });

        // This will update the content in the #forecastContainer div
        document.getElementById('forecastContainer').querySelector('.d-flex').innerHTML = forecastHtml;

    } catch (error) {
        console.error(error);
        alert("Failed to retrieve forecast. Please check your API key or try again.");
    }
}


// Metrics one  Right Row 1
async function fetchMetrics(lat, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=832c05c13ec70f0f3f55c83726af3247&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch weather metrics");
        const data = await response.json();

        // Get wind data from the first forecast entry
        const wind = data.list[0].wind;

        // Selecting all extrametric containers
        const metrics = document.querySelectorAll('.extrametric');

        // Ensure there are 4 extrametric boxes
        if (metrics.length < 4) {
            console.warn("Not enough .extrametric boxes found.");
            return;
        }

        // Clear previous metric values before updating new ones
        metrics.forEach((metricBox) => {
            const h6s = metricBox.querySelectorAll('h6');
            h6s[1].textContent = ''; // Clear value
        });

        // Update Wind Speed
        let metricBox1 = metrics[0].querySelector('div');
        metricBox1.querySelectorAll('h6')[0].textContent = 'Wind Speed';
        metricBox1.querySelectorAll('h6')[1].textContent = `${wind.speed} m/s`;

        // Update Wind Direction
        let metricBox2 = metrics[1].querySelector('div');
        metricBox2.querySelectorAll('h6')[0].textContent = 'Wind Direction';
        metricBox2.querySelectorAll('h6')[1].textContent = `${wind.deg}°`;

        // Update Wind Gust
        let metricBox3 = metrics[2].querySelector('div');
        metricBox3.querySelectorAll('h6')[0].textContent = 'Wind Gust';
        metricBox3.querySelectorAll('h6')[1].textContent = wind.gust ? `${wind.gust} m/s` : 'N/A';

        // Update Forecast Time
        let metricBox4 = metrics[3].querySelector('div');
        metricBox4.querySelectorAll('h6')[0].textContent = 'Forecast Date &Time';
        metricBox4.querySelectorAll('h6')[1].textContent = data.list[0].dt_txt;

    } catch (error) {
        console.error(error);
        alert("Failed to retrieve weather metrics.");
    }
}


// AQI section part Right Row 2 
async function fetchAQIData(lat, lon) {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=832c05c13ec70f0f3f55c83726af3247`);
        let formattedData = await response.json();
        let list = formattedData.list[0].components;

        $("#no2Value").text(list.no2);
        $("#o3Value").text(list.o3);
        $("#coValue").text(list.co);
        $("#so2Value").text(list.so2);
    } catch (error) {
        console.error("Error fetching AQI data: ", error);
        alert("Failed to load AQI data.");
    }
}


// Right Row 3 Todays Temperatures
async function todayTemps(lat, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=832c05c13ec70f0f3f55c83726af3247&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch hourly temperatures");
        const data = await response.json();

        let todayDate = new Date().toISOString().split("T")[0];
        let todayForecasts = data.list.filter(item => item.dt_txt.startsWith(todayDate));
        let selectedHours = todayForecasts.slice(0, 6);

        let todayHtml = "";
        selectedHours.forEach(item => {
            let time = new Date(item.dt_txt).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
            let temp = item.main.temp.toFixed(1);
            let icon = item.weather[0].icon;

            todayHtml += `
                <div class="todayTemp text-center">
                    <h6 class="m-0">${time}</h6>
                    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="icon" width="35px">
                    <h5>${temp}&deg;C</h5>
                </div>
            `;
        });

        document.getElementById("todayTempContainer").innerHTML = todayHtml;

    } catch (error) {
        console.error(error);
        alert("Failed to retrieve today's temperatures.");
    }
}


// New function to fetch clothing recommendations
async function fetchClothingRecommendation(temperature, weather_description) {
    try {
        // Use new production URL for Render deployment
        const backendUrl = 'https://weathersense-api-v2.onrender.com';
        
        console.log('Sending request to backend:', {
            url: `${backendUrl}/recommend`,
            temperature: temperature,
            weather_description: weather_description
        });
        
        const response = await fetch(`${backendUrl}/recommend`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                temperature: temperature,
                weather_description: weather_description,
            }),
        });

        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            throw new Error(`Network response was not ok: ${response.status}`);
        }

        const data = await response.json();
        console.log('Received data:', data);
        $('.clothrecom').text(`Recommended Clothes: ${data.recommendation}`);
    } catch (error) {
        console.error('Error fetching clothing recommendation:', error);
        $('.clothrecom').text('Recommended Clothes: Could not retrieve recommendation.');
    }
}

// Attach click handler
$(document).ready(function () {
    $(".SearchIcon").on("click", fetchData);
});
