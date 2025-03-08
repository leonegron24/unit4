import { AppState } from "../AppState.js";
import { Gift, SandboxGift } from "../models/Gift.js";

// @ts-ignore
export const giphyApi = axios.create({
    baseURL: 'http://api.giphy.com/v1/gifs',
    timeout: 8000,
    params: {
        api_key: '7DT4uJsqeSABsutvsA5KOFfrlseZXYr9',
        rating: 'pg',
        limit: 50,
    }
});

class GiphyService{

    async search(query){
        console.log('servicing search query...')
        const response = await giphyApi.get('search', {
            params: {
                q: query
            }
        });
        console.log('search response data', response.data)
        const gifResults = response.data.data.map(gif => new SandboxGift(gif))
        AppState.sandboxGift = gifResults
        
    }

}

export const giphyService = new GiphyService()