import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSliders} from "@fortawesome/free-solid-svg-icons";

function Header({ onButtonClick }) {
  return (
    <div
      className="d-flex flex-column flex-sm-row align-items-sm-center mb-24pt"
      style={{ "white-space": "nowrap" }}
    >
      <small className="flex text-muted text-headings text-uppercase mr-3 mb-2 mb-sm-0 text-left">
       
      </small>
      <div className="w-auto ml-sm-auto table d-flex align-items-center mb-2 mb-sm-0">
        <form
          className="search-form navbar-search d-none d-lg-flex mr-16pt"
          action="index.html"
          style={{ maxWidth: "230px" }}
        >
          <button className="btn" type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <input type="text" className="form-control" placeholder="Search ..." />
        </form>
      </div>

      <button
        className="btn btn-sm btn-white ml-sm-16pt"
        onClick={onButtonClick}
      >
        <FontAwesomeIcon icon={faSliders} className="icon--left" /> Filters
      </button>
    </div>
  );
}

export default Header;
