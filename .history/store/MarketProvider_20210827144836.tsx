import React, { useState } from 'react' 
import { Datum, Bounds } from '../components/Timeseries/interfaces'

const UNBOUNDED_BOUNDS: Bounds = { x0: -1, x1: -1, y0: -1, y1: -1 };

export interface MarketContextProps {
    filteredDataState: {
        filteredData: Datum[];
        bounds: Bounds; 
        lastUpdatedAt: number | undefined;
        setLastUpdatedAt: React.Dispatch<React.SetStateAction<number | undefined>>; 
        setFilteredData: React.Dispatch<React.SetStateAction<Datum[]>>;
        setBounds: React.Dispatch<React.SetStateAction<Bounds>>;
    };
  }
  
  export const MarketContext = React.createContext<MarketContextProps>({
    filteredDataState: {
        filteredData: [],
        bounds: {...EMPTY_BOUNDS},
        setFilteredData: () => {},
        setBounds: () => {},
        lastUpdatedAt: undefined,
        setLastUpdatedAt: () => undefined,
    },
  });
  
  const MarketProvider: React.FC = ({ children }) => {
    const [filteredData, setFilteredData] = useState<Datum[]>([]);
    const [bounds, setBounds] = useState({ x0: -1, y0: -1, x1: -1, y1: -1 });
  
    return (
      <MarketContext.Provider value={{
          filteredDataState: { 
                bounds,
                filteredData, 
                setFilteredData,
                setBounds
            }
        }}
    >
        {children}
      </MarketContext.Provider>
    );
  };

  export default MarketProvider