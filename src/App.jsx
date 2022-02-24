import algoliasearch from "algoliasearch/lite";
import React, { useState } from "react";
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
} from "react-instantsearch-dom";
import PropTypes from "prop-types";
import "./App.css";
import Popup from "./popup/Popup";

const indexName = "restaurants";

const searchClient = algoliasearch(
  "8AUYHE8FKH",
  "407a9d7a00f702944e275c8f802d5d37"
);

const index = searchClient.initIndex(indexName);

const App = () => {
  let [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  const closePopup = () => {
    setIsOpen(false);
    console.log(isOpen);
  };

  return (
    <div className="ais-InstantSearch">
      <header className="header">
        <h1 className="header-title">
          <a href="/">Algolia Cuisine</a>
        </h1>
      </header>

      <InstantSearch indexName={indexName} searchClient={searchClient}>
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
              <b>Design your Popup</b>
              <p>Lorem ipsum dolor</p>
              <button
                className="ais-ClearRefinements-button"
                type="button"
                onClick={closePopup}
              >
                Close Popup
              </button>
              <button
                className="ais-ClearRefinements-button"
                type="button"
                onClick={addRestaurant}
              >
                Add Restaurant
              </button>
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
      <div className="hit-food-type">{props.hit.food_type}</div>
      <div className="hit-description">{props.hit.city}</div>
      <button
        className="ais-ClearRefinements-button"
        type="button"
        onClick={removeRestaurant(props.hit.objectID)}
      >
        Remove
      </button>
    </div>
  );
};

const removeRestaurant = (id) => {
  // index.deleteObject(id);
};

const addRestaurant = () => {};

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default App;
