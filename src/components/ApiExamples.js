import React, { useState, useEffect } from 'react';
import { apiService, contactAPI, projectAPI, serviceAPI } from '../services/api';
import { useApi, useAsyncApi } from '../hooks/useApi';

const ApiExamples = () => {
    // ========== CÁCH 1: SỬ DỤNG CUSTOM HOOKS (KHUYẾN NGHỊ) ==========
    
    // Fetch data với useApi hook
    const { data: projects, loading: projectsLoading, error: projectsError, refetch: refetchProjects } = useApi(
        () => projectAPI.getAll()
    );

    // Async operations với useAsyncApi hook
    const { execute: createProject, loading: creating, error: createError } = useAsyncApi();
    const { execute: updateProject, loading: updating } = useAsyncApi();
    const { execute: deleteProject, loading: deleting } = useAsyncApi();

    // ========== CÁCH 2: SỬ DỤNG useEffect VÀ useState ==========
    
    const [services, setServices] = useState([]);
    const [servicesLoading, setServicesLoading] = useState(true);
    const [servicesError, setServicesError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setServicesLoading(true);
                setServicesError(null);
                const data = await serviceAPI.getAll();
                setServices(data);
            } catch (error) {
                setServicesError(error.message);
            } finally {
                setServicesLoading(false);
            }
        };

        fetchServices();
    }, []);

    // ========== CÁCH 3: GỌI API TRỰC TIẾP TRONG EVENT HANDLER ==========
    
    const [contacts, setContacts] = useState([]);
    const [contactLoading, setContactLoading] = useState(false);

    const handleLoadContacts = async () => {
        try {
            setContactLoading(true);
            const data = await contactAPI.getAll();
            setContacts(data);
        } catch (error) {
            console.error('Error loading contacts:', error);
            alert('Không thể tải danh sách liên hệ');
        } finally {
            setContactLoading(false);
        }
    };

    // ========== CÁC VÍ DỤ CRUD OPERATIONS ==========

    // Tạo mới project
    const handleCreateProject = async () => {
        try {
            const newProject = {
                title: 'Dự án mới',
                description: 'Mô tả dự án',
                status: 'active'
            };
            
            const result = await createProject(() => projectAPI.create(newProject));
            console.log('Project created:', result);
            refetchProjects(); // Reload danh sách
            alert('Tạo dự án thành công!');
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    // Cập nhật project
    const handleUpdateProject = async (projectId) => {
        try {
            const updatedData = {
                title: 'Dự án đã cập nhật',
                status: 'completed'
            };

            await updateProject(() => projectAPI.update(projectId, updatedData));
            refetchProjects(); // Reload danh sách
            alert('Cập nhật dự án thành công!');
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    // Xóa project
    const handleDeleteProject = async (projectId) => {
        if (window.confirm('Bạn có chắc muốn xóa dự án này?')) {
            try {
                await deleteProject(() => projectAPI.delete(projectId));
                refetchProjects(); // Reload danh sách
                alert('Xóa dự án thành công!');
            } catch (error) {
                console.error('Error deleting project:', error);
            }
        }
    };

    // ========== VÍ DỤ UPLOAD FILE ==========
    
    const handleFileUpload = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', 'project-image');

            const result = await apiService.uploadFile('/upload', formData);
            console.log('File uploaded:', result);
            alert('Upload file thành công!');
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Upload file thất bại!');
        }
    };

    // ========== VÍ DỤ GỌI API VỚI PARAMETERS ==========
    
    const handleSearchProjects = async (searchTerm) => {
        try {
            // Gọi API với query parameters
            const results = await apiService.get(`/projects/search?q=${encodeURIComponent(searchTerm)}`);
            console.log('Search results:', results);
        } catch (error) {
            console.error('Search error:', error);
        }
    };

    // ========== VÍ DỤ GỌI API VỚI AUTHENTICATION ==========
    
    const handleLogin = async (email, password) => {
        try {
            const loginData = { email, password };
            const response = await apiService.post('/auth/login', loginData);
            
            // Lưu token vào localStorage
            if (response.token) {
                localStorage.setItem('token', response.token);
                alert('Đăng nhập thành công!');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Đăng nhập thất bại!');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        alert('Đã đăng xuất!');
    };

    // ========== ERROR HANDLING EXAMPLES ==========
    
    const handleApiWithErrorHandling = async () => {
        try {
            const data = await serviceAPI.getById(999); // ID không tồn tại
            console.log(data);
        } catch (error) {
            if (error.response) {
                // Server trả về error response
                const status = error.response.status;
                const message = error.response.data?.message || 'Có lỗi xảy ra';
                
                switch (status) {
                    case 400:
                        alert('Dữ liệu không hợp lệ');
                        break;
                    case 401:
                        alert('Bạn cần đăng nhập');
                        break;
                    case 403:
                        alert('Bạn không có quyền truy cập');
                        break;
                    case 404:
                        alert('Không tìm thấy dữ liệu');
                        break;
                    case 500:
                        alert('Lỗi server nội bộ');
                        break;
                    default:
                        alert(message);
                }
            } else if (error.request) {
                // Network error
                alert('Không thể kết nối tới server');
            } else {
                // Other error
                alert('Có lỗi xảy ra: ' + error.message);
            }
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Ví dụ gọi API trong React</h1>
            
            {/* Projects Section - Using Custom Hooks */}
            <section className="mb-8 p-6 border rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Projects (Custom Hooks)</h2>
                
                {projectsLoading && <p>Đang tải projects...</p>}
                {projectsError && <p className="text-red-500">Lỗi: {projectsError}</p>}
                
                <div className="flex gap-4 mb-4">
                    <button 
                        onClick={handleCreateProject}
                        disabled={creating}
                        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        {creating ? 'Đang tạo...' : 'Tạo Project'}
                    </button>
                    <button 
                        onClick={refetchProjects}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Reload Projects
                    </button>
                </div>

                {projects && (
                    <div className="grid gap-2">
                        {projects.map(project => (
                            <div key={project.id} className="flex justify-between items-center p-2 bg-gray-100">
                                <span>{project.title}</span>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => handleUpdateProject(project.id)}
                                        disabled={updating}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                                    >
                                        {updating ? 'Updating...' : 'Update'}
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteProject(project.id)}
                                        disabled={deleting}
                                        className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                                    >
                                        {deleting ? 'Deleting...' : 'Delete'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Services Section - Using useEffect */}
            <section className="mb-8 p-6 border rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Services (useEffect)</h2>
                
                {servicesLoading && <p>Đang tải services...</p>}
                {servicesError && <p className="text-red-500">Lỗi: {servicesError}</p>}
                
                {services.length > 0 && (
                    <div className="grid gap-2">
                        {services.map(service => (
                            <div key={service.id} className="p-2 bg-gray-100">
                                {service.title}
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Contacts Section - Manual API Call */}
            <section className="mb-8 p-6 border rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Contacts (Manual)</h2>
                
                <button 
                    onClick={handleLoadContacts}
                    disabled={contactLoading}
                    className="bg-purple-500 text-white px-4 py-2 rounded disabled:opacity-50 mb-4"
                >
                    {contactLoading ? 'Đang tải...' : 'Load Contacts'}
                </button>

                {contacts.length > 0 && (
                    <div className="grid gap-2">
                        {contacts.map(contact => (
                            <div key={contact.id} className="p-2 bg-gray-100">
                                {contact.name} - {contact.email}
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Other API Examples */}
            <section className="p-6 border rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Các ví dụ khác</h2>
                
                <div className="grid grid-cols-2 gap-4">
                    <button 
                        onClick={() => handleSearchProjects('villa')}
                        className="bg-indigo-500 text-white px-4 py-2 rounded"
                    >
                        Search Projects
                    </button>
                    
                    <button 
                        onClick={() => handleLogin('test@email.com', 'password')}
                        className="bg-cyan-500 text-white px-4 py-2 rounded"
                    >
                        Test Login
                    </button>
                    
                    <button 
                        onClick={handleLogout}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                    
                    <button 
                        onClick={handleApiWithErrorHandling}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Test Error Handling
                    </button>
                </div>

                {/* File Upload Example */}
                <div className="mt-4">
                    <label className="block text-sm font-medium mb-2">Upload File:</label>
                    <input 
                        type="file"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) handleFileUpload(file);
                        }}
                        className="border rounded px-2 py-1"
                    />
                </div>
            </section>
        </div>
    );
};

export default ApiExamples;
