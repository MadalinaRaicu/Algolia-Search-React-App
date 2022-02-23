import algoliasearch from "algoliasearch/lite";
import React from "react";
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

const indexName = "restaurants";

const searchClient = algoliasearch(
  "8AUYHE8FKH",
  "407a9d7a00f702944e275c8f802d5d37"
);

const App = () => {
  return (
    <div className="ais-InstantSearch">
      <header className="header">
        <h1 className="header-title">
          <a href="/">Algolia Cuisine</a>
        </h1>
      </header>

      <InstantSearch indexName={indexName} searchClient={searchClient}>
        <div className="left-panel">
          <ClearRefinements />
          <h2>Food Type</h2>
          <RefinementList attribute="food_type" />
          <Configure hitsPerPage={8} />
        </div>
        <div className="right-panel">
          <SearchBox />
          <Hits hitComponent={Hit} />
          <Pagination />
        </div>
      </InstantSearch>
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
    </div>
  );
};

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default App;
