'use client';

import { motion } from 'framer-motion';
import { MusicNote } from '@mui/icons-material';

export function LandingFooter() {
  return (
    <footer className="relative border-t border-purple-500/10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
              <MusicNote className="text-white" />
            </div>
            <span className="text-xl font-bold text-white">Sonikia</span>
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-500 text-sm text-center"
          >
            Hecho por <span className="text-purple-400">Edwin Estrella</span> • {new Date().getFullYear()}
          </motion.p>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-gray-400"
          >
            PREMIUM AI MUSIC EXPERIENCE
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
