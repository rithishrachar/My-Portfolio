import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const qualification = [
  {
    role: "Master of Computer Applications (MCA)",
    company: "Shree Devi Institute of Technology",
    duration: "Feb 2024 - Nov 2025 (CGPA: 9.22)",
    description:
      "Completed MCA with a focus on full-stack development, cloud computing and data analytics. Built practical projects and maintained strong academic performance (CGPA 9.22)."
  },
  {
    role: "Bachelor of Computer Applications (BCA)",
    company: "Sri Bhuvanendra College, Karkala",
    duration: "June 2021 - Nov 2023 (72.11%)",
    description:
      "Completed BCA with solid foundations in programming and databases. Completed web development and backend integration projects."
  },
  {
    role: "Pre-University Course (PUC)",
    company: "Shri Bhuvanendra PU College",
    duration: "2018 - 2019 (74.5%)",
    description:
      "PUC (Science with Computer Science) — strong performance in core subjects and active in extracurriculars."
  },
  {
    role: "Secondary School Leaving Certificate (SSLC)",
    company: "Jnana Sudha High School",
    duration: "2017 - 2018 (79.52%)",
    description:
      "Completed SSLC with good academic record and participation in school activities."
  }
];

function QualificationItem({ exp, idx, start, end, scrollYProgress, layout }) {
  const scale = useTransform(scrollYProgress, [start, end], [0, 1]);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], [idx % 2 === 0 ? 30 : -30, 0]);
  const x = useTransform(scrollYProgress, [start, end], [-24, 0]);

  if (layout === "desktop") {
    return (
      <div className="relative flex flex-1 justify-center items-center min-w-0">
        <motion.div
          className="z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
          style={{ scale, opacity }}
        />
        <motion.div
          className={`absolute ${idx % 2 === 0 ? "-top-8" : "-bottom-8"} w-[3px] bg-white/40`}
          style={{ height: 40, opacity }}
        />
        <motion.article
          className={`absolute ${idx % 2 === 0 ? "bottom-12" : "top-12"}
       bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-7 w-[320px] shadow-lg`}
          style={{ opacity, y, maxWidth: "90vw" }}
          transition={{ duration: 0.4, delay: idx * 0.15 }}
        >
          <h3 className="text-xl font-semibold leading-tight">{exp.role}</h3>

          {/* company + duration: company can wrap, duration kept on one line */}
          <p className="text-sm text-gray-400 mt-2 mb-3 leading-relaxed">
            <span className="break-words">{exp.company}</span>
            <span className="mx-2">|</span>
            <span className="whitespace-nowrap">{exp.duration}</span>
          </p>

          <p className="text-md text-gray-300 break-words leading-relaxed">{exp.description}</p>
        </motion.article>
      </div>
    );
  }

  return (
    <div className="relative flex items-start">
      <motion.div
        className="absolute -left-[14px] top-3 z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
        style={{ scale, opacity }}
      />
      <motion.article
        className="bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 w-[90vw] max-w-sm ml-6 shadow-lg"
        style={{ opacity, x }}
        transition={{ duration: 0.4, delay: idx * 0.15 }}
      >
        <h3 className="text-lg font-semibold break-words leading-tight">{exp.role}</h3>

        {/* mobile: same non-wrapping duration */}
        <p className="text-xs text-gray-400 mt-2 mb-3 break-words leading-relaxed">
          <span className="break-words">{exp.company}</span>
          <span className="mx-2">|</span>
          <span className="whitespace-nowrap">{exp.duration}</span>
        </p>

        <p className="text-sm text-gray-300 break-words leading-relaxed">{exp.description}</p>
      </motion.article>
    </div>
  );
}

export default function Qualification() {
  const sceneRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const SCENE_HEIGHT_VH = isMobile ? 160 * qualification.length : 120 * qualification.length;

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"]
  });

  const thresholds = useMemo(() => qualification.map((_, i) => (i + 1) / qualification.length), []);
  const linSize = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  return (
    <section id="qualification" className="relative bg-black text-white">
      <div
        ref={sceneRef}
        style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh" }}
        className="relative"
      >
        <div className="sticky top-0 h-screen flex flex-col">
          <h2 className="text-4xl sm:text-5xl font-semibold mt-5 text-center">Qualification</h2>
          <div className="flex flex-1 items-center justify-center px-6 pb-10">
            {!isMobile && (
              <div className="relative w-full max-w-7xl">
                <div className="relative h-[6px] bg-white/15 rounded">
                  <motion.div
                    className="absolute left-0 top-0 h-[6px] bg-white rounded origin-left"
                    style={{ width: linSize }}
                  />
                </div>
                <div className="relative flex justify-between mt-0">
                  {qualification.map((exp, idx) => (
                    <QualificationItem
                      key={idx}
                      exp={exp}
                      idx={idx}
                      start={idx === 0 ? 0 : thresholds[idx - 1]}
                      end={thresholds[idx]}
                      scrollYProgress={scrollYProgress}
                      layout="desktop"
                    />
                  ))}
                </div>
              </div>
            )}

            {isMobile && (
              <div className="relative w-full max-w-md">
                <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-white/15 rounded">
                  <motion.div
                    className="absolute top-0 left-0 w-[6px] bg-white rounded origin-top"
                    style={{ height: linSize }}
                  />
                </div>
                <div className="relative flex flex-col gap-10 ml-10 mt-6 pb-28">
                  {qualification.map((exp, idx) => (
                    <QualificationItem
                      key={idx}
                      exp={exp}
                      idx={idx}
                      start={idx === 0 ? 0 : thresholds[idx - 1]}
                      end={thresholds[idx]}
                      scrollYProgress={scrollYProgress}
                      layout="mobile"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
