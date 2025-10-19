import {
  Home,
  Palette,
  Hammer,
  TreePine,
  Eye,
  Headphones,
  ArrowRight,
  Check,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { serviceAPI } from "../services/api";
import { useApi } from "../hooks/useApi";
import { CONTACT_INFO } from "../constants";
import { Link } from "react-router-dom";

const Services = () => {
  // Sử dụng custom hook để fetch services từ API
  const {
    data: rawServices,
    loading,
    error,
    refetch,
  } = useApi(() => serviceAPI.getAll());

  const services = rawServices?.map((service) => ({
    ...service,
    features: (() => {
      try {
        // Parse lần 1: lấy string ra
        const firstParse =
          typeof service.features === "string"
            ? JSON.parse(service.features)
            : service.features;

        // Nếu kết quả vẫn là string JSON → parse lần 2
        if (typeof firstParse === "string") {
          return JSON.parse(firstParse);
        }
        return firstParse;
      } catch {
        return service.features;
      }
    })(),
  }));

  // Icon mapping (vì API có thể không trả về icon)
  const iconMap = {
    "Thiết kế Kiến trúc": Home,
    "Thiết kế Nội thất": Palette,
    "Thi công Xây dựng": Hammer,
    "Thiết kế Cảnh quan": TreePine,
    "Giám sát Công trình": Eye,
    "Tư vấn & Hỗ trợ": Headphones,
  };

  const displayServices = services;

  const process = [
    {
      step: "01",
      title: "Tư vấn & Khảo sát",
      description:
        "Lắng nghe nhu cầu, khảo sát thực địa và tư vấn giải pháp phù hợp",
    },
    {
      step: "02",
      title: "Thiết kế & Báo giá",
      description: "Lập thiết kế sơ bộ, báo giá chi tiết và ký hợp đồng",
    },
    {
      step: "03",
      title: "Thiết kế chi tiết",
      description: "Hoàn thiện bản vẽ kỹ thuật, 3D và các thủ tục pháp lý",
    },
    {
      step: "04",
      title: "Thi công & Giám sát",
      description: "Thi công theo tiến độ với giám sát chất lượng nghiêm ngặt",
    },
    {
      step: "05",
      title: "Bàn giao & Bảo hành",
      description: "Bàn giao công trình hoàn thiện và hỗ trợ bảo hành dài hạn",
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Dịch vụ của chúng tôi
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Cung cấp giải pháp toàn diện từ thiết kế đến thi công, mang đến
            không gian sống hoàn hảo cho mọi gia đình
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-blue-600" size={48} />
              <span className="ml-4 text-lg">Đang tải dịch vụ...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <div className="flex items-center">
                <AlertCircle className="text-red-500 mr-3" size={24} />
                <div>
                  <h3 className="text-red-800 font-medium">
                    Không thể tải dịch vụ
                  </h3>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                  <button
                    onClick={refetch}
                    className="mt-2 text-red-700 underline hover:text-red-800"
                  >
                    Thử lại
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Services Grid */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayServices.map((service, index) => {
                const Icon = iconMap[service.title] || Home;
                return (
                  <div
                    key={service.id || index}
                    className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-8 flex flex-col h-full"
                  >
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                      <Icon className="text-blue-600" size={32} />
                    </div>

                    <h3 className="text-xl font-semibold mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>

                    {service.features && (
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm">
                            <Check
                              className="text-green-500 mr-2 flex-shrink-0"
                              size={16}
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-auto border-t pt-4">
                      <p className="text-lg font-semibold text-blue-600 mb-4">
                        {service.price || "Liên hệ để biết giá"}
                      </p>
                      <div className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                        <Link to="/contact" className="w-full text-center">
                          Tư vấn miễn phí
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quy trình làm việc
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Quy trình chuyên nghiệp 5 bước đảm bảo chất lượng và tiến độ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute mt-8">
                    <ArrowRight className="text-gray-300 ml-8" size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Bạn cần tư vấn dịch vụ nào?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Liên hệ với chúng tôi để được tư vấn miễn phí và nhận báo giá chi
            tiết nhất
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Gọi ngay: {CONTACT_INFO.PHONE}
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Tư vấn trực tuyến
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
