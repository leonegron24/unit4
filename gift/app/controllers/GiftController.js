import { AppState } from "../AppState.js"
import { giftService } from "../services/GiftService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

export class GiftController{
    
    constructor(){
        console.log("🎁 🎛️")
        AppState.on('account', this.fetchGifts)
        AppState.on('gifts', this.drawGifts)
    }

    async fetchGifts(){
        try {
            console.log('fetching gifts')
            await giftService.fetchGifts()
        } catch (error) {
            Pop.toast("Could not get Gifts", 'error')
            console.error("Error while trying to fetch gifts", error)
        }
    }

    drawGifts(){
        console.log('✏️ 🎁')
        const gifts = AppState.gifts
        let giftContent = ''
        gifts.forEach(gift => giftContent += gift.giftCard)
        setHTML('gift-card', giftContent)
    }

    
    async createGift(){
        console.log('creating Gift!')
        try {
            if(!event){return}
            event.preventDefault()
            const formElm = event.target
            console.log(formElm)
            const formData = getFormData(formElm)
            await giftService.createGift(formData)
            if(!formElm){return}
            formElm.reset()
        } catch (error) {
            Pop.toast("Could not create Gift", 'error')
            console.error("Error while trying to create a gift")
        }
    }

    async openGift(giftId){
        console.log('opening gift...')
        try {
            await giftService.openGift(giftId)
        } catch (error) {
            Pop.toast("Could not open Gift", 'error')
            console.error("Error while trying to open a gift", error)
        }
    }

    async deleteGift(giftId){
        try {
            const confirm = await Pop.confirm('Are you sure you want to delete this gift?')
            if(!confirm){return}
            await giftService.deleteGift(giftId)
        } catch (error) {
            Pop.toast("Could not delete Gift", 'error')
            console.error("Error while trying to delete a gift")
        }
    }
}