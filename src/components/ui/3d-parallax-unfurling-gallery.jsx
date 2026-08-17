import React, { useMemo, useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import "./3d-parallax-unfurling-gallery.css";

function ImageCard({ item }) {
  return (
    <figure className="unfurl-gallery__card">
      <img src={item.src} alt={item.alt} loading="lazy" decoding="async" style={{ objectPosition: item.position || "center" }} />
      <figcaption>{item.label}</figcaption>
    </figure>
  );
}

export default function ParallaxUnfurlingGallery({ images, eyebrow, title, outlineTitle, disciplines }) {
  const containerRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const columns = useMemo(() => {
    const source = [0, 1, 2, 3].map((columnIndex) => images.filter((_, index) => index % 4 === columnIndex));
    return source.map((column) => [...column, ...column]);
  }, [images]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 95, damping: 22, mass: 0.55 });

  const bannerWidth = useTransform(progress, [0, 0.14], reduceMotion ? ["100vw", "100vw"] : ["94vw", "100vw"]);
  const bannerHeight = useTransform(progress, [0, 0.14], reduceMotion ? ["100svh", "100svh"] : ["88svh", "100svh"]);
  const bannerRadius = useTransform(progress, [0, 0.14], reduceMotion ? ["0px", "0px"] : ["28px", "0px"]);
  const rotateY = useTransform(progress, [0.1, 1], reduceMotion ? [0, 0] : [-38, -5]);
  const rotateX = useTransform(progress, [0.1, 1], reduceMotion ? [0, 0] : [20, 3]);
  const rotateZ = useTransform(progress, [0.1, 1], reduceMotion ? [0, 0] : [10, 1]);
  const translateZ = useTransform(progress, [0.1, 1], reduceMotion ? [0, 0] : [-620, 0]);
  const titleOpacity = useTransform(progress, [0, 0.08, 0.22], reduceMotion ? [1, 1, 1] : [1, 0.8, 0]);
  const titleScale = useTransform(progress, [0, 0.2], reduceMotion ? [1, 1] : [1, 0.88]);
  const columnY = [
    useTransform(progress, [0.1, 1], reduceMotion ? ["0%", "0%"] : ["2%", "-42%"]),
    useTransform(progress, [0.1, 1], reduceMotion ? ["0%", "0%"] : ["-42%", "8%"]),
    useTransform(progress, [0.1, 1], reduceMotion ? ["0%", "0%"] : ["0%", "-42%"]),
    useTransform(progress, [0.1, 1], reduceMotion ? ["0%", "0%"] : ["-34%", "15%"]),
  ];

  return (
    <div className="unfurl-gallery" aria-label="Scroll-driven AYESMAJ visual universe">
      <section ref={containerRef} className="unfurl-gallery__journey">
        <div className="unfurl-gallery__stage">
          <motion.div className="unfurl-gallery__banner" style={{ width: bannerWidth, height: bannerHeight, borderRadius: bannerRadius }}>
            <div className="unfurl-gallery__vignette" aria-hidden="true" />
            <div className="unfurl-gallery__perspective">
              <motion.div
                className="unfurl-gallery__matrix"
                style={{ rotateX, rotateY, rotateZ, z: translateZ, transformStyle: "preserve-3d" }}
              >
                {columns.map((column, columnIndex) => (
                  <motion.div className="unfurl-gallery__column" style={{ y: columnY[columnIndex] }} key={columnIndex}>
                    {column.map((item, index) => <ImageCard item={item} key={`${columnIndex}-${index}-${item.src}`} />)}
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div className="unfurl-gallery__title-position">
              <motion.div className="unfurl-gallery__title" style={{ opacity: titleOpacity, scale: titleScale }}>
                <p>{eyebrow}</p>
                <h2>{title}<span>{outlineTitle}</span></h2>
                <div>{disciplines}</div>
              </motion.div>
            </div>

            <div className="unfurl-gallery__hint" aria-hidden="true"><span /> Keep scrolling to unfold the art world</div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
