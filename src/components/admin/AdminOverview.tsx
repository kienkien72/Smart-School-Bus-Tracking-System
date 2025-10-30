import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Bus, Users, Route as RouteIcon, MapPin, TrendingUp } from 'lucide-react';

export function AdminOverview() {
  const stats = [
    { label: 'Tổng số học sinh', value: '245', icon: Users, color: 'bg-blue-500', trend: '+12%' },
    { label: 'Tổng số xe buýt', value: '12', icon: Bus, color: 'bg-green-500', trend: '+8%' },
    { label: 'Tuyến đường', value: '8', icon: RouteIcon, color: 'bg-purple-500', trend: '+2%' },
    { label: 'Xe đang hoạt động', value: '9', icon: MapPin, color: 'bg-orange-500', trend: '75%' },
  ];

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-gray-600">{stat.label}</CardTitle>
                <div className={`${stat.color} p-2 rounded-lg`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-gray-900">{stat.value}</div>
                <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>{stat.trend} so với tháng trước</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Tổng quan hoạt động hôm nay</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-500 p-2 rounded-lg">
                    <Bus className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Chuyến xe hoàn thành</p>
                    <p className="text-2xl text-gray-900">24</p>
                  </div>
                </div>
                <div className="text-xs text-gray-500">Sáng: 12 | Chiều: 12</div>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-green-500 p-2 rounded-lg">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Học sinh đã đón</p>
                    <p className="text-2xl text-gray-900">238</p>
                  </div>
                </div>
                <div className="text-xs text-gray-500">97% đúng giờ</div>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-purple-500 p-2 rounded-lg">
                    <RouteIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Tổng quãng đường</p>
                    <p className="text-2xl text-gray-900">356</p>
                  </div>
                </div>
                <div className="text-xs text-gray-500">Km hôm nay</div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm text-gray-900 mb-4">Trạng thái xe buýt</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Đang hoạt động</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{width: '75%'}}></div>
                    </div>
                    <span className="text-sm text-gray-900">9/12</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Đang bảo trì</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500 rounded-full" style={{width: '16.67%'}}></div>
                    </div>
                    <span className="text-sm text-gray-900">2/12</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Dừng hoạt động</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{width: '8.33%'}}></div>
                    </div>
                    <span className="text-sm text-gray-900">1/12</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thông báo quan trọng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { type: 'warning', message: 'Xe buýt 29A-12345 cần bảo trì', time: 'Hôm nay', icon: '⚠️' },
                { type: 'info', message: 'Lịch trình mới cho tuần tới đã cập nhật', time: 'Hôm qua', icon: '📅' },
                { type: 'success', message: 'Tất cả xe hoạt động bình thường', time: '2 ngày trước', icon: '✅' },
                { type: 'info', message: 'Thêm 15 học sinh mới vào hệ thống', time: '3 ngày trước', icon: '👥' },
              ].map((notification, index) => (
                <div key={index} className={`flex items-start gap-3 p-3 rounded-lg border ${
                  notification.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                  notification.type === 'info' ? 'bg-blue-50 border-blue-200' : 
                  'bg-green-50 border-green-200'
                }`}>
                  <span className="text-lg">{notification.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{notification.message}</p>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { action: 'Thêm học sinh mới', name: 'Nguyễn Văn A - Lớp 5A', time: '5 phút trước', icon: '👨‍🎓', color: 'bg-blue-100' },
                { action: 'Cập nhật lịch trình', name: 'Xe buýt 29A-12345', time: '15 phút trước', icon: '🚌', color: 'bg-green-100' },
                { action: 'Hoàn thành tuyến', name: 'Tài xế Trần Văn Bình', time: '1 giờ trước', icon: '✓', color: 'bg-purple-100' },
                { action: 'Phân công xe mới', name: 'Tài xế Lê Văn Cường', time: '2 giờ trước', icon: '🔄', color: 'bg-orange-100' },
                { action: 'Bảo trì hoàn thành', name: 'Xe buýt 30B-67890', time: '3 giờ trước', icon: '🔧', color: 'bg-gray-100' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className={`${activity.color} w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0`}>
                    <span className="text-lg">{activity.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500 truncate">{activity.name}</p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hiệu suất tuần này</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Tỷ lệ đúng giờ</span>
                  <span className="text-lg text-blue-600">96.8%</span>
                </div>
                <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{width: '96.8%'}}></div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Sự hài lòng</span>
                  <span className="text-lg text-green-600">4.8/5.0</span>
                </div>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} className="text-yellow-400 text-xl">
                      {star <= 4 ? '★' : '☆'}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-purple-50 rounded-lg text-center">
                  <p className="text-xs text-gray-600 mb-1">Tổng chuyến xe</p>
                  <p className="text-xl text-gray-900">168</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg text-center">
                  <p className="text-xs text-gray-600 mb-1">Tiết kiệm nhiên liệu</p>
                  <p className="text-xl text-gray-900">8.5L/100km</p>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-2">Chuyến xe theo ngày</p>
                <div className="flex items-end justify-between gap-1 h-20">
                  {[20, 24, 22, 25, 23, 21, 24].map((height, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-1">
                      <div 
                        className="w-full bg-blue-500 rounded-t"
                        style={{height: `${(height/25) * 100}%`}}
                      ></div>
                      <span className="text-xs text-gray-500">
                        {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'][index]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
