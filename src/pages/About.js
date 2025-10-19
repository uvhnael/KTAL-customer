import React from "react";
import { Award, Target, Heart, CheckCircle, Star } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Chất lượng",
      description:
        "Cam kết mang đến sản phẩm chất lượng cao nhất với từng chi tiết hoàn hảo",
    },
    {
      icon: Heart,
      title: "Tận tâm",
      description:
        "Đặt khách hàng làm trung tâm, lắng nghe và thấu hiểu mọi nhu cầu",
    },
    {
      icon: CheckCircle,
      title: "Uy tín",
      description: "Xây dựng niềm tin qua từng dự án hoàn thành đúng cam kết",
    },
    {
      icon: Award,
      title: "Chuyên nghiệp",
      description:
        "Đội ngũ giàu kinh nghiệm với quy trình làm việc chuyên nghiệp",
    },
  ];

  const team = [
    {
      name: "KTS. Nguyễn Văn An",
      position: "Giám đốc điều hành",
      experience: "15 năm kinh nghiệm",
      education: "Thạc sĩ Kiến trúc - ĐH Kiến trúc TP.HCM",
      image: "/api/placeholder/300/300",
      achievements: [
        "Giải thưởng Kiến trúc sư xuất sắc 2020",
        "Chứng chỉ Green Building",
      ],
    },
    {
      name: "KTS. Trần Thị Bình",
      position: "Trưởng phòng Thiết kế",
      experience: "12 năm kinh nghiệm",
      education: "Cử nhân Kiến trúc - ĐH Bách khoa TP.HCM",
      image: "/api/placeholder/300/300",
      achievements: [
        "Giải Ba cuộc thi thiết kế 2019",
        "Chuyên gia thiết kế nội thất",
      ],
    },
    {
      name: "KS. Lê Văn Cường",
      position: "Trưởng phòng Thi công",
      experience: "18 năm kinh nghiệm",
      education: "Cử nhân Xây dựng - ĐH Xây dựng TP.HCM",
      image: "/api/placeholder/300/300",
      achievements: ["Chứng chỉ quản lý dự án PMP", "Kỹ sư xây dựng cao cấp"],
    },
    {
      name: "KTS. Phạm Thị Diễm",
      position: "Chuyên viên Tư vấn",
      experience: "8 năm kinh nghiệm",
      education: "Cử nhân Kiến trúc - ĐH Mỹ thuật TP.HCM",
      image: "/api/placeholder/300/300",
      achievements: [
        "Chuyên gia phong thủy",
        "Giải Nhì cuộc thi thiết kế 2021",
      ],
    },
  ];

  const milestones = [
    {
      year: "2015",
      title: "Thành lập công ty",
      description: "Kiến Trúc An Lạc được thành lập với đội ngũ 5 người",
    },
    {
      year: "2017",
      title: "Mở rộng quy mô",
      description:
        "Mở rộng đội ngũ lên 15 người và hoàn thành 50 dự án đầu tiên",
    },
    {
      year: "2019",
      title: "Nhận giải thưởng",
      description:
        'Nhận giải "Doanh nghiệp thiết kế uy tín" từ Hiệp hội Kiến trúc sư',
    },
    {
      year: "2021",
      title: "Công nghệ 4.0",
      description: "Áp dụng công nghệ BIM và VR vào quy trình thiết kế",
    },
    {
      year: "2023",
      title: "Phát triển bền vững",
      description:
        "200+ dự án hoàn thành, trở thành đối tác tin cậy của khách hàng",
    },
  ];

  const stats = [
    { number: "200+", label: "Dự án hoàn thành" },
    { number: "150+", label: "Khách hàng hài lòng" },
    { number: "25+", label: "Thành viên đội ngũ" },
    { number: "8+", label: "Năm kinh nghiệm" },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Về chúng tôi</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Kiến Trúc An Lạc - Đơn vị thiết kế và thi công uy tín, mang đến
            không gian sống hoàn hảo cho mọi gia đình
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Câu chuyện của chúng tôi
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                Được thành lập vào năm 2015 với tầm nhìn tạo nên những không
                gian sống an lạc và hạnh phúc, Kiến Trúc An Lạc đã không ngừng
                phát triển và khẳng định vị thế trong lĩnh vực thiết kế - thi
                công.
              </p>
              <p className="text-gray-600 mb-6">
                Chúng tôi tin rằng mỗi công trình không chỉ là nơi ở mà còn là
                tổ ấm, là nơi gắn kết những cảm xúc và kỷ niệm đẹp của gia đình.
                Với phương châm "Kiến tạo hạnh phúc", chúng tôi luôn nỗ lực mang
                đến những giải pháp thiết kế tối ưu và dịch vụ thi công chất
                lượng cao nhất.
              </p>
              <p className="text-gray-600">
                Sau 8 năm hoạt động, chúng tôi tự hào đã đồng hành cùng hơn 150
                gia đình trong việc hiện thực hóa ngôi nhà mơ ước của họ.
              </p>
            </div>
            <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
              <img
                src="/imgs/475481368_1708886530048590_4168282680762918754_n.jpg"
                alt="Company Story"
                className="w-full h-auto rounded-lg hidden lg:block"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Giá trị cốt lõi
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Những giá trị định hướng mọi hoạt động và quyết định của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-blue-600" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Đội ngũ chuyên gia
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Những chuyên gia hàng đầu với kinh nghiệm và tâm huyết
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 text-center"
              >
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-500">Avatar</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">
                  {member.position}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  {member.experience}
                </p>
                <p className="text-sm text-gray-500 mb-4">{member.education}</p>

                <div className="text-left">
                  <h4 className="font-medium text-sm mb-2">
                    Thành tích nổi bật:
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {member.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-center">
                        <Star
                          size={12}
                          className="text-yellow-400 mr-1 flex-shrink-0"
                        />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hành trình phát triển
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Những cột mốc quan trọng trong quá trình phát triển của Kiến Trúc
              An Lạc
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-blue-200"></div>

            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                } mb-8`}
              >
                <div
                  className={`w-1/2 ${
                    index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                  }`}
                >
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Sẵn sàng làm việc cùng chúng tôi?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Hãy để Kiến Trúc An Lạc đồng hành cùng bạn trong việc tạo nên không
            gian sống hoàn hảo
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Liên hệ tư vấn ngay
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
