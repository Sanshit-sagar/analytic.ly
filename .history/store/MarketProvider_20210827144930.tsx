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
        bounds: {...UNBOUNDED_BOUNDS},
        setFilteredData: () => {},
        setBounds: () => {},
        lastUpdatedAt: undefined,
        setLastUpdatedAt: () => undefined,
    },
  });
  
  const MarketProvider: React.FC = ({ children }) => {
    const [filteredData, setFilteredData] = useState<Datum[]>([]);
    const [bounds, setBounds] = useState(UNBOUNDED_BOUNDS);
    const [lastUpdatedAt, setLastUpdatedAt]
    return (
      <MarketContext.Provider value={{
          filteredDataState: { 
                bounds,
                lastUpdatedAt,
                filteredData, 
                setFilteredData,
                setBounds,
                setLastUpdatedAt,
            }
        }}
    >
        {children}
      </MarketContext.Provider>
    );
  };

  export default MarketProvider