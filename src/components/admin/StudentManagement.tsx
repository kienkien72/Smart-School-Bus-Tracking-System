import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Plus, Search, Edit, Trash2, MapPin, Phone, User } from 'lucide-react';
import { toast } from 'sonner';

const studentsData = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    class: "Lớp 5A",
    parentName: "Nguyễn Văn Anh",
    parentPhone: "0901234567",
    pickupPoint: {
      address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
      lat: 10.7756,
      lng: 106.7019
    },
    routeId: 1,
    status: "active",
    pickupTime: "07:05",
    dropoffTime: "14:10"
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    class: "Lớp 4B",
    parentName: "Trần Văn Bảo",
    parentPhone: "0912345678",
    pickupPoint: {
      address: "456 Đường Nguyễn Huệ, Quận 1, TP.HCM",
      lat: 10.7735,
      lng: 106.7012
    },
    routeId: 1,
    status: "active",
    pickupTime: "07:10",
    dropoffTime: "14:15"
  },
  {
    id: 3,
    name: "Lê Minh Cường",
    class: "Lớp 6C",
    parentName: "Lê Văn Công",
    parentPhone: "0923456789",
    pickupPoint: {
      address: "789 Đường Hai Bà Trưng, Quận 3, TP.HCM",
      lat: 10.7868,
      lng: 106.6900
    },
    routeId: 2,
    status: "active",
    pickupTime: "07:00",
    dropoffTime: "14:05"
  },
  {
    id: 4,
    name: "Phạm Thu Hà",
    class: "Lớp 5A",
    parentName: "Phạm Văn Hải",
    parentPhone: "0934567890",
    pickupPoint: {
      address: "321 Đường Võ Văn Tần, Quận 3, TP.HCM",
      lat: 10.7823,
      lng: 106.6934
    },
    routeId: 2,
    status: "active",
    pickupTime: "07:08",
    dropoffTime: "14:12"
  },
  {
    id: 5,
    name: "Hoàng Minh Đức",
    class: "Lớp 3A",
    parentName: "Hoàng Văn Dũng",
    parentPhone: "0945678901",
    pickupPoint: {
      address: "654 Đường Trần Hưng Đạo, Quận 5, TP.HCM",
      lat: 10.7542,
      lng: 106.6779
    },
    routeId: 3,
    status: "active",
    pickupTime: "07:15",
    dropoffTime: "14:20"
  },
  {
    id: 6,
    name: "Võ Thị Mai",
    class: "Lớp 4A",
    parentName: "Võ Văn Minh",
    parentPhone: "0956789012",
    pickupPoint: {
      address: "147 Đường Cách Mạng Tháng 8, Quận 10, TP.HCM",
      lat: 10.7722,
      lng: 106.6656
    },
    routeId: 3,
    status: "active",
    pickupTime: "07:20",
    dropoffTime: "14:25"
  },
  {
    id: 7,
    name: "Đỗ Văn Khoa",
    class: "Lớp 5B",
    parentName: "Đỗ Thị Kim",
    parentPhone: "0967890123",
    pickupPoint: {
      address: "258 Đường Lý Thường Kiệt, Quận 11, TP.HCM",
      lat: 10.7656,
      lng: 106.6512
    },
    routeId: 1,
    status: "active",
    pickupTime: "07:15",
    dropoffTime: "14:18"
  },
  {
    id: 8,
    name: "Bùi Thị Lan",
    class: "Lớp 6A",
    parentName: "Bùi Văn Long",
    parentPhone: "0978901234",
    pickupPoint: {
      address: "369 Đường Điện Biên Phủ, Quận 3, TP.HCM",
      lat: 10.7890,
      lng: 106.6945
    },
    routeId: 2,
    status: "active",
    pickupTime: "07:12",
    dropoffTime: "14:16"
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

export function StudentManagement() {
  const [students, setStudents] = useState(studentsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newStudent = {
      id: students.length + 1,
      name: formData.get('name') as string,
      class: formData.get('class') as string,
      parentName: formData.get('parentName') as string,
      parentPhone: formData.get('parentPhone') as string,
      pickupPoint: {
        address: formData.get('pickupAddress') as string,
        lat: 10.7769,
        lng: 106.7009
      },
      routeId: parseInt(formData.get('routeId') as string),
      status: 'active',
      pickupTime: formData.get('pickupTime') as string,
      dropoffTime: formData.get('dropoffTime') as string
    };
    setStudents([...students, newStudent]);
    setIsDialogOpen(false);
    toast.success('Đã thêm học sinh mới');
  };

  const handleDeleteStudent = (id) => {
    const student = students.find(s => s.id === id);
    if (confirm(`Bạn có chắc muốn xóa học sinh ${student?.name}?`)) {
      setStudents(students.filter(s => s.id !== id));
      toast.success('Đã xóa học sinh thành công');
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleUpdateStudent = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedStudent = {
      ...editingStudent,
      name: formData.get('name') as string,
      class: formData.get('class') as string,
      parentName: formData.get('parentName') as string,
      parentPhone: formData.get('parentPhone') as string,
      pickupPoint: {
        address: formData.get('pickupAddress') as string,
        lat: editingStudent.pickupPoint.lat,
        lng: editingStudent.pickupPoint.lng
      },
      routeId: parseInt(formData.get('routeId') as string),
      pickupTime: formData.get('pickupTime') as string,
      dropoffTime: formData.get('dropoffTime') as string
    };
    
    setStudents(students.map(s => s.id === editingStudent.id ? updatedStudent : s));
    setIsDialogOpen(false);
    setIsEditMode(false);
    setEditingStudent(null);
    toast.success('Đã cập nhật thông tin học sinh');
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setIsEditMode(false);
    setEditingStudent(null);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Quản lý học sinh</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Thêm học sinh
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{isEditMode ? 'Chỉnh sửa thông tin học sinh' : 'Thêm học sinh mới'}</DialogTitle>
                <DialogDescription>
                  {isEditMode ? 'Cập nhật thông tin học sinh' : 'Nhập thông tin học sinh mới'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={isEditMode ? handleUpdateStudent : handleAddStudent} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Họ và tên học sinh</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      placeholder="Nguyễn Văn A" 
                      defaultValue={editingStudent?.name}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="class">Lớp</Label>
                    <Input 
                      id="class" 
                      name="class" 
                      placeholder="Lớp 5A" 
                      defaultValue={editingStudent?.class}
                      required 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parentName">Tên phụ huynh</Label>
                    <Input 
                      id="parentName" 
                      name="parentName" 
                      placeholder="Nguyễn Văn B" 
                      defaultValue={editingStudent?.parentName}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parentPhone">SĐT phụ huynh</Label>
                    <Input 
                      id="parentPhone" 
                      name="parentPhone" 
                      placeholder="0901234567" 
                      defaultValue={editingStudent?.parentPhone}
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pickupAddress">Địa chỉ điểm đón</Label>
                  <Input 
                    id="pickupAddress" 
                    name="pickupAddress" 
                    placeholder="123 Đường ABC, Quận 1" 
                    defaultValue={editingStudent?.pickupPoint?.address}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="routeId">Tuyến đường</Label>
                  <Select name="routeId" defaultValue={editingStudent?.routeId?.toString()} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn tuyến" />
                    </SelectTrigger>
                    <SelectContent>
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
                    <Label htmlFor="pickupTime">Giờ đón</Label>
                    <Input 
                      id="pickupTime" 
                      name="pickupTime" 
                      type="time" 
                      defaultValue={editingStudent?.pickupTime || "07:00"} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dropoffTime">Giờ trả</Label>
                    <Input 
                      id="dropoffTime" 
                      name="dropoffTime" 
                      type="time" 
                      defaultValue={editingStudent?.dropoffTime || "14:00"} 
                      required 
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  {isEditMode ? 'Cập nhật' : 'Thêm học sinh'}
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
              placeholder="Tìm kiếm học sinh..."
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
                <TableHead>Lớp</TableHead>
                <TableHead>Phụ huynh</TableHead>
                <TableHead>Điểm đón</TableHead>
                <TableHead>Tuyến</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => {
                const route = routesData.find(r => r.id === student.routeId);
                return (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-blue-500" />
                        {student.name}
                      </div>
                    </TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{student.parentName}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {student.parentPhone}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-start gap-1 max-w-xs">
                        <MapPin className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs">{student.pickupPoint.address}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: route?.color + '20', color: route?.color }}>
                        {route?.name || 'N/A'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                        Hoạt động
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditStudent(student)}
                          title="Chỉnh sửa"
                        >
                          <Edit className="w-4 h-4 text-blue-600" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteStudent(student.id)}
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
    </Card>
  );
}
