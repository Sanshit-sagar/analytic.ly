import React from 'react' 
import Datum from '../components/GraphManager/interfaces'

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
    const [filteredData, setFilteredData] = React.useState<Datum[]>([]);
  
    return (
      <MarketContext.Provider
        value={{
          filteredDataState: { filteredData, setFilteredData },
        }}
      >
        {children}
      </MarketContext.Provider>
    );
  };

  export default MarketProvider