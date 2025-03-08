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

    
    async createGift(formData){
        console.log('servicing gift creation!')
        const response = await api.post('api/gifts', formData)
        console.log('form response data', response.data)
        AppState.gifts.unshift(new Gift(response.data))
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

    async deleteGift(giftId){
        console.log('servicing deleteGift...')
        const gifts = AppState.gifts
        const giftToDelete = gifts.find(g => g.id == giftId)
        if (!giftToDelete){return}
        const response = await api.delete(`api/gifts/${giftId}`)
        console.log('delete gift response data', response.data)
        const indexToRemove = AppState.gifts.indexOf(giftToDelete)
        AppState.gifts.splice(indexToRemove,1)
    }
}
export const giftService = new GiftService()