import { AppState } from "../AppState.js"
import { Gift } from "../models/Gift.js"
import { api } from "./AxiosService.js"

class GiftService{
    async fetchGifts() {
        const response = await api.get('api/gifts')
        console.log('fetch response data', response.data)
        const gifts = response.data.map(gift => new Gift(gift))
        AppState.gifts = gifts
    }

    async openGift(giftId){
        console.log('servicing openGift...')
        const gifts = AppState.gifts
        const giftToOpen = gifts.find(g => g.id == giftId)
        if(!giftToOpen){return}
        giftToOpen.opened = true
        const response = await api.put(`api/gifts/${giftId}`, giftToOpen)
        console.log('open gift response data', response.data)
        const indexToUpdate = AppState.gifts.indexOf(giftToOpen)
        AppState.gifts.splice(indexToUpdate,1,new Gift(response.data))
    }
}
export const giftService = new GiftService()