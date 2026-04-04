'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiMinus } from 'react-icons/fi'

type FaqItem = { question: string; answer: string }

export default function FaqAccordion({
  items,
  className = '',
}: {
  items: FaqItem[]
  className?: string
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div
            key={index}
            className="rounded-xl border border-border_one bg-white overflow-hidden"
            data-aos="fade-up"
            data-aos-delay={100 + index * 50}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between p-5 lg:p-6 text-left cursor-pointer"
            >
              <span className="font-semibold text-dark text-base lg:text-lg pr-4">
                {item.question}
              </span>
              <span className="shrink-0 w-8 h-8 rounded-full bg-primary_shade flex items-center justify-center text-primary">
                {isOpen ? <FiMinus /> : <FiPlus />}
              </span>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-5 lg:px-6 pb-5 lg:pb-6 text-text_color leading-relaxed border-t border-border_one pt-4">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
