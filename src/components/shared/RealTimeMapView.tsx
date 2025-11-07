import { useEffect, useRef, useState } from 'react';
import { Alert, AlertDescription } from '../ui/alert';
import { AlertCircle, Navigation as NavigationIcon, Clock, MapPin as MapPinIcon } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

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
  address?: string;
}

interface RealTimeMapViewProps {
  center: Location;
  zoom: number;
  buses?: BusMarker[];
  stops?: StopMarker[];
  routePath?: Location[];
  onBusClick?: (busId: number) => void;
  userLocation?: Location | null;
  showDirections?: boolean;
  selectedBusId?: number | null;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export function RealTimeMapView({ 
  center, 
  zoom, 
  buses = [], 
  stops = [],
  routePath = [],
  onBusClick,
  userLocation = null,
  showDirections = false,
  selectedBusId = null
}: RealTimeMapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string>('');
  const markersRef = useRef<any[]>([]);
  const polylineRef = useRef<any>(null);
  const infoWindowRef = useRef<any>(null);
  const directionsRendererRef = useRef<any>(null);
  const userMarkerRef = useRef<any>(null);
  const [eta, setEta] = useState<string>('');
  const [distance, setDistance] = useState<string>('');

  useEffect(() => {
    if (window.google && window.google.maps) {
      setIsLoaded(true);
      return;
    }

    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => setIsLoaded(true));
      return;
    }

    const script = document.createElement('script');
    const API_KEY = 'AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg'; 
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=geometry,places,directions&language=vi&region=VN`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      setIsLoaded(true);
      setError('');
    };
    
    script.onerror = () => {
      setError('Không thể tải bản đồ. Vui lòng kiểm tra kết nối internet.');
    };

    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!isLoaded || !mapRef.current || map) return;

    try {
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: window.google.maps.ControlPosition.TOP_RIGHT,
          mapTypeIds: ['roadmap', 'satellite', 'hybrid']
        },
        streetViewControl: true,
        streetViewControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_BOTTOM
        },
        fullscreenControl: true,
        fullscreenControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_TOP
        },
        zoomControl: true,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_CENTER
        },
        scaleControl: true,
        styles: [
          {
            featureType: "poi.business",
            stylers: [{ visibility: "off" }]
          },
          {
            featureType: "transit.station",
            stylers: [{ visibility: "on" }]
          }
        ],
        mapTypeId: 'roadmap',
        restriction: {
          latLngBounds: {
            north: 23.393395,
            south: 8.179469,
            east: 109.464638,
            west: 102.144598
          },
          strictBounds: false
        }
      });

      infoWindowRef.current = new window.google.maps.InfoWindow();
      directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: '#3B82F6',
          strokeWeight: 5,
          strokeOpacity: 0.7
        }
      });

      setMap(mapInstance);
    } catch (err) {
      setError('Không thể khởi tạo bản đồ.');
      console.error('Map initialization error:', err);
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

  const calculateRoute = async (from: Location, to: Location) => {
    if (!window.google || !map) return;

    const directionsService = new window.google.maps.DirectionsService();
    
    try {
      const result = await directionsService.route({
        origin: from,
        destination: to,
        travelMode: window.google.maps.TravelMode.DRIVING,
        drivingOptions: {
          departureTime: new Date(),
          trafficModel: 'bestguess'
        }
      });

      if (result.routes[0]) {
        const route = result.routes[0].legs[0];
        setDistance(route.distance.text);
        setEta(route.duration_in_traffic?.text || route.duration.text);
        
        directionsRendererRef.current.setDirections(result);
        directionsRendererRef.current.setMap(map);
      }
    } catch (error) {
      console.error('Error calculating route:', error);
    }
  };

  useEffect(() => {
    if (!map || !userLocation || !showDirections || !selectedBusId) {
      if (directionsRendererRef.current) {
        directionsRendererRef.current.setMap(null);
      }
      setEta('');
      setDistance('');
      return;
    }

    const selectedBus = buses.find(b => b.id === selectedBusId);
    if (selectedBus) {
      calculateRoute(userLocation, selectedBus.location);
    }
  }, [map, userLocation, showDirections, selectedBusId, buses]);

  useEffect(() => {
    if (!map || !userLocation) {
      if (userMarkerRef.current) {
        userMarkerRef.current.setMap(null);
        userMarkerRef.current = null;
      }
      return;
    }

    if (userMarkerRef.current) {
      userMarkerRef.current.setPosition(userLocation);
    } else {
      userMarkerRef.current = new window.google.maps.Marker({
        position: userLocation,
        map,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: '#4285F4',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 3,
          scale: 10,
        },
        title: 'Vị trí của bạn',
        zIndex: 1000
      });

      new window.google.maps.Circle({
        center: userLocation,
        radius: 50,
        map,
        fillColor: '#4285F4',
        fillOpacity: 0.2,
        strokeColor: '#4285F4',
        strokeOpacity: 0.5,
        strokeWeight: 2
      });
    }
  }, [map, userLocation]);

  useEffect(() => {
    if (!map || !window.google || routePath.length === 0 || showDirections) return;

    if (polylineRef.current) {
      polylineRef.current.setMap(null);
    }

    const polyline = new window.google.maps.Polyline({
      path: routePath,
      geodesic: true,
      strokeColor: '#3B82F6',
      strokeOpacity: 0.8,
      strokeWeight: 5,
    });

    polyline.setMap(map);
    polylineRef.current = polyline;

    const bounds = new window.google.maps.LatLngBounds();
    routePath.forEach(point => bounds.extend(point));
    map.fitBounds(bounds);

    return () => {
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
      }
    };
  }, [map, routePath, showDirections]);

  useEffect(() => {
    if (!map || !window.google || buses.length === 0) return;

    clearMarkers();

    buses.forEach((bus) => {
      const isSelected = bus.id === selectedBusId;
      
      const svgMarker = {
        path: "M12 2C11.45 2 11 2.45 11 3V4H5C3.89 4 3 4.89 3 6V17H4C4 18.66 5.34 20 7 20C8.66 20 10 18.66 10 17H14C14 18.66 15.34 20 17 20C18.66 20 20 18.66 20 17H21V11L18 6H13V3C13 2.45 12.55 2 12 2M5 6H11V9H5V6M13 6H17.5L19.96 10.5H13V6M7 15C7.55 15 8 15.45 8 16C8 16.55 7.55 17 7 17C6.45 17 6 16.55 6 16C6 15.45 6.45 15 7 15M17 15C17.55 15 18 15.45 18 16C18 16.55 17.55 17 17 17C16.45 17 16 16.55 16 16C16 15.45 16.45 15 17 15Z",
        fillColor: bus.status === 'active' ? bus.color : '#9CA3AF',
        fillOpacity: 1,
        strokeWeight: isSelected ? 3 : 2,
        strokeColor: isSelected ? '#FFFFFF' : '#FFFFFF',
        rotation: bus.heading || 0,
        scale: isSelected ? 1.5 : 1.2,
        anchor: new window.google.maps.Point(12, 12),
      };

      const marker = new window.google.maps.Marker({
        position: bus.location,
        map,
        icon: svgMarker,
        title: bus.licensePlate,
        animation: isSelected ? window.google.maps.Animation.BOUNCE : window.google.maps.Animation.DROP,
        zIndex: isSelected ? 100 : 10
      });

      marker.addListener('click', () => {
        const content = `
          <div style="padding: 12px; min-width: 220px; font-family: system-ui, -apple-system, sans-serif;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <div style="width: 8px; height: 8px; border-radius: 50%; background: ${bus.status === 'active' ? '#22C55E' : '#EF4444'};"></div>
              <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #111827;">
                ${bus.licensePlate}
              </h3>
            </div>
            <div style="font-size: 13px; color: #6B7280; line-height: 1.8;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <strong style="color: #374151;">Tuyến:</strong> 
                <span>${bus.route}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <strong style="color: #374151;">Tốc độ:</strong> 
                <span style="color: ${bus.speed > 0 ? '#3B82F6' : '#9CA3AF'}; font-weight: 600;">${bus.speed} km/h</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <strong style="color: #374151;">Trạng thái:</strong> 
                <span style="color: ${bus.status === 'active' ? '#22C55E' : '#EF4444'}; font-weight: 500;">
                  ${bus.status === 'active' ? '🟢 Đang hoạt động' : '🔴 Dừng'}
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
  }, [map, buses, onBusClick, selectedBusId]);

  // Add stop markers
  useEffect(() => {
    if (!map || !window.google || stops.length === 0) return;

    stops.forEach((stop, index) => {
      const marker = new window.google.maps.Marker({
        position: stop.location,
        map,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: '#EF4444',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 2,
          scale: 9,
        },
        label: {
          text: (index + 1).toString(),
          color: '#FFFFFF',
          fontSize: '12px',
          fontWeight: 'bold'
        },
        title: stop.name,
      });

      marker.addListener('click', () => {
        const content = `
          <div style="padding: 10px; min-width: 200px; font-family: system-ui, -apple-system, sans-serif;">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
              <span style="background: #EF4444; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold;">
                ${index + 1}
              </span>
              <h3 style="margin: 0; font-size: 14px; font-weight: 600; color: #111827;">
                ${stop.name}
              </h3>
            </div>
            <div style="font-size: 12px; color: #6B7280; line-height: 1.6;">
              ${stop.address ? `<div style="margin-bottom: 4px;">📍 ${stop.address}</div>` : ''}
              <div style="color: #3B82F6; font-weight: 500;">
                🕐 ${stop.time}
              </div>
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
    <div className="relative w-full h-full">
      {/* ETA Card Overlay */}
      {eta && distance && (
        <Card className="absolute top-4 left-4 z-10 shadow-lg">
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <NavigationIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">ETA:</span>
                  <Badge variant="default">{eta}</Badge>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <MapPinIcon className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Khoảng cách:</span>
                  <span className="text-sm font-medium">{distance}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div 
        ref={mapRef} 
        className="w-full h-full rounded-lg border border-gray-200"
        style={{ minHeight: '500px' }}
      />
    </div>
  );
}
