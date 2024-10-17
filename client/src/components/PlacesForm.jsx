import Label from "../ui/Label";
import Input from "../ui/Input";
import Perks from "../components/Perks";
import PhotosUploader from "../components/PhotosUploader";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addPlace,
  editPlace,
  getPlace,
  uploadPhotoByLink,
} from "../api/place/placeApi";
import toast from "react-hot-toast";

const PlacesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photoLink, setPhotoLink] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);

  useEffect(() => {
    if (!id) return;

    getPlace(id)
      .then((data) => {
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
        setExtraInfo(data.extraInfo);
        setPrice(data.price);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  function addPhotoByLink(e) {
    e.preventDefault();
    uploadPhotoByLink(photoLink)
      .then((res) => {
        console.log(res);

        setAddedPhotos([...addedPhotos, res.data]);
        setPhotoLink("");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function addNewPlace(e) {
    e.preventDefault();
    const data = {
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      // edit
      editPlace({ ...data, id })
        .then(() => {
          toast.success("Place updated");
          navigate("/account/places");
        })
        .catch(() => {
          toast.error("Error updating place");
        });
    } else {
      // new place

      addPlace(data)
        .then(() => {
          toast.success("Place added");
          navigate("/account/places");
        })
        .catch(() => {
          toast.error("Error adding place");
        });
    }
  }

  return (
    <form onSubmit={addNewPlace}>
      <Label title="Title" htmlFor="title">
        Title for your place. should be short and catchy as in advertisement
      </Label>
      <Input
        id={"title"}
        type={"text"}
        placeholder={"title, for example: My lovely apt"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Label title="Address" htmlFor="address">
        Address to this place
      </Label>
      <Input
        id={"address"}
        type={"text"}
        placeholder={"address"}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <Label title="Photos" htmlFor="photos">
        more = better
      </Label>
      <div className="flex gap-2">
        <Input
          type={"text"}
          placeholder={"Add using a link ....jpg"}
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
        />
        <button
          onClick={addPhotoByLink}
          className="bg-gray-200 px-4 rounded-2xl text-nowrap"
        >
          Add photo
        </button>
      </div>

      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        <PhotosUploader
          addedPhotos={addedPhotos}
          setAddedPhotos={setAddedPhotos}
        />
      </div>

      <Label title="Description" htmlFor="description">
        description of the place
      </Label>
      <textarea
        name="description"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Label title="Perks" htmlFor="perks">
        select all the perks of your place
      </Label>

      <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        <Perks selected={perks} onChange={setPerks} />
      </div>

      <Label title="Extra Info" htmlFor="info">
        house rules, etc
      </Label>
      <textarea
        value={extraInfo}
        onChange={(e) => setExtraInfo(e.target.value)}
        name="info"
        id="info"
      />

      <Label title="Check in&out times, max guests">
        add check in and out times, remember to have some time window for
        cleaning the room between guests
      </Label>

      <div className="grid gap-1 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <Label
            className="mt-2 -mb-1 text-base"
            title="Check in time"
            htmlFor="checkIn"
          />
          <Input
            required
            type="text"
            id="checkIn"
            placeholder="14:00"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>
        <div>
          <Label
            className="mt-2 -mb-1 text-base"
            title="Check out time"
            htmlFor="checkOut"
          />
          <Input
            required
            type="text"
            id="checkOut"
            placeholder="14:00"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
        <div>
          <Label
            className="mt-2 -mb-1 text-base"
            title="Max number of guests"
            htmlFor="guests"
          />
          <Input
            required
            type="number"
            id="guests"
            placeholder="2"
            value={maxGuests}
            onChange={(e) => setMaxGuests(e.target.value)}
          />
        </div>
        <div>
          <Label
            className="mt-2 -mb-1 text-base"
            title="Price per night"
            htmlFor="price"
          />
          <Input
            required
            type="text"
            id="price"
            placeholder="14:00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>

      <button className="primary my-4">Save</button>
    </form>
  );
};

export default PlacesForm;
