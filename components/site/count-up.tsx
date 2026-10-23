"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

interface CountUpProps {
  to: number | string;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export function CountUp({
  to,
  from = 0,
  duration = 1.2,
  prefix = "",
  suffix = "",
  decimals,
  className = "",
}: CountUpProps) {
  // 1. Robust parsing of `to` (handles number like 45, or string like "45%", "37.4%", "12-month")
  let targetNumber = 0;
  let parsedSuffix = suffix;

  if (typeof to === "number") {
    targetNumber = to;
  } else if (typeof to === "string") {
    const cleanStr = to.trim();
    const match = cleanStr.match(/-?[\d.]+/);
    if (match) {
      targetNumber = parseFloat(match[0]) || 0;
      if (!suffix) {
        const remaining = cleanStr.replace(match[0], "").trim();
        if (remaining) {
          parsedSuffix = remaining;
        }
      }
    }
  }

  // 2. Auto-detect decimals if not explicitly passed (e.g. 37.4 -> 1 decimal)
  let resolvedDecimals = decimals;
  if (resolvedDecimals === undefined) {
    const toStr = String(to);
    if (toStr.includes(".")) {
      const parts = toStr.split(".");
      const decPart = parts[1]?.replace(/[^\d]/g, "") || "";
      resolvedDecimals = decPart.length;
    } else {
      resolvedDecimals = 0;
    }
  }

  const [value, setValue] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10px 0px" });
  const shouldReduceMotion = useReducedMotion();
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setValue(targetNumber);
      return;
    }

    let controls: { stop: () => void } | undefined;

    const startAnimation = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;

      controls = animate(from, targetNumber, {
        duration: duration,
        ease: [0.16, 1, 0.3, 1], // fluid ease-out cubic
        onUpdate: (latest) => {
          setValue(latest);
        },
      });
    };

    if (inView) {
      startAnimation();
    } else {
      // Robust fallback: if intersection observer was delayed or already in view, trigger via check
      const fallbackTimer = setTimeout(() => {
        if (!hasAnimatedRef.current && ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            startAnimation();
          }
        }
      }, 750);

      return () => {
        clearTimeout(fallbackTimer);
        controls?.stop();
      };
    }

    return () => {
      controls?.stop();
    };
  }, [inView, targetNumber, from, duration, shouldReduceMotion]);

  const formatted =
    resolvedDecimals > 0
      ? value.toFixed(resolvedDecimals)
      : Math.round(value).toString();

  return (
    <span ref={ref} className={`font-mono tabular-nums ${className}`}>
      {prefix}
      {formatted}
      {parsedSuffix}
    </span>
  );
}

