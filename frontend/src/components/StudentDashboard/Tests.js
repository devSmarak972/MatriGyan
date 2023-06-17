import React from "react";
import Test from "./Test";

const Tests = () => {
  return (
    <div className="col-span-12 flex flex-col sm:col-span-6 lg:col-span-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100">
          Attempted Tests
        </h2>
      </div>
      <div className="mt-3 space-y-4 sm:mt-5 lg:mt-6">
        <Test
          title="Electrochemistry"
          questions={20}
          time={120}
          start={new Date("2022-06-20 10:00:00")}
          totalmarks={80}
          marks={64}
        />
        <Test
          title="Mechanics II"
          questions={20}
          time={120000}
          start={new Date("2023-06-15 10:00:00")}
          totalmarks={80}
          marks={51}
        />
        <Test
          title="Carboxylic Acids"
          questions={20}
          time={12000}
          start={new Date("2023-06-15 10:00:00")}
          totalmarks={80}
        />
        <Test
          title="Carboxylic Acids"
          questions={20}
          time={120}
          start={new Date("2023-09-15 10:00:00")}
          totalmarks={80}
        />
      </div>
    </div>
  );
};

export default Tests;
