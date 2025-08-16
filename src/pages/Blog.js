import React, { useState } from 'react';
import { Calendar, User, Clock, ArrowRight, Search, Tag } from 'lucide-react';

const Blog = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'Tất cả' },
        { id: 'architecture', name: 'Kiến trúc' },
        { id: 'interior', name: 'Nội thất' },
        { id: 'construction', name: 'Thi công' },
        { id: 'tips', name: 'Mẹo hay' },
        { id: 'trends', name: 'Xu hướng' }
    ];

    const blogPosts = [
        {
            id: 1,
            title: '10 xu hướng thiết kế nội thất 2024',
            excerpt: 'Khám phá những xu hướng thiết kế nội thất mới nhất năm 2024, từ màu sắc, vật liệu đến phong cách bài trí...',
            content: 'Nội dung đầy đủ của bài viết...',
            category: 'trends',
            author: 'KTS. Nguyễn Văn A',
            date: '2024-12-15',
            readTime: '5 phút',
            image: '/api/placeholder/600/400',
            tags: ['nội thất', 'xu hướng', '2024'],
            featured: true
        },
        {
            id: 2,
            title: 'Cách chọn vật liệu xây dựng chất lượng',
            excerpt: 'Hướng dẫn chi tiết cách lựa chọn vật liệu xây dựng phù hợp với công trình và ngân sách của bạn...',
            content: 'Nội dung đầy đủ của bài viết...',
            category: 'construction',
            author: 'KTS. Trần Thị B',
            date: '2024-12-10',
            readTime: '7 phút',
            image: '/api/placeholder/600/400',
            tags: ['vật liệu', 'xây dựng', 'chất lượng']
        },
        {
            id: 3,
            title: 'Thiết kế nhà phố hiện đại tiết kiệm không gian',
            excerpt: 'Những giải pháp thông minh để tối ưu không gian sống trong các căn nhà phố có diện tích hạn chế...',
            content: 'Nội dung đầy đủ của bài viết...',
            category: 'architecture',
            author: 'KTS. Lê Văn C',
            date: '2024-12-08',
            readTime: '6 phút',
            image: '/api/placeholder/600/400',
            tags: ['nhà phố', 'tiết kiệm không gian', 'hiện đại']
        },
        {
            id: 4,
            title: 'Phong thủy trong thiết kế kiến trúc',
            excerpt: 'Tìm hiểu cách áp dụng nguyên lý phong thủy vào thiết kế để tạo nên không gian sống hài hòa...',
            content: 'Nội dung đầy đủ của bài viết...',
            category: 'architecture',
            author: 'KTS. Phạm Thị D',
            date: '2024-12-05',
            readTime: '8 phút',
            image: '/api/placeholder/600/400',
            tags: ['phong thủy', 'thiết kế', 'hài hòa']
        },
        {
            id: 5,
            title: 'Bí quyết trang trí nội thất với ngân sách tiết kiệm',
            excerpt: 'Những mẹo hay giúp bạn trang trí nội thất đẹp mắt mà không cần tốn kém quá nhiều chi phí...',
            content: 'Nội dung đầy đủ của bài viết...',
            category: 'tips',
            author: 'KTS. Hoàng Văn E',
            date: '2024-12-03',
            readTime: '4 phút',
            image: '/api/placeholder/600/400',
            tags: ['tiết kiệm', 'trang trí', 'nội thất']
        },
        {
            id: 6,
            title: 'Màu sắc trong thiết kế nội thất',
            excerpt: 'Cách phối màu hài hòa và tạo cảm xúc tích cực trong không gian sống của gia đình bạn...',
            content: 'Nội dung đầy đủ của bài viết...',
            category: 'interior',
            author: 'KTS. Vũ Thị F',
            date: '2024-12-01',
            readTime: '5 phút',
            image: '/api/placeholder/600/400',
            tags: ['màu sắc', 'phối màu', 'cảm xúc']
        }
    ];

    const filteredPosts = blogPosts.filter(post => {
        const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    const featuredPost = blogPosts.find(post => post.featured);
    const regularPosts = filteredPosts.filter(post => !post.featured);

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Blog & Kiến thức xây dựng
                    </h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                        Chia sẻ kiến thức, kinh nghiệm và xu hướng mới nhất trong lĩnh vực kiến trúc và xây dựng
                    </p>
                </div>
            </section>

            {/* Search and Filter */}
            <section className="py-8 bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Tìm kiếm bài viết..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Categories */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category.id
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            {featuredPost && (
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="md:flex">
                                <div className="md:w-1/2 h-64 md:h-auto bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-500">Hình ảnh nổi bật</span>
                                </div>
                                <div className="md:w-1/2 p-8">
                                    <div className="flex items-center mb-4">
                                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                                            Bài viết nổi bật
                                        </span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold mb-4">{featuredPost.title}</h2>
                                    <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>

                                    <div className="flex items-center text-sm text-gray-500 mb-6">
                                        <User size={16} className="mr-2" />
                                        <span className="mr-4">{featuredPost.author}</span>
                                        <Calendar size={16} className="mr-2" />
                                        <span className="mr-4">{featuredPost.date}</span>
                                        <Clock size={16} className="mr-2" />
                                        <span>{featuredPost.readTime}</span>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {featuredPost.tags.map((tag, index) => (
                                            <span key={index} className="flex items-center bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                                                <Tag size={12} className="mr-1" />
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                                        Đọc tiếp
                                        <ArrowRight className="ml-2" size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Blog Posts Grid */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12">Bài viết mới nhất</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {regularPosts.map((post) => (
                            <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="h-48 bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-500">Hình ảnh bài viết</span>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center text-xs text-gray-500 mb-3">
                                        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full mr-3">
                                            {categories.find(cat => cat.id === post.category)?.name}
                                        </span>
                                        <Calendar size={14} className="mr-1" />
                                        <span className="mr-3">{post.date}</span>
                                        <Clock size={14} className="mr-1" />
                                        <span>{post.readTime}</span>
                                    </div>

                                    <h3 className="text-lg font-semibold mb-3 line-clamp-2">{post.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500">{post.author}</span>
                                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                                            Đọc thêm
                                            <ArrowRight className="ml-1" size={14} />
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap gap-1 mt-4">
                                        {post.tags.slice(0, 3).map((tag, index) => (
                                            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-20 bg-blue-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Đăng ký nhận bài viết mới
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Nhận những bài viết mới nhất về kiến trúc, nội thất và xu hướng xây dựng qua email
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Nhập email của bạn"
                            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                            Đăng ký
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blog;
