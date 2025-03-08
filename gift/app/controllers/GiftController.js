import { AppState } from "../AppState.js"
import { giftService } from "../services/GiftService.js"
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

    async openGift(giftId){
        console.log('opening gift...')
        try {
            await giftService.openGift(giftId)
        } catch (error) {
            Pop.toast("Could not open Gift", 'error')
            console.error("Error while trying to open a gift", error)
        }
    }
}