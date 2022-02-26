import algoliasearch from "algoliasearch";
import React, { useState } from "react";
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  ClearRefinements,
  RefinementList,
  Configure,
  Highlight,
} from "react-instantsearch-dom";
import PropTypes from "prop-types";
import "./App.css";
import Popup from "./components/Popup/Popup";
import { AddRestaurantForm } from "./components/AddRestaurantForm/AddRestaurantForm";

const INDEX_NAME = "restaurants";

const client = algoliasearch("8AUYHE8FKH", "407a9d7a00f702944e275c8f802d5d37");

const index = client.initIndex(INDEX_NAME);

const App = () => {
  let [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <div className="page">
      <header className="header">
        <h1 className="header-title">Algolia Cuisine</h1>
      </header>

      <InstantSearch indexName={INDEX_NAME} searchClient={client}>
        <div className="left-panel">
          <button
            className="ais-ClearRefinements-button"
            type="button"
            onClick={togglePopup}
          >
            Add Restaurant
          </button>
          <ClearRefinements />
          <h2>Type of Cuisine</h2>
          <RefinementList attribute="food_type" />
          <Configure hitsPerPage={8} />
        </div>
        <div className="right-panel">
          <SearchBox />
          <Hits hitComponent={Hit} />
          <Pagination />
        </div>
      </InstantSearch>

      {isOpen && (
        <Popup
          content={
            <>
              <b>Add a restaurant</b>
              <p>Write down the restaurant details</p>
              <AddRestaurantForm index={index} closePopup={closePopup} />
              <button
                className="close-icon"
                type="button"
                onClick={closePopup}
              ></button>
            </>
          }
          handleClose={closePopup}
        />
      )}
    </div>
  );
};

const Hit = (props) => {
  return (
    <div>
      <img src={props.hit.image_url} align="left" alt={props.hit.name} />
      <div className="hit-name">
        <Highlight attribute="name" hit={props.hit} />
      </div>
      <div className="hit-description">
        <Highlight attribute="price_range" hit={props.hit} />
      </div>
      <div>{props.hit.food_type}</div>
      <div className="hit-description">{props.hit.city}</div>
      <button
        className="ais-ClearRefinements-button"
        type="button"
        onClick={(e) => {
          handleRemoveRestaurantClick(e, props.hit.objectID);
        }}
      >
        Remove
      </button>
    </div>
  );
};

const handleRemoveRestaurantClick = (e, id) => {
  e.preventDefault();
  removeRestaurant(id);
};

const removeRestaurant = (id) => {
  index.deleteObject(id).then(() => {
    console.log("Restaurant deleted.", id);
    alert(`Restaurant ${id} deleted.`);
  });
};

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default App;
