import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  MapPin,
  Navigation,
  Bus,
  Clock,
  Users,
  RefreshCw,
  Radio,
} from "lucide-react";
import { SimpleMapView } from "./SimpleMapView";
import { DemoMapView } from "./DemoMapView";
import { toast } from "sonner@2.0.3";

// Toggle between SimpleMapView (Google Maps) and DemoMapView (Demo mode)
const USE_DEMO_MAP = true; // Set to true to use demo map without Google Maps API

interface Location {
  lat: number;
  lng: number;
}

const busesDataInit = [
  {
    id: 1,
    licensePlate: "29A-12345",
    capacity: 45,
    model: "Hyundai County",
    year: 2020,
    driverId: 1,
    driverName: "Nguyễn Văn Tài",
    routeId: 1,
    status: "active",
    lastMaintenance: "2025-09-15",
    nextMaintenance: "2025-12-15",
    currentLocation: {
      lat: 10.7756,
      lng: 106.7019,
      speed: 35,
      heading: 180,
      timestamp: "2025-10-19T07:03:00Z",
    },
  },
  {
    id: 2,
    licensePlate: "30B-67890",
    capacity: 50,
    model: "Thaco Universe",
    year: 2021,
    driverId: 2,
    driverName: "Trần Văn Bình",
    routeId: 2,
    status: "active",
    lastMaintenance: "2025-08-20",
    nextMaintenance: "2025-11-20",
    currentLocation: {
      lat: 10.7868,
      lng: 106.69,
      speed: 40,
      heading: 90,
      timestamp: "2025-10-19T07:02:00Z",
    },
  },
  {
    id: 3,
    licensePlate: "31C-11111",
    capacity: 40,
    model: "Hyundai Solati",
    year: 2019,
    driverId: 3,
    driverName: "Lê Văn Cường",
    routeId: 3,
    status: "maintenance",
    lastMaintenance: "2025-10-01",
    nextMaintenance: "2026-01-01",
    currentLocation: {
      lat: 10.7769,
      lng: 106.7009,
      speed: 0,
      heading: 0,
      timestamp: "2025-10-19T06:00:00Z",
    },
  },
];

const routesData = [
  {
    id: 1,
    name: "Tuyến 1 - Quận 1",
    startPoint: {
      name: "Trường THCS Nguyễn Du",
      address: "100 Đường Nguyễn Du, Quận 1, TP.HCM",
      lat: 10.7769,
      lng: 106.7009,
    },
    endPoint: {
      name: "Khu dân cư A",
      address: "Khu dân cư A, Quận 11, TP.HCM",
      lat: 10.7656,
      lng: 106.6512,
    },
    stops: [
      {
        id: 1,
        name: "Điểm đón 1",
        address: "123 Đường Lê Lợi, Quận 1",
        lat: 10.7756,
        lng: 106.7019,
        time: "07:05",
      },
      {
        id: 2,
        name: "Điểm đón 2",
        address: "456 Đường Nguyễn Huệ, Quận 1",
        lat: 10.7735,
        lng: 106.7012,
        time: "07:10",
      },
      {
        id: 3,
        name: "Điểm đón 3",
        address: "258 Đường Lý Thường Kiệt, Quận 11",
        lat: 10.7656,
        lng: 106.6512,
        time: "07:15",
      },
    ],
    distance: "12 km",
    estimatedTime: "30 phút",
    color: "#0D8ABC",
  },
  {
    id: 2,
    name: "Tuyến 2 - Quận 3",
    startPoint: {
      name: "Trường THCS Nguyễn Du",
      address: "100 Đường Nguyễn Du, Quận 1, TP.HCM",
      lat: 10.7769,
      lng: 106.7009,
    },
    endPoint: {
      name: "Khu dân cư B",
      address: "Khu dân cư B, Quận 3, TP.HCM",
      lat: 10.789,
      lng: 106.6945,
    },
    stops: [
      {
        id: 1,
        name: "Điểm đón 1",
        address: "789 Đường Hai Bà Trưng, Quận 3",
        lat: 10.7868,
        lng: 106.69,
        time: "07:00",
      },
      {
        id: 2,
        name: "Điểm đón 2",
        address: "321 Đường Võ Văn Tần, Quận 3",
        lat: 10.7823,
        lng: 106.6934,
        time: "07:08",
      },
      {
        id: 3,
        name: "Điểm đón 3",
        address: "369 Đường Điện Biên Phủ, Quận 3",
        lat: 10.789,
        lng: 106.6945,
        time: "07:12",
      },
    ],
    distance: "15 km",
    estimatedTime: "35 phút",
    color: "#22C55E",
  },
  {
    id: 3,
    name: "Tuyến 3 - Quận 5, 10",
    startPoint: {
      name: "Trường THCS Nguyễn Du",
      address: "100 Đường Nguyễn Du, Quận 1, TP.HCM",
      lat: 10.7769,
      lng: 106.7009,
    },
    endPoint: {
      name: "Khu dân cư C",
      address: "Khu dân cư C, Quận 10, TP.HCM",
      lat: 10.7722,
      lng: 106.6656,
    },
    stops: [
      {
        id: 1,
        name: "Điểm đón 1",
        address: "654 Đường Trần Hưng Đạo, Quận 5",
        lat: 10.7542,
        lng: 106.6779,
        time: "07:15",
      },
      {
        id: 2,
        name: "Điểm đón 2",
        address: "147 Đường Cách Mạng Tháng 8, Quận 10",
        lat: 10.7722,
        lng: 106.6656,
        time: "07:20",
      },
    ],
    distance: "8 km",
    estimatedTime: "25 phút",
    color: "#EAB308",
  },
];

