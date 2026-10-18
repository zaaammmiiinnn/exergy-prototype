"use client";

import React from "react";

interface IconProps {
  className?: string;
  isHovered?: boolean;
}

/**
 * TECHNICAL INDUSTRY LINE ICONS (40x40px)
 * - 1.5px uniform stroke, no fill, blueprint precision
 * - Default stroke: Primary Logo Color (#2C7FB8)
 * - Hover stroke:   Accent Logo Color  (#F0A431)
 */

// 1. OIL & GAS (Distillation Column with Trays & Reboiler)
export function OilGasIcon({ className = "", isHovered = false }: IconProps) {
  const strokeColor = isHovered ? "#F0A431" : "#2C7FB8";

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={`w-10 h-10 transition-colors duration-300 ${className}`}
    >
      {/* Column vertical body */}
      <rect x="14" y="6" width="12" height="28" rx="2" stroke={strokeColor} strokeWidth="1.5" />
      {/* Fractionation Trays */}
      <line x1="14" y1="12" x2="26" y2="12" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="14" y1="17" x2="26" y2="17" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="14" y1="22" x2="26" y2="22" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="14" y1="27" x2="26" y2="27" stroke={strokeColor} strokeWidth="1.5" />
      {/* Overhead distillate vapor line */}
      <path d="M 20 6 L 20 3 L 30 3 L 30 8" stroke={strokeColor} strokeWidth="1.5" />
      {/* Bottom reboiler return loop */}
      <path d="M 20 34 L 20 37 L 8 37 L 8 28 L 14 28" stroke={strokeColor} strokeWidth="1.5" />
    </svg>
  );
}

// 2. POWER GENERATION (Turbine Rotor & Cascade Casing)
export function PowerIcon({ className = "", isHovered = false }: IconProps) {
  const strokeColor = isHovered ? "#F0A431" : "#2C7FB8";

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={`w-10 h-10 transition-colors duration-300 ${className}`}
    >
      {/* Central turbine shaft */}
      <line x1="4" y1="20" x2="36" y2="20" stroke={strokeColor} strokeWidth="1.5" />
      {/* Expanding stage blades */}
      <line x1="11" y1="14" x2="11" y2="26" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="17" y1="11" x2="17" y2="29" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="23" y1="8" x2="23" y2="32" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="29" y1="5" x2="29" y2="35" stroke={strokeColor} strokeWidth="1.5" />
      {/* Diverging turbine outer casing */}
      <path d="M 8 16 L 32 6" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="2 2" />
      <path d="M 8 24 L 32 34" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="2 2" />
    </svg>
  );
}

// 3. MANUFACTURING (Precision Drive Motor & Planetary Gear)
export function ManufacturingIcon({ className = "", isHovered = false }: IconProps) {
  const strokeColor = isHovered ? "#F0A431" : "#2C7FB8";

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={`w-10 h-10 transition-colors duration-300 ${className}`}
    >
      {/* Outer gear circle */}
      <circle cx="20" cy="20" r="12" stroke={strokeColor} strokeWidth="1.5" />
      {/* Inner shaft hub */}
      <circle cx="20" cy="20" r="4" stroke={strokeColor} strokeWidth="1.5" />
      {/* Gear teeth */}
      <line x1="20" y1="4" x2="20" y2="8" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="20" y1="32" x2="20" y2="36" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="4" y1="20" x2="8" y2="20" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="32" y1="20" x2="36" y2="20" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="8.7" y1="8.7" x2="11.5" y2="11.5" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="28.5" y1="28.5" x2="31.3" y2="31.3" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="8.7" y1="31.3" x2="11.5" y2="28.5" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="28.5" y1="11.5" x2="31.3" y2="8.7" stroke={strokeColor} strokeWidth="1.5" />
    </svg>
  );
}

