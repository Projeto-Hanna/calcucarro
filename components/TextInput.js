export const TextInput = ({ inputLabel, onChange }) => {
  return (
    <div style={{ display: 'flex', gap: '6px'}}>
      <label>{inputLabel}</label>
      <input type='text' onChange={onChange}></input>
    </div>
  );
};