const studentsData = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    routeId: 1,
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    routeId: 1,
  },
  {
    id: 3,
    name: "Lê Minh Cường",
    routeId: 2,
  },
  {
    id: 4,
    name: "Phạm Thu Hà",
    routeId: 2,
  },
  {
    id: 5,
    name: "Hoàng Minh Đức",
    routeId: 3,
  },
  {
    id: 6,
    name: "Võ Thị Mai",
    routeId: 3,
  },
  {
    id: 7,
    name: "Đỗ Văn Khoa",
    routeId: 1,
  },
  {
    id: 8,
    name: "Bùi Thị Lan",
    routeId: 2,
  },
];

export function TrackingView({ role }) {
  const [buses, setBuses] = useState(busesDataInit);
  const [selectedBusId, setSelectedBusId] = useState<
    number | null
  >(null);
  const [isLive, setIsLive] = useState(true);
  const [userLocation, setUserLocation] =
    useState<Location | null>(null);
  const [showDirections, setShowDirections] = useState(false);

  // Get user's current location
  useEffect(() => {
    if (role === "parent" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Default to a location in Vietnam if geolocation fails
          setUserLocation({ lat: 10.7756, lng: 106.7019 });
        },
      );
    }
  }, [role]);

  // Simulate real-time location updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setBuses((prevBuses) =>
        prevBuses.map((bus) => {
          if (bus.status !== "active") return bus;

          // Find the route for this bus
          const route = routesData.find(
            (r) => r.id === bus.routeId,
          );
          if (!route) return bus;

          // Simulate movement along the route
          const deltaLat = (Math.random() - 0.5) * 0.0005;
          const deltaLng = (Math.random() - 0.5) * 0.0005;

          return {
            ...bus,
            currentLocation: {
              ...bus.currentLocation,
              lat: bus.currentLocation.lat + deltaLat,
              lng: bus.currentLocation.lng + deltaLng,
              timestamp: new Date().toISOString(),
            },
          };
        }),
      );
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [isLive]);

  const selectedBus = selectedBusId
    ? buses.find((b) => b.id === selectedBusId)
    : buses.find((b) => b.status === "active");
  const selectedRoute = selectedBus
    ? routesData.find((r) => r.id === selectedBus.routeId)
    : null;

  // Get bus markers for map
  const busMarkers = buses.map((bus) => {
    const route = routesData.find((r) => r.id === bus.routeId);
    return {
      id: bus.id,
      licensePlate: bus.licensePlate,
      location: {
        lat: bus.currentLocation.lat,
        lng: bus.currentLocation.lng,
      },
      status: bus.status,
      route: route?.name || "N/A",
      color: route?.color || "#3B82F6",
      speed: bus.currentLocation.speed,
      heading: bus.currentLocation.heading,
    };
  });

  // Get stop markers for selected route
  const stopMarkers =
    selectedRoute?.stops.map((stop) => ({
      id: stop.id,
      name: stop.name,
      location: { lat: stop.lat, lng: stop.lng },
      time: stop.time,
      address: stop.address,
    })) || [];

  // Get route path
  const routePath = selectedRoute
    ? [
        {
          lat: selectedRoute.startPoint.lat,
          lng: selectedRoute.startPoint.lng,
        },
        ...selectedRoute.stops.map((stop) => ({
          lat: stop.lat,
          lng: stop.lng,
        })),
        {
          lat: selectedRoute.endPoint.lat,
          lng: selectedRoute.endPoint.lng,
        },
      ]
    : [];

  const mapCenter = selectedBus
    ? {
        lat: selectedBus.currentLocation.lat,
        lng: selectedBus.currentLocation.lng,
      }
    : { lat: 10.7769, lng: 106.7009 };

  const updateLocation = () => {
    if (role === "driver") {
      // Simulate manual location update
      setBuses((prevBuses) =>
        prevBuses.map((bus) =>
          bus.id === 1
            ? {
                ...bus,
                currentLocation: {
                  ...bus.currentLocation,
                  timestamp: new Date().toISOString(),
                },
              }
            : bus,
        ),
      );
      toast.success("Đã cập nhật vị trí thành công!");
    }
  };

  const toggleLiveTracking = () => {
    setIsLive(!isLive);
    toast.info(
      isLive
        ? "Đã tắt theo dõi thời gian thực"
        : "Đã bật theo dõi thời gian thực",
    );
  };

  // Get students on current route (for driver)
  const routeStudents =
    role === "driver" && selectedRoute
      ? studentsData.filter(
          (s) => s.routeId === selectedRoute.id,
        )
      : [];

  // Calculate student pickup info with time
  const getStudentPickupInfo = (student: any) => {
    const route = routesData.find(
      (r) => r.id === student.routeId,
    );
    if (!route) return { pickupTime: "N/A", address: "N/A" };

    return {
      pickupTime: "07:00", // Default time
      address: route.stops[0]?.address || "N/A",
    };
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>
                  Bản đồ theo dõi thời gian thực
                </CardTitle>
                <p className="text-xs text-gray-500 mt-1">
                  🗺️ Google Maps • Cập nhật mỗi 3 giây •{" "}
                  {
                    buses.filter((b) => b.status === "active")
                      .length
                  }{" "}
                  xe đang hoạt động
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={isLive ? "default" : "secondary"}
                  className="gap-1"
                >
                  <Radio
                    className={`w-3 h-3 ${isLive ? "animate-pulse" : ""}`}
                  />
                  {isLive ? "Trực tiếp" : "Tạm dừng"}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleLiveTracking}
                  title={
                    isLive
                      ? "Tạm dừng cập nhật"
                      : "Bật cập nhật trực tiếp"
                  }
                >
                  <RefreshCw
                    className={`w-4 h-4 ${isLive ? "animate-spin" : ""}`}
                  />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>💡 Hướng dẫn:</strong> Click vào xe buýt
                trên bản đồ để xem chi tiết. Các điểm đỏ đánh số
                là điểm dừng trên tuyến.
              </p>
            </div>

            {USE_DEMO_MAP ? (
              <DemoMapView
                buses={busMarkers}
                stops={stopMarkers}
                onBusClick={(busId) => setSelectedBusId(busId)}
              />
            ) : (
              <SimpleMapView
                center={mapCenter}
                zoom={13}
                buses={busMarkers}
                stops={stopMarkers}
                onBusClick={(busId) => setSelectedBusId(busId)}
              />
            )}

            {role === "driver" && (
              <div className="mt-4 flex gap-2">
                <Button
                  onClick={updateLocation}
                  className="flex-1"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Cập nhật vị trí
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    toast.warning(
                      "Đã gửi cảnh báo tắc đường đến quản lý!",
                    );
                  }}
                >
                  Báo cảnh báo
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {role === "driver" && routeStudents.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Danh sách học sinh cần đón (
                {routeStudents.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {routeStudents.map((student, index) => {
                  const pickupInfo =
                    getStudentPickupInfo(student);
                  return (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-blue-600">
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-900">
                            {student.name}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            Điểm đón {index + 1}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">
                          Thời gian đón
                        </p>
                        <p className="text-sm text-gray-900 font-medium">
                          07:
                          {(index * 5)
                            .toString()
                            .padStart(2, "0")}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>
                {role === "parent"
                  ? "Thông tin xe buýt"
                  : "Danh sách xe hoạt động"}
              </span>
              {role !== "parent" && (
                <Badge variant="outline">
                  {
                    buses.filter((b) => b.status === "active")
                      .length
                  }
                  /{buses.length}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(role === "parent" ? [buses[0]] : buses).map(
                (bus) => {
                  const route = routesData.find(
                    (r) => r.id === bus.routeId,
                  );
                  const isSelected = selectedBusId === bus.id;
                  const studentsOnBus = studentsData.filter(
                    (s) => s.routeId === bus.routeId,
                  ).length;

                  return (
                    <div
                      key={bus.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        isSelected
                          ? "border-blue-500 bg-blue-50 shadow-md"
                          : "border-gray-200 hover:border-gray-400 hover:shadow-sm"
                      }`}
                      onClick={() => setSelectedBusId(bus.id)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div
                            className="p-2 rounded-lg"
                            style={{
                              backgroundColor:
                                route?.color + "20",
                            }}
                          >
                            <Bus
                              className="w-5 h-5"
                              style={{
                                color:
                                  route?.color || "#3B82F6",
                              }}
                            />
                          </div>
                          <div>
                            <p className="text-gray-900 font-medium">
                              {bus.licensePlate}
                            </p>
                            <p className="text-xs text-gray-500">
                              {bus.model}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              bus.status === "active"
                                ? "bg-green-500 animate-pulse"
                                : "bg-red-500"
                            }`}
                          />
                          <span className="text-xs text-gray-500">
                            {bus.status === "active"
                              ? "Hoạt động"
                              : "Bảo trì"}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-3 h-3" />
                          <span>{route?.name || "N/A"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Navigation className="w-3 h-3" />
                          <span>
                            {bus.currentLocation.speed} km/h
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-3 h-3" />
                          <span>{studentsOnBus} học sinh</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-3 h-3" />
                          <span>
                            {new Date(
                              bus.currentLocation.timestamp,
                            ).toLocaleTimeString("vi-VN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>

                      {role === "parent" && (
                        <div className="mt-3 pt-3 border-t">
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-500">
                              Dự kiến đến điểm đón
                            </p>
                            <p className="text-sm text-blue-600 font-medium">
                              5 phút nữa
                            </p>
                          </div>
                          <div className="mt-2 bg-blue-100 p-2 rounded">
                            <p className="text-xs text-blue-800">
                              Xe đang di chuyển với tốc độ{" "}
                              {bus.currentLocation.speed} km/h
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                },
              )}
            </div>
          </CardContent>
        </Card>

        {selectedRoute && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Thông tin tuyến đường
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div
                  className="p-3 rounded-lg"
                  style={{
                    backgroundColor: selectedRoute.color + "10",
                  }}
                >
                  <p className="text-xs text-gray-500">
                    Tên tuyến
                  </p>
                  <p className="text-sm text-gray-900 font-medium">
                    {selectedRoute.name}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">
                      Điểm dừng
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {selectedRoute.stops.length}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">
                      Khoảng cách
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {selectedRoute.distance}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">
                    Thời gian dự kiến
                  </p>
                  <p className="text-sm text-blue-900 font-medium">
                    {selectedRoute.estimatedTime}
                  </p>
                </div>

                <div className="pt-3 border-t">
                  <p className="text-xs text-gray-500 mb-2">
                    Các điểm dừng:
                  </p>
                  <div className="space-y-2">
                    {selectedRoute.stops.map((stop, index) => (
                      <div
                        key={stop.id}
                        className="flex items-start gap-2 text-xs"
                      >
                        <span className="flex-shrink-0 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center font-medium">
                          {index + 1}
                        </span>
                        <div>
                          <p className="text-gray-900">
                            {stop.name}
                          </p>
                          <p className="text-gray-500">
                            {stop.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {role === "driver" && selectedBus && (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Vị trí hiện tại</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-500">Vĩ độ:</span>
                  <p className="text-gray-900">
                    {selectedBus.currentLocation.lat.toFixed(6)}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">
                    Kinh độ:
                  </span>
                  <p className="text-gray-900">
                    {selectedBus.currentLocation.lng.toFixed(6)}
                  </p>
                </div>
                <div className="pt-2 border-t">
                  <span className="text-xs text-gray-500">
                    Cập nhật lần cuối:{" "}
                    {new Date(
                      selectedBus.currentLocation.timestamp,
                    ).toLocaleTimeString("vi-VN")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}