const ONE_STROKE_PATH =
  "M24 142 C38 89 48 49 64 43 C80 44 90 104 105 132 C119 108 133 54 151 45 C160 61 158 112 163 139 C176 141 186 133 196 121 C216 112 243 108 273 108 C279 88 267 66 244 64 C218 62 199 84 201 110 C202 134 225 147 253 144 C279 141 300 126 316 116 C327 109 334 97 340 84 C345 65 350 45 363 39 C376 33 382 43 374 52 C366 61 348 65 331 64 C360 62 398 59 426 54 C405 64 390 83 385 108 C379 133 391 146 411 141 C429 136 441 121 449 106 C457 95 464 84 476 76 C494 60 522 53 550 59 C577 65 591 81 591 99 C574 87 547 85 526 96 C503 108 505 130 529 138 C552 146 578 135 592 116 C610 123 631 119 646 108";

export function MetcScriptLogo() {
  return (
    <svg
      className="script-logo-svg"
      viewBox="0 0 728 190"
      role="img"
      aria-labelledby="metc-logo-title metc-logo-description"
      fill="none"
    >
      <title id="metc-logo-title">METC</title>
      <desc id="metc-logo-description">A luminous METC signature with a laser point</desc>
      <defs>
        <filter id="chalk-texture" x="-10%" y="-30%" width="120%" height="160%">
          <feTurbulence baseFrequency="0.8" numOctaves="2" seed="7" type="fractalNoise" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <linearGradient id="chalk-ink" x1="24" y1="55" x2="702" y2="142" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFDF2">
            <animate attributeName="stop-color" begin="3.2s" dur="10s" values="#FFFDF2;#C5F0F0;#FFFDF2" repeatCount="indefinite" />
          </stop>
          <stop offset="0.5" stopColor="#F8EDBD">
            <animate attributeName="stop-color" begin="3.2s" dur="10s" values="#F8EDBD;#BFD8FF;#F8EDBD" repeatCount="indefinite" />
          </stop>
          <stop offset="1" stopColor="#FFD96A">
            <animate attributeName="stop-color" begin="3.2s" dur="10s" values="#FFD96A;#FFB89C;#FFD96A" repeatCount="indefinite" />
          </stop>
        </linearGradient>
      </defs>

      <path className="metc-logo-shadow" d={ONE_STROKE_PATH} pathLength="1" />
      <path className="metc-logo-stroke" d={ONE_STROKE_PATH} pathLength="1" filter="url(#chalk-texture)" />
      <path className="metc-logo-highlight" d={ONE_STROKE_PATH} pathLength="1" />
      <g className="metc-logo-laser" aria-hidden="true">
        <path className="metc-logo-laser-beam" d="M690 52 L650 104" />
        <circle className="metc-logo-laser-core" cx="646" cy="108" r="5" />
        <circle className="metc-logo-spark spark-a" cx="665" cy="87" r="2" />
        <circle className="metc-logo-spark spark-b" cx="681" cy="112" r="1.6" />
        <circle className="metc-logo-spark spark-c" cx="658" cy="129" r="1.4" />
      </g>
      <g className="metc-logo-atmosphere" aria-hidden="true">
        <circle className="logo-particle logo-particle-a" cx="83" cy="31" r="2" />
        <circle className="logo-particle logo-particle-b" cx="285" cy="26" r="1.5" />
        <circle className="logo-particle logo-particle-c" cx="526" cy="33" r="1.8" />
        <path className="logo-meteor logo-meteor-a" d="M461 22 L505 39" />
        <path className="logo-meteor logo-meteor-b" d="M580 160 L614 143" />
      </g>
    </svg>
  );
}
