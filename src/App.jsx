import { useState, useEffect } from "react";
import { SearchBar } from "./components/SearchBar";
import Searchresultslist from "./components/Searchresultlist";
import "./App.css";
import { Stockprovider } from "./contextprovider/stockcontext";
import getstockprice from "./searchstock/getstockprice";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line

} from "recharts";
import { setstockdata } from "./searchstock/setstockdata";

function App() {
  const [results, setresults] = useState([]);
  const [stocks, setstocks] = useState(1);
  const [symbol, setsymbol] = useState("");
  const [stockdata, setStockData] = useState([]); // Store stockdata in state
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getstockprice(symbol , stocks);
        if (result) {
          const newStockData = setstockdata(result, stocks);
          setStockData(newStockData); // Update stockdata state
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    if (symbol.length > 0) {
      fetchData();
    }
  }, [symbol, stocks]);

  const changeresults = (value) => {
    setresults(value);
  };
  const changestocks = (value) => {
    setstocks(value);
  };
  const changesymbol = (value) => {
    setsymbol(value);
  };
  //console.log(symbol, stocks);
  return (
    <>
      <Stockprovider
        value={{ results, changeresults, stocks, changestocks, changesymbol }}
      >
        <div className="App">
          <div className="search-bar-container">
            <SearchBar setresults={setresults} />
            {results && results.length > 0 && (
              <Searchresultslist results={results} />
            )}
          </div>
          <div>

          {stockdata.length> 0 && (
            <div>
              <h1 className="text-white text-center text-4xl">Profit Chart 1Month</h1>
              <LineChart width={730} height={250} data={stockdata}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>

              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              
              <Line type="monotone" dataKey="profit" stroke={stockdata[0].profit > stockdata[stockdata.length-1].profit  ?"#ff0000"  :"#82ca9d" } />
            </LineChart>
            </div>
            
          )}
          </div>
        </div>
      </Stockprovider>
    </>
  );
}

export default App;
