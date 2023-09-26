import { createContext, useContext, useState } from "react";

const RecordsFilterContext = createContext();

function RecordsFilterProvider({ children }) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("des");

  return (
    <RecordsFilterContext.Provider
      value={{
        statusFilter,
        setStatusFilter,
        dateFilter,
        setDateFilter,
      }}
    >
      {children}
    </RecordsFilterContext.Provider>
  );
}

function useRecordsFilter() {
  const context = useContext(RecordsFilterContext);

  if (context === undefined)
    throw new Error(
      "RecordsFilterContext is used outside the RecordsFilterProvider"
    );

  return context;
}

export { RecordsFilterProvider, useRecordsFilter };
