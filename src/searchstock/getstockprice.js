import axios from "axios"
import { config } from "../config/config";

async function getstockprice(symbol , duration){

    const searchurl = `https://api.iex.cloud/v1/stock/${symbol}/chart/${duration}?token=${config.cloudiextoken}`
    const options = {
        method: 'GET',
        url: searchurl,
      };
      try {
        // const cachedData = localStorage.getItem(`${exercisename}data`);
        // if (cachedData) {
        //   //console.log(cachedData)
        //   return JSON.parse(cachedData);
        // } else {
        //     console.log("requesting....")

        const response = await axios.request(options);
        //console.log(response.data)
        return response.data;

  
          
        //}
      } catch (error) {
        console.log("Error fetching stockpricedata:", error);
      }
}

export default getstockprice;