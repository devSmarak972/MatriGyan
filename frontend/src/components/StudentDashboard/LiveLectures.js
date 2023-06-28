import React from "react";
import { motion } from "framer-motion";
import LiveLecture from "./LiveLecture";

const LiveLectures = () => {
  return (
    <div className="col-span-12 sm:col-span-6 lg:col-span-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100">
          Live Lectures
        </h2>
        <a
          href="#"
          class="border-b border-dotted border-current pb-0.5 text-xs+ font-medium text-primary outline-none transition-colors duration-300 hover:text-primary/70 focus:text-primary/70 dark:text-accent-light dark:hover:text-accent-light/70 dark:focus:text-accent-light/70">
          View All
        </a>
      </div>
      <div className="mt-3 flex flex-col justify-between space-y-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}>
          <LiveLecture
            start={new Date("2022-06-20 10:00:00")}
            end={new Date("2022-06-20 13:00:00")}
          />
        </motion.div>
        <motion.div
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}>
          <LiveLecture
            start={new Date("2024-06-20 10:00:00")}
            end={new Date("2024-06-20 13:00:00")}
          />
        </motion.div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}>
          <LiveLecture
            start={new Date("2023-06-15 2:00:00")}
            end={new Date("2023-07-15 13:00:00")}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default LiveLectures;
