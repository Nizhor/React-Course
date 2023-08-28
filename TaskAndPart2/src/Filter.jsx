const Filter = ({ value, onChange }) => (
    <div style={{ marginBottom: '1rem' }}>
      Filter shown with <input value={value} onChange={onChange} />
    </div>
  );
  
  export default Filter;
  