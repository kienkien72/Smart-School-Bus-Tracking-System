import { useEffect, useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { Bus, AlertCircle, Clock } from 'lucide-react';

interface AutoNotificationProps {
  role: 'parent' | 'driver' | 'admin';
  userId?: number;
}

export function AutoNotification({ role, userId }: AutoNotificationProps) {
  const [hasShownNearbyNotification, setHasShownNearbyNotification] = useState(false);
  const [hasShownDelayNotification, setHasShownDelayNotification] = useState(false);

  useEffect(() => {
    // Simulate checking for bus approaching pickup point (for parents)
    if (role === 'parent') {
      const checkBusApproaching = setInterval(() => {
        // Simulate: bus is within 500m of pickup point
        const distanceToBus = Math.random() * 1000; // meters
        const estimatedTime = Math.floor(distanceToBus / 100); // rough estimate in minutes

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
          
          // Play notification sound (optional)
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Xe buýt đang đến gần!', {
              body: `Dự kiến đến sau ${estimatedTime} phút`,
              icon: '/bus-icon.png',
            });
          }
        }
      }, 10000); // Check every 10 seconds

      return () => clearInterval(checkBusApproaching);
    }

    // Simulate checking for delays (for both parents and drivers)
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
      }, 15000); // Check every 15 seconds

      return () => clearInterval(checkDelay);
    }

    // Check for maintenance alerts (for admin)
    if (role === 'admin') {
      const checkMaintenance = setInterval(() => {
        // This would normally check against actual maintenance schedule
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
      }, 30000); // Check every 30 seconds

      return () => clearInterval(checkMaintenance);
    }
  }, [role, hasShownNearbyNotification, hasShownDelayNotification]);

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return null; // This component doesn't render anything
}
