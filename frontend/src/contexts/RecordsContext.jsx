import { createContext, useContext, useState } from "react";

const RecordsContext = createContext();

function RecordsProvider({ children }) {
  const [records, setRecords] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("des");

  return (
    <RecordsContext.Provider
      value={{
        records,
        setRecords,
        statusFilter,
        setStatusFilter,
        dateFilter,
        setDateFilter,
      }}
    >
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
