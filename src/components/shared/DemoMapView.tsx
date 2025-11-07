import { useState, useEffect } from "react";
import { Bus, MapPin, Navigation2 } from "lucide-react";
import { MapLoadingAnimation } from "./MapLoadingAnimation";

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
  const [mapLoaded, setMapLoaded] = useState(false);
  const MIN_LAT = 10.75;
  const MAX_LAT = 10.8;
  const MIN_LNG = 106.65;
  const MAX_LNG = 106.71;

  useEffect(() => {
    const timer = setTimeout(() => setMapLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const centerLat = (MIN_LAT + MAX_LAT) / 2;
  const centerLng = (MIN_LNG + MAX_LNG) / 2;

  // Chuyển tọa độ thật → tọa độ hiển thị (%)
  const getMapPosition = (location: Location) => {
    const latPercent = ((location.lat - MIN_LAT) / (MAX_LAT - MIN_LAT)) * 100;
    const lngPercent = ((location.lng - MIN_LNG) / (MAX_LNG - MIN_LNG)) * 100;
    return {
      x: lngPercent,
      y: 100 - latPercent,
    };
  };

  // Tọa độ đường tuyến
  const linePoints = stops.map((s) => getMapPosition(s.location));
  const routeColor = buses[0]?.color || "#FF6B35";
  const routeName = buses[0]?.route || "Tuyến mẫu";
  const activeDistance = "2.7 km";

  if (!mapLoaded) {
    return <MapLoadingAnimation />;
  }

  return (
    <div className="relative min-h-[500px] rounded-xl overflow-hidden shadow-lg bg-gray-100">
      {/* OpenStreetMap Background with Leaflet tiles */}
      <div className="absolute inset-0">
        <iframe
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${MIN_LNG},${MIN_LAT},${MAX_LNG},${MAX_LAT}&layer=mapnik&marker=${centerLat},${centerLng}`}
          className="w-full h-full border-0"
          style={{ pointerEvents: 'none' }}
          title="OpenStreetMap"
        />
      </div>

      {/* Overlay for custom markers and route */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Route Info Badge */}
        <div className="absolute top-4 left-4 pointer-events-auto z-20">
          <div className="bg-white rounded-2xl shadow-xl p-3 flex items-center gap-3 backdrop-blur-sm">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
              style={{ backgroundColor: routeColor }}
            >
              <span className="text-white text-lg">5</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Đang đưa đón</p>
              <p className="text-sm text-gray-900">{activeDistance}</p>
            </div>
          </div>
        </div>

        {/* Live Tracking Badge */}
        <div className="absolute top-4 right-4 pointer-events-auto z-20">
          <div className="bg-green-500 text-white rounded-full px-4 py-2 shadow-xl flex items-center gap-2 backdrop-blur-sm">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-xs">Live Tracking</span>
          </div>
        </div>

        {/* SVG for route line */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {linePoints.length > 1 && (
            <>
              {/* Route shadow */}
              <polyline
                points={linePoints.map((p) => `${p.x},${p.y}`).join(" ")}
                fill="none"
                stroke="#000000"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.2"
                transform="translate(0.2, 0.2)"
              />
              {/* Main route */}
              <polyline
                points={linePoints.map((p) => `${p.x},${p.y}`).join(" ")}
                fill="none"
                stroke={routeColor}
                strokeWidth="0.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="2,1"
              />
            </>
          )}
        </svg>

        {/* Bus Markers */}
        {buses.map((bus) => {
          const { x, y } = getMapPosition(bus.location);
          return (
            <div
              key={`bus-${bus.id}`}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer transition-all hover:scale-125 z-30"
              style={{ 
                left: `${x}%`, 
                top: `${y}%`,
                transform: `translate(-50%, -50%) rotate(${bus.heading}deg)`
              }}
              onClick={() => onBusClick && onBusClick(bus.id)}
              title={`${bus.licensePlate} - ${bus.speed} km/h`}
            >
              <div 
                className="relative w-10 h-10 rounded-full shadow-2xl flex items-center justify-center"
                style={{ backgroundColor: bus.status === 'active' ? bus.color : '#9CA3AF' }}
              >
                <Navigation2 className="w-5 h-5 text-white" />
                
                {/* Pulse effect for active bus */}
                {bus.status === 'active' && (
                  <div 
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{ backgroundColor: bus.color, opacity: 0.4 }}
                  />
                )}
              </div>
              
              {/* Bus info popup */}
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white rounded-lg shadow-xl px-3 py-2 text-xs opacity-0 hover:opacity-100 transition-opacity">
                <p className="text-gray-900">{bus.licensePlate}</p>
                <p className="text-gray-500">{bus.speed} km/h</p>
              </div>
            </div>
          );
        })}

        {/* Stop Markers */}
        {stops.map((stop, index) => {
          const { x, y } = getMapPosition(stop.location);
          const isFirst = index === 0;
          const isLast = index === stops.length - 1;
          
          return (
            <div
              key={`stop-${stop.id}`}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-10"
              style={{
                left: `${x}%`,
                top: `${y}%`,
              }}
              title={`${stop.name} - ${stop.time}`}
            >
              {isFirst || isLast ? (
                // School or endpoint marker
                <div className="relative">
                  <div className="w-8 h-8 bg-blue-500 rounded-full shadow-xl flex items-center justify-center border-2 border-white">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-blue-500 text-white rounded-md px-2 py-1 text-xs shadow-lg">
                    {isFirst ? "Trường học" : "Điểm cuối"}
                  </div>
                </div>
              ) : (
                // Regular stop
                <div className="relative group">
                  <div className="w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-red-500 hover:scale-125 transition-transform">
                    <span className="text-xs text-red-500">{index}</span>
                  </div>
                  <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white rounded-md px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-xl">
                    <p>{stop.name}</p>
                    <p className="text-gray-300">{stop.time}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Bottom Attribution */}
        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded px-2 py-1 text-xs text-gray-600 shadow">
          © <a href="https://www.openstreetmap.org/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">OpenStreetMap</a> contributors
        </div>
      </div>
    </div>
  );
}