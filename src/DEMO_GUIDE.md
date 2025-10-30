# 🎯 Hướng dẫn Demo - Smart School Bus Tracking System

> Hướng dẫn nhanh để demo hệ thống cho giáo viên

## 🚀 Khởi động nhanh

1. **Mở ứng dụng** - Truy cập vào URL hoặc chạy `npm run dev`
2. **Chọn tài khoản** - Màn hình đăng nhập hiển thị 3 tài khoản demo sẵn
3. **Click "Đăng nhập nhanh"** - Vào ngay dashboard không cần nhập thông tin

## 👥 3 Tài khoản Demo

### 1. 🔑 Admin (Quản lý xe buýt)
```
Email: admin@ssb.vn
Password: admin123
```
**Điểm nhấn khi demo:**
- ✅ Dashboard tổng quan với biểu đồ đẹp mắt
- ✅ Quản lý CRUD đầy đủ: Học sinh, Xe buýt, Tài xế, Tuyến đường
- ✅ Theo dõi tất cả xe buýt trên bản đồ realtime
- ✅ Thống kê và báo cáo chi tiết
- ✅ Gửi thông báo cho tài xế và phụ huynh

### 2. 🚗 Driver (Tài xế)
```
Email: driver@ssb.vn
Password: driver123
```
**Điểm nhấn khi demo:**
- ✅ Dashboard hiển thị lịch trình hôm nay
- ✅ Danh sách học sinh cần đón
- ✅ Cập nhật vị trí xe realtime
- ✅ Thông tin xe được phân công
- ✅ Thống kê hiệu suất cá nhân

### 3. 👨‍👩‍👧 Parent (Phụ huynh)
```
Email: parent@ssb.vn
Password: parent123
```
**Điểm nhấn khi demo:**
- ✅ Theo dõi xe buýt của con trên bản đồ
- ✅ Xem thời gian dự kiến đến điểm đón (ETA)
- ✅ Thông tin tài xế và xe buýt
- ✅ Lịch sử đón/trả học sinh
- ✅ Nhận thông báo tự động

---

## 🎬 Kịch bản Demo (15 phút)

### Phần 1: Giới thiệu (2 phút)
1. Mở màn hình đăng nhập
2. Giới thiệu 3 vai trò và tài khoản demo
3. Nhấn mạnh UI/UX chuyên nghiệp

### Phần 2: Demo Admin (5 phút)

**Bước 1: Tổng quan**
- Đăng nhập với tài khoản Admin
- Hiển thị dashboard với:
  - 📊 Thống kê tổng quan (245 học sinh, 12 xe buýt)
  - 📈 Biểu đồ hiệu suất tuần
  - 🔔 Thông báo quan trọng
  - 📋 Hoạt động gần đây

**Bước 2: Quản lý**
- Click tab "Quản lý học sinh"
  - Thêm học sinh mới (nhấn nút +)
  - Tìm kiếm học sinh
  - Edit/Delete với confirm
- Click tab "Quản lý xe buýt"
  - Hiển thị danh sách xe với trạng thái
  - Phân công xe cho tài xế

**Bước 3: Theo dõi**
- Click tab "Theo dõi xe"
  - Bản đồ hiển thị tất cả xe đang chạy
  - Click vào xe để xem thông tin chi tiết
  - Hiển thị tuyến đường và điểm dừng
  - **Nhấn mạnh**: Cập nhật realtime mỗi 3 giây

### Phần 3: Demo Tài xế (4 phút)

**Bước 1: Đăng xuất và đăng nhập lại**
- Click nút "Đăng xuất" ở sidebar
- Đăng nhập với tài khoản Driver

**Bước 2: Dashboard tài xế**
- Hiển thị lịch trình hôm nay (2 chuyến)
- Thông tin xe được phân công
- Danh sách học sinh cần đón

**Bước 3: Cập nhật vị trí**
- Click tab "Cập nhật vị trí"
- Hiển thị bản đồ với vị trí xe hiện tại
- Click nút "Cập nhật vị trí"
- Toast notification thành công

### Phần 4: Demo Phụ huynh (4 phút)

**Bước 1: Chuyển tài khoản**
- Đăng xuất và đăng nhập với tài khoản Parent

**Bước 2: Dashboard phụ huynh**
- Hiển thị thông tin học sinh (Nguyễn Văn An)
- Trạng thái xe hiện tại (Đang đến - 5 phút)
- Chuyến xe hôm nay
- Thông tin tài xế

