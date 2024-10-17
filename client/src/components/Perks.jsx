import CheckBoxInput from "../ui/CheckBoxInput";
import WifiIcon from "../ui/icons/WifiIcon";
import TruckIcon from "../ui/icons/TruckIcon";
import TvIcon from "../ui/icons/TvIcon";
import FaceSimleIcon from "../ui/icons/FaceSimleIcon";
import GymIcon from "../ui/icons/GymIcon";

const perks = [
  { id: "wifi", title: "Wifi", icon: <WifiIcon className={"size-6"} /> },
  {
    id: "parking",
    title: "Free parking",
    icon: <TruckIcon className={"size-6"} />,
  },
  { id: "tv", title: "TV", icon: <TvIcon className={"size-6"} /> },
  { id: "pets", title: "Pets", icon: <FaceSimleIcon className={"size-6"} /> },
  { id: "gym", title: "Gym", icon: <GymIcon className={"size-6"} /> },
];

const Perks = ({ selected, onChange }) => {
  function handleClick(e) {
    const { checked, id } = e.target;
    console.log(selected);

    if (checked) {
      onChange([...selected, id]);
    } else {
      onChange([...selected.filter((item) => item !== id)]);
    }
  }
  console.log(selected);

  return (
    <>
      {perks.map((perk) => (
        <CheckBoxInput
          key={perk.id}
          id={perk.id}
          title={perk.title}
          onChange={handleClick}
          checked={selected.includes(perk.id)}
        >
          {perk.icon}
          {/* <WifiIcon className={"size-6"} /> */}
        </CheckBoxInput>
      ))}
    </>
  );
};

export default Perks;
