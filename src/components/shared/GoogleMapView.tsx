import { useEffect, useRef, useState } from 'react';
import { Alert, AlertDescription } from '../ui/alert';
import { AlertCircle } from 'lucide-react';

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

interface GoogleMapViewProps {
  center: Location;
  zoom: number;
  buses?: BusMarker[];
  stops?: StopMarker[];
  routePath?: Location[];
  onBusClick?: (busId: number) => void;
}

// Declare global google object
declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export function GoogleMapView({ 
  center, 
  zoom, 
  buses = [], 
  stops = [],
  routePath = [],
  onBusClick 
}: GoogleMapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string>('');
  const markersRef = useRef<any[]>([]);
  const polylineRef = useRef<any>(null);
  const infoWindowRef = useRef<any>(null);

  // Load Google Maps Script
  useEffect(() => {
    // Check if script already exists
    if (window.google && window.google.maps) {
      setIsLoaded(true);
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => setIsLoaded(true));
      return;
    }

    const script = document.createElement('script');
    // Using Google's demo API key - Replace with your own key in production
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&libraries=geometry`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      setIsLoaded(true);
      setError('');
    };
    
    script.onerror = () => {
      setError('Không thể tải Google Maps. Vui lòng kiểm tra kết nối internet.');
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      const scriptToRemove = document.querySelector('script[src*="maps.googleapis.com"]');
      if (scriptToRemove && scriptToRemove.parentNode) {
        scriptToRemove.parentNode.removeChild(scriptToRemove);
      }
    };
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || map) return;

    try {
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      });

      // Create a single InfoWindow to reuse
      infoWindowRef.current = new window.google.maps.InfoWindow();

      setMap(mapInstance);
    } catch (err) {
      setError('Không thể khởi tạo bản đồ.');
      console.error('Map initialization error:', err);
    }
  }, [isLoaded, center, zoom]);

  // Update map center
  useEffect(() => {
    if (map) {
      map.panTo(center);
    }
  }, [map, center]);

  // Clear markers
  const clearMarkers = () => {
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
  };

  // Draw route path
  useEffect(() => {
    if (!map || !window.google || routePath.length === 0) return;

    // Clear existing polyline
    if (polylineRef.current) {
      polylineRef.current.setMap(null);
    }

    // Draw new polyline
    const polyline = new window.google.maps.Polyline({
      path: routePath,
      geodesic: true,
      strokeColor: '#3B82F6',
      strokeOpacity: 0.8,
      strokeWeight: 4,
    });

    polyline.setMap(map);
    polylineRef.current = polyline;

    return () => {
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
      }
    };
  }, [map, routePath]);

  // Add bus markers
  useEffect(() => {
    if (!map || !window.google || buses.length === 0) return;

    clearMarkers();

    buses.forEach((bus) => {
      // Create custom bus icon SVG
      const svgMarker = {
        path: "M12 2C11.45 2 11 2.45 11 3V4H5C3.89 4 3 4.89 3 6V17H4C4 18.66 5.34 20 7 20C8.66 20 10 18.66 10 17H14C14 18.66 15.34 20 17 20C18.66 20 20 18.66 20 17H21V11L18 6H13V3C13 2.45 12.55 2 12 2M5 6H11V9H5V6M13 6H17.5L19.96 10.5H13V6M7 15C7.55 15 8 15.45 8 16C8 16.55 7.55 17 7 17C6.45 17 6 16.55 6 16C6 15.45 6.45 15 7 15M17 15C17.55 15 18 15.45 18 16C18 16.55 17.55 17 17 17C16.45 17 16 16.55 16 16C16 15.45 16.45 15 17 15Z",
        fillColor: bus.status === 'active' ? bus.color : '#9CA3AF',
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: '#FFFFFF',
        rotation: bus.heading || 0,
        scale: 1.2,
        anchor: new window.google.maps.Point(12, 12),
      };

      const marker = new window.google.maps.Marker({
        position: bus.location,
        map,
        icon: svgMarker,
        title: bus.licensePlate,
        animation: window.google.maps.Animation.DROP,
      });

      // Add click listener
      marker.addListener('click', () => {
        const content = `
          <div style="padding: 12px; min-width: 200px; font-family: system-ui, -apple-system, sans-serif;">
            <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #111827;">
              ${bus.licensePlate}
            </h3>
            <div style="font-size: 14px; color: #6B7280; line-height: 1.6;">
              <div style="margin-bottom: 6px;">
                <strong style="color: #374151;">Tuyến:</strong> ${bus.route}
              </div>
              <div style="margin-bottom: 6px;">
                <strong style="color: #374151;">Tốc độ:</strong> ${bus.speed} km/h
              </div>
              <div>
                <strong style="color: #374151;">Trạng thái:</strong> 
                <span style="color: ${bus.status === 'active' ? '#22C55E' : '#EF4444'}; font-weight: 500;">
                  ${bus.status === 'active' ? 'Đang hoạt động' : 'Dừng'}
                </span>
              </div>
            </div>
          </div>
        `;

        infoWindowRef.current.setContent(content);
        infoWindowRef.current.open(map, marker);

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

  // Add stop markers
  useEffect(() => {
    if (!map || !window.google || stops.length === 0) return;

    stops.forEach((stop) => {
      const marker = new window.google.maps.Marker({
        position: stop.location,
        map,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: '#EF4444',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 2,
          scale: 8,
        },
        title: stop.name,
      });

      marker.addListener('click', () => {
        const content = `
          <div style="padding: 10px; font-family: system-ui, -apple-system, sans-serif;">
            <h3 style="margin: 0 0 6px 0; font-size: 14px; font-weight: 600; color: #111827;">
              ${stop.name}
            </h3>
            <div style="font-size: 12px; color: #6B7280;">
              Thời gian: ${stop.time}
            </div>
          </div>
        `;

        infoWindowRef.current.setContent(content);
        infoWindowRef.current.open(map, marker);
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải bản đồ...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-lg border border-gray-200"
      style={{ minHeight: '500px' }}
    />
  );
}
