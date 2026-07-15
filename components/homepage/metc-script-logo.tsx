import type { CSSProperties } from "react";

type LogoMotionStyle = CSSProperties & Record<`--${string}`, string>;

const METC_LOGO_PATH =
  "M 15 79.38 Q 14 83.25 16.12 84 Q 18.25 84.75 21.88 83.75 Q 25.5 82.75 28.12 78.5 Q 30.75 74.25 30.75 72.88 Q 30.75 71.5 32.12 70.5 Q 33.5 69.5 36.62 63.5 Q 39.75 57.5 46.25 48.88 Q 52.75 40.25 56.5 36.62 Q 60.25 33 64.38 30.38 Q 68.5 27.75 74.38 26.25 Q 80.25 24.75 81.38 23.75 Q 82.5 22.75 84.88 22.75 Q 87.25 22.75 92.12 28.62 Q 97 34.5 97 36.38 Q 97 38.25 99 41.88 Q 101 45.5 101 48.38 Q 101 51.25 102 53.25 Q 103 55.25 105.5 57.38 Q 108 59.5 108 64.88 Q 108 70.25 111.75 75.5 Q 115.5 80.75 120 83.25 Q 124.5 85.75 130.88 85.75 Q 137.25 85.75 143.38 83.12 Q 149.5 80.5 156.5 74 Q 163.5 67.5 164.62 64.5 Q 165.75 61.5 167.25 60.38 Q 168.75 59.25 168.75 58.38 Q 168.75 57.5 177.38 46.38 Q 186 35.25 189.75 32 Q 193.5 28.75 197 27.25 Q 200.5 25.75 205.38 25.75 Q 210.25 25.75 213.62 28.62 Q 217 31.5 218.5 36.38 Q 220 41.25 221 41.88 Q 222 42.5 222 45.38 Q 222 48.25 224.5 55.88 Q 227 63.5 227 68.88 Q 227 74.25 229 77.75 Q 231 81.25 233.62 83.88 Q 236.25 86.5 240.88 88.62 Q 245.5 90.75 255.88 90.25 Q 266.25 89.75 267.38 88.75 Q 268.5 87.75 273.88 86.75 Q 279.25 85.75 281.88 83.75 Q 284.5 81.75 287.5 83.75 Q 290.5 85.75 328.88 85.75 Q 367.25 85.75 371.25 83.75 Q 375.25 81.75 377.75 82.25 Q 380.25 82.75 383.88 86.75 Q 387.5 90.75 389.5 90 Q 391.5 89.25 393.5 91 Q 395.5 92.75 401.88 92.25 Q 408.25 91.75 413.75 89.25 Q 419.25 86.75 422.88 83.62 Q 426.5 80.5 442 62.12 Q 457.5 43.75 462.88 40.25 Q 468.25 36.75 469.38 34.88 Q 470.5 33 474.88 32.88 Q 479.25 32.75 484.88 30.25 Q 490.5 27.75 494.38 27.75 Q 498.25 27.75 499.38 26.75 Q 500.5 25.75 514.88 25.75 Q 529.25 25.75 534.25 26.75 Q 539.25 27.75 550.25 32.75 Q 561.25 37.75 563.12 41.62 Q 565 45.5 565 51.88 Q 565 58.25 564 58.88 Q 563 59.5 561.5 63.38 Q 560 67.25 558.62 68.62 Q 557.25 70 550.38 70 Q 543.5 70 539.5 69 Q 535.5 68 532.12 64.62 Q 528.75 61.25 528.75 56.38 Q 528.75 51.5 526.62 47.38 Q 524.5 43.25 521.88 41.62 Q 519.25 40 513.75 38.5 Q 508.25 37 498.88 37.5 Q 489.5 38 488.5 38.88 Q 487.5 39.75 480 40.88 Q 472.5 42 469.88 44 Q 467.25 46 465.88 46 Q 464.5 46 459.25 50.75 Q 454 55.5 452.5 58 Q 451 60.5 451 65.38 Q 451 70.25 454.88 75.75 Q 458.75 81.25 459.88 81.25 Q 461 81.25 463.75 83.5 Q 466.5 85.75 469.88 86.25 Q 473.25 86.75 474.38 87.75 Q 475.5 88.75 478.88 88.75 Q 482.25 88.75 483.38 89.75 Q 484.5 90.75 502.88 90.75 Q 521.25 90.75 534.25 87.25 Q 547.25 83.75 549.38 81.75 Q 551.5 79.75 564.88 76.25 Q 578.25 72.75 579.88 71.25 Q 581.5 69.75 586.38 68.75 Q 591.25 67.75 591.88 66.75 Q 592.5 65.75 595.38 64.75 Q 598.25 63.75 599 62.12 Q 599.75 60.5 603 58.62 Q 606.25 56.75 608.38 54 Q 610.35 51.1 607.85 49.75 Q 605.35 48.4 597.75 53.62 Q 590.25 59 585.75 61.5 Q 581.25 64 578.75 64.38 Q 576.25 64.75 575.5 63.12 Q 574.9 61.45 575.8 60.35 Q 576.7 59.25 577.25 54.88 Q 577.75 50.5 576.75 46.5 Q 575.75 42.5 573.62 39.38 Q 571.5 36.25 564.38 31.12 Q 557.25 26 546.75 23.5 Q 536.25 21 527.38 21 Q 518.5 21 515.88 22 Q 513.25 23 500.88 22.5 Q 488.5 22 477.5 25.5 Q 466.5 29 460.88 33 Q 455.25 37 453.38 37.5 Q 451.5 38 445.88 42.62 Q 440.25 47.25 438.62 51.25 Q 437 55.25 434.5 56.25 Q 432 57.25 428.5 61.88 Q 425 66.5 425 67.88 Q 425 69.25 418.75 75.5 Q 412.5 81.75 407.88 83.88 Q 403.25 86 400.38 86 Q 397.5 86 396.62 85.12 Q 395.75 84.15 395.85 81.9 Q 395.95 79.65 401.25 54 Q 406.75 28.5 420 28.62 Q 433.25 28.75 434.88 26.62 Q 436.5 24.5 434.88 23.25 Q 433.1 22.1 366.88 21.55 Q 300.65 21.05 296.5 21.5 Q 292.5 22 289.75 23.75 Q 287 25.5 285 34 Q 283 42.5 282.88 49 Q 282.75 55.5 280.5 60.88 Q 278.25 66.25 278.12 69.25 Q 278 72.25 276.38 75.38 Q 274.75 78.5 269.5 80.75 Q 264.25 83 257.75 83.38 Q 251.25 83.75 248.25 82.38 Q 245.25 81 242 76.12 Q 238.75 71.25 238.25 62.88 Q 237.75 54.5 235.75 49.38 Q 233.75 44.25 233.75 42.38 Q 233.75 40.5 232.75 39.88 Q 231.75 39.25 231.75 37.88 Q 231.75 36.5 230.25 35.38 Q 228.75 34.25 228.75 32.38 Q 228.75 30.5 227.75 29.88 Q 226.75 29.25 226.75 27.38 Q 226.75 25.5 222.5 22.25 Q 218.25 19 209.88 19 Q 201.5 19 200.38 20 Q 199.25 21 195.38 21 Q 191.5 21 187 23.5 Q 182.5 26 173.25 36.25 Q 164 46.5 162.25 50.25 Q 160.5 54 157.25 57.25 Q 154 60.5 152 64 Q 150 67.5 144.12 73.25 Q 138.25 79 136.38 79 Q 134.5 79 133.5 80.5 Q 132.5 82 128.88 79.38 Q 125.25 76.75 123.5 74 Q 121.75 71.25 118.25 58.38 Q 114.75 45.5 109.25 34 Q 103.75 22.5 99 20.25 Q 94.25 18 91 18 Q 87.75 18.25 87.75 19.5 Q 87.75 20.75 85 21 Q 81.75 20.8 81.25 20.05 Q 80.75 19.3 78.75 18.5 Q 76.5 18 72.5 18.5 Q 68.5 19 64.5 21.5 Q 60.5 24 59.38 26 Q 58.25 28 54.88 28.5 Q 51.5 29 44.75 35.62 Q 38 42.25 35.5 46.75 Q 33 51.25 29.25 55.5 Q 25.5 59.75 25.75 61 Q 26 62.25 21 68.88 Q 16 75.5 15 79.38 Z M 459.75 66.75 C 459.75 60.25 463.25 53.75 471 49.25 C 478.25 45 490.5 42.5 504 43.5 C 518.5 44.5 531.75 50 539.5 58.5 C 546 65.75 548.25 74 545.5 81.25 C 539.75 84.5 527 86.25 511.75 86.25 C 494.25 86.25 480 83.75 470.25 78.75 C 463.25 75.12 459.75 71.12 459.75 66.75 Z M 309.75 33.38 Q 309.75 30.5 310.62 29.62 Q 311.5 28.75 350.38 28.75 Q 389.25 28.75 389.62 33.5 Q 390 38.25 389 39.88 Q 388 41.5 388 45.38 Q 388 49.25 384.5 60.25 Q 381 71.25 378.62 74.12 Q 376.25 77 372.25 78 Q 368.25 79 335.38 78.5 Q 302.5 78 302.62 70.25 Q 302.75 62.5 304.62 59.12 Q 306.5 55.75 325.38 55.25 Q 344.25 54.75 346.38 53 Q 348.25 51.15 347.75 49.62 Q 347.25 48.1 328.38 48 Q 309.5 48 308.62 44.75 Q 307.75 41.5 308.75 38.88 Q 309.75 36.25 309.75 33.38 Z M 614.75 35.75 Q 609 42.5 609 44.75 Q 609 47 610.62 46.88 Q 612.25 46.75 613.75 47.75 Q 615.25 48.75 620.5 42.5 Q 625.75 36.25 629.12 33.5 Q 632.5 30.75 635 29.75 Q 637.5 28.75 646.38 28.75 Q 655.25 28.75 655.88 29.75 Q 656.5 30.75 658.38 30.75 Q 660.25 30.75 662.12 32.62 Q 664 34.5 663.5 40.38 Q 663 46.25 659.25 50.62 Q 655.5 55 653.38 56.12 Q 651.35 57.3 652.35 58.45 Q 653.35 59.6 654.88 59.38 Q 656.25 59 656.88 59.75 Q 657.5 60.5 663.62 57.5 Q 669.75 54.5 673.75 48.88 Q 677.75 43.25 677.75 39.38 Q 677.75 35.5 674.5 31.75 Q 671.25 28 664.25 25 Q 657.25 22 648.38 22 Q 639.5 22 635 23 Q 630.5 24 629.88 25 Q 629.25 26 624.88 27.5 Q 620.5 29 614.75 35.75 Z";

