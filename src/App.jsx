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

const searchClient = algoliasearch(
  "B1G2GM9NG0",
  "aadef574be1f9252bb48d4ea09b5cfe5"
);

const App = () => {
  return (
    <div className="ais-InstantSearch">
      <header className="header">
        <h1 className="header-title">
          <a href="/">algolia-cuisine</a>
        </h1>
        <p className="header-subtitle">
          using{" "}
          <a href="https://github.com/algolia/react-instantsearch">
            React InstantSearch
          </a>
        </p>
      </header>

      <InstantSearch indexName="demo_ecommerce" searchClient={searchClient}>
        <div className="left-panel">
          <ClearRefinements />
          <h2>Brands</h2>
          <RefinementList attribute="brand" />
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
      <img src={props.hit.image} align="left" alt={props.hit.name} />
      <div className="hit-name">
        <Highlight attribute="name" hit={props.hit} />
      </div>
      <div className="hit-description">
        <Highlight attribute="description" hit={props.hit} />
      </div>
      <div className="hit-price">${props.hit.price}</div>
    </div>
  );
};

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default App;
