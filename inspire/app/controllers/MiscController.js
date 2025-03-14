import { AppState } from "../AppState.js";
import { miscService } from "../services/MiscService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

export class MiscController{
    constructor(){
        this.showTime()
        setInterval(() => this.showTime(), 60000)
        AppState.on('user', this.getUserInfo)
        AppState.on('account', this.fetchImages, this.fetchWeather)
        AppState.on('images', this.drawImages)
        AppState.on('account', this.fetchWeather)
        AppState.on('icon', this.drawWeather)
        AppState.on('images', this.fetchQuote)
        AppState.on('authors', this.drawQuote)
    }
// SECTION Images
    async fetchImages(){
        try {
            console.log('fetching images....')
            await miscService.fetchImages()
        } catch (error) {
            Pop.error('Could not fetch Images...')
            console.error('Could not fetch Images', 'error')
        }
    }

    drawImages(){
        console.log('drawing image...', AppState.images)
        let imageUrl = AppState.images; 
        // Set the background dynamically
        document.body.style.background = `url('${imageUrl}') center/cover no-repeat`;
        console.log('Drawing image to Render:', imageUrl);
        
    }

// SECTION Weather
    async fetchWeather(){
        try {
            console.log('fetching weather...')
            await miscService.fetchWeather()
        } catch (error) {
            Pop.error("Could not fetch Weather...")
            console.error('Could not fetch weather', 'error')
        }
    }
    
    drawWeather(){
        console.log('drawing weather...')
        console.log('drawing description', AppState.icon)
        let weatherContent = /*html*/ `
        <div class='row border rounded-pill w-75'>
            <div class='col-6 m-0 text-end'>
                <div type=button id="toggleWeather" class='button rounded-pill' onclick="app.MiscController.toggleWeather()">${AppState.Celcius} °C</div>
                <div>${AppState.weatherDescription}</div> 
            </div>
            <div class='col-6 m-0 text-start'><img src="${AppState.icon}" alt=""></div>
        </div>
        `
        setHTML('weather', weatherContent)
    }

    toggleWeather(){
        console.log('toggling weather...')
        const toggleElm = document.getElementById('toggleWeather')
        if(!toggleElm){return}
        if(toggleElm.innerHTML == `${AppState.Celcius} °C`){
            return toggleElm.innerHTML = `${AppState.Faren} °F`
        }
        if(toggleElm.innerHTML == `${AppState.Faren} °F`){
            return toggleElm.innerHTML = `${AppState.Celcius} °C`
        }
    }

// SECTION UserInfo
    getUserInfo(){
        console.log('userinfo', AppState.user)
        if(!AppState.user){return}
        setHTML('user-name', `${AppState.user.nickname}`)
        let userPicture = /*html*/ `
        <img class='profile-picture rounded-circle' src="${AppState.user.picture}" alt="">
        `
        setHTML('user-picture', userPicture)
    }

//  SECTION Time
    showTime(){
        const now = new Date()
        let localTime = now.toLocaleString('en-US', {
            timeZone: 'America/Boise',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })
        let timeHtml =  `<span style="font-size: 3rem; font-weight: bold;">${localTime}</span>`;
        setHTML('time', timeHtml)
    }

// SECTION Quotes
    async fetchQuote(){
        try {
            await miscService.fetchQuotes()
        } catch (error) {
            Pop.error('Unable to Fetch Quotes')
            console.error('Unable to Fetch Quotes', 'error')
        }
    }
    drawQuote(){
        let quote = AppState.quotes
        let author = AppState.authors
        setHTML('quote', quote)
        setHTML('author', author)

    }
}