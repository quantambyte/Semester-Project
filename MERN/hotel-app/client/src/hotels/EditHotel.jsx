import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { DatePicker, Select } from "antd";
import { readOneHotel } from "../actions/hotel";

import { useSelector } from "react-redux";

const { Option } = Select;

const EditHotel = ({ match }) => {
  useEffect(() => {
    loadSellerHotels();
  }, []);

  const loadSellerHotels = async () => {
    let res = await readOneHotel(match.params.hotelId);

    console.log(res.data);
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Edit Hotel</h2>
      </div>
    </>
  );
};

export default EditHotel;
