import React, { useState } from "react";
import { MessageCircle, X, Send, Bot, Loader2 } from "lucide-react";
import { chatAPI } from "../services/api";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Xin chào! Tôi là trợ lý AI của Kiến Trúc An Lạc. Tôi có thể giúp bạn tư vấn về dịch vụ thiết kế và thi công. Bạn cần hỗ trợ gì?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (inputText.trim() === "" || isLoading) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText("");
    setIsLoading(true);

    try {
      // Call API using chatAPI
      const data = await chatAPI.ask(currentInput, 1);

      // Add bot response
      const botMessage = {
        id: messages.length + 2,
        text:
          data.answer || "Xin lỗi, tôi không thể trả lời câu hỏi này lúc này.",
        isBot: true,
        timestamp: new Date(),
        relatedBlogs: data.relatedBlogs || [],
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error calling chat API:", error);

      // Show error message instead of fallback response
      const errorMessage = {
        id: messages.length + 2,
        text: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading) {
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center z-50"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border flex flex-col z-50">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center space-x-2">
            <Bot size={20} />
            <div>
              <h3 className="font-semibold">Trợ lý AI</h3>
              <p className="text-xs opacity-90">Kiến Trúc An Lạc</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isBot ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.isBot
                      ? "bg-gray-100 text-gray-800"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  <div className="whitespace-pre-line">{message.text}</div>
                  {message.relatedBlogs && message.relatedBlogs.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-300">
                      <p className="text-xs font-semibold text-gray-600 mb-2">
                        Bài viết liên quan:
                      </p>
                      <div className="space-y-2">
                        {message.relatedBlogs.map((blog) => (
                          <div key={blog.id} className="text-xs">
                            <a
                              href={`/blog/${blog.slug}`}
                              className="text-blue-600 hover:text-blue-800 font-medium block"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {blog.title}
                            </a>
                            {blog.summary && (
                              <p className="text-gray-500 mt-1">
                                {blog.summary}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg text-sm flex items-center space-x-2">
                  <Loader2 size={16} className="animate-spin" />
                  <span>Đang tìm kiếm câu trả lời...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nhập câu hỏi của bạn..."
                disabled={isLoading}
                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || inputText.trim() === ""}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
              >
                {isLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={16} />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox;
