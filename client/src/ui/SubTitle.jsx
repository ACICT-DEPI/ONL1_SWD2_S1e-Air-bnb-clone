const SubTitle = ({ className = "", children }) => {
  return <p className={`text-gray-500 text-sm ${className}`}>{children}</p>;
};

export default SubTitle;
