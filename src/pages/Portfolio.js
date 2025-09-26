import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Calendar, ArrowRight, Loader } from "lucide-react";
import { projectAPI } from "../services/api";
import { useApi } from "../hooks/useApi";
import {
  sanitizeHTML,
  getPlainTextFromHTML,
  formatDate,
  getStatusInfo,
} from "../utils/htmlUtils";

const Portfolio = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  // Use custom hook for API call
  const {
    data: projects,
    loading,
    error,
    refetch,
  } = useApi(() => projectAPI.getAll());

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && selectedProject) {
        setSelectedProject(null);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [selectedProject]);

  const categories = [
    { id: "all", name: "Tất cả" },
    { id: "completed", name: "Hoàn thành" },
    { id: "in_progress", name: "Đang thực hiện" },
    { id: "draft", name: "Bản nháp" },
    { id: "archived", name: "Đã lưu trữ" },
  ];

  // Lọc dự án theo status
  const filteredProjects =
    activeFilter === "all"
      ? projects || []
      : (projects || []).filter(
          (project) =>
            project.status && project.status.toLowerCase() === activeFilter
        );

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Dự án đã thực hiện
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Khám phá những công trình tiêu biểu được thiết kế và thi công bởi
            đội ngũ chuyên nghiệp
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  activeFilter === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader className="animate-spin mr-2" size={24} />
              <span>Đang tải dự án...</span>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={refetch}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Thử lại
              </button>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600">Không có dự án nào được tìm thấy.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  <div className="relative h-64 bg-gray-200 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {project.thumbnail ? (
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                        Hình ảnh dự án
                      </div>
                    )}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full"
                      >
                        <Eye size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {project.title}
                    </h3>

                    {/* Display description if available, otherwise use content */}
                    <p className="text-gray-600 mb-4 text-sm">
                      {project.description ||
                        getPlainTextFromHTML(project.content, 120)}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={16} className="mr-2" />
                        <span>
                          {project.year || "N/A"} • {project.area || "N/A"}
                        </span>
                      </div>
                      {project.status && (
                        <div className="flex items-center text-sm">
                          <span
                            className={`inline-block w-2 h-2 rounded-full mr-2 ${
                              getStatusInfo(project.status).color
                            }`}
                          ></span>
                          <span
                            className={`capitalize ${
                              getStatusInfo(project.status).textColor
                            }`}
                          >
                            {getStatusInfo(project.status).text}
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => navigate(`/project/${project.id}`)}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                      Xem chi tiết
                      <ArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Thông tin dự án
                  </h3>
                  <div className="space-y-2">
                    {selectedProject.slug && (
                      <p>
                        <span className="font-medium">Slug:</span>{" "}
                        {selectedProject.slug}
                      </p>
                    )}
                    <p>
                      <span className="font-medium">Năm:</span>{" "}
                      {selectedProject.year || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">Khu vực:</span>{" "}
                      {selectedProject.area || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">Trạng thái:</span>
                      <span
                        className={`ml-2 ${
                          getStatusInfo(selectedProject.status).textColor
                        }`}
                      >
                        {getStatusInfo(selectedProject.status).text}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">Ngày tạo:</span>{" "}
                      {formatDate(selectedProject.created_at)}
                    </p>
                    {selectedProject.updated_at && (
                      <p>
                        <span className="font-medium">Cập nhật:</span>{" "}
                        {formatDate(selectedProject.updated_at)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                  {selectedProject.thumbnail ? (
                    <img
                      src={selectedProject.thumbnail}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500">Hình ảnh dự án</span>
                  )}
                </div>
              </div>

              {selectedProject.description && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-3">Mô tả</h3>
                  <p className="text-gray-600">{selectedProject.description}</p>
                </div>
              )}

              {selectedProject.content && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-3">
                    Chi tiết dự án
                  </h3>
                  <div
                    className="prose max-w-none text-gray-600"
                    dangerouslySetInnerHTML={sanitizeHTML(
                      selectedProject.content
                    )}
                  />
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {projects?.length || 0}
              </div>
              <div className="text-gray-600">Dự án đã hoàn thành</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {projects?.filter((p) => p.status === "completed").length || 0}
              </div>
              <div className="text-gray-600">Dự án hoàn thành</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10+</div>
              <div className="text-gray-600">Năm kinh nghiệm</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {projects?.filter((p) => p.status === "in_progress").length ||
                  0}
              </div>
              <div className="text-gray-600">Dự án đang triển khai</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Có ý tưởng dự án mới?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Hãy để chúng tôi biến ý tưởng của bạn thành hiện thực với những
            thiết kế độc đáo và chất lượng thi công tốt nhất
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Bắt đầu dự án ngay
          </button>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
