import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, Clock, ArrowRight, Search, Tag } from "lucide-react";
import { blogAPI } from "../services/api";
import { useApi } from "../hooks/useApi";
import { formatDate } from "../utils/htmlUtils";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([{ id: "all", name: "Tất cả" }]);

  // Fetch blog posts
  const {
    data: blogPosts,
    loading: loadingBlogs,
    error: errorBlogs,
  } = useApi(blogAPI.getAll, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await blogAPI.getCategories();
        // Add 'all' category if it doesn't exist
        if (categoriesData.data && Array.isArray(categoriesData.data)) {
          const uniqueCategories = [
            ...new Set(categoriesData.data.map((cat) => cat)),
          ];
          setCategories([
            { id: "all", name: "Tất cả" },
            ...uniqueCategories.map((cat) => ({ id: cat, name: cat })),
          ]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Filter blog posts based on search term and selected category
  const filteredPosts = blogPosts
    ? blogPosts.filter((post) => {
        const matchesCategory =
          selectedCategory === "all" || post.category === selectedCategory;
        const matchesSearch =
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (post.content &&
            post.content.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
    : [];

  // Find featured post (published posts sorted by date)
  const featuredPost = blogPosts
    ? blogPosts
        .filter((post) => post.status === "published")
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]
    : null;

  // Filter out featured post from regular posts and ensure they're published
  const regularPosts = filteredPosts.filter(
    (post) =>
      post.status === "published" &&
      (!featuredPost || post.id !== featuredPost.id)
  );

  // Get the excerpt from HTML content
  const getExcerpt = (content, maxLength = 150) => {
    if (!content) return "";

    // Create a temporary element to parse HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;

    // Get text content without HTML tags
    const textContent = tempDiv.textContent || tempDiv.innerText || "";

    // Truncate and add ellipsis if needed
    return textContent.length > maxLength
      ? textContent.substring(0, maxLength) + "..."
      : textContent;
  };

  // Calculate read time (1 minute per 200 words)
  const calculateReadTime = (content) => {
    if (!content) return "1 phút";

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    const text = tempDiv.textContent || tempDiv.innerText || "";
    const wordCount = text.split(/\s+/).length;
    const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

    return `${readTimeMinutes} phút`;
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Blog & Kiến thức xây dựng
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Chia sẻ kiến thức, kinh nghiệm và xu hướng mới nhất trong lĩnh vực
            kiến trúc và xây dựng
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div> */}
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Loading or Error State */}
      {loadingBlogs && (
        <div className="py-16 text-center">
          <div className="spinner-border text-blue-600" role="status">
            <span className="sr-only">Đang tải...</span>
          </div>
          <p className="mt-4 text-lg text-gray-600">Đang tải bài viết...</p>
        </div>
      )}

      {errorBlogs && (
        <div className="py-16 text-center">
          <p className="text-red-600">
            Đã xảy ra lỗi khi tải bài viết. Vui lòng thử lại sau.
          </p>
        </div>
      )}

      {/* Featured Post */}
      {!loadingBlogs && !errorBlogs && featuredPost && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 h-64 md:h-auto relative">
                  {featuredPost.thumbnail ? (
                    <img
                      src={featuredPost.thumbnail}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Hình ảnh nổi bật</span>
                    </div>
                  )}
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center mb-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Bài viết nổi bật
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {getExcerpt(featuredPost.content)}
                  </p>

                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <User size={16} className="mr-2" />
                    <span className="mr-4">{featuredPost.author}</span>
                    <Calendar size={16} className="mr-2" />
                    <span className="mr-4">
                      {formatDate(featuredPost.createdAt)}
                    </span>
                    <Clock size={16} className="mr-2" />
                    <span>{calculateReadTime(featuredPost.content)}</span>
                  </div>

                  {featuredPost.category && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="flex items-center bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        <Tag size={12} className="mr-1" />
                        {featuredPost.category}
                      </span>
                    </div>
                  )}

                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center inline-flex"
                  >
                    Đọc tiếp
                    <ArrowRight className="ml-2" size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      {!loadingBlogs && !errorBlogs && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Bài viết mới nhất
            </h2>

            {regularPosts.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500 text-lg">
                  Không tìm thấy bài viết nào.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="h-48 relative">
                      {post.thumbnail ? (
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">
                            Hình ảnh bài viết
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-center text-xs text-gray-500 mb-3">
                        {post.category && (
                          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full mr-3">
                            {post.category}
                          </span>
                        )}
                        <Calendar size={14} className="mr-1" />
                        <span className="mr-3">
                          {formatDate(post.createdAt)}
                        </span>
                        <Clock size={14} className="mr-1" />
                        <span>{calculateReadTime(post.content)}</span>
                      </div>

                      <h3 className="text-lg font-semibold mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {getExcerpt(post.content, 100)}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {post.author}
                        </span>
                        <Link
                          to={`/blog/${post.slug}`}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                        >
                          Đọc thêm
                          <ArrowRight className="ml-1" size={14} />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Newsletter Section
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Đăng ký nhận bài viết mới
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Nhận những bài viết mới nhất về kiến trúc, nội thất và xu hướng xây
            dựng qua email
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
      </section> */}
    </div>
  );
};

export default Blog;
