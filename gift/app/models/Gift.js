import { AppState } from "../AppState.js"

export class Gift{
    constructor(data){

      this.tag = data.tag
      this.url = data.url
      this.opened = data.opened
      this.creatorId = data.creatorId
      this.profileIdsOpened = data.profileIdsOpened
      this.id = data.id
    }

    get giftCard(){
        return /*html*/ `
        <div class="col-md-4 p-4">
            <div class="shadow bg-light">
              <div class="text-center position-relative">
                <img class="img-fluid p-3" src="${this.url}" alt="">
                ${this.openGiftButton}
              </div>
              <p class="m-0 text-center">${this.tag}</p>
            </div>
          </div>
          `
    }

    get openGiftButton(){
      if (this.opened){
        return ''
      }
      return /*html*/ `
      <button onclick="app.GiftController.openGift('${this.id}')" class='btn btn-danger btn-sm rounded-pill w-25 shadow position-absolute top-0 end-0 m-2'>Open 🎁</button>
      `
    }
}