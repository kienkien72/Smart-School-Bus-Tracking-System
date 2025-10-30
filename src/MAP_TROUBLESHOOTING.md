# 🗺️ Hướng dẫn khắc phục sự cố Map

## ⚠️ Nếu bản đồ không hiển thị

### Bước 1: Kiểm tra Google Maps API Key

1. Mở file `/components/shared/SimpleMapView.tsx`
2. Tìm dòng:
```typescript
const API_KEY = 'AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg';
```

3. **Thay thế bằng API key của bạn**:
   - Truy cập: https://console.cloud.google.com/
   - Tạo project mới hoặc chọn project có sẵn
   - Enable "Maps JavaScript API"
   - Tạo API key mới
   - Copy và thay thế vào code

### Bước 2: Enable các API cần thiết

Trên Google Cloud Console, enable các API sau:
- ✅ Maps JavaScript API
- ✅ Geocoding API (optional)
- ✅ Directions API (optional)
- ✅ Places API (optional)

### Bước 3: Kiểm tra Network

1. Mở DevTools (F12)
2. Vào tab Network
3. Refresh trang
4. Tìm request đến `maps.googleapis.com`
5. Kiểm tra:
   - Status code: Phải là 200
   - Response: Phải có nội dung

### Bước 4: Kiểm tra Console Errors

1. Mở DevTools (F12)
2. Vào tab Console
3. Xem có lỗi nào không:
   - `InvalidKeyMapError`: API key không hợp lệ
   - `RefererNotAllowedMapError`: Domain không được phép
   - Network error: Vấn đề kết nối

### Bước 5: Sử dụng Fallback Map

Nếu vẫn không được, sử dụng bản đồ đơn giản hơn:

```tsx
// Thay vì SimpleMapView, dùng static map placeholder
<div className="w-full h-full rounded-lg bg-gray-100 flex items-center justify-center" style={{ minHeight: '500px' }}>
  <div className="text-center p-8">
    <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
    <h3 className="text-lg text-gray-900 mb-2">Bản đồ đang tải...</h3>
    <p className="text-sm text-gray-600">
      Nếu bản đồ không hiển thị, vui lòng kiểm tra Google Maps API key
    </p>
  </div>
</div>
```

## 🔧 Khắc phục các lỗi thường gặp

### Lỗi 1: "This page can't load Google Maps correctly"
**Nguyên nhân**: API key không hợp lệ hoặc đã hết quota  
**Giải pháp**: 
1. Kiểm tra API key
2. Kiểm tra billing account
3. Kiểm tra quota limits

### Lỗi 2: Map hiển thị màu xám
**Nguyên nhân**: API restrictions  
**Giải pháp**:
1. Vào Google Cloud Console
2. Chọn API key
3. Trong "Application restrictions", chọn "None"
4. Trong "API restrictions", chọn "Don't restrict key"

### Lỗi 3: Markers không hiển thị
**Nguyên nhân**: Data không đúng format  
**Giải pháp**:
1. Kiểm tra console log
2. Verify data structure
3. Check location coordinates

### Lỗi 4: "Loading..." mãi không xong
**Nguyên nhân**: Script không load được  
**Giải pháp**:
1. Kiểm tra internet connection
2. Check browser console
3. Clear cache và reload

## 💡 Demo Mode (Không cần API key)

Nếu chỉ để demo và không có API key, có thể:

### Option 1: Static Image Placeholder
```tsx
<div className="relative w-full h-full rounded-lg overflow-hidden" style={{ minHeight: '500px' }}>
  <img 
    src="https://maps.googleapis.com/maps/api/staticmap?center=10.7769,106.7009&zoom=13&size=800x600&maptype=roadmap&markers=color:red%7C10.7769,106.7009&key=YOUR_KEY"
    alt="Map"
    className="w-full h-full object-cover"
  />
  <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-lg">
    <p className="text-sm text-gray-900">📍 Vị trí demo - TP.HCM</p>
  </div>
</div>
```

### Option 2: OpenStreetMap (Free Alternative)
```bash
npm install react-leaflet leaflet
```

```tsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

<MapContainer center={[10.7769, 106.7009]} zoom={13} style={{ height: '500px' }}>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; OpenStreetMap contributors'
  />
  <Marker position={[10.7769, 106.7009]}>
    <Popup>Xe buýt 29A-12345</Popup>
  </Marker>
</MapContainer>
```

## 📱 Test trên các trình duyệt

- ✅ Chrome/Edge: Hoạt động tốt nhất
- ✅ Firefox: OK
- ✅ Safari: OK (có thể cần enable permissions)
- ⚠️ Internet Explorer: Không hỗ trợ

## 🎯 Checklist cuối cùng

Trước khi demo:
- [ ] Map hiển thị được
- [ ] Xe buýt hiển thị và di chuyển
- [ ] Click vào xe hiển thị info window
- [ ] Điểm dừng hiển thị đúng
- [ ] Console không có lỗi
- [ ] Test trên cả desktop và mobile

---

## 🆘 Vẫn không được?

### Quick Fix: Sử dụng Demo Map Component

Tạo file `/components/shared/DemoMapView.tsx`:

```tsx
import { Card } from '../ui/card';
import { MapPin, Navigation, Bus } from 'lucide-react';

export function DemoMapView({ buses = [] }) {
  return (
    <div className="w-full bg-gradient-to-br from-blue-100 to-green-100 rounded-lg p-8" style={{ minHeight: '500px' }}>
      <div className="text-center mb-8">
        <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h3 className="text-xl text-gray-900 mb-2">Bản đồ Demo</h3>
        <p className="text-sm text-gray-600">Đang hiển thị {buses.length} xe buýt</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {buses.map((bus) => (
          <Card key={bus.id} className="p-4 bg-white">
            <div className="flex items-center gap-3 mb-2">
              <Bus className="w-6 h-6" style={{ color: bus.color }} />
              <div>
                <p className="text-sm font-medium">{bus.licensePlate}</p>
                <p className="text-xs text-gray-500">{bus.route}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Navigation className="w-3 h-3" />
              <span>{bus.speed} km/h</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

Sau đó trong `TrackingView.tsx`, thay:
```tsx
import { SimpleMapView } from './SimpleMapView';
// bằng
import { DemoMapView } from './DemoMapView';
```

---

**Lưu ý**: Trong môi trường production, bạn PHẢI sử dụng API key riêng và enable billing trên Google Cloud Console.