// 4. PAPER & PULP (Steam Calender Roll & Sheet Web Path)
export function PaperPulpIcon({ className = "", isHovered = false }: IconProps) {
  const strokeColor = isHovered ? "#F0A431" : "#2C7FB8";

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={`w-10 h-10 transition-colors duration-300 ${className}`}
    >
      {/* Main Heated Drying Cylinder */}
      <circle cx="20" cy="20" r="10" stroke={strokeColor} strokeWidth="1.5" />
      {/* Internal Steam Core */}
      <circle cx="20" cy="20" r="4" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="2 2" />
      {/* Continuous Paper Web looping under the cylinder */}
      <path d="M 4 10 L 15 10 Q 20 30 25 30 L 36 30" stroke={strokeColor} strokeWidth="1.5" />
      {/* Nip pressure indicator */}
      <line x1="20" y1="4" x2="20" y2="8" stroke={strokeColor} strokeWidth="1.5" />
      <polygon points="18,7 22,7 20,10" fill={strokeColor} />
    </svg>
  );
}

// 5. FOOD & BEVERAGE / PROCESSING (Jacketed Sanitary Agitator Tank)
export function FoodBeverageIcon({ className = "", isHovered = false }: IconProps) {
  const strokeColor = isHovered ? "#F0A431" : "#2C7FB8";

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={`w-10 h-10 transition-colors duration-300 ${className}`}
    >
      {/* Vessel Body with Dished Heads */}
      <rect x="10" y="10" width="20" height="20" rx="3" stroke={strokeColor} strokeWidth="1.5" />
      {/* Thermal Jacket Profile */}
      <path d="M 7 14 L 7 26 M 33 14 L 33 26" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 2" />
      {/* Agitator Drive Shaft */}
      <line x1="20" y1="5" x2="20" y2="26" stroke={strokeColor} strokeWidth="1.5" />
      {/* Motor on Top */}
      <rect x="17" y="3" width="6" height="4" stroke={strokeColor} strokeWidth="1.2" />
      {/* Impeller Blades */}
      <line x1="14" y1="24" x2="26" y2="24" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="13" y1="22" x2="15" y2="26" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="25" y1="22" x2="27" y2="26" stroke={strokeColor} strokeWidth="1.5" />
    </svg>
  );
}

// 6. WATER & DESALINATION (High-Recovery RO Membrane Pressure Vessel)
export function WaterDesalIcon({ className = "", isHovered = false }: IconProps) {
  const strokeColor = isHovered ? "#F0A431" : "#2C7FB8";

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={`w-10 h-10 transition-colors duration-300 ${className}`}
    >
      {/* Cylindrical Membrane Vessel */}
      <rect x="6" y="14" width="28" height="12" rx="2" stroke={strokeColor} strokeWidth="1.5" />
      {/* End caps */}
      <line x1="10" y1="14" x2="10" y2="26" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="30" y1="14" x2="30" y2="26" stroke={strokeColor} strokeWidth="1.5" />
      {/* Feed Inlet Port */}
      <path d="M 2 20 L 6 20" stroke={strokeColor} strokeWidth="1.5" />
      {/* Permeate Center Tube */}
      <line x1="10" y1="20" x2="30" y2="20" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="2 2" />
      {/* Permeate Pure Water Outlet */}
      <path d="M 34 20 L 38 20" stroke={strokeColor} strokeWidth="1.5" />
      {/* High-Pressure Concentrate Reject Port */}
      <path d="M 28 26 L 28 32 L 34 32" stroke={strokeColor} strokeWidth="1.5" />
    </svg>
  );
}

// Map slug or industry name to corresponding technical line icon
export const INDUSTRY_TECH_ICONS: Record<
  string,
  React.ComponentType<{ className?: string; isHovered?: boolean }>
> = {
  // Direct Slugs
  paper: PaperPulpIcon,
  processing: FoodBeverageIcon,
  petroleum: OilGasIcon,
  buildings: PowerIcon,
  hospitality: FoodBeverageIcon,
  healthcare: WaterDesalIcon,

  // Prompt Specific Industry Keys
  "oil-gas": OilGasIcon,
  oil_and_gas: OilGasIcon,
  power: PowerIcon,
  manufacturing: ManufacturingIcon,
  "paper-pulp": PaperPulpIcon,
  fnb: FoodBeverageIcon,
  food_beverage: FoodBeverageIcon,
  water: WaterDesalIcon,
};
