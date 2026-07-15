import type { CSSProperties } from "react";

type LogoMotionStyle = CSSProperties & Record<`--${string}`, string>;

const METC_ONE_STROKE_PATH =
  "M24 86 C46 38 68 22 92 24 C116 26 111 82 135 84 C158 86 166 29 192 26 C225 22 236 57 246 88 C254 91 261 90 268 88 L268 27 L331 27 C356 25 399 25 444 27 C420 29 377 29 331 27 L268 27 L268 57 L322 57 L268 57 L268 88 L334 88 C359 87 384 84 402 78 C406 61 408 43 407 33 C405 52 400 78 389 96 C416 101 464 89 500 62 C543 30 614 20 654 36 C629 28 579 32 548 54 C510 81 538 101 592 92 C624 87 645 78 657 69";

const METC_METEORS = [
  { x1: 118, y1: 18, x2: 56, y2: 52, tx: -28, ty: 15, delay: "4.8s", duration: "2.8s" },
  { x1: 169, y1: 93, x2: 229, y2: 63, tx: 27, ty: -14, delay: "5.1s", duration: "3.1s" },
  { x1: 205, y1: 12, x2: 147, y2: 45, tx: -25, ty: 15, delay: "5.3s", duration: "3.2s" },
  { x1: 318, y1: 15, x2: 258, y2: 49, tx: -28, ty: 16, delay: "5.9s", duration: "2.9s" },
  { x1: 329, y1: 91, x2: 284, y2: 53, tx: -21, ty: -18, delay: "6.4s", duration: "3s" },
  { x1: 472, y1: 13, x2: 410, y2: 48, tx: -29, ty: 16, delay: "6.2s", duration: "3.5s" },
  { x1: 481, y1: 89, x2: 548, y2: 55, tx: 30, ty: -16, delay: "6.6s", duration: "3.3s" },
  { x1: 641, y1: 29, x2: 576, y2: 70, tx: -31, ty: 19, delay: "6.8s", duration: "3.1s" },
  { x1: 690, y1: 48, x2: 625, y2: 83, tx: -30, ty: 16, delay: "7.4s", duration: "3.7s" },
  { x1: 621, y1: 95, x2: 677, y2: 63, tx: 26, ty: -15, delay: "7.8s", duration: "3.4s" },
  { x1: 386, y1: 6, x2: 326, y2: 38, tx: -28, ty: 15, delay: "8s", duration: "3.3s" },
  { x1: 532, y1: 22, x2: 470, y2: 58, tx: -29, ty: 17, delay: "8.5s", duration: "3.4s" },
];

const METC_SPARKS = [
  { cx: 42, cy: 58, r: 2.6, delay: "4.7s", duration: "2.3s" },
  { cx: 58, cy: 31, r: 3, delay: "5s", duration: "2.6s" },
  { cx: 116, cy: 75, r: 2.2, delay: "5.4s", duration: "2.4s" },
  { cx: 153, cy: 91, r: 2.5, delay: "5.8s", duration: "2.9s" },
  { cx: 214, cy: 66, r: 2.4, delay: "6.1s", duration: "2.7s" },
  { cx: 262, cy: 86, r: 2.1, delay: "6.5s", duration: "3s" },
  { cx: 304, cy: 25, r: 2.9, delay: "5.2s", duration: "2.8s" },
  { cx: 342, cy: 55, r: 2.3, delay: "6.9s", duration: "3.1s" },
  { cx: 379, cy: 60, r: 2.4, delay: "7.2s", duration: "3s" },
  { cx: 421, cy: 27, r: 2.8, delay: "7.5s", duration: "2.7s" },
  { cx: 486, cy: 81, r: 3.1, delay: "5.6s", duration: "3.2s" },
  { cx: 529, cy: 52, r: 2.6, delay: "7.9s", duration: "2.8s" },
  { cx: 575, cy: 31, r: 2.3, delay: "6.3s", duration: "2.5s" },
  { cx: 620, cy: 36, r: 2.8, delay: "6.7s", duration: "2.9s" },
  { cx: 650, cy: 72, r: 2.4, delay: "8.2s", duration: "2.7s" },
  { cx: 681, cy: 69, r: 2.2, delay: "7.7s", duration: "3.1s" },
];

