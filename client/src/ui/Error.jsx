const Error = ({ errors, className }) => {
  return <span className={`text-red-500 text-sm ${className}`}>{errors}</span>;
};

export default Error;
