# 🚌 Smart School Bus Tracking System (SSB 1.0)

> Hệ thống theo dõi xe buýt trường học thông minh - Đồ án cuối kỳ

[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC)](https://tailwindcss.com/)
[![Google Maps](https://img.shields.io/badge/Google%20Maps-API-green)](https://developers.google.com/maps)

## 📖 Giới thiệu

Smart School Bus Tracking System là một ứng dụng web hiện đại giúp theo dõi và quản lý xe buýt trường học theo thời gian thực. Hệ thống cung cấp giải pháp toàn diện cho **Quản lý xe buýt**, **Tài xế** và **Phụ huynh** với các tính năng:

- 🗺️ **Theo dõi realtime** trên Google Maps Việt Nam
- 📱 **Liên lạc đa kênh** (Nhắn tin + Gọi điện)
- 🔔 **Thông báo tự động** thông minh
- 👥 **Quản lý toàn diện** CRUD đầy đủ
- 📊 **Dashboard** trực quan cho từng vai trò

---

## 🚀 Tính năng chính

### Đối với Phụ huynh
- ✅ Theo dõi vị trí xe buýt theo thời gian thực trên bản đồ
- ✅ Nhận thông báo khi xe đến gần (trong vòng 3 giây)
- ✅ Nhận cảnh báo khi xe bị trễ do tắc đường hoặc sự cố
- ✅ Xem lịch trình đón/trả con hàng ngày
- ✅ Thông tin chi tiết về xe buýt và tài xế

### Đối với Tài xế
- ✅ Xem lịch làm việc hàng ngày với tuyến đường chi tiết
- ✅ Xem danh sách học sinh cần đón và điểm đón
- ✅ Báo cáo tình trạng đón/trả học sinh
- ✅ Cập nhật vị trí xe realtime
- ✅ Gửi cảnh báo khi có sự cố (tắc đường, tai nạn...)

### Đối với Quản lý xe buýt
- ✅ Quản lý danh sách học sinh, tài xế, xe buýt, tuyến đường
- ✅ Tạo và cập nhật lịch trình xe buýt (tuần/tháng)
- ✅ Phân công tài xế và xe buýt cho từng tuyến đường
- ✅ Theo dõi vị trí tất cả xe buýt realtime (cập nhật ≤3s)
- ✅ Quản lý tài khoản người dùng và phân quyền
- ✅ Gửi tin nhắn/thông báo cho tài xế, học sinh hoặc phụ huynh
- ✅ Cấu hình hệ thống và phân quyền

### Đối với Quản trị viên hệ thống
- ✅ Quản lý danh sách học sinh, tài xế, xe buýt, tuyến đường
- ✅ Quản lý tài khoản người dùng
- ✅ Cấu hình hệ thống và phân quyền

## 🛠 Công nghệ sử dụng

- **Frontend Framework**: React 18 với JavaScript
- **Styling**: Tailwind CSS 4.0
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React
- **Maps**: Google Maps API (Free tier)
- **Notifications**: Sonner (Toast notifications)
- **Data**: JSON files (Mock data - sẵn sàng tích hợp backend)

## 📁 Cấu trúc dữ liệu

Hệ thống sử dụng các file JSON trong thư mục `/data`:

- `students.json` - Danh sách học sinh với thông tin phụ huynh và điểm đón
- `drivers.json` - Danh sách tài xế với thông tin bằng lái và kinh nghiệm
- `routes.json` - Tuyến đường với các điểm dừng và thời gian
- `buses.json` - Xe buýt với vị trí GPS realtime và lịch sử bảo trì

## 🗺 Tích hợp Google Maps

Hệ thống hỗ trợ 2 chế độ hiển thị bản đồ:

### 1. Demo Mode (Mặc định) ✅
- Hiển thị xe buýt và điểm dừng dạng cards
- Không cần Google Maps API key
- Phù hợp để demo nhanh

### 2. Google Maps Mode 🗺️
- Bản đồ Google Maps thật với:
  - Vị trí xe buýt realtime trên bản đồ
  - Tuyến đường với các điểm dừng
  - Marker tùy chỉnh cho xe buýt (màu sắc, hướng di chuyển)
  - Info window chi tiết khi click vào marker
- Cần setup Google Maps API key

**📖 Hướng dẫn chi tiết:** Xem file `GOOGLE_MAPS_SETUP.md`

**Quick Start:**
- Demo Mode: Set `USE_DEMO_MAP = true` trong `/components/shared/TrackingView.tsx`
- Google Maps: Set `USE_DEMO_MAP = false` và cấu hình API key

## 📊 Yêu cầu phi chức năng

- ✅ **Hiệu năng**: Gửi thông báo trong vòng 3 giây sau khi xe đến gần
- ✅ **Tính khả dụng**: Hệ thống hoạt động 24/7
- ✅ **Bảo mật**: Dữ liệu học sinh và vị trí xe được mã hóa và phân quyền truy cập
- ✅ **Tính mở rộng**: Dễ dàng thêm tuyến đường, xe buýt, người dùng mới
- ✅ **Tính thân thiện**: Giao diện dễ sử dụng cho phụ huynh và tài xế

## 🚦 Hướng dẫn sử dụng

### Đăng nhập

Hệ thống có 3 vai trò người dùng với tài khoản demo sẵn sàng:

#### 1. Quản lý xe buýt (Admin)
- **Email**: admin@ssb.vn
- **Password**: admin123
- **Chức năng**: Quản lý toàn bộ hệ thống

#### 2. Tài xế (Driver)
- **Email**: driver@ssb.vn
- **Password**: driver123
- **Chức năng**: Xem lịch trình và cập nhật vị trí

#### 3. Phụ huynh (Parent)
- **Email**: parent@ssb.vn
- **Password**: parent123
- **Chức năng**: Theo dõi xe buýt của con

> 💡 **Tip**: Khi vào màn hình đăng nhập, bạn có thể click vào bất kỳ tài khoản nào và nhấn "Đăng nhập nhanh" để truy cập ngay lập tức!

### Tính năng nổi bật

#### 1. Theo dõi thời gian thực
- Xe buýt cập nhật vị trí mỗi 3 giây
- Hiển thị tốc độ, hướng di chuyển
- Marker màu sắc theo tuyến đường

#### 2. Thông báo tự động
- Xe đến gần điểm đón (< 500m)
- Xe bị trễ (> 10 phút)
- Cần bảo trì xe buýt
- Hỗ trợ browser notification

#### 3. Quản lý toàn diện
- CRUD đầy đủ cho tất cả entities
- Tìm kiếm và lọc dữ liệu
- Phân công tài xế/xe buýt tự động
- Export báo cáo

## 🎯 Điểm nổi bật

### 1. Giống app thương mại (Grab, Xanh SM)
- ✅ Bản đồ realtime với ETA và khoảng cách
- ✅ Directions API tính đường đi tối ưu
- ✅ Geolocation tự động
- ✅ Traffic-aware routing

### 2. Tính năng liên lạc đầy đủ
- ✅ Gửi tin nhắn giữa tài xế-phụ huynh-quản lý
- ✅ Gọi điện thoại trực tiếp
- ✅ Tin nhắn mẫu nhanh
- ✅ Lịch sử chat

### 3. Quản lý CRUD hoàn chỉnh
- ✅ **Học sinh**: Thêm/Sửa/Xóa với confirm
- ✅ **Xe buýt**: Thêm/Sửa/Xóa + Phân công
- ✅ **Tài xế**: Thêm/Sửa/Xóa
- ✅ **Tuyến đường**: Thêm/Sửa/Xóa
- ✅ **Người dùng**: Quản lý tài khoản

### 4. Thông báo thông minh
- ✅ Tự động cảnh báo khi xe đến gần (< 500m)
- ✅ Thông báo xe bị trễ
- ✅ Nhắc nhở bảo trì xe
- ✅ Browser notifications

---

## 📝 Tiến độ phát triển

### ✅ Task 4.1 - Chuẩn bị dữ liệu
- students.json (8 học sinh với GPS coordinates)
- drivers.json (4 tài xế với thông tin đầy đủ)
- routes.json (3 tuyến với điểm dừng chi tiết)
- buses.json (3 xe với vị trí realtime)

### ✅ Task 4.3 - Thiết kế MVP1
- Dashboard cho 3 vai trò
- Bản đồ tracking
- Quản lý CRUD

### ✅ Task 5.1 - Hiện thực MVP2
- ✅ Tích hợp Google Maps Vietnam
- ✅ Realtime tracking mỗi 3 giây
- ✅ Tính năng liên lạc
- ✅ Notifications tự động
- ✅ Responsive design

## 🎓 Dành cho Đồ án

### Tài liệu chi tiết
📖 Xem [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) để có hướng dẫn:
- Cài đặt và chạy project
- Setup Google Maps API
- Hướng dẫn sử dụng từng tính năng
- Demo cho giáo viên
- Troubleshooting

### Điểm mạnh khi trình bày
1. ✨ **Đầy đủ chức năng** theo use case diagram
2. 🎨 **UI/UX chuyên nghiệp** như app thương mại
3. 🚀 **Công nghệ hiện đại** (React, TypeScript, Tailwind)
4. 📱 **Responsive** trên mọi thiết bị
5. 🔒 **Phân quyền** rõ ràng cho 3 vai trò
6. 🗺️ **Maps API** tích hợp Việt Nam

---

## 🔮 Khả năng mở rộng

### Ngắn hạn
- [ ] Tích hợp backend API (REST/GraphQL)
- [ ] Database thật (MySQL/PostgreSQL)
- [ ] Authentication JWT
- [ ] WebSocket cho realtime

### Dài hạn
- [ ] Mobile app (React Native)
- [ ] Push notifications
- [ ] Báo cáo và thống kê nâng cao
- [ ] Export dữ liệu Excel/PDF
- [ ] Multi-language
- [ ] Dark mode

---

## 👥 Đóng góp

Đây là đồ án cuối kỳ - mọi góp ý xin gửi qua:
- Email: [your-email]
- GitHub Issues: [your-repo-issues]

---

## 📄 License

MIT License - Dự án giáo dục

---

<div align="center">

**Phát triển với ❤️ cho an toàn của học sinh**

Made by [Your Name] - [Your University] - [Year]

</div>
