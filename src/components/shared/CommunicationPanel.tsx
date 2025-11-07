import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { 
  MessageSquare, 
  Phone, 
  Send, 
  User, 
  Clock,
  CheckCheck,
  PhoneCall,
  Mail
} from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: number;
  from: string;
  to: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'sent' | 'received';
}

interface Contact {
  id: number;
  name: string;
  role: string;
  phone: string;
  email?: string;
  avatar?: string;
  online?: boolean;
}

interface CommunicationPanelProps {
  userRole: 'admin' | 'driver' | 'parent';
  userId: number;
}

export function CommunicationPanel({ userRole, userId }: CommunicationPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: 'Nguyễn Văn Tài',
      to: 'Quản lý',
      message: 'Xe đang đến điểm dừng số 3',
      timestamp: '10:30',
      read: true,
      type: 'received'
    },
    {
      id: 2,
      from: 'Quản lý',
      to: 'Nguyễn Văn Tài',
      message: 'Đã nhận. Cảm ơn!',
      timestamp: '10:31',
      read: true,
      type: 'sent'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Danh sách liên hệ dựa trên vai trò
  const getContacts = (): Contact[] => {
    switch (userRole) {
      case 'admin':
        return [
          { id: 1, name: 'Nguyễn Văn Tài', role: 'Tài xế', phone: '0901234567', online: true },
          { id: 2, name: 'Trần Văn Bình', role: 'Tài xế', phone: '0912345678', online: true },
          { id: 3, name: 'Nguyễn Văn Anh', role: 'Phụ huynh', phone: '0923456789', online: false },
          { id: 4, name: 'Trần Văn Bảo', role: 'Phụ huynh', phone: '0934567890', online: true },
        ];
      case 'driver':
        return [
          { id: 1, name: 'Quản lý xe buýt', role: 'Quản lý', phone: '1900xxxx', email: 'admin@schoolbus.vn', online: true },
          { id: 2, name: 'Nguyễn Văn Anh', role: 'Phụ huynh', phone: '0923456789', online: true },
          { id: 3, name: 'Trần Văn Bảo', role: 'Phụ huynh', phone: '0934567890', online: false },
        ];
      case 'parent':
        return [
          { id: 1, name: 'Nguyễn Văn Tài', role: 'Tài xế xe 29A-12345', phone: '0901234567', online: true },
          { id: 2, name: 'Quản lý xe buýt', role: 'Quản lý', phone: '1900xxxx', email: 'admin@schoolbus.vn', online: true },
        ];
      default:
        return [];
    }
  };

  const contacts = getContacts();

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return;

    const message: Message = {
      id: messages.length + 1,
      from: 'Bạn',
      to: selectedContact.name,
      message: newMessage,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      read: false,
      type: 'sent'
    };

    setMessages([...messages, message]);
    setNewMessage('');
    toast.success(`Đã gửi tin nhắn đến ${selectedContact.name}`);
  };

  const handleCall = (contact: Contact) => {
    toast.info(
      <div className="flex items-center gap-3">
        <PhoneCall className="w-5 h-5 text-green-600 animate-pulse" />
        <div>
          <p className="font-medium">Đang gọi {contact.name}</p>
          <p className="text-sm text-gray-600">{contact.phone}</p>
        </div>
      </div>,
      {
        duration: 5000,
      }
    );

    // Mô phỏng cuộc gọi
    setTimeout(() => {
      const shouldAnswer = Math.random() > 0.3;
      if (shouldAnswer) {
        toast.success(`${contact.name} đã trả lời cuộc gọi`);
      } else {
        toast.warning(`${contact.name} không trả lời. Vui lòng thử lại sau.`);
      }
    }, 3000);
  };

  const handleQuickMessage = (contact: Contact, template: string) => {
    const message: Message = {
      id: messages.length + 1,
      from: 'Bạn',
      to: contact.name,
      message: template,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      read: false,
      type: 'sent'
    };

    setMessages([...messages, message]);
    toast.success(`Đã gửi tin nhắn nhanh đến ${contact.name}`);
  };

  const quickMessageTemplates = {
    admin: [
      'Xe đang hoạt động bình thường',
      'Cần hỗ trợ khẩn cấp',
      'Xe đã hoàn thành tuyến'
    ],
    driver: [
      'Xe đang đến điểm đón',
      'Xe bị chậm 5 phút do tắc đường',
      'Đã đón xong học sinh',
      'Xe gặp sự cố, cần hỗ trợ'
    ],
    parent: [
      'Con em đã lên xe chưa?',
      'Xe đến khi nào?',
      'Cảm ơn tài xế'
    ]
  };

  const templates = quickMessageTemplates[userRole] || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          Liên lạc & Gọi điện
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="contacts" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="contacts">
              <Phone className="w-4 h-4 mr-2" />
              Danh bạ
            </TabsTrigger>
            <TabsTrigger value="messages">
              <MessageSquare className="w-4 h-4 mr-2" />
              Tin nhắn
              {messages.filter(m => !m.read && m.type === 'received').length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {messages.filter(m => !m.read && m.type === 'received').length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Danh bạ */}
          <TabsContent value="contacts" className="space-y-3 mt-4">
            <ScrollArea className="h-[400px] pr-4">
              {contacts.map((contact) => (
                <Card key={contact.id} className="mb-3 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                            <User className="w-6 h-6" />
                          </div>
                          {contact.online && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{contact.name}</p>
                          <p className="text-xs text-gray-500">{contact.role}</p>
                          <p className="text-xs text-blue-600 flex items-center gap-1 mt-1">
                            <Phone className="w-3 h-3" />
                            {contact.phone}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full"
                          onClick={() => handleCall(contact)}
                        >
                          <PhoneCall className="w-4 h-4 mr-1 text-green-600" />
                          Gọi
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full"
                              onClick={() => setSelectedContact(contact)}
                            >
                              <MessageSquare className="w-4 h-4 mr-1 text-blue-600" />
                              Nhắn
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Nhắn tin cho {contact.name}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              {/* Tin nhắn mẫu nhanh */}
                              <div>
                                <Label className="text-xs text-gray-500 mb-2 block">
                                  Tin nhắn mẫu nhanh:
                                </Label>
                                <div className="flex flex-wrap gap-2">
                                  {templates.map((template, index) => (
                                    <Button
                                      key={index}
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleQuickMessage(contact, template)}
                                      className="text-xs"
                                    >
                                      {template}
                                    </Button>
                                  ))}
                                </div>
                              </div>

                              {/* Form nhắn tin tùy chỉnh */}
                              <div>
                                <Label className="text-xs text-gray-500 mb-2 block">
                                  Hoặc soạn tin nhắn:
                                </Label>
                                <Textarea
                                  placeholder="Nhập tin nhắn..."
                                  value={newMessage}
                                  onChange={(e) => setNewMessage(e.target.value)}
                                  rows={4}
                                />
                              </div>
                              <Button
                                onClick={handleSendMessage}
                                className="w-full"
                              >
                                <Send className="w-4 h-4 mr-2" />
                                Gửi tin nhắn
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </ScrollArea>
          </TabsContent>

          {/* Tin nhắn */}
          <TabsContent value="messages" className="mt-4">
            <ScrollArea className="h-[400px] pr-4">
              {messages.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>Chưa có tin nhắn nào</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          msg.type === 'sent'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium">
                            {msg.type === 'sent' ? 'Bạn' : msg.from}
                          </span>
                          <span className="text-xs opacity-70">{msg.timestamp}</span>
                        </div>
                        <p className="text-sm">{msg.message}</p>
                        {msg.type === 'sent' && (
                          <div className="flex justify-end mt-1">
                            <CheckCheck className="w-4 h-4 opacity-70" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}
