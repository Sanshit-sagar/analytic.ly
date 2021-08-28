import React, { useState } from 'react' 
import { Datum } from '../components/Timeseries/interfaces'

export interface MarketContextProps {
    filteredDataState: {
      filteredData: Datum[];
      setFilteredData: React.Dispatch<React.SetStateAction<Datum[]>>;
    };
  }
  
  export const MarketContext = React.createContext<MarketContextProps>({
    filteredDataState: {
      filteredData: [],
      setFilteredData: () => {},
    },
  });
  
  const MarketProvider: React.FC = ({ children }) => {
    const [filteredData, setFilteredData] = useState<Datum[]>([]);
    const [bounds, setBounds] = useState({ x0: -1, y0: -1, x1: -1, y1: -1 });
  
    return (
      <MarketContext.Provider value={{
          filteredDataState: { 
              filteredData, setFilteredData }
        }}
    >
        {children}
      </MarketContext.Provider>
    );
  };

  export default MarketProvider