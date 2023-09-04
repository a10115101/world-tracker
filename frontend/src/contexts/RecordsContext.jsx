import { createContext, useContext, useState } from "react";

const RecordsContext = createContext();

function RecordsProvider({ children }) {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [mapPosition, setMapPosition] = useState([40, 0]);

  return (
    <RecordsContext.Provider
      value={{
        isOpenForm,
        setIsOpenForm,
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
