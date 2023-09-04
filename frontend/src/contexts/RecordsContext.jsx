import { createContext, useContext, useState } from "react";

const RecordsContext = createContext();

function RecordsProvider({ children }) {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [clickMapPosition, setClickPosition] = useState([0, 0]);
  const [isInit, setIsInit] = useState(false);

  const [mapPosition, setMapPosition] = useState([24, 121.5]);

  return (
    <RecordsContext.Provider
      value={{
        isOpenForm,
        setIsOpenForm,
        isInit,
        setIsInit,
        clickMapPosition,
        setClickPosition,
        mapPosition,
        setMapPosition,
      }}
    >
      {children}
    </RecordsContext.Provider>
  );
}

function useRecords() {
  const context = useContext(RecordsContext);
  if (context === undefined)
    throw new Error("RecordsContext was used outside the RecordsProvider");
  return context;
}

export { RecordsProvider, useRecords };
