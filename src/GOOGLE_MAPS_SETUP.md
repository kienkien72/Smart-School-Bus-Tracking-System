# 🗺️ Hướng dẫn setup Google Maps API

## 📋 Tổng quan

Hệ thống Smart School Bus Tracking sử dụng Google Maps JavaScript API để hiển thị bản đồ theo dõi xe buýt thời gian thực.

## 🚀 2 Cách sử dụng

### Cách 1: Sử dụng Demo Map (KHÔNG cần API key) ✅ Dễ nhất

**Ưu điểm:**
- ✅ Không cần đăng ký Google Cloud
- ✅ Không cần API key
- ✅ Không cần billing account
- ✅ Hoạt động ngay lập tức
- ✅ Đủ để demo cho giáo viên

**Hạn chế:**
- ⚠️ Không có bản đồ thật
- ⚠️ Hiển thị dạng cards thay vì map

**Cách bật:**
1. Mở file `/components/shared/TrackingView.tsx`
2. Tìm dòng:
```typescript
const USE_DEMO_MAP = false;
```
3. Đổi thành:
```typescript
const USE_DEMO_MAP = true;
```
4. Save và reload trang

✅ **XONG!** Hệ thống sẽ dùng DemoMapView - hiển thị xe buýt dạng cards thay vì bản đồ.

---

### Cách 2: Sử dụng Google Maps API (Có bản đồ thật) 🗺️

**Ưu điểm:**
- ✅ Bản đồ Google Maps thật
- ✅ Hiển thị markers động
- ✅ Click vào xe để xem thông tin
- ✅ Chuyên nghiệp hơn

**Hạn chế:**
- ⚠️ Cần đăng ký Google Cloud
- ⚠️ Cần enable billing (nhưng có $200 free credits/tháng)
- ⚠️ Phức tạp hơn

## 📝 Hướng dẫn setup Google Maps API (Cách 2)

### Bước 1: Tạo Google Cloud Project

1. Truy cập: https://console.cloud.google.com/
2. Đăng nhập bằng tài khoản Google
3. Click "Select a project" → "New Project"
4. Nhập tên project: "Smart School Bus Tracking"
5. Click "Create"

### Bước 2: Enable Billing

1. Vào "Billing" trong menu
2. Click "Link a billing account"
3. Tạo billing account mới (cần thẻ tín dụng)
4. **Lưu ý:** Google tặng $200 free credits, đủ dùng cho demo

### Bước 3: Enable Maps JavaScript API

1. Vào "APIs & Services" → "Library"
2. Tìm "Maps JavaScript API"
3. Click vào và nhấn "Enable"

### Bước 4: Tạo API Key

1. Vào "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. Copy API key (dạng: `AIzaSyB...`)
4. **Lưu lại API key này!**

### Bước 5: Cấu hình API Key (Bảo mật)

**Option A: Không restrict (dễ nhất - cho demo)**
1. Click vào API key vừa tạo
2. Trong "Application restrictions": Chọn "None"
3. Trong "API restrictions": Chọn "Don't restrict key"
4. Click "Save"

**Option B: Restrict theo domain (an toàn hơn)**
1. Click vào API key
2. Trong "Application restrictions": Chọn "HTTP referrers"
3. Add domains:
   - `localhost:*`
   - `http://localhost:*`
   - `https://yourdomain.com/*`
4. Click "Save"

### Bước 6: Thay API Key vào code

1. Mở file `/components/shared/SimpleMapView.tsx`
2. Tìm dòng:
```typescript
const API_KEY = 'AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg';
```
3. Thay bằng API key của bạn:
```typescript
const API_KEY = 'YOUR_API_KEY_HERE';
```
4. Save file

### Bước 7: Đảm bảo sử dụng Google Maps

1. Mở file `/components/shared/TrackingView.tsx`
2. Đảm bảo:
```typescript
const USE_DEMO_MAP = false;
```

### Bước 8: Test

1. Reload trang
2. Vào tab "Theo dõi xe"
3. Bản đồ Google Maps sẽ hiển thị
4. Xe buýt sẽ xuất hiện dạng markers

---

## ❓ Troubleshooting

### Map hiển thị màu xám
**Nguyên nhân:** API key restrictions  
**Giải pháp:** Set "Application restrictions" = "None"

### "This page can't load Google Maps correctly"
**Nguyên nhân:** API key không hợp lệ hoặc chưa enable billing  
**Giải pháp:** 
1. Kiểm tra API key đã copy đúng chưa
2. Kiểm tra đã enable billing chưa
3. Kiểm tra đã enable Maps JavaScript API chưa

### Loading mãi không xong
**Nguyên nhân:** Network hoặc script error  
**Giải pháp:**
1. Mở DevTools (F12)
2. Check tab Console xem có lỗi gì
3. Check tab Network xem request có thành công không

### Markers không hiển thị
**Nguyên nhân:** Data không load hoặc format sai  
**Giải pháp:**
1. Mở Console (F12)
2. Check log xem có data không
3. Verify buses array có đúng format không

---

## 💰 Chi phí

### Google Maps Pricing
- **Free tier:** $200 credits/tháng
- **Maps JavaScript API:** $7 per 1,000 loads
- **Với free credits:** ~28,500 map loads/tháng

### Ước tính cho demo
- Demo 1 giờ = ~10 reloads
- 1 ngày demo = ~50 reloads
- 1 tháng = ~1,500 reloads
- **Chi phí:** $0 (trong free tier)

---

## 🎯 Recommendation cho Demo

### Cho Sinh viên (Demo cho giáo viên)
👉 **Dùng Cách 1: Demo Map**
- Lý do: Đơn giản, không mất thời gian setup, đủ chức năng để demo

### Cho Production (Thực tế)
👉 **Dùng Cách 2: Google Maps API**
- Lý do: Chuyên nghiệp, đầy đủ tính năng, user experience tốt

---

## 📚 Resources

- [Google Maps JavaScript API Docs](https://developers.google.com/maps/documentation/javascript)
- [API Key Best Practices](https://developers.google.com/maps/api-key-best-practices)
- [Billing FAQ](https://developers.google.com/maps/billing/gmp-billing)

---

## 🔐 Bảo mật API Key

**⚠️ QUAN TRỌNG:**

1. **KHÔNG commit API key lên Git**
2. **KHÔNG share API key công khai**
3. **SỬ DỤNG environment variables:**

```typescript
// .env
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here

// SimpleMapView.tsx
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'fallback_key';
```

4. **Add .env vào .gitignore**

---

<div align="center">

**🎓 Chúc bạn setup thành công!**

Nếu gặp vấn đề, xem thêm `MAP_TROUBLESHOOTING.md`

</div>
