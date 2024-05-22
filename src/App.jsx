import { useState, useEffect } from "react";
import { SearchBar } from "./components/SearchBar";
import Searchresultslist from "./components/Searchresultlist";
import "./App.css";
import { Stockprovider } from "./contextprovider/stockcontext";
import getstockprice from "./searchstock/getstockprice";
import {
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer

} from "recharts";
import { setstockdata } from "./searchstock/setstockdata";

function App() {
  const [results, setresults] = useState([]);
  const [stocks, setstocks] = useState(1);
  const [symbol, setsymbol] = useState("");
  const [stockdata, setStockData] = useState([]); // Store stockdata in state
  const [duration, setduration] = useState("1m")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getstockprice(symbol , duration);
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
  }, [symbol, stocks , duration]);

  const changeresults = (value) => {
    setresults(value);
  };
  const changestocks = (value) => {
    setstocks(value);
  };
  const changesymbol = (value) => {
    setsymbol(value);
  };
  const changeduration = (value) => {
    setduration(value);
  };
  //console.log(symbol, stocks , duration);
  // Function to determine stroke and fill color based on value
const getColor = (value) => {
  if (value < 0) {
    return {
      stroke: "#ff4d4d",
      fill: "url(#colorNegative)"
    };
  } else {
    return {
      stroke: "#82ca9d",
      fill: "url(#colorPositive)"
    };
  }
};

  return (
    <>

      <Stockprovider
        value={{ results, changeresults, stocks, changestocks, changesymbol , duration , changeduration}}
      >
        <div className="App">
        <h1 className="text-4xl text-center text-white font-mono rounded-lg shadow-lg px-6 py-3" style={{ textShadow: '3px 0px 0px rgba(255, 10, 10, 0.5)' }}>
  Hey, Investor!
</h1>


          <div className="search-bar-container">
            <SearchBar setresults={setresults} />
            {results && results.length > 0 && (
              <Searchresultslist results={results} />
            )}
          </div>
          <div>

          {stockdata.length> 0 && (
            <div>
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart

      data={stockdata}
      margin={{
        top: 10, right: 30, left: 0, bottom: 0,
      }}
    >
      <defs>
      <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#ff4d4d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#ff4d4d" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="date" />
      <YAxis />
      <CartesianGrid strokeDasharray="3" />
      <Tooltip />

          <Area
            type="monotone"
            dataKey="profit"
            stroke={stockdata[0].profit > stockdata[stockdata.length -1].profit ? "#ff4d4d": "#82ca9d" }
            fillOpacity={1}
            fill={stockdata[0].profit > stockdata[stockdata.length -1].profit ? "url(#colorNegative )": "url(#colorPositive)"}

          />

    
    </AreaChart>
  </ResponsiveContainer>
            </div>
            
          )}
          </div>
        </div>
      </Stockprovider>
    </>
  );
}

export default App;
