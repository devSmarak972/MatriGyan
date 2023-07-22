import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Course from "./Course";

const CurrentCourses = (props) => {
  const ref = useRef(null);
  var type = props.type;
  const [slides, setSlides] = useState(0);
  // var courses;
  // if(props.courses)
  // courses=
  // console.log(courses)
  // var courses = [
  //   {
  //     percent: 100,
  //     coursename: "Basic Mathematics - I",
  //     educator: "Anand Yadav",
  //     image: "https://i.ytimg.com/vi/dfUDCgaFOBE/maxresdefault.jpg",
  //   },
  //   {
  //     percent: 90,
  //     coursename: "JEE Mains Physics Crash Course",
  //     educator: "Mridul Nayak",
  //     image:
  //       "https://www.careerorbits.com/wp-content/uploads/2022/04/JMCC-page-thumbnail.jpg",
  //   },
  //   {
  //     percent: 45,
  //     coursename: "JEE Advanced PYQ rapid",
  //     educator: "Adarsh Gupta",
  //     image:
  //       "https://score-cdn-devinfinitylearn.s3.ap-south-1.amazonaws.com/Ilwebsite/Autopayment/jeeAdvancedThb.webp",
  //   },
  //   {
  //     percent: 50,
  //     coursename: "JEE Mains Success Achiever Course",
  //     educator: "Anand Yadav",
  //     image:
  //       "https://www.vedantu.com/seo/learning-videos/18aa5c5d-1fb7-41ee-b091-bc65f1a72865.png",
  //   },
  // ];
  useLayoutEffect(() => {
    setSlides(() => {
      // let width = ref.current.offsetWidth;
      let width = window.innerWidth;
      if (width < 500) return 1;
      else if (width < 750) return 2;
      else if (width < 1500) return 2.3;
      else return 3.3;
    });
  }, []);

  // useEffect(() => {
  //   function handleWindowResize() {
  //     setSlides(() => {
  //       let width = ref.current.offsetWidth;
  //       console.log(width);
  //       if (width < 500) return 1;
  //       else if (width < 900) return 2;
  //       else if (width < 1400) return 2.3;
  //       else return 3.3;
  //     });
  //   }

  //   window.addEventListener("resize", handleWindowResize);

  //   return () => {
  //     window.removeEventListener("resize", handleWindowResize);
  //   };
  // }, []);

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
        <a
          href="/educator/contents"
          class="pb-0.5 text-xs+ font-medium text-primary outline-none transition-colors duration-300 hover:text-primary/70 focus:text-primary/70 dark:text-accent-light dark:hover:text-accent-light/70 dark:focus:text-accent-light/70"
        >
          View All
        </a>
      </div>
      <div className="flex">
        <div
          ref={ref}
          className="swiper w-full mx-0 mt-4 px-[var(--margin-x)] transition-all duration-[.25s]"
        >
          <swiper-container
            className="swiper-wrapper"
            slides-per-view={slides}
            space-between="25"
          >
            {props.courses && props.courses.length !== 0 ? (
              props.courses
                .map((el) => {
                  return {
                    rating: el.rating,
                    enrolled: el.enrolled,
                    ongoing: el.ongoing,
                    coursename: el.title,
                    percent: parseInt(Math.random() * 90 + 10),
                    educator: el.educator.name,
                    image: el.image
                      ? el.image
                      : "https://i.ytimg.com/vi/dfUDCgaFOBE/maxresdefault.jpg",
                    duration: el.duration ? el.duration : 0,
                    id: el.id,
                  };
                })
                .map((el) => {
                  return (
                    <swiper-slide>
                      <Course
                        key={el.coursename + "_" + el.id}
                        {...el}
                        type={type}
                      />
                    </swiper-slide>
                  );
                })
            ) : (
              <p className="noHoverCard w-full card p-4 mb-2 h-auto justify-center flex flex-col gap-y-2 col-span-2">
                {props.type === "educator"
                  ? "Create courses to see them in dashboard!"
                  : "Enrol in a course to see them in dashboard!"}
              </p>
            )}
          </swiper-container>
        </div>
      </div>
    </div>
  );
};

export default CurrentCourses;
