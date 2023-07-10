import React from "react";
import { motion } from "framer-motion";
import LiveLecture from "./LiveLecture";

const LiveLectures = (props) => {
  console.log(props,"lectures renderer")
  return (
    <div className="col-span-12 sm:col-span-6 lg:col-span-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100">
          Live Lectures
        </h2>
        <a
          href="#"
          class="border-b border-dotted border-current pb-0.5 text-xs+ font-medium text-primary outline-none transition-colors duration-300 hover:text-primary/70 focus:text-primary/70 dark:text-accent-light dark:hover:text-accent-light/70 dark:focus:text-accent-light/70"
        >
          View All
        </a>
      </div>
      <div className="mt-3 flex flex-col justify-between space-y-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {props.lectures ? (
            props.lectures.map((el) => {
              return (
                <LiveLecture
                  title={el.title}
                  educator={el.teacher}
                  start={new Date(el.start)}
                  end={new Date(el.end)}
                />
              );
            })
          ) : (
            <p>No live lectures upcoming</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default LiveLectures;
