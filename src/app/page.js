"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      className="pt-24 px-6 md:px-12 text-white"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
        Bruno Designer
      </h1>
      <p className="mt-6 max-w-xl text-white/60 text-sm md:text-base">
        Designer & Desenvolvedor Front-end. Interfaces modernas, estética
        minimalista e credibilidade para marcas exigentes.
      </p>
    </motion.div>
  );
}
