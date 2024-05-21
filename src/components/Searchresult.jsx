import { usestockcontext } from "../contextprovider/stockcontext";
import "./Searchresult.css";

function Searchresult({result}){
  const {changeresults , stocks , changesymbol }  = usestockcontext();
  const handleclick =(e , result)=>{
    changeresults("");
    changesymbol(result.symbol);
    
  }
                              

  return (
    <>
    <div className="search-result cursor-pointer" onClick={(e) => handleclick(e, result)}>
      {result.name + "   "} 
      {result.symbol}
    </div>
    </>
  );
};

export default Searchresult;