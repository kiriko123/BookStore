# Tên Dự Án

Web thương mại điện tử, với đề tài là kinh doanh các tác phẩm sách

## Mục Lục

- [Giới Thiệu](#giới-thiệu)
- [Tính Năng](#tính-năng)
- [Yêu Cầu Hệ Thống](#yêu-cầu-hệ-thống)
- [Cài Đặt](#cài-đặt)
- [Sử Dụng](#sử-dụng)
- [Tác Giả](#tác-giả)

## Giới Thiệu

Dự án bao gồm cả phần back-end và front-end.

- **Back-end:** Quản lý API và xử lý logic nghiệp vụ liên quan đến cửa hàng sách.
- **Front-end:** Giao diện người dùng cho việc mua bán, quản lý sách, và tương tác với người dùng.

## Tính Năng

### Back-end
- Xử lý logic nghiệp vụ cho việc quản lý sách, người dùng, đơn hàng.
- Quản lý người dùng (đăng ký, đăng nhập, quyền hạn).
- API cho các tính năng như tìm kiếm sách, quản lý giỏ hàng, đặt hàng, thanh toán.

### Front-end
- Giao diện thân thiện cho việc duyệt, tìm kiếm sách.
- Quản lý giỏ hàng, thanh toán, và theo dõi đơn hàng.
- Tương tác với các API từ back-end để cung cấp các tính năng quản lý user, book, thống kê, và lịch sử mua hàng.


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

## Tác Giả
Khang
