import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { MapPin, Clock, Bus, User, Navigation, AlertCircle } from 'lucide-react';
import { TrackingView } from '../shared/TrackingView';
import { NotificationCenter } from '../shared/NotificationCenter';
import { CommunicationPanel } from '../shared/CommunicationPanel';

export function ParentDashboard({ user, activeTab, setActiveTab }) {

  const studentInfo = {
    name: 'Nguyễn Văn An',
    class: 'Lớp 5A',
    bus: '29A-12345',
    pickupPoint: '123 Đường ABC',
    route: 'Tuyến 1'
  };

  const upcomingTrips = [
    { time: '07:00', type: 'Đón', status: 'Xe đang đến', eta: '5 phút' },
    { time: '14:00', type: 'Trả', status: 'Chưa bắt đầu', eta: '-' },
  ];

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">Dashboard Phụ huynh</h1>
        <p className="text-gray-500">Theo dõi hành trình của con bạn</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="tracking">Theo dõi xe</TabsTrigger>
          <TabsTrigger value="schedule">Lịch trình</TabsTrigger>
          <TabsTrigger value="communication">Liên lạc</TabsTrigger>
          <TabsTrigger value="notifications">Thông báo</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 lg:grid-cols-3 mb-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Thông tin học sinh</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
                    {studentInfo.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl text-gray-900">{studentInfo.name}</h3>
                    <p className="text-sm text-gray-600">{studentInfo.class}</p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-blue-500 p-2 rounded-lg">
                      <Bus className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Xe buýt</p>
                      <p className="text-sm text-gray-900">{studentInfo.bus}</p>
                      <p className="text-xs text-gray-500 mt-1">{studentInfo.route}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-purple-500 p-2 rounded-lg">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Điểm đón/trả</p>
                      <p className="text-sm text-gray-900">{studentInfo.pickupPoint}</p>
                    </div>
                  </div>
                </div>


              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Trạng thái hiện tại</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border-2 border-green-200">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" />
                        <p className="text-sm text-gray-900">Xe đang hoạt động</p>
                      </div>
                      <p className="text-xs text-gray-600">Đang trên đường đến điểm đón</p>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-2 border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-gray-600">Thời gian dự kiến</p>
                        <Clock className="w-4 h-4 text-blue-600" />
                      </div>
                      <p className="text-2xl text-blue-600">5 phút</p>
                      <p className="text-xs text-gray-600 mt-1">Khoảng cách: ~2.5 km</p>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                      <p className="text-xs text-gray-600 mb-2">Tốc độ xe</p>
                      <div className="flex items-center gap-2">
                        <Navigation className="w-5 h-5 text-purple-600" />
                        <span className="text-xl text-gray-900">35 km/h</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tài xế</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center text-white">
                      T
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">Trần Văn Tài</p>
                      <p className="text-xs text-gray-500">Kinh nghiệm: 8 năm</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-yellow-400 text-lg">★★★★★</span>
                    <span className="text-sm text-gray-600">4.9/5.0</span>
                  </div>
                  <Button variant="outline" className="w-full" size="sm">
                    Liên hệ tài xế
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Chuyến xe hôm nay</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {upcomingTrips.map((trip, index) => (
                  <div key={index} className={`p-4 border-2 rounded-lg ${
                    trip.status === 'Xe đang đến' 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`${
                          trip.status === 'Xe đang đến' ? 'bg-blue-500' : 'bg-gray-400'
                        } p-3 rounded-lg`}>
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-lg text-gray-900">{trip.time}</p>
                          <p className="text-sm text-gray-600">{trip.type} học sinh</p>
                        </div>
                      </div>
                      {trip.eta !== '-' && (
                        <div className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-full">
                          <Navigation className="w-4 h-4" />
                          <span className="text-sm">{trip.eta}</span>
                        </div>
                      )}
                    </div>
                    <div className={`px-3 py-2 rounded text-sm ${
                      trip.status === 'Xe đang đến'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {trip.status === 'Xe đang đến' ? '🚌 ' + trip.status : '⏰ ' + trip.status}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>


        </TabsContent>

        <TabsContent value="tracking">
          <TrackingView role="parent" />
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Lịch trình tuần này</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {['Thứ Hai - 20/10/2025', 'Thứ Ba - 21/10/2025', 'Thứ Tư - 22/10/2025'].map((day, index) => (
                  <div key={index}>
                    <h3 className="text-sm text-gray-900 mb-3">{day}</h3>
                    <div className="space-y-2">
                      {[
                        { time: '07:00', location: '123 Đường ABC', type: 'Đón' },
                        { time: '14:00', location: '123 Đường ABC', type: 'Trả' },
                      ].map((schedule, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <MapPin className="w-4 h-4 text-blue-500" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{schedule.time} - {schedule.type}</p>
                            <p className="text-xs text-gray-500">{schedule.location}</p>
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

        <TabsContent value="communication">
          <CommunicationPanel userRole="parent" userId={user.id} />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationCenter role="parent" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
