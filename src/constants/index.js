// API Configuration
export const CONTACT_INFO = {
  ADDRESS: "Ngã ba Việt Lào, Thị xã Kỳ Anh, Tỉnh Hà Tĩnh",
  PHONE: "0399683037",
  EMAIL: "uvhnael@gmail.com",
};

export const API_CONFIG = {
  BASE_URL:
    process.env.REACT_APP_API_BASE_URL || "http://localhost:1707/api/v1",
  TIMEOUT: parseInt(process.env.REACT_APP_API_TIMEOUT) || 60000,
  ENDPOINTS: {
    // Contact endpoints
    CONTACTS: "/contacts",
    CONTACT_BY_ID: (id) => `/contacts/${id}`,

    // Project endpoints
    PROJECTS: "/projects",
    PROJECT_BY_ID: (id) => `/projects/${id}`,

    // Service endpoints
    SERVICES: "/services",
    SERVICE_BY_ID: (id) => `/services/${id}`,

    // Blog endpoints
    BLOGS: "/blogs",
    BLOG_BY_ID: (id) => `/blogs/${id}`,
    BLOG_BY_SLUG: (slug) => `/blogs/slug/${slug}`,
    BLOG_CATEGORIES: "/blogs/categories",

    // Chat endpoints
    CHAT_ASK: "/chat/ask",
  },
};

// Application Routes
export const ROUTES = {
  HOME: "/",
  SERVICES: "/services",
  PORTFOLIO: "/portfolio",
  PROJECT_DETAIL: "/project/:id",
  PROJECT_DETAIL_PATH: (id) => `/project/${id}`,
  BLOG: "/blog",
  BLOG_DETAIL: "/blog/:slug",
  BLOG_DETAIL_PATH: (slug) => `/blog/${slug}`,
  ABOUT: "/about",
  CONTACT: "/contact",
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: "token",
  USER_PREFERENCES: "userPreferences",
  THEME: "theme",
  LANGUAGE: "language",
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// Application Constants
export const APP_CONFIG = {
  NAME: "Kiến Trúc An Lạc",
  VERSION: "1.0.0",
  ENVIRONMENT: process.env.REACT_APP_ENVIRONMENT || "development",
  USE_MOCK_API: process.env.REACT_APP_USE_MOCK_API === "true",
};

// UI Constants
export const UI_CONFIG = {
  // Breakpoints (Tailwind CSS)
  BREAKPOINTS: {
    SM: "640px",
    MD: "768px",
    LG: "1024px",
    XL: "1280px",
    "2XL": "1536px",
  },

  // Animation durations
  ANIMATION_DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
  },

  // Z-index layers
  Z_INDEX: {
    DROPDOWN: 1000,
    STICKY: 1020,
    FIXED: 1030,
    MODAL_BACKDROP: 1040,
    MODAL: 1050,
    POPOVER: 1060,
    TOOLTIP: 1070,
    TOAST: 1080,
  },
};

// Form Validation
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[0-9]{10,11}$/,
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 3,
  MESSAGE_MAX_LENGTH: 1000,
  TITLE_MAX_LENGTH: 200,
};

// Chat Configuration
export const CHAT_CONFIG = {
  MAX_RESULTS: 5,
  MAX_MESSAGE_LENGTH: 500,
  TYPING_DELAY: 1000,
  PLACEHOLDER_MESSAGES: [
    "Hỏi về dịch vụ kiến trúc...",
    "Tìm hiểu về dự án...",
    "Liên hệ tư vấn...",
  ],
};

// Import messages from separate file
export { MESSAGES, TEXT_PATTERNS, DATE_TIME_TEXT } from "./messages";

// Import theme from separate file
export { THEME, UI_COMPONENTS, LAYOUT, ANIMATIONS } from "./theme";

// File Upload Configuration
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  ALLOWED_DOCUMENT_TYPES: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
};

// Default Values
export const DEFAULT_VALUES = {
  PAGINATION: {
    PAGE: 1,
    LIMIT: 10,
    MAX_LIMIT: 100,
  },
  CONTACT_FORM: {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  },
  CHAT: {
    maxResults: 5,
    placeholder: "Nhập câu hỏi của bạn...",
  },
};

// Date/Time Formats
export const DATE_FORMATS = {
  SHORT: "DD/MM/YYYY",
  LONG: "DD/MM/YYYY HH:mm",
  ISO: "YYYY-MM-DD",
  DISPLAY: "DD tháng MM, YYYY",
};

// Social Media Links (nếu cần)
export const SOCIAL_LINKS = {
  FACEBOOK: "#",
  INSTAGRAM: "#",
  TWITTER: "#",
  LINKEDIN: "#",
  YOUTUBE: "#",
};

// Company Information
export const COMPANY_INFO = {
  NAME: "Kiến Trúc An Lạc",
  ADDRESS: "",
  PHONE: "",
  EMAIL: "",
  WEBSITE: "",
  BUSINESS_HOURS: "Thứ 2 - Thứ 6: 8:00 - 17:30",
};
