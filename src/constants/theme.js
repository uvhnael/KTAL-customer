// Theme and UI Constants
export const THEME = {
  // Color Palette
  COLORS: {
    // Primary colors (Blue theme for architecture/construction)
    PRIMARY: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
      950: "#172554",
    },

    // Secondary colors (Gray/Neutral)
    SECONDARY: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
      950: "#020617",
    },

    // Accent colors (Gold/Orange for highlights)
    ACCENT: {
      50: "#fffbeb",
      100: "#fef3c7",
      200: "#fde68a",
      300: "#fcd34d",
      400: "#fbbf24",
      500: "#f59e0b",
      600: "#d97706",
      700: "#b45309",
      800: "#92400e",
      900: "#78350f",
    },

    // Status colors
    SUCCESS: {
      50: "#f0fdf4",
      100: "#dcfce7",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
    },
    WARNING: {
      50: "#fffbeb",
      100: "#fef3c7",
      500: "#f59e0b",
      600: "#d97706",
      700: "#b45309",
    },
    DANGER: {
      50: "#fef2f2",
      100: "#fee2e2",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
    },
    INFO: {
      50: "#eff6ff",
      100: "#dbeafe",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
    },
  },

  // Typography
  FONTS: {
    PRIMARY: [
      "Inter",
      "ui-sans-serif",
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "Noto Sans",
      "sans-serif",
    ],
    SECONDARY: [
      "Merriweather",
      "ui-serif",
      "Georgia",
      "Cambria",
      "Times New Roman",
      "Times",
      "serif",
    ],
    MONO: [
      "JetBrains Mono",
      "ui-monospace",
      "SFMono-Regular",
      "Menlo",
      "Monaco",
      "Consolas",
      "Liberation Mono",
      "Courier New",
      "monospace",
    ],
    DISPLAY: [
      "Playfair Display",
      "ui-serif",
      "Georgia",
      "Cambria",
      "Times New Roman",
      "Times",
      "serif",
    ],
  },

  // Font Sizes (following Tailwind CSS scale)
  FONT_SIZES: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem", // 48px
    "6xl": "3.75rem", // 60px
    "7xl": "4.5rem", // 72px
    "8xl": "6rem", // 96px
    "9xl": "8rem", // 128px
  },

  // Font Weights
  FONT_WEIGHTS: {
    thin: "100",
    extralight: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  },

  // Line Heights
  LINE_HEIGHTS: {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },

  // Spacing (following Tailwind CSS scale)
  SPACING: {
    0: "0",
    px: "1px",
    0.5: "0.125rem", // 2px
    1: "0.25rem", // 4px
    1.5: "0.375rem", // 6px
    2: "0.5rem", // 8px
    2.5: "0.625rem", // 10px
    3: "0.75rem", // 12px
    3.5: "0.875rem", // 14px
    4: "1rem", // 16px
    5: "1.25rem", // 20px
    6: "1.5rem", // 24px
    7: "1.75rem", // 28px
    8: "2rem", // 32px
    9: "2.25rem", // 36px
    10: "2.5rem", // 40px
    11: "2.75rem", // 44px
    12: "3rem", // 48px
    14: "3.5rem", // 56px
    16: "4rem", // 64px
    20: "5rem", // 80px
    24: "6rem", // 96px
    28: "7rem", // 112px
    32: "8rem", // 128px
    36: "9rem", // 144px
    40: "10rem", // 160px
    44: "11rem", // 176px
    48: "12rem", // 192px
    52: "13rem", // 208px
    56: "14rem", // 224px
    60: "15rem", // 240px
    64: "16rem", // 256px
    72: "18rem", // 288px
    80: "20rem", // 320px
    96: "24rem", // 384px
  },

  // Border Radius
  BORDER_RADIUS: {
    none: "0",
    sm: "0.125rem", // 2px
    DEFAULT: "0.25rem", // 4px
    md: "0.375rem", // 6px
    lg: "0.5rem", // 8px
    xl: "0.75rem", // 12px
    "2xl": "1rem", // 16px
    "3xl": "1.5rem", // 24px
    full: "9999px",
  },

  // Shadows
  SHADOWS: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
    none: "0 0 #0000",
  },

  // Breakpoints (Responsive Design)
  BREAKPOINTS: {
    xs: "475px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  // Z-Index Layers
  Z_INDEX: {
    hide: -1,
    auto: "auto",
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1020,
    banner: 1030,
    overlay: 1040,
    modal: 1050,
    popover: 1060,
    skipLink: 1070,
    toast: 1080,
    tooltip: 1090,
  },

  // Transitions & Animations
  TRANSITIONS: {
    DURATION: {
      75: "75ms",
      100: "100ms",
      150: "150ms",
      200: "200ms",
      300: "300ms",
      500: "500ms",
      700: "700ms",
      1000: "1000ms",
    },
    TIMING: {
      linear: "linear",
      in: "cubic-bezier(0.4, 0, 1, 1)",
      out: "cubic-bezier(0, 0, 0.2, 1)",
      "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
    },
    PROPERTY: {
      none: "none",
      all: "all",
      DEFAULT:
        "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
      colors:
        "color, background-color, border-color, text-decoration-color, fill, stroke",
      opacity: "opacity",
      shadow: "box-shadow",
      transform: "transform",
    },
  },
};

