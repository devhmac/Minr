"use client";
import { motion } from "framer-motion";

import React from "react";

const ProductsFadeIn = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 2 }}

      // animate={{ y: 100 }}
    >
      {children}
    </motion.div>
  );
};

export default ProductsFadeIn;
