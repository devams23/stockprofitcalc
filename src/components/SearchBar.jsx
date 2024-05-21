import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
import getstockdata from "../searchstock/getstock";
import { usestockcontext } from "../contextprovider/stockcontext";
export const SearchBar = ({ setresults }) => {
  const [searchkey, setsearchkey] = useState("");
  const { stocks, changestocks } = usestockcontext();
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
      <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input
          type="text"
          placeholder="Search a stock..."
          value={searchkey}
          onChange={(e) => setsearchkey(e.target.value)}
        />
      </div>
      <div className="input-wrapper my-4 w-24">
        <input type="number" min={1} placeholder="Stocks" id="stock" value={stocks} onChange={(e) => changestocks(e.target.value)}/>
      </div>
    
    </>
  );
};
