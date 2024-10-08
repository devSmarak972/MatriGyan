import React from "react";
import Sidebar from "../components/StudentDashboard/Sidebar";

const EditQuizPage = () => {
  return (
    <>
    <Sidebar />
      <div className="tw-page">
        <div class="page-section border-bottom-2">
          <div class="container page__container">
            <div class="row align-items-start">
              <div class="col-md-8">
                <div class="page-separator">
                  <div class="page-separator__text">Questions</div>
                </div>
                <ul class="list-group stack mb-40pt">
                  <li class="list-group-item d-flex">
                    <i class="fa-solid fa-grip-lines"></i>
                    <div class="flex d-flex flex-column">
                      <div class="card-title mb-4pt">Question 1 of 2</div>
                      <div class="card-subtitle text-70 paragraph-max mb-16pt">
                        An angular 2 project written in typescript is*
                        transpiled to javascript duri*ng the build process.
                        Which of the following additional features are provided
                        to the developer while programming on typescript over
                        javascript?
                      </div>
                      <div>
                        <a
                          href="#"
                          class="chip chip-light d-inline-flex align-items-center"
                        >
                          <i class="material-icons icon-16pt icon--left">
                            keyboard_arrow_down
                          </i>{" "}
                          Answers
                        </a>
                        <div class="chip chip-outline-secondary">
                          Single Answer
                        </div>
                      </div>
                    </div>
                    <span class="text-muted mx-12pt">800 pt</span>

                    <div class="dropdown">
                      <a
                        href="#"
                        data-toggle="dropdown"
                        data-caret="false"
                        class="text-muted"
                      >
                        <i class="material-icons">more_horiz</i>
                      </a>
                      <div class="dropdown-menu dropdown-menu-right">
                        <a href="javascript:void(0)" class="dropdown-item">
                          Edit Question
                        </a>
                        <div class="dropdown-divider"></div>
                        <a
                          href="javascript:void(0)"
                          class="dropdown-item text-danger"
                        >
                          Delete Question
                        </a>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item d-flex">
                    <i class="material-icons text-70 icon-16pt icon--left">
                      drag_handle
                    </i>
                    <div class="flex d-flex flex-column">
                      <div class="card-title mb-4pt">Question 2 of 2</div>
                      <div class="card-subtitle text-70 paragraph-max mb-8pt">
                        What will be the output of below program?
                      </div>
                      \
                      <div class="d-flex">
                        <a
                          href=""
                          class="chip chip-light d-inline-flex align-items-center"
                        >
                          <i class="material-icons icon-16pt icon--left">
                            keyboard_arrow_down
                          </i>{" "}
                          Answers
                        </a>
                        <div class="chip chip-outline-secondary">
                          Single Answer
                        </div>
                        <div class="chip chip-outline-secondary">Code</div>
                      </div>
                    </div>
                    <span class="text-muted mx-12pt">800 pt</span>

                    <div class="dropdown">
                      <a
                        href="#"
                        data-toggle="dropdown"
                        data-caret="false"
                        class="text-muted"
                      >
                        <i class="material-icons">more_horiz</i>
                      </a>
                      <div class="dropdown-menu dropdown-menu-right">
                        <a href="javascript:void(0)" class="dropdown-item">
                          Edit Question
                        </a>
                        <div class="dropdown-divider"></div>
                        <a
                          href="javascript:void(0)"
                          class="dropdown-item text-danger"
                        >
                          Delete Question
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>

                <div class="page-separator">
                  <div class="page-separator__text">New Question</div>
                </div>
                <div class="card card-body">
                  <div class="form-group">
                    <label class="form-label">Question</label>
                    <div
                      style={{ height: "150px" }}
                      class="mb-0"
                      data-toggle="quill"
                      data-quill-placeholder="Question"
                    >
                      An angular 2 project written in typescript is* transpiled
                      to javascript duri*ng the build process. Which of the
                      following additional features are provided to the
                      developer while programming on typescript over javascript?
                    </div>
                    <small class="form-text text-muted">
                      Shortly describe the question.
                    </small>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Question Type</label>
                    <select name="category" class="form-control custom-select">
                      <option value="vuejs">Multiple Answer</option>
                      <option value="vuejs">Single Answer</option>
                      <option value="vuejs">Essay</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="select01">
                      Answers
                    </label>
                    <select
                      id="select01"
                      data-toggle="select"
                      data-multiple="true"
                      multiple="multiple"
                      class="form-control"
                    >
                      <option selected="">My first option</option>
                      <option selected="">Another option</option>
                      <option>Third option is here</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Completion Points</label>
                    <input type="text" class="form-control" value="1000" />
                  </div>
                  <div>
                    <a href="#" class="btn btn-outline-secondary">
                      Add Question
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card">
                  <div class="card-header text-center">
                    <a href="#" class="btn btn-accent">
                      Save changes
                    </a>
                  </div>
                  <div class="list-group list-group-flush">
                    <div class="list-group-item d-flex">
                      <a class="flex" href="#">
                        <strong>Save Draft</strong>
                      </a>
                      <i class="material-icons text-muted">check</i>
                    </div>
                    <div class="list-group-item">
                      <a href="#" class="text-danger">
                        <strong>Delete Quiz</strong>
                      </a>
                    </div>
                  </div>
                </div>

                <div class="page-separator">
                  <div class="page-separator__text">Courses</div>
                </div>
                <div class="card">
                  <div class="card-body">
                    <div class="form-group mb-0">
                      <label class="form-label">Add to course</label>
                      <select
                        name="course"
                        id="course"
                        data-toggle="select"
                        data-tags="false"
                        data-multiple="true"
                        data-minimum-results-for-search="0"
                        class="form-control"
                        data-placeholder="Select course ..."
                      >
                        <option
                          data-avatar-src="../../public/images/paths/angular_40x40@2x.png"
                          selected=""
                        >
                          Angular Fundamentals
                        </option>
                        <option data-avatar-src="../../public/images/paths/swift_40x40@2x.png">
                          Build an iOS Application in Swift
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditQuizPage;