const METC_DRAW_GUIDE_PATH =
  "M24 86 C46 38 68 22 92 24 C116 26 111 82 135 84 C158 86 166 29 192 26 C225 22 236 57 246 88 C254 91 261 90 268 88 L268 27 L331 27 C356 25 399 25 444 27 C420 29 377 29 331 27 L268 27 L268 57 L322 57 L268 57 L268 88 L334 88 C359 87 385 84 404 78 C406 62 407 45 407 33 C404 48 399 69 389 88 C405 92 432 83 464 56 C504 23 568 22 604 36 C584 29 544 32 516 54 C480 80 507 98 552 92 C580 88 600 78 612 69";

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
      width="708"
      height="116"
      viewBox="0 0 708 116"
      role="img"
      aria-labelledby="logoTitle"
      fill="none"
      shapeRendering="geometricPrecision"
    >
      <title id="logoTitle">METC one-stroke logo</title>
      <defs>
        <linearGradient id="metc-logo-vital-ink" x1="20" y1="24" x2="684" y2="96" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.24" stopColor="#fff8c9" />
          <stop offset="0.52" stopColor="#fff4a8" />
          <stop offset="0.76" stopColor="#ffffff" />
          <stop offset="1" stopColor="#ffe37d" />
        </linearGradient>
        <linearGradient id="metc-laser-ink" x1="18" y1="32" x2="690" y2="88" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.18" stopColor="#fff6a5" />
          <stop offset="0.55" stopColor="#ffffff" />
          <stop offset="0.82" stopColor="#ffe16f" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <mask id="metc-logo-write-mask" maskUnits="userSpaceOnUse">
          <path className="metc-script-logo__write-reveal" d={METC_DRAW_GUIDE_PATH} pathLength="1" />
        </mask>
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
      </defs>

      <g className="metc-script-logo__drawn-ink" mask="url(#metc-logo-write-mask)">
        <path className="metc-script-logo__one-stroke" d={METC_LOGO_PATH} fill="url(#metc-logo-vital-ink)" fillRule="evenodd" />
      </g>
      <g className="metc-script-logo__final-ink">
        <path
          className="metc-script-logo__shadow"
          d={METC_LOGO_PATH}
          fill="#715A46"
          fillOpacity="0.16"
          fillRule="evenodd"
          transform="translate(1.5 2)"
          aria-hidden="true"
        />
        <path className="metc-script-logo__one-stroke" d={METC_LOGO_PATH} fill="url(#metc-logo-vital-ink)" fillRule="evenodd" />
      </g>
      <path className="metc-script-logo__drawing-trace" d={METC_DRAW_GUIDE_PATH} pathLength="1" aria-hidden="true" />
      <path className="metc-script-logo__laser-line" d={METC_DRAW_GUIDE_PATH} pathLength="1" aria-hidden="true" />
      <path className="metc-script-logo__one-stroke-glint" d={METC_DRAW_GUIDE_PATH} pathLength="1" aria-hidden="true" />

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
