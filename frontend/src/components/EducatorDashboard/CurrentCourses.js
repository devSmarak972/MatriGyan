import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/fontawesome-free-solid"
import Course from "./Course";

const CurrentCourses = () => {
  const ref = useRef(null);

  const [slides, setSlides] = useState(0);

  useLayoutEffect(() => {
    setSlides(() => {
      let width = ref.current.offsetWidth;
      console.log(width);
      if (width < 500) return 1;
      else if (width < 750) return 1.3;
      else if (width < 1500) return 2.3;
      else return 3.3;
    });
  }, []);

  useEffect(() => {
    function handleWindowResize() {
      setSlides(() => {
        let width = ref.current.offsetWidth;
        console.log(width);
        if (width < 500) return 1;
        else if (width < 900) return 1.3;
        else if (width < 1400) return 2.3;
        else return 3.3;
      });
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div transition={{ duration: 0.5, staggerChildren: 0.5 }}>
      <div className="flex justify-between mt-5 px-[var(--margin-x)] transition-all duration-[.25s]">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100"
        >
          My Courses
        </motion.p>
        <Link
          to="#"
          className="flex justify-center gap-2 items-center px-4 py-2 bg-[var(--primary)] text-white font-semibold rounded-lg hover:scale-105"
        >
          <FontAwesomeIcon icon={faPlus} style={{ color: "#ffffff" }} />
          <span>New Course</span>
        </Link>
      </div>
      <div className="flex">
        <div
          ref={ref}
          className="swiper mx-0 mt-4 px-[var(--margin-x)] transition-all duration-[.25s]"
        >
          <swiper-container
            className="swiper-wrapper"
            slides-per-view={slides}
            space-between="25"
          >
            <swiper-slide>
              <Course percent={20} />
            </swiper-slide>
            <swiper-slide>
              <Course percent={40} />
            </swiper-slide>
            <swiper-slide>
              <Course percent={90} />
            </swiper-slide>
            <swiper-slide>
              <Course percent={55} />
            </swiper-slide>
            <swiper-slide>
              <Course percent={5} />
            </swiper-slide>
          </swiper-container>
        </div>
      </div>
    </div>
  );
};

export default CurrentCourses;
