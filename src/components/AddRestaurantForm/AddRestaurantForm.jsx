import { useState } from "react";
import React from "react";
import "./AddRestaurantForm.css";

var objectID = 200000;

export const AddRestaurantForm = (props) => {
  const { index, closePopup } = props;
  const [inputs, setInputs] = useState({});

  const addRestaurant = (inputs) => {
    if (inputs !== {}) {
      const restaurant = {
        objectID: ++objectID,
        image_url: "https://www.opentable.com/img/restimages/141061.jpg",
        ...inputs,
      };
      index.saveObject(restaurant).then((objectID) => {
        console.log("Restaurant added.", restaurant, objectID);
        alert(`Restaurant ${restaurant.name} added.`);
      });
      closePopup();
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputs.name) {
      addRestaurant(inputs);
    }
  };

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <span>
        <label>
          Restaurant name:
          <input
            className="input-text"
            type="text"
            name="name"
            value={inputs.name || ""}
            onChange={handleChange}
          />
        </label>
      </span>
      <span>
        <label>
          Price range:
          <input
            className="input-text"
            type="number"
            name="price_range"
            value={inputs.price_range || ""}
            onChange={handleChange}
          />
        </label>
      </span>
      <span>
        <label>
          City:
          <input
            className="input-text"
            type="text"
            name="city"
            value={inputs.city || ""}
            onChange={handleChange}
          />
        </label>
      </span>
      <input className="submit-button" type="submit" />
    </form>
  );
};

