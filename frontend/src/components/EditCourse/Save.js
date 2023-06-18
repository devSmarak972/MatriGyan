import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Save = () => {
  return (
    <div className="card m-auto rounded-md bg-white">
      <div className="card-header text-center rounded-md bg-transparent">
        <button className="mt-2 text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm py-2.5 px-3 mr-2 mb-2 ">
          Save Changes
        </button>
      </div>
      <div className="list-group list-group-flush rounded-md bg-transparent">
        <div className="list-group-item flex justify-between bg-transparent">
          <Link className="flex w-full" to="#">
            Save Draft
          </Link>
          <FontAwesomeIcon icon={faCheck} />
        </div>
        <div className="list-group-item rounded-b-lg hover:bg-red-100 ease-in-out duration-300">
          <Link to="#" className="text-danger flex w-full font-semibold ">
            Delete Course
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Save;
