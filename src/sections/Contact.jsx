

import ParticlesBackground from "../components/ParticlesBackground";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import Astra from "../assets/Astra.png";


const SERVICE_ID = "ServiceKey";
const TEMPLATE_ID = "templateKey";
const PUBLIC_KEY = "publicKey";

export default function Contact() {
  
  useEffect(() => {
    try {
      emailjs.init(PUBLIC_KEY);
    } catch (err) {
      console.error("Failed to init EmailJS:", err);
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const required = ["name", "email", "message"];
    const newErrors = {};
    required.forEach((field) => {
      if (!formData[field].trim()) newErrors[field] = "Fill this field";
    });
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStatus("sending");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          ...formData,
          from_name: formData.name,
          reply_to: formData.email
        }
      );

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });

      setTimeout(() => setStatus(""), 4000);
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus("error");
      setTimeout(() => setStatus(""), 4000);
    }
  };

  return (
    <section
      id="contact"
      className="w-full min-h-screen relative bg-black overflow-hidden text-white py-10 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10"
    >
      <ParticlesBackground />

      <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto">
        {/* Left Image */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.img
            src={Astra}
            alt="Contact"
            className="w-72 md:w-140 rounded-2xl shadow-lg object-cover"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Right Form */}
        <motion.div
          className="w-full md:w-2/3 bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-semibold mb-3">Let's Work Together</h2>
          <p className="text-gray-300 mb-6">
            I'm a fresher eager to learn and collaborate. Send me a message about your idea, project,
            or opportunity—I'd love to hear from you!
          </p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className={`p-3 rounded-md bg-white/8 border ${
                  errors.name ? "border-red-500" : "border-gray-600"
                } text-white focus:outline-none focus:ring-2 focus:ring-blue-400`}
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className={`p-3 rounded-md bg-white/8 border ${
                  errors.email ? "border-red-500" : "border-gray-600"
                } text-white focus:outline-none focus:ring-2 focus:ring-blue-400`}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>

            {/* Subject  */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm">Subject (optional)</label>
              <input
                type="text"
                name="subject"
                placeholder="Example: Job Opportunity / Project Idea"
                value={formData.subject}
                onChange={handleChange}
                className="p-3 rounded-md bg-white/8 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                rows="5"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                className={`p-3 rounded-md bg-white/8 border ${
                  errors.message ? "border-red-500" : "border-gray-600"
                } text-white focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none`}
              />
              {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
            </div>

            {/* Send Button & Status */}
            <div className="flex  flex-col mt-1 gap-3">
              <div className="text-sm">
                {status === "sending" && <span className="text-yellow-300">Sending…</span>}
                {status === "success" && <span className="text-green-400">Message sent — thank you!✅</span>}
                {status === "error" && <span className="text-red-400">Failed to send. Try again later❌</span>}
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className={`px-5 py-2 rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium hover:from-blue-600 hover:to-indigo-600 transition disabled:opacity-60`}
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
