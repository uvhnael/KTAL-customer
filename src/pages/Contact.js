import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { contactAPI, serviceAPI } from "../services/api";
import { useApi } from "../hooks/useApi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceId: null,
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    data: services,
    loading,
    error,
    refetch,
  } = useApi(() => serviceAPI.getAll());

  const handleChange = (e) => {
    const value =
      e.target.name === "serviceId"
        ? e.target.value
          ? parseInt(e.target.value)
          : null
        : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitError(null);
    try {
      // datetime sql
      formData.createdAt = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      await contactAPI.create(formData);
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          serviceId: null,
          message: "",
        });
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError("Có lỗi xảy ra khi gửi form. Vui lòng thử lại.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Địa chỉ",
      content: "123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh",
      link: "https://maps.google.com",
    },
    {
      icon: Phone,
      title: "Điện thoại",
      content: "0123 456 789",
      link: "tel:0123456789",
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@kientrucanlac.com",
      link: "mailto:info@kientrucanlac.com",
    },
    {
      icon: Clock,
      title: "Giờ làm việc",
      content: "Thứ 2 - Thứ 6: 8:00 - 17:30\nThứ 7: 8:00 - 12:00",
      link: null,
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Liên hệ với chúng tôi
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Sẵn sàng lắng nghe và tư vấn miễn phí cho dự án của bạn
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Gửi yêu cầu tư vấn</h2>

              {loading && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Đang tải dịch vụ...</p>
                </div>
              )}
              {error && (
                <div className="text-center py-8">
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    <strong className="font-bold">Lỗi! </strong>
                    <span className="block sm:inline">
                      Không thể tải danh sách dịch vụ. Vui lòng thử lại sau.
                    </span>
                  </div>
                </div>
              )}
              {!loading && !error && isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-600 mb-2">
                    Gửi thành công!
                  </h3>
                  <p className="text-gray-600">
                    Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong thời gian
                    sớm nhất.
                  </p>
                </div>
              ) : (
                !loading &&
                !error && (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Họ và tên *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Nhập họ và tên"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Số điện thoại *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="0123 456 789"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="service"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Dịch vụ quan tâm
                      </label>
                      <select
                        id="serviceId"
                        name="serviceId"
                        value={formData.serviceId || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Chọn dịch vụ</option>
                        {services.map((service, index) => (
                          <option key={service.id || index} value={service.id}>
                            {service.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Nội dung *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Mô tả chi tiết về dự án hoặc yêu cầu của bạn..."
                      />
                    </div>

                    {submitError && (
                      <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                        <span className="block sm:inline">{submitError}</span>
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={submitLoading}
                      className={`w-full ${
                        submitLoading
                          ? "bg-blue-400"
                          : "bg-blue-600 hover:bg-blue-700"
                      } text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center`}
                    >
                      {submitLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Đang gửi...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2" size={20} />
                          Gửi yêu cầu
                        </>
                      )}
                    </button>
                  </form>
                )
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Thông tin liên hệ</h2>

              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="text-blue-600" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {info.title}
                        </h3>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-gray-600 hover:text-blue-600 transition-colors"
                            target={
                              info.link.startsWith("http") ? "_blank" : "_self"
                            }
                            rel={
                              info.link.startsWith("http")
                                ? "noopener noreferrer"
                                : ""
                            }
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-gray-600 whitespace-pre-line">
                            {info.content}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Map placeholder */}
              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Bản đồ Google Maps</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Câu hỏi thường gặp
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Những câu hỏi khách hàng quan tâm nhất
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-3">
                  Chi phí thiết kế và thi công như thế nào?
                </h3>
                <p className="text-gray-600 text-sm">
                  Chi phí phụ thuộc vào diện tích, phong cách và yêu cầu cụ thể.
                  Chúng tôi sẽ báo giá chi tiết sau khi khảo sát thực tế.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-3">
                  Thời gian hoàn thành dự án bao lâu?
                </h3>
                <p className="text-gray-600 text-sm">
                  Thời gian thực hiện từ 2-6 tháng tùy theo quy mô dự án. Thiết
                  kế 2-4 tuần, thi công 1.5-5 tháng.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-3">
                  Có bảo hành sau khi hoàn thành không?
                </h3>
                <p className="text-gray-600 text-sm">
                  Chúng tôi cam kết bảo hành 2-5 năm tùy theo hạng mục và hỗ trợ
                  khách hàng 24/7 sau bàn giao.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-3">
                  Có thể xem trước thiết kế 3D không?
                </h3>
                <p className="text-gray-600 text-sm">
                  Có, chúng tôi cung cấp bản vẽ 3D chi tiết và có thể sử dụng
                  công nghệ VR để khách hàng trải nghiệm thực tế.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-3">
                  Có tư vấn phong thủy không?
                </h3>
                <p className="text-gray-600 text-sm">
                  Có, đội ngũ của chúng tôi bao gồm chuyên gia phong thủy để tư
                  vấn hướng nhà, bố trí nội thất hợp phong thủy.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-3">
                  Có hỗ trợ vay vốn ngân hàng không?
                </h3>
                <p className="text-gray-600 text-sm">
                  Chúng tôi có thể hỗ trợ làm hồ sơ vay vốn ngân hàng và có quan
                  hệ đối tác với một số ngân hàng lớn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Gọi ngay để được tư vấn miễn phí
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Đội ngũ chuyên gia của chúng tôi sẵn sàng hỗ trợ bạn 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0123456789"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Gọi ngay: 0123 456 789
            </a>
            <a
              href="mailto:info@kientrucanlac.com"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Gửi email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
