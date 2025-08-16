import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

const ChatBox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: 'Xin chào! Tôi là trợ lý AI của Kiến Trúc An Lạc. Tôi có thể giúp bạn tư vấn về dịch vụ thiết kế và thi công. Bạn cần hỗ trợ gì?',
            isBot: true,
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState('');

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const sendMessage = () => {
        if (inputText.trim() === '') return;

        // Add user message
        const userMessage = {
            id: messages.length + 1,
            text: inputText,
            isBot: false,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');

        // Simulate bot response
        setTimeout(() => {
            const botMessage = {
                id: messages.length + 2,
                text: getBotResponse(inputText),
                isBot: true,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
        }, 1000);
    };

    const getBotResponse = (userInput) => {
        const input = userInput.toLowerCase();

        if (input.includes('giá') || input.includes('chi phí') || input.includes('tiền')) {
            return 'Chi phí thiết kế và thi công phụ thuộc vào nhiều yếu tố như diện tích, phong cách, vật liệu... Bạn có thể liên hệ 0123 456 789 để được tư vấn chi tiết và báo giá miễn phí.';
        }

        if (input.includes('dịch vụ') || input.includes('làm gì')) {
            return 'Chúng tôi cung cấp các dịch vụ: Thiết kế kiến trúc, Thiết kế nội thất, Thi công xây dựng, Tư vấn phong thủy, Giám sát công trình. Bạn quan tâm dịch vụ nào?';
        }

        if (input.includes('thời gian') || input.includes('bao lâu')) {
            return 'Thời gian thực hiện dự án thường từ 2-6 tháng tùy theo quy mô. Thiết kế: 2-4 tuần, Thi công: 1.5-5 tháng. Chúng tôi sẽ có kế hoạch chi tiết cho từng dự án.';
        }

        if (input.includes('liên hệ') || input.includes('gặp')) {
            return 'Bạn có thể liên hệ với chúng tôi qua: Điện thoại: 0123 456 789, Email: info@kientrucanlac.com, hoặc đến trực tiếp văn phòng tại 123 Đường ABC, Quận XYZ, TP.HCM.';
        }

        return 'Cảm ơn bạn đã quan tâm! Để được tư vấn chi tiết hơn, vui lòng liên hệ hotline 0123 456 789 hoặc để lại thông tin, chúng tôi sẽ gọi lại trong thời gian sớm nhất.';
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
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
                                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                            >
                                <div
                                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${message.isBot
                                            ? 'bg-gray-100 text-gray-800'
                                            : 'bg-blue-600 text-white'
                                        }`}
                                >
                                    {message.text}
                                </div>
                            </div>
                        ))}
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
                                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={sendMessage}
                                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBox;
