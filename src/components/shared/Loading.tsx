"use client";

import { PizzaSlice } from "@/assets/icons/PizzaSlice";
import { motion } from "framer-motion";
// import { PizzaSlice } from "@/components/pizza-slice";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <PizzaSlice className="h-24 w-24 text-orange-500" />
      </motion.div>
      <motion.h2
        className="mt-8 text-2xl font-bold text-orange-700"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        Loading deliciousness...
      </motion.h2>
    </div>
  );
}
