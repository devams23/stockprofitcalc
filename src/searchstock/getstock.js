import axios from "axios"
import { config } from "../config/config";

async function getstockdata(searchkey){
    // const searchurl = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchkey}&apikey=`
    // const options = {
    //     method: 'GET',
    //     params: {limit: '10'},
    //     url: searchurl,
    //   };
    const searchurl = `https://cloud.iexapis.com/stable/search/${searchkey}/?token=${config.cloudiextoken}`
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
        console.log("Error fetching data:", error);
      }
}

export default getstockdata;