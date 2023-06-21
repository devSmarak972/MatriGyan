import React, { useState } from "react";
import Doubt from "./Doubt";
import { Select } from "@mantine/core";
import data from "./data/questions.json";

const Doubts = () => {
  const [sortBy, setSortBy] = useState("");
  if (sortBy === "" || sortBy === "Date") {
    //
  } else if (sortBy === "Upvotes") {
    data.sort((a, b) => b.upvotes - a.upvotes);
  }
  data = data.slice(0, Math.min(5, data.length));
  console.log(data);
  return (
    <div className="col-span-12 lg:col-span-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100">
          Doubts on Lectures
        </h2>
        <Select
          placeholder="Sort By"
          data={["Date", "Upvotes"]}
          value={sortBy}
          onChange={setSortBy}
          className="w-40"
        />
      </div>
      {data.map((e) => (
        <Doubt
          name={e.name}
          video={e.video}
          course={e.course}
          question={e.question}
          date={e.date}
          replies={e.replies}
          upvotes={e.upvotes}
        />
      ))}
    </div>
  );
};

export default Doubts;
