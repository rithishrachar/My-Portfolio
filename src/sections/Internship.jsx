import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import certImg from "../assets/cert.jpg";

const internships = [
  {
    role: "Full-Stack Developer Intern",
    company: "Accolade Tech Solutions, Mangalore",
    duration: "Nov 2024 - Jan 2025",
    tech: ["React", "Node.js", "MongoDB", "Express", "CI/CD"],
    description: "As a Full-Stack Developer Intern at Accolade Tech Solutions, I worked on developing a MERN-based License Management System used for internal workflow automation. My primary role involved building RESTful API endpoints with Node.js/Express, designing secure authentication modules using JWT, and creating responsive React components for dashboards and user management screens. I structured and optimized MongoDB schemas, implemented server-side validation, and improved API response times through efficient querying and middleware. On the frontend, I developed reusable UI components, implemented protected routing, and ensured smooth user interactions across devices. Beyond feature development, I contributed to CI/CD automation with GitHub Actions, assisted in containerizing the application using Docker, and participated in code reviews and debugging sessions. This experience helped me gain real-world expertise in full-stack engineering, collaboration, deployment pipelines, and production-grade application design."
  }
  
];

export default function Internship() {
  const sceneRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleIndex, setVisibleIndex] = useState(0); 

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // useScroll for subtle parallax on the image
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start end", "end start"] // image reacts while section moves
  });

  // image scales slightly and moves on scroll (parallax feel)
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.06, 0.98]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0px", "-18px"]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);

  const internship = internships[visibleIndex];

  return (
    <section id="internship" className="relative bg-black text-white py-16">
      <div ref={sceneRef} className="container mx-auto px-6">
        {/* Centered, larger title */}
        <motion.h2 
          className="text-5xl md:text-6xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {internship.role}
        </motion.h2>

        {/* Desktop two-column layout */}
        <div className="hidden md:flex gap-8 items-start flex-col-reverse md:flex-row">
          {/* Left: certificate image full-width without card */}
          <motion.div
            style={{ scale: imgScale, y: imgY, opacity: imgOpacity }}
            className="flex-shrink-0 w-full md:w-2/5"
            initial={{ opacity: 0.6, scale: 1.03 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <img
              src={certImg}
              alt="Internship Certificate"
              className="w-full h-auto object-cover rounded-lg shadow-2xl"
              onError={(e) => {
                e.currentTarget.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='100%25' height='100%25' fill='%23222626'/%3E%3Ctext x='50%25' y='50%25' fill='%23aaa' font-size='18' text-anchor='middle' dominant-baseline='middle'%3ECertificate%20not%20found%3C/text%3E%3C/svg%3E";
              }}
            />
            <p className="mt-3 text-xs text-gray-400 text-center">Certificate of completion — Accolade Tech Solutions</p>
          </motion.div>

          {/* Right: details card */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="rounded-2xl p-8 bg-gradient-to-b from-white/4 to-white/2 border border-white/6 shadow-2xl">
              <p className="text-base text-gray-400 mb-4 font-semibold">
                <span className="font-medium text-gray-200">{internship.company}</span>
                <span className="mx-2">|</span>
                <span className="whitespace-nowrap">{internship.duration}</span>
              </p>

              <p className="text-base text-gray-300 leading-relaxed mb-6 text-justify">{internship.description}</p>

              <div className="flex flex-wrap gap-2">
                {internship.tech.map((t, i) => (
                  <span
                    key={i}
                    className="text-sm px-3 py-1 rounded-full bg-black/30 border border-white/6 text-gray-200"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-4">
                <a
                  href={certImg}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block px-4 py-2 rounded-md bg-white/6 border border-white/8 text-sm hover:bg-white/10 transition"
                >
                  View Certificate
                </a>

                <a
                  href={certImg}
                  download="internship-certificate.jpg"
                  className="inline-block px-4 py-2 rounded-md bg-gradient-to-r from-green-500/20 to-blue-500/10 text-sm border border-white/6 hover:from-green-500/30 hover:to-blue-500/20 transition"
                >
                  Download
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile stacked layout */}
        <div className="md:hidden flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0.8, scale: 0.98, y: 12 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-2xl overflow-hidden border border-white/8 shadow-lg"
          >
            <img
              src={certImg}
              alt="Internship Certificate"
              className="w-full h-56 object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='100%25' height='100%25' fill='%23222626'/%3E%3Ctext x='50%25' y='50%25' fill='%23aaa' font-size='18' text-anchor='middle' dominant-baseline='middle'%3ECertificate%20not%20found%3C/text%3E%3C/svg%3E";
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-2xl p-5 bg-gradient-to-b from-white/4 to-white/2 border border-white/6 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-1">{internship.role}</h3>
            <p className="text-xs text-gray-400 mb-3">
              <span className="font-medium text-gray-200">{internship.company}</span>
              <span className="mx-2">|</span>
              <span className="whitespace-nowrap">{internship.duration}</span>
            </p>

            <p className="text-gray-300 leading-relaxed mb-4">{internship.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {internship.tech.map((t, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 rounded-full bg-black/30 border border-white/6 text-gray-200"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              <a
                href={certImg}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 rounded-md bg-white/6 border border-white/8 text-sm"
              >
                View
              </a>
              <a
                href={certImg}
                download="internship-certificate.jpg"
                className="px-3 py-1 rounded-md bg-gradient-to-r from-green-500/20 to-blue-500/10 text-sm border border-white/6"
              >
                Download
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
