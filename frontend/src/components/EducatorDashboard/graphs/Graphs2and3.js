import React from "react";
import { useState } from "react";
import Graph2 from "./Graph2";
import Graph3 from "./Graph3";
import { Select } from "@mantine/core";
import data from "../data/viewers.json";

const Graphs = (props) => {
  let dataYear = data.map((e) => e.day.slice(0, 4));
  let set = new Set(dataYear);
  dataYear = Array.from(set);
  dataYear.sort((a, b) => b - a);

  const [year, setYear] = useState(dataYear[0]);
  console.log(year);

  return (
    <div className="mt-8 mb-12 col-span-12 gap-4 lg:col-span-12 flex flex-column mr-[var(--margin-x)]">
      <div className="h-[160px] sm:h-[300px]">
        <div className="flex justify-between">
          <span className="text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100">
            Daily Viewer Count
          </span>
          <Select
            placeholder="Choose Year"
            data={dataYear}
            transitionProps={{
              transition: "pop-top-left",
              duration: 100,
              timingFunction: "ease",
            }}
            value={year}
            onChange={setYear}
          />
        </div>
        <Graph2 data={data} year={year} />
      </div>
      <div className="mt-8 h-[300px] sm:h-[400px]">
        <span className="text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100">
          Course Rankings
        </span>
        <Graph3 courses={props.courses}/>
      </div>
    </div>
  );
};

export default Graphs;
