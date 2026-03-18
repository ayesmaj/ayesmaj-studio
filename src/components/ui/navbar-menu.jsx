"use client";
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({ setActive, active, item, children }) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-sm font-semibold tracking-wide text-white/80 hover:text-white transition-colors"
      >
        {item}
      </motion.p>

      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 -translate-x-1/2 pt-4 z-50">
              <motion.div
                transition={transition}
                layoutId="active"
                className="rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  background: "rgba(8,12,10,0.96)",
                  border: "1px solid rgba(0,196,106,0.18)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <motion.div layout className="w-max h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({ setActive, children }) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative flex items-center justify-center space-x-6 px-8 py-3 rounded-full"
      style={{
        background: "rgba(8,12,10,0.7)",
        border: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(16px)",
      }}
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({ title, description, href, src }) => {
  return (
    <Link to={href} className="flex space-x-3 group">
      <img
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-lg shadow-xl object-cover w-[140px] h-[70px]"
      />
      <div>
        <h4 className="text-base font-bold mb-1 text-white group-hover:text-[#00C46A] transition-colors">
          {title}
        </h4>
        <p className="text-neutral-400 text-xs max-w-[10rem] leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, href, onClick, ...rest }) => {
  // Support both page routes and scroll anchors
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="text-left text-neutral-400 hover:text-[#00C46A] text-sm transition-colors duration-200"
        {...rest}
      >
        {children}
      </button>
    );
  }
  if (href?.startsWith("#")) {
    return (
      <a
        href={href}
        className="text-neutral-400 hover:text-[#00C46A] text-sm transition-colors duration-200"
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      to={href}
      className="text-neutral-400 hover:text-[#00C46A] text-sm transition-colors duration-200"
      {...rest}
    >
      {children}
    </Link>
  );
};

export const MenuDivider = () => (
  <div className="my-1 h-px w-full" style={{ background: "rgba(255,255,255,0.06)" }} />
);
