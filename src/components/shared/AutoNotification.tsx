import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Bus, AlertCircle, Clock } from 'lucide-react';

interface AutoNotificationProps {
  role: 'parent' | 'driver' | 'admin';
  userId?: number;
}

export function AutoNotification({ role, userId }: AutoNotificationProps) {
  const [hasShownNearbyNotification, setHasShownNearbyNotification] = useState(false);
  const [hasShownDelayNotification, setHasShownDelayNotification] = useState(false);

  useEffect(() => {
    if (role === 'parent') {
      const checkBusApproaching = setInterval(() => {
        const distanceToBus = Math.random() * 1000; 
        const estimatedTime = Math.floor(distanceToBus / 100); 

        if (distanceToBus < 500 && !hasShownNearbyNotification) {
          toast.info(
            <div className="flex items-start gap-3">
              <Bus className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Xe buýt đang đến gần!</p>
                <p className="text-sm text-gray-600">
                  Dự kiến đến điểm đón sau {estimatedTime} phút
                </p>
              </div>
            </div>,
            {
              duration: 10000,
            }
          );
          setHasShownNearbyNotification(true);
          
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Xe buýt đang đến gần!', {
              body: `Dự kiến đến sau ${estimatedTime} phút`,
              icon: '/bus-icon.png',
            });
          }
        }
      }, 10000); 

      return () => clearInterval(checkBusApproaching);
    }

    if (role === 'parent' || role === 'driver') {
      const checkDelay = setInterval(() => {
        const delayMinutes = Math.random() * 15;
        
        if (delayMinutes > 10 && !hasShownDelayNotification) {
          toast.warning(
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Xe buýt bị trễ</p>
                <p className="text-sm text-gray-600">
                  Do tắc đường, xe sẽ đến chậm khoảng {Math.floor(delayMinutes)} phút
                </p>
              </div>
            </div>,
            {
              duration: 10000,
            }
          );
          setHasShownDelayNotification(true);
        }
      }, 15000); 

      return () => clearInterval(checkDelay);
    }

    if (role === 'admin') {
      const checkMaintenance = setInterval(() => {
        const needsMaintenance = Math.random() > 0.9;
        
        if (needsMaintenance) {
          toast.warning(
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Cảnh báo bảo trì</p>
                <p className="text-sm text-gray-600">
                  Xe buýt 31C-11111 cần được bảo trì định kỳ
                </p>
              </div>
            </div>,
            {
              duration: 8000,
            }
          );
        }
      }, 30000); 

      return () => clearInterval(checkMaintenance);
    }
  }, [role, hasShownNearbyNotification, hasShownDelayNotification]);

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return null; 
}
