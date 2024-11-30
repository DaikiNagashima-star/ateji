import React from 'react';
import { motion } from 'framer-motion';

const sliderVariants = {
  initial: {
    x: 0,
  },
  animate: {
    x: "-220%",
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 1000,
      ease: "linear",
    },
  },
};

const exampleKanji = [
  { kanji: "美紀", reading: "miki", meaning: "Beautiful Chronicles" },
  { kanji: "光輝", reading: "kouki", meaning: "Radiant Light" },
  { kanji: "和心", reading: "washin", meaning: "Peaceful Heart" },
  { kanji: "翔太", reading: "shouta", meaning: "Soaring Sun" },
  { kanji: "真理", reading: "mari", meaning: "Truth and Justice" },
  { kanji: "春花", reading: "haruka", meaning: "Spring Flower" },
  { kanji: "智子", reading: "tomoko", meaning: "Wise Child" },
  { kanji: "大和", reading: "yamato", meaning: "Great Harmony" },
  { kanji: "恵美", reading: "megumi", meaning: "Blessed Beauty" },
  { kanji: "誠司", reading: "seiji", meaning: "Sincere Leader" }
];

export function SlidingKanji() {
  return (
    <div className="relative w-full overflow-hidden h-32 bg-gradient-to-b from-slate-900/50 to-transparent">
      <motion.div
        className="absolute whitespace-nowrap py-4"
        variants={sliderVariants}
        initial="initial"
        animate="animate"
      >
        {[...exampleKanji, ...exampleKanji].map((item, index) => (
          <span
            key={index}
            className="inline-block mx-16 text-center"
          >
            <span className="block text-white/60 text-2xl font-japanese mb-1">
              {item.kanji} ({item.reading})
            </span>
            <span className="block text-white/40 text-sm">
              {item.meaning}
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}