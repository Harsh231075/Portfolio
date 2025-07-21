// components/common/SectionWrapper.js
"use client";
import { motion } from "framer-motion";

export default function SectionWrapper({ children, className = "" }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
