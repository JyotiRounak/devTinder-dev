import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [editPage, setEditPage] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    age: user.age || "",
    //gender: user.gender || "",
    about: user.about || "",
    photoUrl: user.photoUrl || "",
    skills: user.skills || "",
  });
  const [imageFile, setImageFile] = useState(null);
  const[previewImage, setPreviewImage] = useState(user.photoUrl || "");

  const changeHandler = (event) => {
    const { value, name } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const imageChangeHandler  = (e)=>{
    const file = e.target.files[0];
    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file))
  }
  // upload image to cloudinary and get the url
  const uploadImage = async () => {
  // 1️⃣ get signature (AUTH REQUIRED)
  const signRes = await axios.post(
    `${BASE_URL}cloudinary/sign-upload`,
    {},
    { withCredentials: true }
  );

  const { signature, timestamp, cloudName, apiKey, folder } = signRes.data;

  // 2️⃣ upload directly to cloudinary
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("signature", signature);
  formData.append("timestamp", timestamp);
  formData.append("api_key", apiKey);
  formData.append("folder", folder);

  const cloudRes = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    formData
  );

  return {
    photoUrl: cloudRes.data.secure_url,
    photoPublicId: cloudRes.data.public_id,
  };
};


  const { firstName, lastName, age, skills, about, photoUrl } = formData;
  const saveProfile = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setUploading(true);
      let imageData = {};
      // upload image only if user selected one
      if (imageFile) {
        imageData = await uploadImage();
      }
       // ✅ Sync image URL with local state
      setFormData((prev)=>({
        ...prev,
        photoUrl: imageData.photoUrl || prev.photoUrl
      }));

      const response = await axios.patch(
        `${BASE_URL}profile/edit`,
        { firstName, lastName, age: Number(age), skills, about, ...imageData },
        { withCredentials: true },
      );
      dispatch(addUser(response?.data.data));
      setUploading(false);
    } catch (error) {
      setUploading(false);
      setError(error.response?.data.message);
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="flex justify-center mx-10">
        <div className="card bg-base-300 w-96 shadow-lg">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>

            <form onSubmit={saveProfile}>
              <label className="form-control">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  placeholder="First Name"
                  className="input input-bordered"
                  onChange={changeHandler}
                />
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  placeholder="Last Name"
                  className="input input-bordered"
                  onChange={changeHandler}
                />
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">Age</span>
                </div>
                <input
                  type="number"
                  name="age"
                  value={age}
                  placeholder="Age"
                  className="input input-bordered"
                  onChange={changeHandler}
                />
              </label>

              {/* <label className="form-control">
              <div className="label">
                <span className="label-text">Gender</span>
              </div>
              <select className="select select-bordered">
                <option disabled>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </label> */}

              <label className="form-control">
                <div className="label">
                  <span className="label-text">About</span>
                </div>
                <textarea
                  name="about"
                  value={about}
                  className="textarea textarea-bordered"
                  placeholder="Tell about yourself"
                  onChange={changeHandler}
                ></textarea>
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">Photo URL</span>
                </div>
                <input
                  type="file"
                accept="image/*"
                className="file-input file-input-bordered mt-3"
                onChange={imageChangeHandler}
                />
              </label>

              <div className="card-actions justify-center gap-4 mt-6">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <UserCard
        user={{ firstName, lastName, age, about, skills, photoUrl: previewImage || photoUrl, }}
        editPage={editPage}
      />
    </div>
  );
};

export default EditProfile;
