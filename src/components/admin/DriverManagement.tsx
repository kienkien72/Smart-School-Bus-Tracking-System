import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Plus, Search, Edit, Trash2, User, Phone } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function DriverManagement() {
  const [drivers, setDrivers] = useState([
    { id: 1, name: 'Nguyễn Văn A', phone: '0901234567', busAssigned: '29A-12345', status: 'active' },
    { id: 2, name: 'Trần Văn B', phone: '0912345678', busAssigned: '30B-67890', status: 'active' },
    { id: 3, name: 'Lê Văn C', phone: '0923456789', busAssigned: 'Chưa phân công', status: 'inactive' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);

  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDriver = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newDriver = {
      id: drivers.length + 1,
      name: formData.get('name'),
      phone: formData.get('phone'),
      licenseNumber: formData.get('licenseNumber'),
      experience: formData.get('experience'),
      busAssigned: 'Chưa phân công',
      routeAssigned: null,
      status: 'active',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.get('name'))}&background=random&color=fff`
    };
    setDrivers([...drivers, newDriver]);
    setIsDialogOpen(false);
    toast.success('Đã thêm tài xế mới');
  };

  const handleDeleteDriver = (id) => {
    const driver = drivers.find(d => d.id === id);
    if (confirm(`Bạn có chắc muốn xóa tài xế ${driver?.name}?`)) {
      setDrivers(drivers.filter(d => d.id !== id));
      toast.success('Đã xóa tài xế thành công');
    }
  };

  const handleEditDriver = (driver) => {
    setEditingDriver(driver);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleUpdateDriver = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedDriver = {
      ...editingDriver,
      name: formData.get('name'),
      phone: formData.get('phone'),
      licenseNumber: formData.get('licenseNumber'),
      experience: formData.get('experience')
    };
    
    setDrivers(drivers.map(d => d.id === editingDriver.id ? updatedDriver : d));
    setIsDialogOpen(false);
    setIsEditMode(false);
    setEditingDriver(null);
    toast.success('Đã cập nhật thông tin tài xế');
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setIsEditMode(false);
    setEditingDriver(null);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Quản lý tài xế</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Thêm tài xế
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{isEditMode ? 'Chỉnh sửa thông tin tài xế' : 'Thêm tài xế mới'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={isEditMode ? handleUpdateDriver : handleAddDriver} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Họ và tên</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="Nhập họ tên" 
                    defaultValue={editingDriver?.name}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    placeholder="VD: 0901234567" 
                    defaultValue={editingDriver?.phone}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">Số giấy phép lái xe</Label>
                  <Input 
                    id="licenseNumber" 
                    name="licenseNumber" 
                    placeholder="VD: B2-123456" 
                    defaultValue={editingDriver?.licenseNumber}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Kinh nghiệm</Label>
                  <Input 
                    id="experience" 
                    name="experience" 
                    placeholder="VD: 10 năm" 
                    defaultValue={editingDriver?.experience}
                    required 
                  />
                </div>
                <Button type="submit" className="w-full">
                  {isEditMode ? 'Cập nhật' : 'Thêm tài xế'}
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
              placeholder="Tìm kiếm tài xế..."
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
                <TableHead>Họ và tên</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Xe được phân công</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDrivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell>{driver.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-500" />
                      {driver.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-gray-400" />
                      {driver.phone}
                    </div>
                  </TableCell>
                  <TableCell>{driver.busAssigned}</TableCell>
                  <TableCell>
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      driver.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {driver.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditDriver(driver)}
                        title="Chỉnh sửa"
                      >
                        <Edit className="w-4 h-4 text-blue-600" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteDriver(driver.id)}
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
