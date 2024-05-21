import "./Searchresultlist.css";
import Searchresult from "./Searchresult";

function Searchresultlist ({ results })  {
  return (
    <div className="results-list">
        {results.map((result )=>(
          <Searchresult result = {result}  key = {result.symbol}/>
        )
        )}
    </div>
  );
};
export default Searchresultlist;