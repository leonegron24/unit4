import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"

class MiscService{
// SECTION Images
    async fetchImages() {
        console.log('service fetching images...')
        const response = await api.get('api/images')
        console.log('image response.data: ', response.data)
        if (!response.data){return}
        AppState.images = response.data.imgUrls.full
    }

// SECTION Weather
    async fetchWeather() {
        console.log('service fetching weather....')
        const response = await api.get('api/weather')
        console.log('weather response.data: ', response.data)
        if(!response.data){return}
        let temperatureKelvin = response.data.main.temp
        let temperatureCelcius = Math.round(temperatureKelvin - 273.15)
        let temperatureFaren = Math.round((temperatureCelcius * 9)/5 + 32)
        AppState.weatherDescription= response.data.weather[0].main
        AppState.Celcius = temperatureCelcius
        AppState.Faren = temperatureFaren
        AppState.icon = response.data.weather.icon
        console.log(AppState.icon)
    }

// SECTION Quotes
    async fetchQuotes(){
        console.log('service fetching Quotes...')
        const response = await api.get('api/quotes')
        console.log('quote response.data', response.data)
        AppState.quotes = response.data.quote
        AppState.authors = response.data.author
    }
}

export const miscService = new MiscService()