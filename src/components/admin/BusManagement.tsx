import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Plus, Search, Edit, Trash2, AlertCircle, Calendar, UserCog } from 'lucide-react';
import { toast } from 'sonner';

const busesData = [
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
      timestamp: "2025-10-19T07:03:00Z"
    }
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
      lng: 106.6900,
      speed: 40,
      heading: 90,
      timestamp: "2025-10-19T07:02:00Z"
    }
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
      timestamp: "2025-10-19T06:00:00Z"
    }
  }
];

const driversData = [
  {
    id: 1,
    name: "Nguyễn Văn Tài",
    phone: "0901234567"
  },
  {
    id: 2,
    name: "Trần Văn Bình",
    phone: "0912345678"
  },
  {
    id: 3,
    name: "Lê Văn Cường",
    phone: "0923456789"
  },
  {
    id: 4,
    name: "Phạm Văn Dũng",
    phone: "0934567890"
  }
];

const routesData = [
  {
    id: 1,
    name: "Tuyến 1 - Quận 1",
    color: "#0D8ABC"
  },
  {
    id: 2,
    name: "Tuyến 2 - Quận 3",
    color: "#22C55E"
  },
  {
    id: 3,
    name: "Tuyến 3 - Quận 5, 10",
    color: "#EAB308"
  }
];

import { AssignmentDialog } from './AssignmentDialog';

