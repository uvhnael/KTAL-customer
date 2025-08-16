# Hướng dẫn gọi API trong React

## Tổng quan

Dự án này sử dụng **Axios** để gọi API và có các custom hooks để quản lý state và error handling.

## Cấu trúc files

```
src/
├── services/
│   └── api.js              # Cấu hình axios và các API endpoints
├── hooks/
│   └── useApi.js           # Custom hooks cho API calls
└── components/
    └── ApiExamples.js      # Ví dụ cách sử dụng API
```

## Cấu hình môi trường

Tạo file `.env` trong thư mục root với các biến môi trường:

```env
REACT_APP_API_BASE_URL=http://localhost:8080/api
REACT_APP_API_TIMEOUT=10000
REACT_APP_ENVIRONMENT=development
```

## Cách gọi API

### 1. Sử dụng Custom Hooks (Khuyến nghị)

#### useApi Hook - Cho GET requests

```javascript
import { useApi } from '../hooks/useApi';
import { projectAPI } from '../services/api';

const MyComponent = () => {
    const { data, loading, error, refetch } = useApi(() => projectAPI.getAll());

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>Lỗi: {error}</div>;

    return (
        <div>
            {data?.map(item => (
                <div key={item.id}>{item.title}</div>
            ))}
            <button onClick={refetch}>Tải lại</button>
        </div>
    );
};
```

#### useAsyncApi Hook - Cho POST/PUT/DELETE requests

```javascript
import { useAsyncApi } from '../hooks/useApi';
import { projectAPI } from '../services/api';

const MyComponent = () => {
    const { execute, loading, error } = useAsyncApi();

    const handleCreate = async () => {
        try {
            const newProject = { title: 'Dự án mới' };
            await execute(() => projectAPI.create(newProject));
            alert('Tạo thành công!');
        } catch (err) {
            alert('Có lỗi xảy ra');
        }
    };

    return (
        <button onClick={handleCreate} disabled={loading}>
            {loading ? 'Đang tạo...' : 'Tạo dự án'}
        </button>
    );
};
```

### 2. Sử dụng useEffect và useState

```javascript
import React, { useState, useEffect } from 'react';
import { serviceAPI } from '../services/api';

const MyComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await serviceAPI.getAll();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Render component...
};
```

### 3. Gọi API trực tiếp trong Event Handler

```javascript
import { contactAPI } from '../services/api';

const MyComponent = () => {
    const handleLoadData = async () => {
        try {
            const data = await contactAPI.getAll();
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return <button onClick={handleLoadData}>Tải dữ liệu</button>;
};
```

## Các API endpoints có sẵn

### Contact API
```javascript
import { contactAPI } from '../services/api';

// GET tất cả contacts
const contacts = await contactAPI.getAll();

// GET contact theo ID
const contact = await contactAPI.getById(1);

// POST tạo contact mới
const newContact = await contactAPI.create({
    name: 'Nguyễn Văn A',
    email: 'a@example.com',
    message: 'Tin nhắn...'
});

// PUT cập nhật contact
const updated = await contactAPI.update(1, { name: 'Tên mới' });

// DELETE xóa contact
await contactAPI.delete(1);
```

### Project API
```javascript
import { projectAPI } from '../services/api';

// Tương tự như contactAPI
const projects = await projectAPI.getAll();
const project = await projectAPI.getById(1);
const newProject = await projectAPI.create(projectData);
const updated = await projectAPI.update(1, updatedData);
await projectAPI.delete(1);
```

### Service API
```javascript
import { serviceAPI } from '../services/api';

// Tương tự như contactAPI và projectAPI
const services = await serviceAPI.getAll();
// ... các methods khác
```

## Upload File

```javascript
import { apiService } from '../services/api';

const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'project-image');

    try {
        const result = await apiService.uploadFile('/upload', formData);
        console.log('Upload success:', result);
    } catch (error) {
        console.error('Upload error:', error);
    }
};

// Trong JSX
<input 
    type="file" 
    onChange={(e) => handleFileUpload(e.target.files[0])} 
/>
```

## Authentication

### Đăng nhập và lưu token

```javascript
import { apiService } from '../services/api';

const handleLogin = async (email, password) => {
    try {
        const response = await apiService.post('/auth/login', { email, password });
        
        if (response.token) {
            localStorage.setItem('token', response.token);
            // Token sẽ được tự động thêm vào header cho các requests tiếp theo
        }
    } catch (error) {
        console.error('Login error:', error);
    }
};
```

### Đăng xuất

```javascript
const handleLogout = () => {
    localStorage.removeItem('token');
    // Có thể redirect về trang login
    window.location.href = '/login';
};
```

## Error Handling

```javascript
const handleApiCall = async () => {
    try {
        const data = await serviceAPI.getById(999);
    } catch (error) {
        if (error.response) {
            // Server trả về error response
            const status = error.response.status;
            const message = error.response.data?.message;
            
            switch (status) {
                case 400:
                    alert('Dữ liệu không hợp lệ');
                    break;
                case 401:
                    alert('Bạn cần đăng nhập');
                    // Redirect to login
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
                    alert(message || 'Có lỗi xảy ra');
            }
        } else if (error.request) {
            // Network error
            alert('Không thể kết nối tới server');
        } else {
            alert('Có lỗi xảy ra: ' + error.message);
        }
    }
};
```

## API với parameters

```javascript
// Query parameters
const searchResults = await apiService.get(`/projects/search?q=${encodeURIComponent(searchTerm)}&page=1&limit=10`);

// Path parameters
const project = await apiService.get(`/projects/${projectId}`);

// Request body
const newProject = await apiService.post('/projects', {
    title: 'Dự án mới',
    description: 'Mô tả...',
    status: 'active'
});
```

## Tips và Best Practices

1. **Sử dụng Custom Hooks**: Ưu tiên sử dụng `useApi` và `useAsyncApi` để code sạch hơn

2. **Error Handling**: Luôn handle errors và hiển thị thông báo phù hợp cho user

3. **Loading States**: Hiển thị loading indicator khi đang gọi API

4. **Environment Variables**: Sử dụng .env để quản lý cấu hình API

5. **Token Management**: Token được tự động thêm vào header nếu có trong localStorage

6. **Interceptors**: Đã cấu hình sẵn để handle token và error responses

7. **Timeout**: Đã cấu hình timeout 10 giây để tránh request bị treo

## Troubleshooting

### CORS Error
Nếu gặp CORS error, backend cần cấu hình cho phép requests từ frontend domain.

### Network Error
Kiểm tra:
- Backend server có đang chạy không
- URL API có đúng không
- Firewall có block không

### 401 Unauthorized
- Kiểm tra token có hợp lệ không
- Token có hết hạn không
- API endpoint có yêu cầu authentication không

### 404 Not Found
- Kiểm tra URL endpoint có đúng không
- API route có tồn tại trong backend không
