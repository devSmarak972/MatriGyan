import React from "react";
import Test from "./Test";

const Tests = (props) => {
  console.log("test",props)
 // col-span-12 flex flex-col sm:col-span-6 lg:col-span-4
  return (
    <div className="col-span-12 sm:col-span-6 lg:col-span-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100">
          Attempted Tests
        </h2>
        <a
          href="#"
          class="border-b border-dotted border-current pb-0.5 text-xs+ font-medium text-primary outline-none transition-colors duration-300 hover:text-primary/70 focus:text-primary/70 dark:text-accent-light dark:hover:text-accent-light/70 dark:focus:text-accent-light/70"
        >
          View All
        </a>
      </div>
      <div className="mt-3 space-y-4 sm:mt-5 lg:mt-6">
        {props.attempted
          ? props.attempted.map((el) => {
             return  <Test
                title={el.quiz.name}
                questions={el.quiz.questions.length}
                time={el.quiz.time}
                start={new Date("2022-06-20 10:00:00")}
                totalmarks={el.quiz.total_marks}
                marks={el.obtained_marks}
              />;
            })
          :<p>No tests attempted</p>}
        {props.tests
          ? props.tests.map((el) => {

            return  <Test
                title={el.name}
                questions={el.number_of_questions}
                time={el.time}
                start={new Date("2022-06-20 10:00:00")}
                totalmarks={el.total_marks}
               
              />;
            })
          : "No Tests"}
        
        
      </div>
    </div>
  );
};

export default Tests;
