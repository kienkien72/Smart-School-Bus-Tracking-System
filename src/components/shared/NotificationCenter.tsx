import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Bell, AlertCircle, Info, CheckCircle, Trash2 } from 'lucide-react';

export function NotificationCenter({ role }) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'Xe buýt chậm 5 phút',
      message: 'Xe buýt 29A-12345 đang chậm hơn dự kiến 5 phút do tắc đường.',
      time: '5 phút trước',
      read: false,
      category: 'alert'
    },
    {
      id: 2,
      type: 'info',
      title: 'Lịch trình cập nhật',
      message: 'Lịch trình cho tuần tới đã được cập nhật. Vui lòng kiểm tra.',
      time: '1 giờ trước',
      read: false,
      category: 'schedule'
    },
    {
      id: 3,
      type: 'success',
      title: 'Học sinh đã được đón',
      message: 'Nguyễn Văn An đã lên xe buýt lúc 07:05.',
      time: '2 giờ trước',
      read: true,
      category: 'student'
    },
    {
      id: 4,
      type: 'warning',
      title: 'Bảo trì xe buýt',
      message: 'Xe buýt 31C-11111 cần được bảo trì định kỳ.',
      time: '1 ngày trước',
      read: true,
      category: 'maintenance'
    },
  ]);

  const getIcon = (type) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const filterNotifications = (category) => {
    if (category === 'all') return notifications;
    return notifications.filter(n => n.category === category);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <CardTitle>Trung tâm thông báo</CardTitle>
          {unreadCount > 0 && (
            <Badge variant="destructive">{unreadCount} mới</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="alert">Cảnh báo</TabsTrigger>
            <TabsTrigger value="schedule">Lịch trình</TabsTrigger>
            {role === 'parent' && <TabsTrigger value="student">Học sinh</TabsTrigger>}
            {role === 'admin' && <TabsTrigger value="maintenance">Bảo trì</TabsTrigger>}
          </TabsList>

          {['all', 'alert', 'schedule', 'student', 'maintenance'].map(category => (
            <TabsContent key={category} value={category}>
              <div className="space-y-3">
                {filterNotifications(category).length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Bell className="w-12 h-12 mx-auto mb-2 opacity-20" />
                    <p>Không có thông báo</p>
                  </div>
                ) : (
                  filterNotifications(category).map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border rounded-lg ${getBgColor(notification.type)} ${
                        !notification.read ? 'border-l-4' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">{getIcon(notification.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="text-sm text-gray-900">{notification.title}</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                              className="h-6 w-6 p-0"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">{notification.message}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">{notification.time}</span>
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="h-6 text-xs"
                              >
                                Đánh dấu đã đọc
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
