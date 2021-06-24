import React, { useState } from "react";

import { DatePicker, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import AlgoliaPlaces from "algolia-places-react";
import moment from "moment";

import { useHistory } from "react-router-dom";

// destructuring
const { RangePicker } = DatePicker;
const { Option } = Select;

// config of algolia
const config = {
  appId: process.env.REACT_APP_ALGOLIA_APP_ID,
  apiKey: process.env.REACT_APP_ALGOLIA_APP_KEY,
  language: "en",
  countries: "pak",
};

const Search = () => {
  //   state
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [bed, setBed] = useState("");

  //   hook
  // route
  const history = useHistory();

  //   handleSubmit
  const handleSubmit = () => {
    history.push(`/search-result?location=${location}&date=${date}&bed=${bed}`);
  };

  return (
    <>
      <div className="d-flex pb-4">
        <div className="w-100">
          <AlgoliaPlaces
            placeholder="Location"
            defaultValue={location}
            options={config}
            onChange={({ suggestion }) => setLocation(suggestion.value)}
            style={{ height: "50px" }}
          />
        </div>
      </div>
    </>
  );
};

export default Search;
