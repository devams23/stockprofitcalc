export function setstockdata(result ,stocks){

    const buyingPrice = result[0].close;
    
    const resultWithProfit = result.slice(1).map(item => {
    const profit = Math.round((item.close - buyingPrice)*stocks);
    
    return { date:item.priceDate, profit };
    });
    //console.log(resultWithProfit)
    return resultWithProfit;

}