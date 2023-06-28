import React, { Component, PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  LabelList,
  CartesianGrid,
  Tooltip,
  Text,
  Legend,
  ResponsiveContainer,
} from "recharts";
import data from "../data/completion-total.json";

class CustomizedAxisTick extends PureComponent {
  render() {
    const { x, y, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <Text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          verticalAnchor="start"
          width={100}
          fill="#666"
          transform="rotate(-45)"
        >
          {payload.value}
        </Text>
      </g>
    );
  }
}

const Graph1 = () => {
  let dataModified = data.map((item) => ({
    name: item.name,
    completed: item.completed,
    inprogress: item.total - item.completed,
  }));
  dataModified.sort((a, b) => {
    return b.completed + b.inprogress - a.completed - a.inprogress;
  });
  dataModified = dataModified.slice(0, 10);
  console.log(dataModified);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={dataModified}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          interval={0}
          tick={<CustomizedAxisTick />}
          height={125}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="inprogress" stackId="a" fill="#82ca9d" />
        <Bar dataKey="completed" stackId="a" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Graph1;
