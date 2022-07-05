import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const useScrollAnimate = ({ isInView, notInView, threshold }) => {
  const { ref, inView } = useInView({
    threshold,
  });

  const animate = useAnimation();

  useEffect(() => {
    if (!inView) {
      animate.start(notInView);
    }
    if (inView) {
      animate.start(isInView);
    }
  }, [inView]);

  return { ref, animate };
};

export const ScrollAnimate = ({
  children,
  inView,
  notInView,
  threshold,
  whileHover,
  className,
}) => {
  const { ref, animate } = useScrollAnimate({
    isInView: inView,
    notInView: notInView,
    threshold: threshold,
  });
  return (
    <div ref={ref}>
      <motion.div
        animate={animate}
        className={className}
        whileHover={whileHover}
      >
        {children}
      </motion.div>
    </div>
  );
};
