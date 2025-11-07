import { MapPin, School, Home, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface Stop {
  id: number;
  name: string;
  time: string;
  address?: string;
}

interface RouteVisualizationProps {
  routeName: string;
  routeColor: string;
  stops: Stop[];
  distance?: string;
  estimatedTime?: string;
}

export function RouteVisualization({ 
  routeName, 
  routeColor, 
  stops,
  distance,
  estimatedTime 
}: RouteVisualizationProps) {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div 
            className="w-1 h-6 rounded-full"
            style={{ backgroundColor: routeColor }}
          />
          {routeName}
        </CardTitle>
        {(distance || estimatedTime) && (
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
            {distance && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{distance}</span>
              </div>
            )}
            {estimatedTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{estimatedTime}</span>
              </div>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Vertical line */}
          <div 
            className="absolute left-6 top-8 bottom-8 w-0.5"
            style={{ backgroundColor: routeColor + '40' }}
          />

          <div className="space-y-6">
            {/* Start point */}
            <div className="flex items-start gap-4">
              <div 
                className="relative z-10 w-12 h-12 rounded-2xl shadow-lg flex items-center justify-center"
                style={{ backgroundColor: routeColor }}
              >
                <School className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 pt-2">
                <p className="text-sm text-gray-900">Điểm xuất phát</p>
                <p className="text-xs text-gray-500">Trường học</p>
                <p className="text-xs text-gray-400 mt-1">{stops[0]?.time || '07:00'}</p>
              </div>
            </div>

            {/* Stops */}
            {stops.map((stop, index) => (
              <div key={stop.id} className="flex items-start gap-4">
                <div className="relative z-10 w-12 h-12 rounded-2xl bg-white border-2 shadow-md flex items-center justify-center"
                  style={{ borderColor: routeColor }}
                >
                  <span className="text-sm" style={{ color: routeColor }}>
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1 pt-2">
                  <p className="text-sm text-gray-900">{stop.name}</p>
                  {stop.address && (
                    <p className="text-xs text-gray-500 mt-0.5">{stop.address}</p>
                  )}
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <p className="text-xs text-gray-600">{stop.time}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* End point */}
            <div className="flex items-start gap-4">
              <div 
                className="relative z-10 w-12 h-12 rounded-2xl shadow-lg flex items-center justify-center"
                style={{ backgroundColor: routeColor }}
              >
                <Home className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 pt-2">
                <p className="text-sm text-gray-900">Điểm kết thúc</p>
                <p className="text-xs text-gray-500">Khu dân cư</p>
                <p className="text-xs text-gray-400 mt-1">
                  {stops[stops.length - 1]?.time || '07:30'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 p-4 rounded-xl border-2 border-dashed" style={{ borderColor: routeColor + '40' }}>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl" style={{ color: routeColor }}>
                {stops.length + 2}
              </p>
              <p className="text-xs text-gray-500 mt-1">Điểm dừng</p>
            </div>
            <div>
              <p className="text-2xl" style={{ color: routeColor }}>
                {distance || '12 km'}
              </p>
              <p className="text-xs text-gray-500 mt-1">Quãng đường</p>
            </div>
            <div>
              <p className="text-2xl" style={{ color: routeColor }}>
                {estimatedTime || '30 phút'}
              </p>
              <p className="text-xs text-gray-500 mt-1">Thời gian</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
