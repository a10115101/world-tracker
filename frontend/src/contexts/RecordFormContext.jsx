import { createContext, useContext, useState } from "react";

const RecordFormContext = createContext();

function RecordFormProvider({ children }) {
  const [isFormOpened, setIsFormOpened] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <RecordFormContext.Provider
      value={{
        isFormOpened,
        setIsFormOpened,
        isClicked,
        setIsClicked,
      }}
    >
      {children}
    </RecordFormContext.Provider>
  );
}

function useRecordForm() {
  const context = useContext(RecordFormContext);

  if (context === undefined)
    throw new Error("RecordFormContext is used outside the RecordFormProvider");

  return context;
}

export { RecordFormProvider, useRecordForm };
