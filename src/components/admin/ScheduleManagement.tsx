import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Plus, Calendar as CalendarIcon, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function ScheduleManagement() {
  const [schedules, setSchedules] = useState([
    { id: 1, date: '2025-10-20', time: '07:00', route: 'Tuyến 1', bus: '29A-12345', driver: 'Nguyễn Văn A', status: 'scheduled' },
    { id: 2, date: '2025-10-20', time: '07:30', route: 'Tuyến 2', bus: '30B-67890', driver: 'Trần Văn B', status: 'scheduled' },
    { id: 3, date: '2025-10-20', time: '14:00', route: 'Tuyến 1', bus: '29A-12345', driver: 'Nguyễn Văn A', status: 'completed' },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddSchedule = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newSchedule = {
      id: schedules.length + 1,
      date: formData.get('date'),
      time: formData.get('time'),
      route: formData.get('route'),
      bus: formData.get('bus'),
      driver: formData.get('driver'),
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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Quản lý lịch trình</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Tạo lịch trình
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tạo lịch trình mới</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddSchedule} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Ngày</Label>
                    <Input id="date" name="date" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Giờ</Label>
                    <Input id="time" name="time" type="time" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="route">Tuyến đường</Label>
                  <Select name="route" required>
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
                  <Select name="bus" required>
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
                  <Select name="driver" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn tài xế" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nguyễn Văn A">Nguyễn Văn A</SelectItem>
                      <SelectItem value="Trần Văn B">Trần Văn B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">Tạo lịch trình</Button>
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
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteSchedule(schedule.id)}
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
