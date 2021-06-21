import React, { useState } from "react";
import { useSelector } from "react-redux";

// toast
import { toast } from "react-toastify";

// action
import { createHotel } from "../actions/hotel";

// component
import CreateNewHotel from "../components/forms/CreateNewHotel";

const NewHotel = ({ history }) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;

  // state/hook
  const [values, setValues] = useState({
    title: "",
    content: "",
    image: "",
    price: "Pkr",
    from: "",
    to: "",
    bed: "",
  });
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );

  const [location, setLocation] = useState("");

  // destructuring variables from state
  const { title, content, image, price, from, to, bed } = values;

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // we can't send directly data because it also contains a file so we have to use FormData
    let hotelData = new FormData();

    hotelData.append("title", title);
    hotelData.append("content", content);
    hotelData.append("location", location);
    image && hotelData.append("image", image);
    hotelData.append("price", price);
    hotelData.append("from", from);
    hotelData.append("to", to);
    hotelData.append("bed", bed);

    console.log([...hotelData]);

    try {
      let res = await createHotel(token, hotelData);
      console.log(`Hotel create ${res}`);
      toast.success("New Hotel Posted");
      history.push("/");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  // handle image change
  const handleImageChange = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  // handle change
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container-fluid bg-secondary h1 p-5 text-white text-center">
        <h2>Add New Hotel</h2>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <CreateNewHotel
              values={values}
              setValues={setValues}
              location={location}
              setLocation={setLocation}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
            />
          </div>

          <div className="col-md-2">
            <img
              src={preview}
              alt="image_preview"
              className="img img-fluid m-2"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewHotel;
