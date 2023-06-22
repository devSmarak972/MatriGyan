import React from "react";
import { ResponsiveTimeRange } from "@nivo/calendar";

const Graph2 = (props) => {
  return (
    <ResponsiveTimeRange
      data={props.data}
      from={props.year + "-01-01"}
      to={props.year + "-12-31"}
      emptyColor="#eeeeee"
      colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
      margin={{ top: 40, right: 0, bottom: 0, left: 0 }}
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
      weekdayLegendOffset={0}
      weekdayTicks={[]}
      legends={[
        {
          anchor: "bottom-right",
          direction: "row",
          justify: false,
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: "right-to-left",
          translateX: -60,
          translateY: -60,
          symbolSize: 20,
        },
      ]}
    />
  );
};

export default Graph2;
