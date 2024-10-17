import UploadIcon from "../ui/icons/UploadIcon";
import { uploadPhotos } from "../api/authApi";
import TrashIcon from "../ui/icons/TrashIcon";
import StarIcon from "../ui/icons/StarIcon";
import FilledStarIcon from "../ui/icons/FilledStarIcon";

const PhotosUploader = ({ addedPhotos, setAddedPhotos }) => {
  function uploadPhoto(e) {
    const files = e.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("photo", files[i]);
    }
    console.log(formData);
    uploadPhotos(formData)
      .then((data) => {
        console.log(data);
        setAddedPhotos([...addedPhotos, ...data]);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  function removePhoto(e, photo) {
    e.preventDefault();
    setAddedPhotos([...addedPhotos.filter((p) => p !== photo)]);
  }
  function makeItCover(e, photo) {
    e.preventDefault();
    setAddedPhotos([photo, ...addedPhotos.filter((p) => p !== photo)]);
  }
  return (
    <>
      {addedPhotos.length > 0 &&
        addedPhotos.map((photo, index) => (
          <div key={index} className="h-48 flex relative">
            <img
              src={`http://localhost:3000/uploads/${photo}`}
              alt=""
              className="rounded-2xl w-full object-cover object-center"
            />
            <button
              onClick={(e) => removePhoto(e, photo)}
              className="absolute bottom-1 right-1 bg-black bg-opacity-45 p-1 rounded-lg cursor-pointer text-white z-10"
            >
              <TrashIcon className={"size-4"} />
            </button>
            <button
              onClick={(e) => makeItCover(e, photo)}
              className="absolute bottom-1 left-1 bg-black bg-opacity-45 p-1 rounded-lg cursor-pointer z-10"
            >
              {index === 0 ? (
                <FilledStarIcon className={"size-4 text-[#FFFF00]"} />
              ) : (
                <StarIcon className={"size-4 text-white "} />
              )}
            </button>
          </div>
        ))}
      <label className="h-48 flex items-center cursor-pointer justify-center gap-1 border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
        <input type="file" multiple className="hidden" onChange={uploadPhoto} />
        <UploadIcon className={"size-7"} />
        Upload
      </label>
    </>
  );
};

export default PhotosUploader;
