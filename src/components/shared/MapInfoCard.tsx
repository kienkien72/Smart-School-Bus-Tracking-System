import { Clock, MapPin, Users, Gauge } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

interface BusInfo {
  licensePlate: string;
  model: string;
  route: string;
  speed: number;
  status: string;
  studentsCount: number;
  estimatedArrival?: string;
  color?: string;
}

interface MapInfoCardProps {
  bus: BusInfo;
  compact?: boolean;
}

export function MapInfoCard({ bus, compact = false }: MapInfoCardProps) {
  const isActive = bus.status === 'active';
  
  if (compact) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-gray-100">
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
            style={{ backgroundColor: bus.color || '#3B82F6' }}
          >
            <span className="text-white text-lg">{bus.licensePlate.split('-')[1]?.substring(0, 2) || '00'}</span>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-900 mb-1">{bus.licensePlate}</p>
            <div className="flex items-center gap-2">
              <Badge variant={isActive ? "default" : "secondary"} className="text-xs">
                {isActive ? '🟢 Hoạt động' : '🔴 Dừng'}
              </Badge>
              <span className="text-xs text-gray-500">{bus.speed} km/h</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: bus.color || '#3B82F6' }}
            >
              <span className="text-white text-xl">{bus.licensePlate.split('-')[1]?.substring(0, 2) || '00'}</span>
            </div>
            <div>
              <h3 className="text-lg text-gray-900">{bus.licensePlate}</h3>
              <p className="text-sm text-gray-500">{bus.model}</p>
            </div>
          </div>
          <Badge 
            variant={isActive ? "default" : "secondary"}
            className="px-3 py-1"
          >
            <div className={`w-2 h-2 rounded-full mr-2 ${isActive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
            {isActive ? 'Hoạt động' : 'Dừng'}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-blue-50 rounded-xl p-3">
            <div className="flex items-center gap-2 text-blue-600 mb-1">
              <Gauge className="w-4 h-4" />
              <span className="text-xs">Tốc độ</span>
            </div>
            <p className="text-xl text-gray-900">{bus.speed}</p>
            <p className="text-xs text-gray-500">km/h</p>
          </div>

          <div className="bg-purple-50 rounded-xl p-3">
            <div className="flex items-center gap-2 text-purple-600 mb-1">
              <Users className="w-4 h-4" />
              <span className="text-xs">Học sinh</span>
            </div>
            <p className="text-xl text-gray-900">{bus.studentsCount}</p>
            <p className="text-xs text-gray-500">người</p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4 text-blue-500" />
            <span className="text-gray-900">{bus.route}</span>
          </div>
          
          {bus.estimatedArrival && (
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4 text-green-500" />
              <span className="text-gray-900">Đến điểm đón: {bus.estimatedArrival}</span>
            </div>
          )}
        </div>

        {bus.estimatedArrival && (
          <div className="mt-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-3 border border-green-200">
            <p className="text-xs text-green-800">
              <strong>💡 Dự kiến:</strong> Xe sẽ đến điểm đón của bạn trong {bus.estimatedArrival}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
