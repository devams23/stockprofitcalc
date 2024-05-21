import { useContext  , createContext} from "react";

export const stockcontext = createContext();

export const Stockprovider = stockcontext.Provider;

export const usestockcontext =()=>{
    return useContext(stockcontext);
}
