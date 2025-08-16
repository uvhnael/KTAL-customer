import React from 'react';
import { ArrowRight, Star, Users, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const features = [
        {
            icon: Users,
            title: 'Đội ngũ chuyên nghiệp',
            description: 'Kiến trúc sư và kỹ sư giàu kinh nghiệm với hơn 10 năm trong ngành'
        },
        {
            icon: Award,
            title: 'Chất lượng đảm bảo',
            description: 'Cam kết chất lượng với bảo hành dài hạn và hỗ trợ sau bàn giao'
        },
        {
            icon: Clock,
            title: 'Tiến độ đúng hẹn',
            description: 'Luôn hoàn thành dự án đúng thời gian cam kết với khách hàng'
        }
    ];

    const services = [
        {
            title: 'Thiết kế kiến trúc',
            description: 'Thiết kế tổng thể công trình từ ý tưởng đến bản vẽ hoàn thiện',
            image: '/api/placeholder/400/300'
        },
        {
            title: 'Thiết kế nội thất',
            description: 'Tạo không gian sống hoàn hảo phù hợp với phong cách riêng',
            image: '/api/placeholder/400/300'
        },
        {
            title: 'Thi công xây dựng',
            description: 'Thi công chuyên nghiệp với đội ngũ thợ lành nghề',
            image: '/api/placeholder/400/300'
        }
    ];

    const testimonials = [
        {
            name: 'Anh Minh',
            role: 'Chủ nhà tại Quận 7',
            content: 'Rất hài lòng với dịch vụ của Kiến Trúc An Lạc. Ngôi nhà được thiết kế đẹp và thi công chất lượng.',
            rating: 5
        },
        {
            name: 'Chị Lan',
            role: 'Chủ nhà tại Bình Thạnh',
            content: 'Đội ngũ tư vấn nhiệt tình, thiết kế ưng ý và tiến độ đúng hẹn. Rất recommend!',
            rating: 5
        },
        {
            name: 'Anh Tuấn',
            role: 'Chủ nhà tại Thủ Đức',
            content: 'Giá cả hợp lý, chất lượng tốt. Sẽ giới thiệu cho bạn bè khi có nhu cầu.',
            rating: 5
        }
    ];

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Kiến Trúc An Lạc
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                            Tạo nên không gian sống hoàn hảo với thiết kế hiện đại và thi công chuyên nghiệp
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/contact"
                                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
                            >
                                Tư vấn miễn phí
                                <ArrowRight className="ml-2" size={20} />
                            </Link>
                            <Link
                                to="/portfolio"
                                className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                            >
                                Xem dự án
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Tại sao chọn chúng tôi?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Với kinh nghiệm và tâm huyết, chúng tôi cam kết mang đến cho bạn những công trình kiến trúc tốt nhất
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div key={index} className="bg-white p-8 rounded-lg shadow-lg text-center">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Icon className="text-blue-600" size={32} />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Dịch vụ của chúng tôi
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Cung cấp giải pháp toàn diện từ thiết kế đến thi công hoàn thiện
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="h-48 bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-500">Hình ảnh dịch vụ</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                                    <p className="text-gray-600 mb-4">{service.description}</p>
                                    <Link
                                        to="/services"
                                        className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                                    >
                                        Tìm hiểu thêm
                                        <ArrowRight className="ml-1" size={16} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Khách hàng nói gì về chúng tôi
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Sự hài lòng của khách hàng là động lực để chúng tôi không ngừng hoàn thiện
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="text-yellow-400 fill-current" size={20} />
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                                <div>
                                    <p className="font-semibold">{testimonial.name}</p>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-blue-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Sẵn sàng bắt đầu dự án của bạn?
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí và nhận báo giá chi tiết
                    </p>
                    <Link
                        to="/contact"
                        className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
                    >
                        Liên hệ ngay
                        <ArrowRight className="ml-2" size={20} />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
