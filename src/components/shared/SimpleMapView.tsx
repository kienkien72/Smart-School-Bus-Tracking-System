import { useEffect, useRef, useState } from 'react';
import { Alert, AlertDescription } from '../ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';

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

interface SimpleMapViewProps {
  center: Location;
  zoom?: number;
  buses?: BusMarker[];
  stops?: StopMarker[];
  onBusClick?: (busId: number) => void;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export function SimpleMapView({ 
  center, 
  zoom = 13, 
  buses = [], 
  stops = [],
  onBusClick
}: SimpleMapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string>('');
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    if (window.google && window.google.maps) {
      setIsLoaded(true);
      return;
    }

    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => {
        setIsLoaded(true);
      });
      return;
    }

    const script = document.createElement('script');
    const API_KEY = 'AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=geometry&language=vi&region=VN`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      setIsLoaded(true);
      setError('');
    };
    
    script.onerror = () => {
      setError('Không thể tải Google Maps. Vui lòng kiểm tra kết nối internet hoặc API key.');
    };

    document.head.appendChild(script);

    return () => {
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !mapRef.current || map) return;

    try {
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: zoom,
        mapTypeId: 'roadmap',
        zoomControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        mapTypeControl: false,
      });

      setMap(mapInstance);
    } catch (err) {
      console.error('Map initialization error:', err);
      setError('Không thể khởi tạo bản đồ.');
    }
  }, [isLoaded, center, zoom]);

  useEffect(() => {
    if (map && center) {
      map.panTo(center);
    }
  }, [map, center]);

  const clearMarkers = () => {
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
  };

  useEffect(() => {
    if (!map || !window.google || buses.length === 0) return;

    clearMarkers();

    buses.forEach((bus) => {
      const icon = {
        path: 'M12 2C11.45 2 11 2.45 11 3V4H5C3.89 4 3 4.89 3 6V17H4C4 18.66 5.34 20 7 20C8.66 20 10 18.66 10 17H14C14 18.66 15.34 20 17 20C18.66 20 20 18.66 20 17H21V11L18 6H13V3C13 2.45 12.55 2 12 2M5 6H11V9H5V6M13 6H17.5L19.96 10.5H13V6M7 15C7.55 15 8 15.45 8 16C8 16.55 7.55 17 7 17C6.45 17 6 16.55 6 16C6 15.45 6.45 15 7 15M17 15C17.55 15 18 15.45 18 16C18 16.55 17.55 17 17 17C16.45 17 16 16.55 16 16C16 15.45 16.45 15 17 15Z',
        fillColor: bus.status === 'active' ? bus.color : '#9CA3AF',
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: '#FFFFFF',
        rotation: bus.heading || 0,
        scale: 1.3,
        anchor: new window.google.maps.Point(12, 12),
      };

      const marker = new window.google.maps.Marker({
        position: bus.location,
        map: map,
        icon: icon,
        title: bus.licensePlate,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; font-family: system-ui;">
            <h3 style="margin: 0 0 8px 0; font-size: 16px; color: #111827;">
              <strong>${bus.licensePlate}</strong>
            </h3>
            <div style="font-size: 13px; color: #6B7280;">
              <div style="margin-bottom: 4px;">
                <strong>Tuyến:</strong> ${bus.route}
              </div>
              <div style="margin-bottom: 4px;">
                <strong>Tốc độ:</strong> <span style="color: #3B82F6;">${bus.speed} km/h</span>
              </div>
              <div>
                <strong>Trạng thái:</strong> 
                <span style="color: ${bus.status === 'active' ? '#22C55E' : '#EF4444'};">
                  ${bus.status === 'active' ? '🟢 Hoạt động' : '🔴 Dừng'}
                </span>
              </div>
            </div>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
        if (onBusClick) {
          onBusClick(bus.id);
        }
      });

      markersRef.current.push(marker);
    });

    return () => {
      clearMarkers();
    };
  }, [map, buses, onBusClick]);

  useEffect(() => {
    if (!map || !window.google || stops.length === 0) return;

    stops.forEach((stop, index) => {
      const marker = new window.google.maps.Marker({
        position: stop.location,
        map: map,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: '#EF4444',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 2,
          scale: 10,
        },
        label: {
          text: (index + 1).toString(),
          color: '#FFFFFF',
          fontSize: '12px',
          fontWeight: 'bold'
        },
        title: stop.name,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; font-family: system-ui;">
            <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #111827;">
              <strong>Điểm ${index + 1}: ${stop.name}</strong>
            </h3>
            <div style="font-size: 12px; color: #3B82F6;">
              🕐 ${stop.time}
            </div>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      markersRef.current.push(marker);
    });
  }, [map, stops]);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full rounded-lg bg-gray-100 flex items-center justify-center" style={{ minHeight: '500px' }}>
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Đang tải bản đồ Google Maps...</p>
          <p className="text-xs text-gray-500 mt-2">Vui lòng đợi trong giây lát</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-lg border border-gray-200 shadow-sm"
      style={{ minHeight: '500px' }}
    />
  );
}
