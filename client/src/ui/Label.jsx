import SubTitle from "./SubTitle";

const Label = ({ children, title = "", htmlFor = "", className = "" }) => {
  return (
    <>
      <label className={`text-2xl mt-4 ${className}`} htmlFor={htmlFor}>
        {title}
      </label>
      {children && <SubTitle>{children}</SubTitle>}
    </>
  );
};

export default Label;
