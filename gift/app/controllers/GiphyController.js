import { AppState } from "../AppState.js"
import { SandboxGift } from "../models/Gift.js"
import { giphyService } from "../services/GiphyService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

export class GiphyController{
    constructor(){
        AppState.on('sandboxGift', this.drawGifResults)
    }

    async search(){
        console.log('Beginning search query...')
        try {
            if(!event){return}
            event.preventDefault()
            const formElm = event.target
            const formData = getFormData(formElm)
            console.log('searching for: ', formData.searchGift)
            await giphyService.search(formData.searchGift)
            this.drawResultCount()
        } catch (error) {
            Pop.toast("Could not create Gift", 'error')
            console.error("Error while trying to create a gift")
        }
    }

    drawGifResults(){
        console.log('Drawing search results: ', AppState.sandboxGift)
        const sandboxGifts = AppState.sandboxGift
        let searchContent = ''
        sandboxGifts.forEach(gift => searchContent += gift.giftResultsCard)
        setHTML('searchResults', searchContent)
    }

    drawResultCount() {
        console.log('drawing result Count')
        setHTML('result-count', `Results: ${AppState.sandboxGift.length}`)
      }

    copyURL(thisURL){
        console.log(thisURL)
        navigator.clipboard.writeText(thisURL)
        .then(() => {
            console.log("Copied to clipboard:", thisURL)
            Pop.success('URL Copied to Clipboard!')
        })
        .catch(err => console.error("Failed to Copy", err))

    }
      

}