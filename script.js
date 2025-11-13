// --- CONFIGURACIÓN ---
// Reemplaza YOUR_API_KEY con tu clave de OpenWeatherMap
const API_KEY = '71e0eb69e38d3128e02a5832f2f106f7'; 
// La ciudad que quieres mostrar (ej: Buenos Aires, Madrid, etc.)
// --- CONFIGURACIÓN REVISADA ---
// RECUERDA: Reemplaza 'TU_CLAVE_DE_API_AQUÍ' con tu clave real de OpenWeatherMap

// ID de la ciudad para Monteros, Argentina (ID: 3843803)
const CITY_ID = 3843803; 

// URL base para obtener el clima usando el ID de la ciudad
// Este es el método más fiable para OpenWeatherMap
const API_URL = `https://api.openweathermap.org/data/2.5/weather?id=${CITY_ID}&appid=${API_KEY}&units=metric&lang=es`;

// ... (El resto del código JavaScript sigue igual) ... 

// 1. FUNCIÓN PARA OBTENER LA HORA EN TIEMPO REAL
function updateTime() {
    // Usaremos la zona horaria de Argentina (UTC-3)
    const options = {
        timeZone: 'America/Argentina/Tucuman', 
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // Formato 24 horas
    };

    const timeString = new Date().toLocaleTimeString('es-AR', options);
    
    document.getElementById('current-time').textContent = timeString;
}

// 2. FUNCIÓN PARA OBTENER EL CLIMA DESDE LA API
async function updateWeather() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        // Verificamos si la API devolvió un error
        if (data.cod !== 200) {
            // Muestra el mensaje de error de la API si falla
            document.getElementById('city-name').textContent = `Error API: ${data.message || 'Desconocido'}`; 
            return;
        }

        // Extraemos y mostramos los datos:
        const temp = Math.round(data.main.temp); 
        const description = data.weather[0].description; 

        // Forzamos el nombre de la ciudad a "Monteros"
        document.getElementById('city-name').textContent = 'Monteros, Tucumán'; 
        document.getElementById('temperature').textContent = `${temp}°C`;
        document.getElementById('description').textContent = description.charAt(0).toUpperCase() + description.slice(1); 

    } catch (error) {
        console.error("Error al obtener el clima:", error);
        document.getElementById('city-name').textContent = 'Error de conexión';
    }
}

// 3. INICIALIZACIÓN Y ACTUALIZACIÓN EN TIEMPO REAL
function initCanvas() {
    updateTime();
    setInterval(updateTime, 1000); 

    updateWeather();
    setInterval(updateWeather, 10 * 60 * 1000); 
}

initCanvas();