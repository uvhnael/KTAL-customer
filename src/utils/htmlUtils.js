import DOMPurify from "dompurify";

/**
 * Sanitize HTML content using DOMPurify
 * @param {string} html - Raw HTML string
 * @returns {object} - Safe HTML object for dangerouslySetInnerHTML
 */
export const sanitizeHTML = (html) => {
  if (!html) return { __html: "" };

  const cleanHTML = DOMPurify.sanitize(html, {
    // Allow these tags
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "b",
      "i",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "blockquote",
      "a",
      "img",
    ],
    // Allow these attributes
    ALLOWED_ATTR: ["href", "src", "alt", "title", "class"],
    // Remove target attributes to prevent security issues
    FORBID_ATTR: ["style", "onclick", "onload", "onerror"],
  });

  return {
    __html: cleanHTML,
  };
};

/**
 * Extract plain text from HTML and truncate it
 * @param {string} html - HTML string
 * @param {number} maxLength - Maximum length of text
 * @returns {string} - Truncated plain text
 */
export const getPlainTextFromHTML = (html, maxLength = 200) => {
  if (!html) return "";

  // Create a temporary element to extract text content
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
  const plainText = tempDiv.textContent || tempDiv.innerText || "";

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return plainText.substring(0, maxLength).trim() + "...";
};

/**
 * Format date string to Vietnamese format
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted date
 */
export const formatDate = (dateString) => {
  if (!dateString) return "N/A";

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch (error) {
    return "N/A";
  }
};

/**
 * Get status display text and color
 * @param {string} status - Project status
 * @returns {object} - Status display info
 */
export const getStatusInfo = (status) => {
  const statusMap = {
    completed: {
      text: "Hoàn thành",
      color: "bg-green-500",
      textColor: "text-green-700",
    },
    in_progress: {
      text: "Đang thực hiện",
      color: "bg-blue-500",
      textColor: "text-blue-700",
    },
    planning: {
      text: "Đang lên kế hoạch",
      color: "bg-yellow-500",
      textColor: "text-yellow-700",
    },
    on_hold: {
      text: "Tạm dừng",
      color: "bg-orange-500",
      textColor: "text-orange-700",
    },
    cancelled: {
      text: "Đã hủy",
      color: "bg-red-500",
      textColor: "text-red-700",
    },
  };

  return (
    statusMap[status] || {
      text: status || "N/A",
      color: "bg-gray-500",
      textColor: "text-gray-700",
    }
  );
};
