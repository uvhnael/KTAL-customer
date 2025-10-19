import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { blogAPI } from "../services/api";
import { useApi, useAsyncApi } from "../hooks/useApi";
import { formatDate, sanitizeHTML } from "../utils/htmlUtils";

const DetailBlog = () => {
  const { slug } = useParams();
  const [relatedPosts, setRelatedPosts] = useState([]);

  // Use custom hook for fetching blog post
  const {
    data: blog,
    loading,
    error,
    refetch,
  } = useApi(() => blogAPI.getBySlug(slug), [slug]);

  if (loading) {
    return (
      <div className="pt-28 pb-16 px-4 max-w-5xl mx-auto">
        <div className="text-center py-20">
          <div className="spinner-border text-blue-600" role="status">
            <span className="sr-only">Đang tải...</span>
          </div>
          <p className="mt-4 text-gray-600">Đang tải bài viết...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="pt-28 pb-16 px-4 max-w-5xl mx-auto">
        <div className="text-center py-20">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-8">
            <p className="font-semibold">
              {error || "Không tìm thấy bài viết"}
            </p>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="mr-2" size={16} />
            Quay lại trang Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16">
      {/* Blog Header */}
      <div className="max-w-5xl mx-auto px-4 mb-12">
        <div className="mb-6">
          <Link
            to="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="mr-2" size={16} />
            Quay lại trang Blog
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-6">{blog.title}</h1>

        <div className="flex flex-wrap items-center text-gray-600 mb-8">
          <div className="flex items-center mr-6 mb-2">
            <User size={18} className="mr-2" />
            <span>{blog.author}</span>
          </div>
          <div className="flex items-center mr-6 mb-2">
            <Calendar size={18} className="mr-2" />
            <span>{formatDate(blog.createdAt)}</span>
          </div>
          {blog.category && (
            <div className="mb-2">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                {blog.category}
              </span>
            </div>
          )}
        </div>

        {blog.thumbnail && (
          <div className="mb-10">
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-md"
            />
          </div>
        )}
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-4 mb-16">
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={sanitizeHTML(blog.content)}
        />
      </div>
    </div>
  );
};

export default DetailBlog;
