import React from "react";

function Header({onButtonClick}) {
  return (
    <div
      className="d-flex flex-column flex-sm-row align-items-sm-center mb-24pt"
      style={{"white-space": "nowrap"}}
    >
      <small className="flex text-muted text-headings text-uppercase mr-3 mb-2 mb-sm-0 text-left">
        Displaying 4 out of 10 courses
      </small>
      <div className="w-auto ml-sm-auto table d-flex align-items-center mb-2 mb-sm-0">
      <form class="search-form navbar-search d-none d-lg-flex mr-16pt"
                          action="index.html"
                          style={{maxWidth: "230px"}}>
                        <button class="btn"
                                type="submit"><i class="material-icons">search</i></button>
                        <input type="text"
                               class="form-control"
                               placeholder="Search ..."/>
                    </form>
      </div>

      <button
        className="btn btn-sm btn-white ml-sm-16pt"
        onClick={onButtonClick}
      >
        <i className="material-icons icon--left">tune</i> Filters
      </button>
    </div>
  );
}

export default Header;
