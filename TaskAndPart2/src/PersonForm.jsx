const inputStyle = {
    marginRight: '0.5rem',
    padding: '0.5rem',
    fontSize: '1rem'
  };
  
  const PersonForm = ({ onSubmit, nameValue, onNameChange, numberValue, onNumberChange }) => (
    <form onSubmit={onSubmit}>
      <div style={{ marginBottom: '0.5rem' }}>
        name: <input style={inputStyle} value={nameValue} onChange={onNameChange} />
      </div>
      <div style={{ marginBottom: '0.5rem' }}>
        number: <input style={inputStyle} value={numberValue} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
  
  export default PersonForm;
  