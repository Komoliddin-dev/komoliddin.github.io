const apiKey = '8982b90822ad56a5a0b21fab19059bd8'; // O'zingizning API kalitingizni kiriting
const getWeatherButton = document.getElementById('getWeather');
const cityInput = document.getElementById('city');
const weatherResult = document.getElementById('weatherResult');

// Ob-havo ma'lumotlarini olish funksiyasi (shahar nomiga asoslangan)
async function fetchWeather(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=ru`);
    if (!response.ok) throw new Error('Shahar topilmadi');
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    weatherResult.innerHTML = error.message;
  }
}

// Ob-havo ma'lumotlarini olish funksiyasi (joylashuvga asoslangan)
async function fetchWeatherByLocation(lat, lon) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=ru`);
    if (!response.ok) throw new Error('Maʼlumot olishda xatolik yuz berdi');
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    weatherResult.innerHTML = error.message;
  }
}

// Natijalarni ekranga chiqarish funksiyasi
function displayWeather(data) {
  weatherResult.innerHTML = `
    <h2>${data.name}</h2>
    <p>Hozirgi harorat: ${data.main.temp}°C</p>
    <p>Ob-havo holati: ${data.weather[0].description}</p>
  `;
}

// Foydalanuvchi joylashuviga asoslangan ob-havo ma'lumotini olish
function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByLocation(latitude, longitude);
      },
      () => {
        weatherResult.innerHTML = `<p>Lokatsiyaga kirish rad etildi.</p>`;
      }
    );
  } else {
    weatherResult.innerHTML = `<p>Geolokatsiya qo'llab-quvvatlanmaydi.</p>`;
  }
}

// Ob-havo ma'lumotlarini olishni boshlash
getWeatherButton.addEventListener("click", () => {
  const city = cityInput.value;
  if (city) {
    fetchWeather(city);
  } else {
    getLocationWeather();
  }
});
