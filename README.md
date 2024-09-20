# Tên Dự Án

Một câu mô tả ngắn gọn về dự án.
Web quan ly cua hang sach

## Mục Lục

- [Giới Thiệu](#giới-thiệu)
- [Tính Năng](#tính-năng)
- [Yêu Cầu Hệ Thống](#yêu-cầu-hệ-thống)
- [Cài Đặt](#cài-đặt)
- [Sử Dụng](#sử-dụng)
- [Cấu Trúc Thư Mục](#cấu-trúc-thư-mục)
- [Đóng Góp](#đóng-góp)
- [Giấy Phép](#giấy-phép)
- [Tác Giả](#tác-giả)

## Giới Thiệu

Dự án bao gồm cả phần back-end và front-end.

- **Back-end:** Quản lý API và xử lý logic nghiệp vụ.
- **Front-end:** Giao diện người dùng và quản lý hiển thị.

## Tính Năng

### Back-end
- Xử lý logic nghiệp vụ.
- Quản lý người dùng.
- API cho các tính năng chính.

### Front-end
- Quản lý giao diện người dùng.
- Tương tác với các API từ back-end.
- Các tính năng quản lý user.

## Yêu Cầu Hệ Thống

### Back-end
- **JDK** phiên bản 17 trở lên
- **MySQL** 

### Front-end
- **Node.js** phiên bản v16.20.0 hoặc cao hơn
- **NPM** hoặc **Yarn**

## Cài Đặt

### Cài đặt Back-end

```bash
# Cài đặt các dependencies (vào file pom.xml chọn Maven rồi chọn reload project)

```

### Cài đặt Front-end

```bash
# Cài đặt các dependencies
npm i

```

## Sử dụng

### Sử dụng Back-end

```bash
# Khởi động MySQL và tạo 1 database mới với tên dbo_datn hoặc có thể tự cấu hình tên mới trong file application.yml
# Chạy dự án
# Truy cập vào http://localhost:8080/swagger-ui/index.html để quản lý các API
```

### Sử dụng Front-end

```bash
# Chạy dự án front-end
npm run dev

# Truy cập vào http://localhost:3000

```

## Cấu Trúc Thư Mục

```bash
tên_repo/
├── backend/           # Thư mục chứa mã nguồn back-end
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/
│   │   │   │       └── yourproject/ 
│   │   │   │           ├── configuration/   # Cấu hình cho ứng dụng (ví dụ: SecurityConfig, WebConfig)
│   │   │   │           ├── controller/      # Các controller xử lý yêu cầu HTTP
│   │   │   │           ├── dto/             # Các đối tượng chuyển dữ liệu (Data Transfer Objects)
│   │   │   │           ├── exception/       # Xử lý ngoại lệ (Exception Handling)
│   │   │   │           ├── mapper/          # Chuyển đổi giữa DTO và Model (MapStruct, custom mapper)
│   │   │   │           ├── model/           # Các class mô hình (Entities, POJO)
│   │   │   │           ├── repository/      # Các lớp tương tác với cơ sở dữ liệu (Repositories)
│   │   │   │           ├── service/         # Các lớp chứa logic nghiệp vụ (Services)
│   │   │   │           └── util/            # Các tiện ích, helper classes
│   │   └── resources/                       # Các tệp cấu hình, template (application.properties, application.yml)
├── frontend/          # Thư mục chứa mã nguồn front-end
│   ├── src/
│   │   ├── components/   # Các component React
│   │   ├── pages/        # Các trang chính
│   │   ├── services/     # Các dịch vụ kết nối API
│   │   ├── App.js        # Tệp khởi đầu của ứng dụng
│   │   └── index.jsx     # Điểm vào của ứng dụng
│   └── public/           # Các tệp tĩnh
├── test/                # Các lớp kiểm thử (Unit/Integration tests cho back-end)
├── pom.xml              # Tệp cấu hình Maven, quản lý dependencies (Back-end)
├── package.json         # Thông tin về dependencies và scripts (Front-end)
└── README.md            # Tệp mô tả dự án

```

## Đóng Góp
Hướng dẫn cách đóng góp vào dự án nếu bạn mở rộng dự án:

1: Fork repository

2: Tạo nhánh (git checkout -b feature/ten-tinh-nang)

3: Commit thay đổi của bạn (git commit -m 'Thêm tính năng ABC')

4: Push nhánh (git push origin feature/ten-tinh-nang)

5: Mở Pull Request

## Giấy Phép


## Tác Giả
Khang
