import { createContext, useContext, useState } from "react";

const RecordsContext = createContext();

function RecordsProvider({ children }) {
  const [records, setRecords] = useState([]);

  return (
    <RecordsContext.Provider value={{ records, setRecords }}>
      {children}
    </RecordsContext.Provider>
  );
}

function useRecords() {
  const context = useContext(RecordsContext);

  if (context === undefined)
    throw new Error("RecordsContext is used outside the RecordsProvider");

  return context;
}

export { RecordsProvider, useRecords };
