const Input = ({
  type = "",
  placeholder = "",
  id = "",
  value = "",
  onChange = "",
  className = "",
  checked = "",
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      id={id}
      value={value}
      onChange={onChange}
      className={className}
      checked={checked}
    />
  );
};

export default Input;
