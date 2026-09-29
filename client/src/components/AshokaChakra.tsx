import React from 'react';

interface AshokaChakraProps {
  className?: string;
  size?: number | string;
  spinning?: boolean;
}

export const AshokaChakra: React.FC<AshokaChakraProps> = ({
  className = 'w-7 h-7 text-[#000080] dark:text-blue-400',
  size,
  spinning = true
}) => {
  // 24 spokes radiating at 15 degree increments (360 / 24 = 15)
  const spokes = Array.from({ length: 24 }, (_, i) => {
    const angleRad = (i * 15 * Math.PI) / 180;
    const x1 = 50 + 11 * Math.cos(angleRad);
    const y1 = 50 + 11 * Math.sin(angleRad);
    const x2 = 50 + 46 * Math.cos(angleRad);
    const y2 = 50 + 46 * Math.sin(angleRad);
    return { x1, y1, x2, y2, key: i };
  });

  // 24 decorative rim beads placed between spokes
  const beads = Array.from({ length: 24 }, (_, i) => {
    const angleRad = ((i * 15 + 7.5) * Math.PI) / 180;
    const cx = 50 + 46 * Math.cos(angleRad);
    const cy = 50 + 46 * Math.sin(angleRad);
    return { cx, cy, key: i };
  });

  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} ${spinning ? 'animate-chakra-spin' : ''}`}
      style={{
        transformOrigin: 'center',
        ...(size ? { width: size, height: size } : {})
      }}
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Ashoka Chakra Wheel"
    >
      {/* Outer Rim */}
      <circle cx="50" cy="50" r="46" strokeWidth="4" />
      
      {/* Inner Central Hub */}
      <circle cx="50" cy="50" r="11" strokeWidth="3" />
      
      {/* Central Solid Pin */}
      <circle cx="50" cy="50" r="4" fill="currentColor" stroke="none" />

      {/* 24 Spokes of the Flag Wheel */}
      {spokes.map(({ x1, y1, x2, y2, key }) => (
        <line
          key={key}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      ))}

      {/* 24 Perimeter Beads */}
      {beads.map(({ cx, cy, key }) => (
        <circle
          key={key}
          cx={cx}
          cy={cy}
          r="1.4"
          fill="currentColor"
          stroke="none"
        />
      ))}
    </svg>
  );
};
