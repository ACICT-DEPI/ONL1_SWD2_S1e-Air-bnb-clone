import Input from "./Input";

const CheckBoxInput = ({
  id = "",
  onChange = "",
  children,
  title,
  checked,
}) => {
  return (
    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer accent-[#f5385d]">
      <Input
        type="checkbox"
        id={id}
        className="size-4"
        onChange={onChange}
        checked={checked}
      />
      {children}
      <span htmlFor="id">{title}</span>
    </label>
  );
};

export default CheckBoxInput;
