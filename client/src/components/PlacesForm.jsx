import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Label from "../ui/Label";
import Perks from "../components/Perks";
import PhotosUploader from "../components/PhotosUploader";
import {
  addPlace,
  editPlace,
  getPlace,
  uploadPhotoByLink,
} from "../api/place/placeApi";
import toast from "react-hot-toast";
import { validateCheckTime } from "../utils/helper";
import Spinner from "../ui/Spinner";
import Error from "../ui/Error";

const inputStyles = "w-full border my-1 py-2 px-3 rounded-2xl";
const errorStyles = "text-red-500 text-sm mt-1";
const errorInputStyles =
  "border-red-500 focus:border-red-500 focus:ring-red-500";

const PlacesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      address: "",
      photoLink: "",
      photos: [],
      description: "",
      perks: [],
      extraInfo: "",
      checkIn: "",
      checkOut: "",
      maxGuests: 1,
      price: 100,
    },
  });

  const photoLink = watch("photoLink");
  const photos = watch("photos");

  useEffect(() => {
    if (!id) return;

    getPlace(id)
      .then((data) => {
        reset({
          title: data.title,
          address: data.address,
          photos: data.photos,
          description: data.description,
          perks: data.perks,
          checkIn: data.checkIn,
          checkOut: data.checkOut,
          maxGuests: data.maxGuests,
          extraInfo: data.extraInfo,
          price: data.price,
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load place data");
      });
  }, [id, reset]);

  async function addPhotoByLink(e) {
    e.preventDefault();
    if (!photoLink) return;

    try {
      const newPhoto = await uploadPhotoByLink(photoLink);
      setValue("photos", [...photos, newPhoto]);
      setValue("photoLink", "");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload photo");
    }
  }

  const onSubmit = async (data) => {
    try {
      if (data.photos.length === 0) {
        toast.error("Please add at least one photo");
        return;
      }

      if (id) {
        await editPlace({ ...data, id });
        toast.success("Place updated successfully");
      } else {
        await addPlace(data);
        toast.success("Place added successfully");
      }
      navigate("/account/places");
    } catch (err) {
      console.error(err);
      toast.error(id ? "Error updating place" : "Error adding place");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label title="Title" htmlFor="title">
          Title for your place. Should be short and catchy as in advertisement
        </Label>
        <input
          id="title"
          type="text"
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 5,
              message: "Title must be at least 5 characters",
            },
            maxLength: {
              value: 100,
              message: "Title cannot exceed 100 characters",
            },
          })}
          className={`${inputStyles} ${errors.title ? errorInputStyles : ""}`}
          placeholder="Title, for example: My lovely apt"
        />
        {errors.title && (
          <Error className={errorStyles}>{errors.title.message}</Error>
        )}
      </div>

      <div>
        <Label title="Address" htmlFor="address">
          Address to this place
        </Label>
        <input
          id="address"
          type="text"
          {...register("address", {
            required: "Address is required",
            minLength: {
              value: 5,
              message: "Address must be at least 5 characters",
            },
          })}
          className={`${inputStyles} ${errors.address ? errorInputStyles : ""}`}
          placeholder="Address"
        />
        {errors.address && (
          <Error className={errorStyles}>{errors.address.message}</Error>
        )}
      </div>

      <div>
        <Label title="Photos" htmlFor="photos">
          More = better
        </Label>
        <div className="flex gap-2">
          <input
            type="text"
            {...register("photoLink", {
              pattern: {
                value: /^https?:\/\/.+\.(jpg|jpeg|png|webp)$/i,
                message: "Please enter a valid image URL",
              },
            })}
            className={`${inputStyles} ${
              errors.photoLink ? errorInputStyles : ""
            }`}
            placeholder="Add using a link ....jpg"
          />
          <button
            onClick={addPhotoByLink}
            className="bg-gray-200 px-4 rounded-2xl text-nowrap disabled:opacity-50 hover:bg-gray-300 transition-colors"
            disabled={!photoLink || errors.photoLink}
          >
            Add photo
          </button>
        </div>
        {errors.photoLink && (
          <p className={errorStyles}>{errors.photoLink.message}</p>
        )}
      </div>

      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        <Controller
          name="photos"
          control={control}
          render={({ field }) => (
            <PhotosUploader
              addedPhotos={field.value}
              setAddedPhotos={(photos) => field.onChange(photos)}
            />
          )}
        />
      </div>

      <div>
        <Label title="Description" htmlFor="description">
          Description of the place
        </Label>
        <textarea
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 250,
              message: "Description must be at least 250 characters",
            },
          })}
          className={`${inputStyles} min-h-[150px] ${
            errors.description ? errorInputStyles : ""
          }`}
          rows={5}
        />
        {errors.description && (
          <Error className={errorStyles}>{errors.description.message}</Error>
        )}
      </div>

      <div>
        <Label title="Perks" htmlFor="perks">
          Select all the perks of your place
        </Label>
        <Controller
          name="perks"
          control={control}
          render={({ field }) => (
            <Perks selected={field.value} onChange={field.onChange} />
          )}
        />
      </div>

      <div>
        <Label title="Extra Info" htmlFor="extraInfo">
          House rules, etc
        </Label>
        <textarea
          {...register("extraInfo")}
          className={`${inputStyles} min-h-[100px]`}
          rows={4}
        />
      </div>

      <div>
        <Label title="Check in&out times, max guests">
          Add check in and out times, remember to have some time window for
          cleaning
        </Label>
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <Label
              className="text-base"
              title="Check in time"
              htmlFor="checkIn"
            />
            <input
              type="text"
              {...register("checkIn", {
                required: "Check-in time is required",
                validate: validateCheckTime,
              })}
              className={`${inputStyles} ${
                errors.checkIn ? errorInputStyles : ""
              }`}
              placeholder="14"
            />
            {errors.checkIn && (
              <Error className={errorStyles}>{errors.checkIn.message}</Error>
            )}
          </div>
          <div>
            <Label
              className="text-base"
              title="Check out time"
              htmlFor="checkOut"
            />
            <input
              type="text"
              {...register("checkOut", {
                required: "Check-out time is required",
                validate: validateCheckTime,
              })}
              className={`${inputStyles} ${
                errors.checkOut ? errorInputStyles : ""
              }`}
              placeholder="11"
            />
            {errors.checkOut && (
              <Error className={errorStyles}>{errors.checkOut.message}</Error>
            )}
          </div>
          <div>
            <Label
              className="text-base"
              title="Max guests"
              htmlFor="maxGuests"
            />
            <input
              type="number"
              {...register("maxGuests", {
                required: "Maximum guests is required",
                min: {
                  value: 1,
                  message: "Must accommodate at least 1 guest",
                },
                max: {
                  value: 20,
                  message: "Maximum 20 guests allowed",
                },
                valueAsNumber: true,
              })}
              className={`${inputStyles} ${
                errors.maxGuests ? errorInputStyles : ""
              }`}
              placeholder="2"
            />
            {errors.maxGuests && (
              <Error className={errorStyles}>{errors.maxGuests.message}</Error>
            )}
          </div>
          <div>
            <Label
              className="text-base"
              title="Price per night"
              htmlFor="price"
            />
            <input
              type="number"
              {...register("price", {
                required: "Price is required",
                min: {
                  value: 1,
                  message: "Price must be greater than 0",
                },
                max: {
                  value: 10000,
                  message: "Price cannot exceed 10000",
                },
                valueAsNumber: true,
              })}
              className={`${inputStyles} ${
                errors.price ? errorInputStyles : ""
              }`}
              placeholder="100"
            />
            {errors.price && (
              <Error className={errorStyles}>{errors.price.message}</Error>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="primary w-full disabled:opacity-50 hover:opacity-90 transition-opacity"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="w-full flex items-center justify-center">
            <Spinner className={"size-6"} />
          </span>
        ) : (
          "Save"
        )}
      </button>
    </form>
  );
};

export default PlacesForm;