export function BusManagement() {
  const [buses, setBuses] = useState(busesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const [editingBus, setEditingBus] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const filteredBuses = buses.filter(bus =>
    bus.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddBus = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newBus = {
      id: buses.length + 1,
      licensePlate: formData.get('licensePlate') as string,
      capacity: parseInt(formData.get('capacity') as string),
      model: formData.get('model') as string,
      year: parseInt(formData.get('year') as string),
      driverId: parseInt(formData.get('driverId') as string) || null,
      driverName: driversData.find(d => d.id === parseInt(formData.get('driverId') as string))?.name || null,
      routeId: parseInt(formData.get('routeId') as string) || null,
      status: 'active',
      lastMaintenance: formData.get('lastMaintenance') as string,
      nextMaintenance: formData.get('nextMaintenance') as string,
      currentLocation: {
        lat: 10.7769,
        lng: 106.7009,
        speed: 0,
        heading: 0,
        timestamp: new Date().toISOString()
      }
    };
    setBuses([...buses, newBus]);
    setIsDialogOpen(false);
    toast.success('Đã thêm xe buýt mới');
  };

  const handleDeleteBus = (id) => {
    const bus = buses.find(b => b.id === id);
    if (confirm(`Bạn có chắc muốn xóa xe buýt ${bus?.licensePlate}?`)) {
      setBuses(buses.filter(b => b.id !== id));
      toast.success('Đã xóa xe buýt thành công');
    }
  };

  const handleAssign = (busId: number, driverId: number, routeId: number) => {
    const driver = driversData.find(d => d.id === driverId);
    const route = routesData.find(r => r.id === routeId);
    
    setBuses(buses.map(b => 
      b.id === busId 
        ? { ...b, driverId, driverName: driver?.name, routeId }
        : b
    ));
    
    toast.success(`Đã phân công ${driver?.name} lái xe trên ${route?.name}`);
  };

  const handleEditBus = (bus) => {
    setEditingBus(bus);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleUpdateBus = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedBus = {
      ...editingBus,
      licensePlate: formData.get('licensePlate') as string,
      capacity: parseInt(formData.get('capacity') as string),
      model: formData.get('model') as string,
      year: parseInt(formData.get('year') as string),
      lastMaintenance: formData.get('lastMaintenance') as string,
      nextMaintenance: formData.get('nextMaintenance') as string
    };
    
    setBuses(buses.map(b => b.id === editingBus.id ? updatedBus : b));
    setIsDialogOpen(false);
    setIsEditMode(false);
    setEditingBus(null);
    toast.success('Đã cập nhật thông tin xe buýt');
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setIsEditMode(false);
    setEditingBus(null);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Quản lý xe buýt</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Thêm xe buýt
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{isEditMode ? 'Chỉnh sửa thông tin xe buýt' : 'Thêm xe buýt mới'}</DialogTitle>
                <DialogDescription>
                  {isEditMode ? 'Cập nhật thông tin xe buýt' : 'Nhập thông tin xe buýt mới'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={isEditMode ? handleUpdateBus : handleAddBus} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="licensePlate">Biển số xe</Label>
                    <Input 
                      id="licensePlate" 
                      name="licensePlate" 
                      placeholder="29A-12345" 
                      defaultValue={editingBus?.licensePlate}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Sức chứa</Label>
                    <Input 
                      id="capacity" 
                      name="capacity" 
                      type="number" 
                      placeholder="45" 
                      defaultValue={editingBus?.capacity}
                      required 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="model">Loại xe</Label>
                    <Input 
                      id="model" 
                      name="model" 
                      placeholder="Hyundai County" 
                      defaultValue={editingBus?.model}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Năm sản xuất</Label>
                    <Input 
                      id="year" 
                      name="year" 
                      type="number" 
                      placeholder="2020" 
                      defaultValue={editingBus?.year}
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driverId">Tài xế phụ trách</Label>
                  <Select name="driverId">
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn tài xế" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Chưa phân công</SelectItem>
                      {driversData.map(driver => (
                        <SelectItem key={driver.id} value={driver.id.toString()}>
                          {driver.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="routeId">Tuyến đường</Label>
                  <Select name="routeId">
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn tuyến" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Chưa phân công</SelectItem>
                      {routesData.map(route => (
                        <SelectItem key={route.id} value={route.id.toString()}>
                          {route.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lastMaintenance">Bảo trì lần cuối</Label>
                    <Input 
                      id="lastMaintenance" 
                      name="lastMaintenance" 
                      type="date" 
                      defaultValue={editingBus?.lastMaintenance}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nextMaintenance">Bảo trì lần sau</Label>
                    <Input 
                      id="nextMaintenance" 
                      name="nextMaintenance" 
                      type="date" 
                      defaultValue={editingBus?.nextMaintenance}
                      required 
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  {isEditMode ? 'Cập nhật' : 'Thêm xe buýt'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm theo biển số..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Biển số xe</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Sức chứa</TableHead>
                <TableHead>Tài xế</TableHead>
                <TableHead>Tuyến</TableHead>
                <TableHead>Bảo trì</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBuses.map((bus) => {
                const route = routesData.find(r => r.id === bus.routeId);
                const needsMaintenance = new Date(bus.nextMaintenance) < new Date();
                
                return (
                  <TableRow key={bus.id}>
                    <TableCell>{bus.licensePlate}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{bus.model}</p>
                        <p className="text-xs text-gray-500">{bus.year}</p>
                      </div>
                    </TableCell>
                    <TableCell>{bus.capacity} chỗ</TableCell>
                    <TableCell>{bus.driverName || <span className="text-gray-400">Chưa phân</span>}</TableCell>
                    <TableCell>
                      {route ? (
                        <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: route.color + '20', color: route.color }}>
                          {route.name}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">Chưa phân</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {needsMaintenance && <AlertCircle className="w-3 h-3 text-red-500" />}
                        <div>
                          <p className="text-xs">{new Date(bus.nextMaintenance).toLocaleDateString('vi-VN')}</p>
                          {needsMaintenance && (
                            <p className="text-xs text-red-500">Cần bảo trì</p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        bus.status === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {bus.status === 'active' ? 'Hoạt động' : 'Bảo trì'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedBus(bus);
                            setIsAssignDialogOpen(true);
                          }}
                          title="Phân công"
                        >
                          <UserCog className="w-4 h-4 text-purple-600" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteBus(bus.id)}
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      
      <AssignmentDialog
        isOpen={isAssignDialogOpen}
        onClose={() => {
          setIsAssignDialogOpen(false);
          setSelectedBus(null);
        }}
        bus={selectedBus}
        onAssign={handleAssign}
      />
    </Card>
  );
}
