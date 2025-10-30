import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Plus, Search, Edit, Trash2, MapPin } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function RouteManagement() {
  const [routes, setRoutes] = useState([
    { id: 1, name: 'Tuyến 1 - Quận 1', startPoint: 'Trường THCS Nguyễn Du', endPoint: 'Khu dân cư A', stops: 5, distance: '12 km', estimatedTime: '30 phút' },
    { id: 2, name: 'Tuyến 2 - Quận 3', startPoint: 'Trường THCS Nguyễn Du', endPoint: 'Khu dân cư B', stops: 7, distance: '15 km', estimatedTime: '35 phút' },
    { id: 3, name: 'Tuyến 3 - Quận 5, 10', startPoint: 'Trường THCS Nguyễn Du', endPoint: 'Khu dân cư C', stops: 4, distance: '8 km', estimatedTime: '25 phút' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRoute, setEditingRoute] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const filteredRoutes = routes.filter(route =>
    route.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRoute = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newRoute = {
      id: routes.length + 1,
      name: formData.get('name'),
      startPoint: formData.get('startPoint'),
      endPoint: formData.get('endPoint'),
      stops: formData.get('stops'),
      distance: formData.get('distance')
    };
    setRoutes([...routes, newRoute]);
    setIsDialogOpen(false);
    toast.success('Đã thêm tuyến đường mới');
  };

  const handleDeleteRoute = (id) => {
    const route = routes.find(r => r.id === id);
    if (confirm(`Bạn có chắc muốn xóa ${route?.name}?`)) {
      setRoutes(routes.filter(r => r.id !== id));
      toast.success('Đã xóa tuyến đường thành công');
    }
  };

  const handleEditRoute = (route) => {
    setEditingRoute(route);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleUpdateRoute = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedRoute = {
      ...editingRoute,
      name: formData.get('name'),
      startPoint: formData.get('startPoint'),
      endPoint: formData.get('endPoint'),
      stops: formData.get('stops'),
      distance: formData.get('distance'),
      estimatedTime: formData.get('estimatedTime')
    };
    
    setRoutes(routes.map(r => r.id === editingRoute.id ? updatedRoute : r));
    setIsDialogOpen(false);
    setIsEditMode(false);
    setEditingRoute(null);
    toast.success('Đã cập nhật thông tin tuyến đường');
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setIsEditMode(false);
    setEditingRoute(null);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Quản lý tuyến đường</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Thêm tuyến đường
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{isEditMode ? 'Chỉnh sửa tuyến đường' : 'Thêm tuyến đường mới'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={isEditMode ? handleUpdateRoute : handleAddRoute} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên tuyến</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="VD: Tuyến 1 - Quận 1" 
                    defaultValue={editingRoute?.name}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startPoint">Điểm bắt đầu</Label>
                  <Input 
                    id="startPoint" 
                    name="startPoint" 
                    placeholder="Nhập điểm bắt đầu" 
                    defaultValue={editingRoute?.startPoint}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endPoint">Điểm kết thúc</Label>
                  <Input 
                    id="endPoint" 
                    name="endPoint" 
                    placeholder="Nhập điểm kết thúc" 
                    defaultValue={editingRoute?.endPoint}
                    required 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stops">Số điểm dừng</Label>
                    <Input 
                      id="stops" 
                      name="stops" 
                      type="number" 
                      placeholder="5" 
                      defaultValue={editingRoute?.stops}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="distance">Khoảng cách</Label>
                    <Input 
                      id="distance" 
                      name="distance" 
                      placeholder="12 km" 
                      defaultValue={editingRoute?.distance}
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimatedTime">Thời gian dự kiến</Label>
                  <Input 
                    id="estimatedTime" 
                    name="estimatedTime" 
                    placeholder="30 phút" 
                    defaultValue={editingRoute?.estimatedTime}
                    required 
                  />
                </div>
                <Button type="submit" className="w-full">
                  {isEditMode ? 'Cập nhật' : 'Thêm tuyến đường'}
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
              placeholder="Tìm kiếm tuyến đường..."
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
                <TableHead>ID</TableHead>
                <TableHead>Tên tuyến</TableHead>
                <TableHead>Điểm đầu</TableHead>
                <TableHead>Điểm cuối</TableHead>
                <TableHead>Điểm dừng</TableHead>
                <TableHead>Khoảng cách</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoutes.map((route) => (
                <TableRow key={route.id}>
                  <TableCell>{route.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      {route.name}
                    </div>
                  </TableCell>
                  <TableCell>{route.startPoint}</TableCell>
                  <TableCell>{route.endPoint}</TableCell>
                  <TableCell>{route.stops}</TableCell>
                  <TableCell>{route.distance}</TableCell>
                  <TableCell>{route.estimatedTime}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditRoute(route)}
                        title="Chỉnh sửa"
                      >
                        <Edit className="w-4 h-4 text-blue-600" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteRoute(route.id)}
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
