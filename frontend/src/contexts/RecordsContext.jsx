import { createContext, useContext, useState } from "react";

const RecordsContext = createContext();

function RecordsProvider({ children }) {
  const [isFormOpened, setIsFormOpened] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [mapPosition, setMapPosition] = useState([24, 121.5]);
  const [records, setRecords] = useState([]);

  const [statusMode, setStatusMode] = useState("all");
  const [dateMode, setDateMode] = useState("des");

  return (
    <RecordsContext.Provider
      value={{
        isFormOpened,
        setIsFormOpened,
        isClicked,
        setIsClicked,
        mapPosition,
        setMapPosition,
        records,
        setRecords,
        statusMode,
        setStatusMode,
        dateMode,
        setDateMode,
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
