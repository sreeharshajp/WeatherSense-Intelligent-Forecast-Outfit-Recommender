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

        
        // For Time stamps conversion - now uses city's local timezone
        function dateFormat(unixTimestamp, timezoneOffset) {
            const date = new Date((unixTimestamp + timezoneOffset) * 1000);
            return date.toISOString().slice(0, 19).replace('T', ' ');
        }

        // Get timezone offset from API (in seconds)
        let timezoneOffset = formattedData.timezone;
        
        let properDate = dateFormat(formattedData.dt, timezoneOffset);
        let [date, time] = properDate.split(' ');

        $("#date").text(new Date(date).toLocaleDateString());
        $("#time").text(time);

        let sunriseTime = dateFormat(formattedData.sys.sunrise, timezoneOffset).split(' ')[1];
        let sunsetTime = dateFormat(formattedData.sys.sunset, timezoneOffset).split(' ')[1];

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
        const wind = data.list[0].wind || {};
        const main = data.list[0].main || {};

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
            if (h6s.length >= 2) {
                h6s[1].textContent = ''; // Clear value
            }
        });

        // Update Wind Speed (with fallback)
        let metricBox1 = metrics[0].querySelector('div');
        if (metricBox1) {
            let h6s1 = metricBox1.querySelectorAll('h6');
            if (h6s1.length >= 2) {
                h6s1[0].textContent = 'Wind Speed';
                h6s1[1].textContent = wind.speed ? `${wind.speed} m/s` : 'N/A';
            }
        }

        // Update Humidity (more useful than wind direction)
        let metricBox2 = metrics[1].querySelector('div');
        if (metricBox2) {
            let h6s2 = metricBox2.querySelectorAll('h6');
            if (h6s2.length >= 2) {
                h6s2[0].textContent = 'Humidity';
                h6s2[1].textContent = main.humidity ? `${main.humidity}%` : 'N/A';
            }
        }

        // Update Feels Like Temperature
        let metricBox3 = metrics[2].querySelector('div');
        if (metricBox3) {
            let h6s3 = metricBox3.querySelectorAll('h6');
            if (h6s3.length >= 2) {
                h6s3[0].textContent = 'Feels Like';
                h6s3[1].textContent = main.feels_like ? `${main.feels_like.toFixed(1)}°C` : 'N/A';
            }
        }

        // Update Visibility
        let metricBox4 = metrics[3].querySelector('div');
        if (metricBox4) {
            let h6s4 = metricBox4.querySelectorAll('h6');
            if (h6s4.length >= 2) {
                h6s4[0].textContent = 'Visibility';
                h6s4[1].textContent = data.list[0].visibility ? `${(data.list[0].visibility / 1000).toFixed(1)} km` : 'N/A';
            }
        }

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
        
        if (formattedData.list && formattedData.list[0] && formattedData.list[0].components) {
            let list = formattedData.list[0].components;

            $("#no2Value").text(list.no2 ? list.no2.toFixed(2) : 'N/A');
            $("#o3Value").text(list.o3 ? list.o3.toFixed(2) : 'N/A');
            $("#coValue").text(list.co ? list.co.toFixed(2) : 'N/A');
            $("#so2Value").text(list.so2 ? list.so2.toFixed(2) : 'N/A');
        } else {
            // Set all to N/A if data is not available
            $("#no2Value").text('N/A');
            $("#o3Value").text('N/A');
            $("#coValue").text('N/A');
            $("#so2Value").text('N/A');
        }
    } catch (error) {
        console.error("Error fetching AQI data: ", error);
        // Set fallback values instead of showing alert
        $("#no2Value").text('N/A');
        $("#o3Value").text('N/A');
        $("#coValue").text('N/A');
        $("#so2Value").text('N/A');
    }
}


// Right Row 3 Todays Temperatures
async function todayTemps(lat, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=832c05c13ec70f0f3f55c83726af3247&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch hourly temperatures");
        const data = await response.json();

        // Get timezone offset for the city
        const timezoneOffset = data.city.timezone;
        
        // Get current date in UTC and adjust for city timezone
        const now = new Date();
        const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
        const cityTime = new Date(utcTime + (timezoneOffset * 1000));
        const todayDate = cityTime.toISOString().split("T")[0];
        
        // Filter forecasts for today in the city's timezone
        let todayForecasts = data.list.filter(item => {
            const forecastDate = new Date(item.dt * 1000 + timezoneOffset * 1000).toISOString().split("T")[0];
            return forecastDate === todayDate;
        });
        
        // If no forecasts for today, take the first few available
        if (todayForecasts.length === 0) {
            todayForecasts = data.list.slice(0, 6);
        } else {
            todayForecasts = todayForecasts.slice(0, 6);
        }

        let todayHtml = "";
        todayForecasts.forEach(item => {
            // Convert time to city's local time
            const forecastTime = new Date(item.dt * 1000 + timezoneOffset * 1000);
            let time = forecastTime.toISOString().substr(11, 5); // HH:MM format
            
            let temp = item.main ? item.main.temp.toFixed(1) : 'N/A';
            let icon = item.weather && item.weather[0] ? item.weather[0].icon : '01d';

            todayHtml += `
                <div class="todayTemp text-center">
                    <h6 class="m-0">${time}</h6>
                    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="icon" width="35px">
                    <h5>${temp}&deg;C</h5>
                </div>
            `;
        });

        const container = document.getElementById("todayTempContainer");
        if (container) {
            container.innerHTML = todayHtml;
        }

    } catch (error) {
        console.error(error);
        // Don't show alert for today temps as it's not critical
        const container = document.getElementById("todayTempContainer");
        if (container) {
            container.innerHTML = '<div class="text-center text-muted">Hourly data unavailable</div>';
        }
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
