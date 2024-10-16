import MapIcon from "../ui/MapIcon";

const AddressLink = ({ children }) => {
  return (
    <a
      href={`https://maps.google.com/?q=${children}`}
      target="_blank"
      className="my-2 font-semibold underline flex gap-1 items-center"
    >
      <MapIcon className={"size-5"} />
      {children}
    </a>
  );
};

export default AddressLink;
