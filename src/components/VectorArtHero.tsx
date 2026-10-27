import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export const VectorArtHero = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Parallax tracking values from cursor hover
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring configuration for ultra-smooth movement
  const springCfg = { stiffness: 100, damping: 25, mass: 0.5 };
  const smoothX = useSpring(mouseX, springCfg);
  const smoothY = useSpring(mouseY, springCfg);

  // Map mouse positions to mild translation for distinct layers
  const baseTranslateX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const baseTranslateY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);

  const midTranslateX = useTransform(smoothX, [-0.5, 0.5], [-24, 24]);
  const midTranslateY = useTransform(smoothY, [-0.5, 0.5], [-24, 24]);

  const highTranslateX = useTransform(smoothX, [-0.5, 0.5], [-36, 36]);
  const highTranslateY = useTransform(smoothY, [-0.5, 0.5], [-36, 36]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    // Normalized position [-0.5, 0.5]
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      id="vector-hero-container"
      className="relative w-full h-full flex items-center justify-center cursor-crosshair group/vectorArt overflow-visible select-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic Background Parallax Grid Element */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f5_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-50 z-0 rounded-[4rem] border border-zinc-100" />
      
      {/* Decorative Outer Scale / Coordinate Legend */}
      <div className="absolute top-6 left-6 font-mono text-[9px] text-zinc-300 tracking-widest hidden lg:block uppercase">
        System.Scale: 1.00_V / THALIX_SKETCH
      </div>
      <div className="absolute bottom-6 right-8 font-mono text-[9px] text-zinc-300 tracking-widest hidden lg:block uppercase">
        Coord: 53.9213_N / 20.4022_W
      </div>

      <svg
        id="vector-sketch-svg"
        viewBox="0 0 800 1100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[90%] drop-shadow-[0_20px_50px_rgba(0,0,0,0.06)] relative z-10 transition-transform duration-700 ease-out"
      >
        {/* ========================================== */}
        {/* 1. BACKGROUND GRID & WIREFRAME CAP (HAIR EFFECT) */}
        {/* ========================================== */}
        <motion.g style={{ x: baseTranslateX, y: baseTranslateY }}>
          {/* Top-Right Mesh curves */}
          <path
            d="M 400 300 Q 550 150 700 350 M 430 280 Q 560 120 720 320 M 460 260 Q 570 90 740 290 M 490 240 Q 580 60 760 260 M 520 220 Q 590 30 780 230 M 550 200 Q 600 0 800 200"
            stroke="#18181b"
            strokeWidth="0.8"
            strokeOpacity="0.4"
          />
          {/* Cross lines forming the grid */}
          <path
            d="M 420 50 C 500 150 600 250 800 350 M 440 20 C 520 120 620 220 800 320 M 460 -10 C 540 90 640 190 800 290 M 550 120 C 620 180 700 240 800 260"
            stroke="#18181b"
            strokeWidth="0.6"
            strokeOpacity="0.35"
          />
        </motion.g>

        {/* ========================================== */}
        {/* 2. CHRONO RADAR TILES (TOP CIRCLES) */}
        {/* ========================================== */}
        <motion.g style={{ x: midTranslateX, y: midTranslateY }} className="origin-[430px_100px]">
          {/* Main concentric pointer loop */}
          <motion.circle
            cx="430"
            cy="100"
            r="80"
            stroke="#18181b"
            strokeWidth="0.65"
            strokeDasharray="4 8"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            cx="430"
            cy="100"
            r="60"
            stroke="#18181b"
            strokeWidth="1"
            strokeDasharray="30 12"
            animate={{ rotate: -360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          />
          <circle cx="430" cy="100" r="45" stroke="#fbbf24" strokeWidth="1.5" />
          <circle cx="430" cy="100" r="10" fill="#18181b" />
          
          {/* Outer sweeping dotted loop */}
          <motion.circle
            cx="430"
            cy="100"
            r="110"
            stroke="#c8c8cc"
            strokeWidth="0.5"
            strokeDasharray="2 4"
            animate={{ rotate: 180 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
        </motion.g>

        {/* ========================================== */}
        {/* 3. CORE LINEAR SECTIONS & SLICED PORTRAIT MASK */}
        {/* ========================================== */}
        <motion.g style={{ x: baseTranslateX, y: baseTranslateY }}>
          {/* Central geometric split diamond mask (Main contour from image) */}
          <polygon
            points="330,220 540,320 400,820 190,540"
            stroke="#18181b"
            strokeWidth="1.2"
            strokeOpacity="0.9"
            fill="white"
            fillOpacity="0.05"
          />
          {/* Overlay Amber prism highlight */}
          <polygon
            points="315,228 525,328 385,828 175,548"
            stroke="#fbbf24"
            strokeWidth="1.6"
            strokeOpacity="0.8"
          />

          {/* Sliced face bridge & nose contours (Strict geometric sketch lines) */}
          <path
            d="M 310 440 L 390 440 L 390 560 L 310 590 L 350 590 L 355 615"
            stroke="#18181b"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 360 610 Q 375 625 390 610"
            stroke="#18181b"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line x1="390" y1="440" x2="390" y2="615" stroke="#18181b" strokeWidth="0.8" />
        </motion.g>

        {/* ========================================== */}
        {/* 4. NEURAL PCB CIRCUITS & NODE NETS (LEFT) */}
        {/* ========================================== */}
        <motion.g style={{ x: midTranslateX, y: midTranslateY }}>
          {/* Node 1 & line */}
          <path d="M 320 365 C 240 320 220 280 180 300" stroke="#18181b" strokeWidth="0.85" />
          <circle cx="180" cy="300" r="5" fill="#18181b" />

          {/* Node 2 & line */}
          <path d="M 310 380 C 210 350 190 290 150 280" stroke="#18181b" strokeWidth="0.85" />
          <circle cx="150" cy="280" r="3.5" fill="#18181b" />

          {/* Node 3 & line - Amber core */}
          <path d="M 280 395 C 190 390 170 320 135 345" stroke="#fbbf24" strokeWidth="1" />
          <circle cx="135" cy="345" r="4.5" fill="#fbbf24" />

          {/* Node 4 & line */}
          <path d="M 250 410 C 160 410 140 360 115 385" stroke="#18181b" strokeWidth="0.85" />
          <circle cx="115" cy="385" r="4" fill="#18181b" />

          {/* Node 5 - Lower tech node link */}
          <path d="M 270 435 C 180 435 150 420 110 405" stroke="#18181b" strokeWidth="0.85" />
          <circle cx="110" cy="405" r="3" fill="#18181b" />
        </motion.g>

        {/* ========================================== */}
        {/* 5. MEASURING SCALE & TENSION MATRIX LINES */}
        {/* ========================================== */}
        <motion.g style={{ x: baseTranslateX, y: baseTranslateY }}>
          {/* Main vertical focal scale line */}
          <line x1="420" y1="90" x2="420" y2="1050" stroke="#18181b" strokeWidth="1.5" />
          <path d="M 420 115 L 440 130" stroke="#18181b" strokeWidth="1.5" />

          {/* Parallel measuring offset tracks */}
          <line x1="474" y1="100" x2="474" y2="280" stroke="#18181b" strokeWidth="0.8" />
          <line x1="495" y1="100" x2="495" y2="280" stroke="#18181b" strokeWidth="0.5" />

          {/* Vertical ladder tick array (Exactly matching sketch scale) */}
          <g>
            {[...Array(18)].map((_, idx) => (
              <line
                key={idx}
                x1="405"
                y1={720 + idx * 16}
                x2="435"
                y2={720 + idx * 16}
                stroke="#18181b"
                strokeWidth={idx % 4 === 0 ? "1.5" : "0.75"}
              />
            ))}
          </g>

          {/* Floating coordinates indicator along the vertical bar */}
          <rect x="424" y="800" width="34" height="15" fill="#18181b" rx="2" />
          <text x="441" y="810" fill="#fbbf24" fontSize="8" fontFamily="monospace" textAnchor="middle">
            V.8
          </text>
        </motion.g>

        {/* ========================================== */}
        {/* 6. CYBERNETIC INTEGRATED EYE (Focal Point) */}
        {/* ========================================== */}
        {/* Floating coordinates layer for high-fashion pupil */}
        <motion.g style={{ x: highTranslateX, y: highTranslateY }} className="origin-[490px_485px]">
          {/* Eyelid Contour curves */}
          <path
            d="M 390 475 Q 490 380 590 440 Q 490 520 390 475 Z"
            stroke="#18181b"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Inner eye soft contour */}
          <path
            d="M 405 470 Q 490 405 575 448"
            stroke="#fbbf24"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Concentric Eye Iris / Aperture Rings */}
          <circle cx="490" cy="455" r="48" stroke="#18181b" strokeWidth="1.5" />
          <circle cx="490" cy="455" r="38" stroke="#18181b" strokeWidth="0.8" />
          
          {/* Vibrant cyan cyber pupil rings */}
          <motion.circle
            cx="490"
            cy="455"
            r="28"
            stroke="#00f2ff"
            strokeWidth="2.5"
            strokeDasharray="8 6"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />

          <motion.circle
            cx="490"
            cy="455"
            r="22"
            fill="#18181b"
            animate={{ scale: isHovered ? [1, 1.1, 0.95, 1] : [1, 1.03, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* White glint spark */}
          <circle cx="482" cy="447" r="4.5" fill="white" />
          
          {/* Abstract eye geometric lens crosshair guides */}
          <line x1="490" y1="395" x2="490" y2="515" stroke="#18181b" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="430" y1="455" x2="550" y2="455" stroke="#18181b" strokeWidth="0.5" strokeDasharray="2 2" />
        </motion.g>

        {/* ========================================== */}
        {/* 7. PRECISE GEOMETRIC EYEBROW MATRICES */}
        {/* ========================================== */}
        <motion.g style={{ x: midTranslateX, y: midTranslateY }}>
          {/* Heavy graphic tech-eyebrow */}
          <polygon
            points="390,395 530,350 565,372 415,417"
            fill="#18181b"
          />
          {/* Dotted target track parallel to brow */}
          <path
            d="M 380 410 Q 480 340 580 375"
            stroke="#fbbf24"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
        </motion.g>

        {/* ========================================== */}
        {/* 8. LIP CONTOURS (ABSTRACT DIGITAL SHAPES) */}
        {/* ========================================== */}
        <motion.g style={{ x: baseTranslateX, y: baseTranslateY }}>
          {/* Sliced geometric lip plates from sketch */}
          <path
            d="M 285,670 L 400,650 L 450,670 L 360,705 Z"
            fill="white"
            stroke="#18181b"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Center splitting geometric line */}
          <line x1="285" y1="670" x2="450" y2="670" stroke="#18181b" strokeWidth="1.5" />
          
          {/* Lower accent lip element */}
          <path
            d="M 330,685 Q 365,740 405,685"
            stroke="#18181b"
            strokeWidth="1.2"
          />
        </motion.g>

        {/* ========================================== */}
        {/* 9. GEOMETRIC LOWER CORNER TRACKS & HANGING NODES */}
        {/* ========================================== */}
        <motion.g style={{ x: highTranslateX, y: highTranslateY }}>
          {/* Dot tracker arrays replicating the elegant drip nodes */}
          <g>
            {/* Thread 1 */}
            <line x1="320" y1="730" x2="320" y2="830" stroke="#18181b" strokeWidth="0.8" />
            <circle cx="320" cy="830" r="3.5" fill="#18181b" />

            {/* Thread 2 - Amber focal drip */}
            <line x1="375" y1="710" x2="375" y2="905" stroke="#18181b" strokeWidth="0.8" />
            <motion.circle 
              cx="375" 
              cy="905" 
              r="4.5" 
              fill="#fbbf24"
              animate={{ r: isHovered ? [4.5, 6, 4.5] : 4.5 }}
              transition={{ repeat: Infinity, duration: 2 }}
            />

            {/* Thread 3 */}
            <line x1="405" y1="700" x2="405" y2="890" stroke="#18181b" strokeWidth="0.6" />
            <circle cx="405" cy="890" r="3" fill="#18181b" />

            {/* Thread 4 */}
            <line x1="440" y1="680" x2="440" y2="840" stroke="#18181b" strokeWidth="0.8" />
            <circle cx="440" cy="840" r="3.5" fill="#18181b" />

            {/* Extra precision details */}
            <circle cx="295" cy="740" r="3.5" fill="#18181b" />
          </g>

          {/* Right lower blueprint bounding box */}
          <polygon
            points="540,710 655,750 655,900 540,845"
            stroke="#18181b"
            strokeWidth="0.65"
            strokeDasharray="1 3"
          />
          <line x1="570" y1="740" x2="630" y2="740" stroke="#18181b" strokeWidth="0.6" />
          <line x1="570" y1="765" x2="610" y2="765" stroke="#18181b" strokeWidth="0.6" />
        </motion.g>

        {/* ========================================== */}
        {/* 10. ACTIVE TARGET HUD OVERLAYS */}
        {/* ========================================== */}
        <motion.g
          animate={{ opacity: isHovered ? 0.95 : 0.4 }}
          transition={{ duration: 0.3 }}
        >
          {/* Fine concentric focus ring on target eye */}
          <circle cx="490" cy="455" r="95" stroke="#00f2ff" strokeWidth="0.5" strokeDasharray="6 30" />
          
          {/* Scope corners */}
          <path d="M 60 60 L 90 60 M 60 60 L 60 90" stroke="#18181b" strokeWidth="1.5" />
          <path d="M 740 60 L 710 60 M 740 60 L 740 90" stroke="#18181b" strokeWidth="1.5" />
          <path d="M 60 1040 L 90 1040 M 60 1040 L 60 1010" stroke="#18181b" strokeWidth="1.5" />
          <path d="M 740 1040 L 710 1040 M 740 1040 L 740 1010" stroke="#18181b" strokeWidth="1.5" />
        </motion.g>
      </svg>

      {/* Decorative Interactive UI Badging */}
      <div className="absolute bottom-8 left-12 lg:left-16 flex items-center gap-4 bg-white/70 backdrop-blur-md px-6 py-3 rounded-full border border-zinc-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] z-20 group-hover/vectorArt:border-amber-400 group-hover/vectorArt:shadow-[0_8px_30px_rgba(251,191,36,0.12)] transition-all duration-500">
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
        <span className="text-[10px] font-mono tracking-widest text-zinc-800 uppercase font-semibold">
          Vector Interactivo Activo
        </span>
      </div>
    </div>
  );
};