// Component-specific UI constants
export const UI_COMPONENTS = {
  // Button variants
  BUTTON: {
    VARIANTS: {
      primary: "primary",
      secondary: "secondary",
      outline: "outline",
      ghost: "ghost",
      link: "link",
      destructive: "destructive",
    },
    SIZES: {
      sm: "sm",
      md: "md",
      lg: "lg",
      xl: "xl",
      icon: "icon",
    },
  },

  // Input variants
  INPUT: {
    VARIANTS: {
      default: "default",
      filled: "filled",
      outline: "outline",
      underline: "underline",
    },
    SIZES: {
      sm: "sm",
      md: "md",
      lg: "lg",
    },
  },

  // Modal sizes
  MODAL: {
    SIZES: {
      xs: "320px",
      sm: "384px",
      md: "448px",
      lg: "512px",
      xl: "576px",
      "2xl": "672px",
      "3xl": "768px",
      "4xl": "896px",
      "5xl": "1024px",
      "6xl": "1152px",
      full: "100vw",
    },
  },

  // Card variants
  CARD: {
    VARIANTS: {
      default: "default",
      outline: "outline",
      filled: "filled",
      elevated: "elevated",
    },
  },

  // Badge variants
  BADGE: {
    VARIANTS: {
      default: "default",
      secondary: "secondary",
      destructive: "destructive",
      outline: "outline",
    },
  },

  // Alert variants
  ALERT: {
    VARIANTS: {
      default: "default",
      destructive: "destructive",
      success: "success",
      warning: "warning",
      info: "info",
    },
  },
};

// Layout constants
export const LAYOUT = {
  // Container max widths
  CONTAINER: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  // Header height
  HEADER_HEIGHT: "64px",

  // Footer height
  FOOTER_HEIGHT: "200px",

  // Sidebar width
  SIDEBAR_WIDTH: "280px",

  // Content padding
  CONTENT_PADDING: {
    mobile: "1rem",
    tablet: "2rem",
    desktop: "3rem",
  },

  // Grid columns
  GRID_COLS: {
    1: "repeat(1, minmax(0, 1fr))",
    2: "repeat(2, minmax(0, 1fr))",
    3: "repeat(3, minmax(0, 1fr))",
    4: "repeat(4, minmax(0, 1fr))",
    6: "repeat(6, minmax(0, 1fr))",
    12: "repeat(12, minmax(0, 1fr))",
  },
};

// Animation keyframes
export const ANIMATIONS = {
  KEYFRAMES: {
    // Fade animations
    fadeIn: {
      "0%": { opacity: "0" },
      "100%": { opacity: "1" },
    },
    fadeOut: {
      "0%": { opacity: "1" },
      "100%": { opacity: "0" },
    },

    // Slide animations
    slideInUp: {
      "0%": { transform: "translateY(100%)", opacity: "0" },
      "100%": { transform: "translateY(0)", opacity: "1" },
    },
    slideInDown: {
      "0%": { transform: "translateY(-100%)", opacity: "0" },
      "100%": { transform: "translateY(0)", opacity: "1" },
    },
    slideInLeft: {
      "0%": { transform: "translateX(-100%)", opacity: "0" },
      "100%": { transform: "translateX(0)", opacity: "1" },
    },
    slideInRight: {
      "0%": { transform: "translateX(100%)", opacity: "0" },
      "100%": { transform: "translateX(0)", opacity: "1" },
    },

    // Scale animations
    scaleIn: {
      "0%": { transform: "scale(0)", opacity: "0" },
      "100%": { transform: "scale(1)", opacity: "1" },
    },
    scaleOut: {
      "0%": { transform: "scale(1)", opacity: "1" },
      "100%": { transform: "scale(0)", opacity: "0" },
    },

    // Rotate animations
    spin: {
      "0%": { transform: "rotate(0deg)" },
      "100%": { transform: "rotate(360deg)" },
    },

    // Bounce animation
    bounce: {
      "0%, 100%": {
        transform: "translateY(-25%)",
        animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
      },
      "50%": {
        transform: "translateY(0)",
        animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
      },
    },

    // Pulse animation
    pulse: {
      "0%, 100%": { opacity: "1" },
      "50%": { opacity: ".5" },
    },

    // Ping animation
    ping: {
      "75%, 100%": { transform: "scale(2)", opacity: "0" },
    },
  },

  // Animation classes
  CLASSES: {
    fadeIn: "animate-fade-in",
    fadeOut: "animate-fade-out",
    slideInUp: "animate-slide-in-up",
    slideInDown: "animate-slide-in-down",
    slideInLeft: "animate-slide-in-left",
    slideInRight: "animate-slide-in-right",
    scaleIn: "animate-scale-in",
    scaleOut: "animate-scale-out",
    spin: "animate-spin",
    bounce: "animate-bounce",
    pulse: "animate-pulse",
    ping: "animate-ping",
  },
};

export default THEME;
