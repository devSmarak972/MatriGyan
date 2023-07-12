import React from "react";
import Column from "./Column";
import { useState } from "react";

function Row(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [courses, setCourses] = useState(props.courses);

  const [isTransitioning, setIsTransitioning] = useState(false);

  const coursesPerPage = 4;
  const totalPages = Math.ceil(props.courseData.length / coursesPerPage);

  const handleClickNext = () => {
    if (currentPage < totalPages) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage((prevPage) => prevPage + 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handleClickPrev = () => {
    if (currentPage > 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage((prevPage) => prevPage - 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const renderCourseCards = () => {
    const startIndex = (currentPage - 1) * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;
    const currentCourses = props.courseData.slice(startIndex, endIndex);

    return currentCourses.map((course, index) => (

      <Column key={course.id} course={course} isTransitioning={isTransitioning}/>

    ));
  };

  return (
    <>
      <div className="row card-group-row">{renderCourseCards()}</div>
      <div className="mb-32pt">
        <ul className="pagination justify-content-start pagination-xsm m-0">
          <li className="page-item">
            <button
              className="page-link"
              aria-label="Previous"
              onClick={handleClickPrev}
              disabled={currentPage === 1}
            >
              <span aria-hidden="true" className="material-icons text-sm">
                chevron_left
              </span>
              <span className="text-sm">Prev</span>
            </button>
          </li>
          <li className="page-item">
            <span className="page-link text-sm">{currentPage}</span>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              aria-label="Next"
              onClick={handleClickNext}
              disabled={currentPage === totalPages}
            >
              <span className="text-sm">Next</span>
              <span aria-hidden="true" className="material-icons text-sm">
                chevron_right
              </span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Row;
