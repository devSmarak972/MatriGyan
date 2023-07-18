import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Save = (props) => {
  const title= props.name;
  const description = props.desc;
  const category = props.category;
  const tags = props.tags;
  const params = useParams();
  const nagivate = useNavigate();
  const handlesave = () =>{
    fetch(`http://127.0.0.1:8000/edit-course/${params.ID}/`,{
        method:"post",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, description, category, tags}),
      })
      .then((result)=>{
        console.log(result);
        alert("Saved Successfully");
        nagivate(`/course/${params.ID}/edit`);
      })
  };
  const handledelete = ()=>{
    fetch(`http://127.0.0.1:8000/delete-course/${params.ID}/`,{
        method:"delete",
      })
      .then((result)=>{
        console.log(result);
        alert("Saved Successfully");
        nagivate(`/courses`);
      })
  }
  return (
    <div className="card m-auto rounded-md bg-white">
      <div className="card-header text-center rounded-md bg-transparent">
        <button className="mt-2 text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm py-2.5 px-3 mr-2 mb-2 " onClick={handlesave}>
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
          <button className="text-danger flex w-full font-semibold " onClick={handledelete}>
            Delete Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default Save;
