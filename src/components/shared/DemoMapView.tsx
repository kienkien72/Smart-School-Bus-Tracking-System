import { Bus } from "lucide-react";

interface Location {
  lat: number;
  lng: number;
}

interface BusMarker {
  id: number;
  licensePlate: string;
  location: Location;
  status: string;
  route: string;
  color: string;
  speed: number;
  heading: number;
}

interface StopMarker {
  id: number;
  name: string;
  location: Location;
  time: string;
}

interface DemoMapViewProps {
  buses?: BusMarker[];
  stops?: StopMarker[];
  onBusClick?: (busId: number) => void;
}

export function DemoMapView({
  buses = [],
  stops = [],
  onBusClick,
}: DemoMapViewProps) {
  const MIN_LAT = 10.75;
  const MAX_LAT = 10.8;
  const MIN_LNG = 106.65;
  const MAX_LNG = 106.71;

  // Chuyển tọa độ thật → tọa độ hiển thị (%)
  const getMapPosition = (location: Location) => {
    const latPercent =
      ((location.lat - MIN_LAT) / (MAX_LAT - MIN_LAT)) * 100;
    const lngPercent =
      ((location.lng - MIN_LNG) / (MAX_LNG - MIN_LNG)) * 100;
    return {
      x: lngPercent,
      y: 100 - latPercent,
    };
  };

  // Tọa độ đường tuyến
  const linePoints = stops.map((s) => getMapPosition(s));

  const routeColor = buses[0]?.color || "#3B82F6";
  const routeName = buses[0]?.route || "Tuyến mẫu";

  return (
    <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20 relative min-h-[350px] overflow-hidden">
      {/* SVG nền để vẽ đường */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {linePoints.length > 1 && (
          <polyline
            points={linePoints
              .map((p) => `${p.x},${p.y}`)
              .join(" ")}
            fill="none"
            stroke={routeColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>

      {/* Vẽ điểm dừng */}
      {stops.map((stop) => {
        const { x, y } = getMapPosition(stop.location);
        return (
          <div
            key={`stop-${stop.id}`}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              zIndex: 5,
            }}
            title={`${stop.name} - ${stop.time}`}
          >
            <div className="w-3 h-3 bg-red-500 rounded-full border border-white shadow" />
            <span className="text-[10px] text-white mt-1 whitespace-nowrap">
              {stop.name}
            </span>
          </div>
        );
      })}

      {/* Vẽ bus */}
      {buses.map((bus) => {
        const { x, y } = getMapPosition(bus.location);
        return (
          <div
            key={`bus-${bus.id}`}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-125"
            style={{ left: `${x}%`, top: `${y}%`, zIndex: 10 }}
            onClick={() => onBusClick && onBusClick(bus.id)}
            title={`${bus.licensePlate} (${bus.route})`}
          >
            <Bus
              className="w-5 h-5 p-0.5 rounded-full border-2 shadow"
              style={{
                color: bus.color,
                borderColor: bus.color,
                backgroundColor: "white",
              }}
            />
          </div>
        );
      })}

      {/* Hiển thị tên tuyến */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-sm font-semibold text-white">
        🚍 {routeName}
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-white/70">
        Mô phỏng tuyến xe buýt
      </div>
    </div>
  );
}