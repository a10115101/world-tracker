function SwitchModeButton({ setMode, mode, children }) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        setMode(`${mode}`);
      }}
    >
      {children}
    </button>
  );
}

export default SwitchModeButton;
