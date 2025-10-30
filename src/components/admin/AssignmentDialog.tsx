import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner@2.0.3';
import { UserCog, Bus, Route as RouteIcon } from 'lucide-react';

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

interface AssignmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  bus: any;
  onAssign: (busId: number, driverId: number, routeId: number) => void;
}

export function AssignmentDialog({ isOpen, onClose, bus, onAssign }: AssignmentDialogProps) {
  const [selectedDriver, setSelectedDriver] = useState(bus?.driverId?.toString() || '');
  const [selectedRoute, setSelectedRoute] = useState(bus?.routeId?.toString() || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDriver || !selectedRoute) {
      toast.error('Vui lòng chọn đầy đủ tài xế và tuyến đường');
      return;
    }

    onAssign(bus.id, parseInt(selectedDriver), parseInt(selectedRoute));
    onClose();
    toast.success('Đã phân công thành công!');
  };

  if (!bus) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bus className="w-5 h-5 text-blue-600" />
            Phân công xe buýt {bus.licensePlate}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Thông tin xe buýt</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">Biển số:</span>
                <p className="font-medium">{bus.licensePlate}</p>
              </div>
              <div>
                <span className="text-gray-500">Model:</span>
                <p className="font-medium">{bus.model}</p>
              </div>
              <div>
                <span className="text-gray-500">Sức chứa:</span>
                <p className="font-medium">{bus.capacity} chỗ</p>
              </div>
              <div>
                <span className="text-gray-500">Năm:</span>
                <p className="font-medium">{bus.year}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="driver" className="flex items-center gap-2">
              <UserCog className="w-4 h-4" />
              Chọn tài xế
            </Label>
            <Select 
              value={selectedDriver} 
              onValueChange={setSelectedDriver}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn tài xế phụ trách" />
              </SelectTrigger>
              <SelectContent>
                {driversData.map(driver => (
                  <SelectItem key={driver.id} value={driver.id.toString()}>
                    <div className="flex items-center justify-between w-full">
                      <span>{driver.name}</span>
                      <span className="text-xs text-gray-500 ml-2">{driver.phone}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="route" className="flex items-center gap-2">
              <RouteIcon className="w-4 h-4" />
              Chọn tuyến đường
            </Label>
            <Select 
              value={selectedRoute} 
              onValueChange={setSelectedRoute}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn tuyến đường" />
              </SelectTrigger>
              <SelectContent>
                {routesData.map(route => (
                  <SelectItem key={route.id} value={route.id.toString()}>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: route.color }}
                      />
                      <span>{route.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Hủy
            </Button>
            <Button type="submit" className="flex-1">
              Xác nhận phân công
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
