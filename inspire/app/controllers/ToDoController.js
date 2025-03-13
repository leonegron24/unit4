import { AppState } from "../AppState.js";
import { toDoService } from "../services/ToDoService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

export class ToDoController{
    constructor(){
        AppState.on('user', this.getUserInfo)
        AppState.on('account', this.fetchImages)
        AppState.on('images', this.drawImages)
        AppState.on('account', this.fetchWeather)
        AppState.on('icon', this.drawWeather)
    }
// SECTION Images
    async fetchImages(){
        try {
            console.log('fetching images....')
            await toDoService.fetchImages()
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
            await toDoService.fetchWeather()
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
                <div type=button id="toggleWeather" class='button rounded-pill' onclick="app.ToDoController.toggleWeather()">${AppState.Celcius} °C</div>
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
        <img class='profile-picture' src="${AppState.user.picture}" alt="">
        `
        setHTML('user-picture', userPicture)
    }

}