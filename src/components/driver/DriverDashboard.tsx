import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Bus, Calendar, MapPin, Navigation, Clock, Users } from 'lucide-react';
import { TrackingView } from '../shared/TrackingView';
import { NotificationCenter } from '../shared/NotificationCenter';
import { CommunicationPanel } from '../shared/CommunicationPanel';

export function DriverDashboard({ user, activeTab, setActiveTab }) {

  const todaySchedule = [
    { time: '07:00', route: 'Tuyến 1', status: 'completed', students: 15 },
    { time: '14:00', route: 'Tuyến 1', status: 'upcoming', students: 15 },
  ];

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">Dashboard Tài xế</h1>
        <p className="text-gray-500">Quản lý lịch trình và cập nhật vị trí xe buýt</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="schedule">Lịch trình</TabsTrigger>
          <TabsTrigger value="tracking">Cập nhật vị trí</TabsTrigger>
          <TabsTrigger value="communication">Liên lạc</TabsTrigger>
          <TabsTrigger value="notifications">Thông báo</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-gray-600">Xe được phân công</CardTitle>
                <div className="bg-blue-500 p-2 rounded-lg">
                  <Bus className="w-4 h-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-gray-900">29A-12345</div>
                <p className="text-xs text-gray-500 mt-1">Hyundai County • 45 chỗ</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-gray-600">Chuyến hôm nay</CardTitle>
                <div className="bg-green-500 p-2 rounded-lg">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-gray-900">2 chuyến</div>
                <p className="text-xs text-gray-500 mt-1">1 hoàn thành, 1 sắp tới</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-gray-600">Học sinh</CardTitle>
                <div className="bg-purple-500 p-2 rounded-lg">
                  <Users className="w-4 h-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-gray-900">15</div>
                <p className="text-xs text-gray-500 mt-1">Trên tuyến đường</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-gray-600">Quãng đường</CardTitle>
                <div className="bg-orange-500 p-2 rounded-lg">
                  <Navigation className="w-4 h-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-gray-900">24 km</div>
                <p className="text-xs text-gray-500 mt-1">Hôm nay</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-3 mb-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Lịch trình hôm nay</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaySchedule.map((schedule, index) => (
                    <div key={index} className={`p-4 border-2 rounded-lg ${
                      schedule.status === 'completed' 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-blue-50 border-blue-200'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4">
                          <div className={`${
                            schedule.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                          } p-3 rounded-lg`}>
                            <Clock className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="text-lg text-gray-900">{schedule.time}</p>
                            <p className="text-sm text-gray-600">{schedule.route}</p>
                          </div>
                        </div>
                        <span className={`px-4 py-2 text-sm rounded-full ${
                          schedule.status === 'completed'
                            ? 'bg-green-500 text-white'
                            : 'bg-blue-500 text-white'
                        }`}>
                          {schedule.status === 'completed' ? '✓ Hoàn thành' : '⏰ Sắp tới'}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t">
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Học sinh</p>
                          <p className="text-lg text-gray-900">{schedule.students}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Điểm dừng</p>
                          <p className="text-lg text-gray-900">3</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Thời gian</p>
                          <p className="text-lg text-gray-900">~30 phút</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Trạng thái xe</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-900">Đang hoạt động</span>
                      </div>
                      <p className="text-xs text-gray-600">Xe đang ở vị trí tốt</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Nhiên liệu</span>
                        <span className="text-gray-900">78%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{width: '78%'}}></div>
                      </div>
                    </div>

                    <div className="pt-3 border-t space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Bảo trì gần nhất</span>
                        <span className="text-gray-900">15/09/2025</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Bảo trì tiếp theo</span>
                        <span className="text-gray-900">15/12/2025</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Thống kê tuần này</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Tổng chuyến</p>
                      <p className="text-2xl text-gray-900">12</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Tổng quãng đường</p>
                      <p className="text-2xl text-gray-900">156 km</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Đánh giá</p>
                      <div className="flex items-center gap-1">
                        <span className="text-2xl text-gray-900">4.9</span>
                        <span className="text-yellow-400 text-lg">★★★★★</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>


        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Lịch trình của tôi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {['Thứ Hai - 20/10/2025', 'Thứ Ba - 21/10/2025', 'Thứ Tư - 22/10/2025'].map((day, index) => (
                  <div key={index}>
                    <h3 className="text-sm text-gray-900 mb-3">{day}</h3>
                    <div className="space-y-2">
                      {[
                        { time: '07:00', route: 'Tuyến 1', type: 'Đón học sinh' },
                        { time: '14:00', route: 'Tuyến 1', type: 'Trả học sinh' },
                      ].map((schedule, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <MapPin className="w-4 h-4 text-blue-500" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{schedule.time} - {schedule.route}</p>
                            <p className="text-xs text-gray-500">{schedule.type}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking">
          <TrackingView role="driver" />
        </TabsContent>

        <TabsContent value="communication">
          <CommunicationPanel userRole="driver" userId={user.id} />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationCenter role="driver" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
