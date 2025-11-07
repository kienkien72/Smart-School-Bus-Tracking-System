import { useState, useEffect } from 'react';
import { Bell, X, BusFront, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Notification {
  id: number;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: Date;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    type: 'success',
    message: 'Xe buýt 29A-12345 đã đón học sinh Nguyễn Văn An tại điểm dừng 1',
    timestamp: new Date(Date.now() - 2 * 60000)
  },
  {
    id: 2,
    type: 'info',
    message: 'Xe buýt 30B-67890 đang tiếp cận điểm dừng 2 (còn 2 phút)',
    timestamp: new Date(Date.now() - 5 * 60000)
  },
  {
    id: 3,
    type: 'warning',
    message: 'Tuyến 3 có chút chậm trễ do giao thông (dự kiến 5 phút)',
    timestamp: new Date(Date.now() - 10 * 60000)
  }
];

export function LiveNotificationBanner() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Simulate receiving notifications
    const timer = setTimeout(() => {
      setNotifications(MOCK_NOTIFICATIONS);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5" />;
      case 'warning': return <AlertCircle className="w-5 h-5" />;
      case 'error': return <AlertCircle className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'error': return 'bg-red-50 border-red-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  const getTextColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-800';
      case 'warning': return 'text-yellow-800';
      case 'error': return 'text-red-800';
      default: return 'text-blue-800';
    }
  };

  const formatTime = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 1) return 'Vừa xong';
    if (minutes < 60) return `${minutes} phút trước`;
    return `${Math.floor(minutes / 60)} giờ trước`;
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md">
      <AnimatePresence>
        {!isExpanded ? (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsExpanded(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-xl transition-all hover:scale-110 relative"
          >
            <Bell className="w-6 h-6" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                {notifications.length}
              </span>
            )}
          </motion.button>
        ) : (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
          >
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <Bell className="w-5 h-5" />
                <h3 className="font-medium">Thông báo trực tiếp</h3>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-white hover:bg-white/20 p-1 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto p-4 space-y-3">
              <AnimatePresence>
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    className={`${getBgColor(notification.type)} p-4 rounded-xl border-2 relative group`}
                  >
                    <button
                      onClick={() => removeNotification(notification.id)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1 shadow-sm hover:bg-gray-100"
                    >
                      <X className="w-3 h-3 text-gray-600" />
                    </button>

                    <div className="flex items-start gap-3">
                      <div className={`${getColor(notification.type)} p-2 rounded-lg text-white`}>
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 pr-6">
                        <p className={`text-sm ${getTextColor(notification.type)}`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatTime(notification.timestamp)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="bg-gray-50 p-3 border-t border-gray-200">
              <button className="w-full text-sm text-blue-600 hover:text-blue-700 transition-colors">
                Xem tất cả thông báo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
