import React from "react";
import { ResponsiveBump } from "@nivo/bump";
import data from "../data/course-ranking.json";

const Graph3 = (props) => {
  // {
  //   "id": "Electrochemistry",
  //     "data": [
  //       {
  //         "x": 2000,
  //         "y": 2
  //       },
  //       {
  //         "x": 2001,
  //         "y": 7
  //       },
  //       {
  //         "x": 2002,
  //         "y": 8
  //       },
  //       {
  //         "x": 2003,
  //         "y": 2
  //       },
  //       {
  //         "x": 2004,
  //         "y": 2
  //       }
  //     ]
  //   },
  // console.log(props.courses)
 var data1= props.courses?props.courses.sort((a,b)=>a.rating<b.rating).map((el,id)=>{
  var date=new Date();
  var year=date.getFullYear();
  var gdata=[]
  for(var i=4;i>=0;i--)
  {
    gdata.push({"x":year-i,"y":id+1})
  }
  return {
    "id":el.title,
    data:gdata
  }
 }):data;
  return (
   
    <ResponsiveBump
      data={data1}
      colors={{ scheme: "spectral" }}
      lineWidth={3}
      activeLineWidth={6}
      inactiveLineWidth={3}
      inactiveOpacity={0.15}
      pointSize={10}
      activePointSize={16}
      inactivePointSize={0}
      pointColor={{ theme: "background" }}
      pointBorderWidth={3}
      activePointBorderWidth={3}
      pointBorderColor={{ from: "serie.color" }}
      axisTop={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: -36,
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "ranking",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      margin={{ top: 40, right: 100, bottom: 40, left: 50 }}
      axisRight={null}
    />
  );
};

export default Graph3;
