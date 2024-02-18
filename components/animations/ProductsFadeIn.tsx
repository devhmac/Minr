"use client";
import { motion } from "framer-motion";

import React from "react";

const ProductsFadeIn = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      // initial="offscreen"
      whileInView={{ opacity: 1, y: 0 }}
      // whileInView="onscreen"
      viewport={{ once: true }}
      // animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default ProductsFadeIn;