const METC_TRAIL_DUST = [
  { cx: 89, cy: 25, r: 1.4, delay: "5.4s" },
  { cx: 241, cy: 86, r: 1.2, delay: "6.2s" },
  { cx: 273, cy: 57, r: 1.3, delay: "7s" },
  { cx: 397, cy: 27, r: 1.5, delay: "7.8s" },
  { cx: 531, cy: 52, r: 1.4, delay: "8.6s" },
  { cx: 602, cy: 91, r: 1.3, delay: "9.4s" },
];

export function MetcScriptLogo() {
  return (
    <svg
      className="script-logo-svg"
      viewBox="0 0 708 116"
      role="img"
      aria-labelledby="logoTitle"
      fill="none"
      shapeRendering="geometricPrecision"
    >
      <title id="logoTitle">METC one-stroke logo</title>
      <defs>
        <linearGradient id="metc-logo-bright-ink" x1="20" y1="26" x2="674" y2="92" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fffef7" />
          <stop offset="0.4" stopColor="#fff7cf" />
          <stop offset="0.68" stopColor="#ffffff" />
          <stop offset="1" stopColor="#fff3bd" />
        </linearGradient>
        <linearGradient id="metc-logo-shadow-ink" x1="20" y1="28" x2="674" y2="94" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#84664f" stopOpacity="0.28" />
          <stop offset="1" stopColor="#4f3d31" stopOpacity="0.14" />
        </linearGradient>
        <linearGradient id="metc-meteor-ink" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.34" stopColor="#fff2a8" stopOpacity="0.9" />
          <stop offset="0.72" stopColor="#ffffff" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
        <radialGradient id="metc-spark-core" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.44" stopColor="#fff3a6" />
          <stop offset="1" stopColor="#ffc46b" stopOpacity="0" />
        </radialGradient>
        <filter id="metc-script-glow" x="-10%" y="-55%" width="120%" height="210%">
          <feGaussianBlur stdDeviation="1.25" result="softGlow" />
          <feMerge>
            <feMergeNode in="softGlow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path className="metc-script-logo__shadow" d={METC_ONE_STROKE_PATH} pathLength="1" aria-hidden="true" />
      <path className="metc-script-logo__one-stroke" d={METC_ONE_STROKE_PATH} pathLength="1" filter="url(#metc-script-glow)" />
      <path className="metc-script-logo__one-stroke-glint" d={METC_ONE_STROKE_PATH} pathLength="1" aria-hidden="true" />

      <g className="metc-script-logo__ambient" aria-hidden="true">
        {METC_METEORS.map((meteor, index) => (
          <line
            key={`meteor-${index}`}
            className="metc-script-logo__meteor"
            x1={meteor.x1}
            y1={meteor.y1}
            x2={meteor.x2}
            y2={meteor.y2}
            style={{
              "--meteor-x": `${meteor.tx}px`,
              "--meteor-y": `${meteor.ty}px`,
              animationDelay: meteor.delay,
              animationDuration: meteor.duration,
            } as LogoMotionStyle}
          />
        ))}
        {METC_SPARKS.map((spark, index) => (
          <circle
            key={`spark-${index}`}
            className="metc-script-logo__spark"
            cx={spark.cx}
            cy={spark.cy}
            r={spark.r}
            style={{ animationDelay: spark.delay, animationDuration: spark.duration }}
          />
        ))}
        {METC_TRAIL_DUST.map((dust, index) => (
          <circle
            key={`dust-${index}`}
            className="metc-script-logo__dust"
            cx={dust.cx}
            cy={dust.cy}
            r={dust.r}
            style={{ animationDelay: dust.delay }}
          />
        ))}
      </g>
    </svg>
  );
}
