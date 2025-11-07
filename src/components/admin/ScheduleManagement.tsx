import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Plus, Calendar as CalendarIcon, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export function ScheduleManagement() {
  const [schedules, setSchedules] = useState([
    { id: 1, date: '2025-10-20', time: '07:00', route: 'Tuyến 1', bus: '29A-12345', driver: 'Nguyễn Văn A', status: 'scheduled' },
    { id: 2, date: '2025-10-20', time: '07:30', route: 'Tuyến 2', bus: '30B-67890', driver: 'Trần Văn B', status: 'scheduled' },
    { id: 3, date: '2025-10-20', time: '14:00', route: 'Tuyến 1', bus: '29A-12345', driver: 'Nguyễn Văn A', status: 'completed' },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);

  const handleAddSchedule = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newSchedule = {
      id: schedules.length + 1,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      route: formData.get('route') as string,
      bus: formData.get('bus') as string,
      driver: formData.get('driver') as string,
      status: 'scheduled'
    };
    setSchedules([...schedules, newSchedule]);
    setIsDialogOpen(false);
    toast.success('Đã tạo lịch trình mới');
  };

  const handleDeleteSchedule = (id) => {
    setSchedules(schedules.filter(s => s.id !== id));
    toast.success('Đã xóa lịch trình');
  };

  const handleEditSchedule = (schedule) => {
    setEditingSchedule(schedule);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleUpdateSchedule = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedSchedule = {
      ...editingSchedule,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      route: formData.get('route') as string,
      bus: formData.get('bus') as string,
      driver: formData.get('driver') as string,
    };
    setSchedules(schedules.map(s => s.id === editingSchedule.id ? updatedSchedule : s));
    setIsDialogOpen(false);
    setIsEditMode(false);
    setEditingSchedule(null);
    toast.success('Đã cập nhật lịch trình');
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setIsEditMode(false);
    setEditingSchedule(null);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Quản lý lịch trình</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Tạo lịch trình
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{isEditMode ? 'Chỉnh sửa lịch trình' : 'Tạo lịch trình mới'}</DialogTitle>
                <DialogDescription>
                  {isEditMode ? 'Cập nhật thông tin lịch trình' : 'Nhập thông tin lịch trình mới'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={isEditMode ? handleUpdateSchedule : handleAddSchedule} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Ngày</Label>
                    <Input 
                      id="date" 
                      name="date" 
                      type="date" 
                      defaultValue={editingSchedule?.date}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Giờ</Label>
                    <Input 
                      id="time" 
                      name="time" 
                      type="time" 
                      defaultValue={editingSchedule?.time}
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="route">Tuyến đường</Label>
                  <Select name="route" defaultValue={editingSchedule?.route} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn tuyến" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tuyến 1">Tuyến 1</SelectItem>
                      <SelectItem value="Tuyến 2">Tuyến 2</SelectItem>
                      <SelectItem value="Tuyến 3">Tuyến 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bus">Xe buýt</Label>
                  <Select name="bus" defaultValue={editingSchedule?.bus} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn xe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="29A-12345">29A-12345</SelectItem>
                      <SelectItem value="30B-67890">30B-67890</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driver">Tài xế</Label>
                  <Select name="driver" defaultValue={editingSchedule?.driver} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn tài xế" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nguyễn Văn A">Nguyễn Văn A</SelectItem>
                      <SelectItem value="Trần Văn B">Trần Văn B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">
                  {isEditMode ? 'Cập nhật lịch trình' : 'Tạo lịch trình'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Ngày</TableHead>
                <TableHead>Giờ</TableHead>
                <TableHead>Tuyến đường</TableHead>
                <TableHead>Xe buýt</TableHead>
                <TableHead>Tài xế</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell>{schedule.id}</TableCell>
                  <TableCell>{schedule.date}</TableCell>
                  <TableCell>{schedule.time}</TableCell>
                  <TableCell>{schedule.route}</TableCell>
                  <TableCell>{schedule.bus}</TableCell>
                  <TableCell>{schedule.driver}</TableCell>
                  <TableCell>
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      schedule.status === 'scheduled' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {schedule.status === 'scheduled' ? 'Đã lên lịch' : 'Hoàn thành'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditSchedule(schedule)}
                        title="Chỉnh sửa"
                      >
                        <Edit className="w-4 h-4 text-blue-600" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteSchedule(schedule.id)}
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
