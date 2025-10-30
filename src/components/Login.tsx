import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Bus, User, Truck, Users } from 'lucide-react';
import loginBg from 'figma:asset/39d327f139daacfbabfad678d4218635b01a1c3b.png';

// Hardcoded demo accounts
const DEMO_ACCOUNTS = [
  {
    id: 1,
    name: 'Nguyễn Văn Admin',
    email: 'admin@ssb.vn',
    password: 'admin123',
    role: 'admin',
    phone: '0901234567',
    icon: User,
    bgColor: 'bg-blue-500',
    description: 'Quản lý toàn bộ hệ thống'
  },
  {
    id: 2,
    name: 'Trần Văn Tài',
    email: 'driver@ssb.vn',
    password: 'driver123',
    role: 'driver',
    phone: '0912345678',
    icon: Truck,
    bgColor: 'bg-green-500',
    description: 'Tài xế xe buýt số 1'
  },
  {
    id: 3,
    name: 'Lê Thị Hương',
    email: 'parent@ssb.vn',
    password: 'parent123',
    role: 'parent',
    phone: '0923456789',
    icon: Users,
    bgColor: 'bg-purple-500',
    description: 'Phụ huynh học sinh Nguyễn Văn An'
  }
];

export function Login({ onLogin }) {
  const [selectedAccount, setSelectedAccount] = useState(null);

  const handleQuickLogin = (account) => {
    onLogin({
      id: account.id,
      name: account.name,
      email: account.email,
      role: account.role,
      phone: account.phone
    });
  };

  const handleAccountSelect = (account) => {
    setSelectedAccount(account);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative w-full max-w-6xl z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-white/95 backdrop-blur p-4 rounded-full shadow-2xl">
              <Bus className="w-16 h-16 text-blue-600" />
            </div>
          </div>
          <h1 className="text-white text-4xl drop-shadow-lg mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            Smart School Bus Tracking
          </h1>
          <p className="text-white drop-shadow-lg text-lg" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
            Hệ thống theo dõi xe buýt trường học thông minh - SSB 1.0
          </p>
        </div>

        {/* Demo Accounts */}
        <div className="mb-6">
          <Card className="bg-white/95 backdrop-blur shadow-2xl">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Tài khoản demo</CardTitle>
              <CardDescription className="text-center">
                Chọn một tài khoản để trải nghiệm hệ thống
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                {DEMO_ACCOUNTS.map((account) => {
                  const Icon = account.icon;
                  return (
                    <Card
                      key={account.id}
                      className={`cursor-pointer transition-all hover:shadow-2xl border-2 ${
                        selectedAccount?.id === account.id
                          ? 'border-blue-500 shadow-2xl scale-105'
                          : 'border-transparent hover:border-blue-300'
                      }`}
                      onClick={() => handleAccountSelect(account)}
                    >
                      <CardContent className="p-6">
                        <div className="text-center">
                          <div className={`${account.bgColor} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                            <Icon className="w-10 h-10 text-white" />
                          </div>
                          <h3 className="text-lg text-gray-900 mb-1">{account.name}</h3>
                          <p className="text-xs text-gray-500 mb-4">{account.description}</p>
                          
                          <div className="space-y-1 text-xs text-left bg-gray-50 p-4 rounded-lg mb-4">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Email:</span>
                              <span className="text-gray-900">{account.email}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Password:</span>
                              <span className="text-gray-900">{account.password}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Vai trò:</span>
                              <span className={`px-2 py-0.5 rounded-full text-xs ${
                                account.role === 'admin' ? 'bg-blue-100 text-blue-700' :
                                account.role === 'driver' ? 'bg-green-100 text-green-700' :
                                'bg-purple-100 text-purple-700'
                              }`}>
                                {account.role === 'admin' ? 'Quản lý' :
                                 account.role === 'driver' ? 'Tài xế' : 'Phụ huynh'}
                              </span>
                            </div>
                          </div>

                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuickLogin(account);
                            }}
                            className="w-full"
                            variant={selectedAccount?.id === account.id ? 'default' : 'outline'}
                          >
                            Đăng nhập nhanh
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Note */}
        <div className="text-center">
          <Card className="bg-white/95 backdrop-blur shadow-xl">
            <CardContent className="p-4">
              <p className="text-sm text-gray-600">
                💡 <strong>Hướng dẫn:</strong> Click vào tài khoản bạn muốn sử dụng và nhấn "Đăng nhập nhanh" để trải nghiệm hệ thống.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Đây là phiên bản demo cho đồ án cuối kỳ. Tất cả dữ liệu đều là mô phỏng.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
