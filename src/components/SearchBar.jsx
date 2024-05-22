import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
import getstockdata from "../searchstock/getstock";
import { usestockcontext } from "../contextprovider/stockcontext";
export const SearchBar = ({ setresults }) => {
  const [searchkey, setsearchkey] = useState("");
  const { stocks, changestocks , duration , changeduration } = usestockcontext();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getstockdata(searchkey);
        setresults(result);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    if (searchkey.length > 0) {
      fetchData();
    }
  }, [searchkey]);
  //console.log(stocks);
  return (
    <>
<div className="stock-form">
      <div className="input-wrapper">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search for a stock..."
          value={searchkey}
          onChange={(e) => setsearchkey(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="stock" className="stock-label">Number of Shares:</label>
        <input
          type="number"
          min={1}
          id="stock"
          value={stocks}
          onChange={(e) => changestocks(e.target.value)}
          className="stock-input"
        />
      </div>
      <div className="duration-buttons">
        {['1m', '6m', '1y', 'ytd'].map((dur) => (
          <button
            key={dur}
            className={`duration-button ${duration === dur ? 'active' : ''}`}
            onClick={() => changeduration(dur)}
          >
            {dur}
          </button>
        ))}
      </div>
    </div>
    </>
  );
};
