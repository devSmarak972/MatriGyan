import React from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

const StatCard = (props) => {
  let value = props.value;
  let subtitle = props.subtitle;
  return (
    <div className="card justify-between px-4 py-3 m-0 bg-white h-32">
      <p className="font-medium">{props.title}</p>
      <div className="flex items-center justify-between">
        <div>
          <CountUp
            start={0}
            end={
              ["h", "m"].includes(value[value.length - 1])
                ? value.slice(0, value.length - 1)
                : value
            }
            decimals={props.decimal}
            duration={2.75}
            redraw={false}
          >
            {({ countUpRef, start }) => (
              <VisibilitySensor onChange={start} delayedCall>
                <div className="inline">
                  <span
                    className="text-3xl font-semibold text-slate-700 dark:text-navy-100"
                    ref={countUpRef}
                  />
                  <span className="text-3xl font-semibold text-slate-700 dark:text-navy-100">
                    {["h", "m"].includes(value[value.length - 1])
                      ? value[value.length - 1]
                      : ""}
                  </span>
                </div>
              </VisibilitySensor>
            )}
          </CountUp>

          {subtitle && (
            <CountUp
              start={0}
              end={
                ["h", "m"].includes(subtitle[subtitle.length - 1])
                  ? subtitle.slice(0, subtitle.length - 1)
                  : subtitle
              }
              decimals={props.subtitle}
              duration={2.75}
              redraw={false}
            >
              {({ countUpRef, start }) => (
                <VisibilitySensor onChange={start} delayedCall>
                  <div className="inline">
                    <span
                      className="ml-1 text-xl font-semibold text-slate-700 dark:text-navy-100"
                      ref={countUpRef}
                    />
                    <span className="text-xl font-semibold text-slate-700 dark:text-navy-100">
                      {["h", "m"].includes(subtitle[subtitle.length - 1])
                        ? subtitle[subtitle.length - 1]
                        : ""}
                    </span>
                  </div>
                </VisibilitySensor>
              )}
            </CountUp>
          )}
          {props.den && <span>{" / " + props.den}</span>}
        </div>
        {props.icon}
      </div>
    </div>
  );
};

export default StatCard;