**Bước 3: Theo dõi xe**
- Click tab "Theo dõi xe"
- Bản đồ hiển thị xe buýt
- Click checkbox "Hiển thị đường đi"
- **Nhấn mạnh**: 
  - ETA (thời gian dự kiến)
  - Khoảng cách đến điểm đón
  - Giống app Grab/Xanh SM

---

## 💡 Điểm nhấn quan trọng

### 1. Công nghệ hiện đại
- ⚛️ React 18 + JavaScript
- 🎨 Tailwind CSS 4.0
- 🗺️ Google Maps API (Việt Nam)
- 📱 Responsive Design

### 2. Tính năng nổi bật
- ✅ **Realtime tracking** - Cập nhật mỗi 3 giây
- ✅ **CRUD hoàn chỉnh** - Tất cả chức năng quản lý
- ✅ **Maps API** - Directions, ETA, Traffic-aware
- ✅ **3 vai trò** - Admin, Driver, Parent
- ✅ **UI/UX chuyên nghiệp** - Giống app thương mại

### 3. Đáp ứng yêu cầu
- ✅ Theo đúng Use Case Diagram
- ✅ Theo đúng Database Schema
- ✅ Đầy đủ chức năng CRUD
- ✅ Tích hợp bản đồ thành công
- ✅ Thông báo tự động

---

## ❓ Câu hỏi thường gặp khi demo

### Q1: "Dữ liệu lấy từ đâu?"
**A**: Hiện tại sử dụng JSON mock data trong folder `/data`. Đã chuẩn bị sẵn:
- 245 học sinh
- 12 xe buýt  
- 8 tuyến đường
- 3 tài khoản user

### Q2: "Bản đồ có thật không?"
**A**: Có! Sử dụng Google Maps API thật, tích hợp:
- Hiển thị bản đồ Việt Nam
- Marker tùy chỉnh cho xe buýt
- Directions API tính đường đi
- ETA với traffic data

### Q3: "Có thể thêm/sửa/xóa không?"
**A**: Có! Tất cả chức năng CRUD đều hoạt động:
- Học sinh ✓
- Xe buýt ✓
- Tài xế ✓
- Tuyến đường ✓

### Q4: "Có responsive không?"
**A**: Có! Test trên:
- Desktop ✓
- Tablet ✓
- Mobile ✓

### Q5: "Tracking có thật không?"
**A**: Có! Xe buýt di chuyển realtime:
- Cập nhật vị trí mỗi 3 giây
- Hiển thị tốc độ và hướng
- Tính ETA tự động

---

## 🎓 Tips cho điểm cao

### 1. Chuẩn bị trước
- ✅ Test tất cả tính năng trước khi demo
- ✅ Mở sẵn 3 tab browser cho 3 tài khoản
- ✅ Zoom to 125% để giáo viên dễ nhìn
- ✅ Tắt notification trình duyệt khác

### 2. Trong lúc demo
- 🎤 Giọng to, rõ ràng
- 👆 Di chuột chậm, chỉ rõ từng phần
- ⏱️ Kiểm soát thời gian (không quá 15 phút)
- 💬 Giải thích ngắn gọn mỗi tính năng

### 3. Xử lý sự cố
- 🗺️ **Maps không load**: Refresh page
- 🔄 **Tracking không chạy**: Check console, refresh
- 🔒 **Không đăng nhập được**: Clear localStorage

---

## 📝 Checklist trước khi demo

- [ ] Đã test 3 tài khoản đăng nhập
- [ ] Bản đồ hiển thị bình thường
- [ ] Xe buýt di chuyển realtime
- [ ] CRUD hoạt động tốt
- [ ] Responsive trên mobile
- [ ] Chuẩn bị slide/tài liệu
- [ ] Pin laptop đầy
- [ ] Internet ổn định

---

## 🌟 Kết thúc demo

### Tóm tắt thành tựu
1. ✅ Hoàn thành đầy đủ chức năng theo yêu cầu
2. ✅ Tích hợp thành công Google Maps API
3. ✅ UI/UX chuyên nghiệp, hiện đại
4. ✅ 3 vai trò với phân quyền rõ ràng
5. ✅ Realtime tracking như app thương mại

### Khả năng mở rộng
- Backend API (REST/GraphQL)
- Database thật (MySQL/PostgreSQL)
- Mobile app (React Native)
- Push notifications
- Báo cáo nâng cao

---

<div align="center">

**Chúc bạn demo thành công! 🎉**

*Nếu có vấn đề, tham khảo thêm DEPLOYMENT_GUIDE.md*

</div>
