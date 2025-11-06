import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Bus, Shield, Truck, Users, Sparkles } from 'lucide-react';

const DEMO_ACCOUNTS = [
  {
    id: 1,
    name: 'Nhà trường',
    email: 'admin@ssb.vn',
    password: 'admin123',
    role: 'admin',
    phone: '0901234567',
    icon: Shield,
    gradient: 'from-blue-500 to-blue-600',
    description: 'Username: admin | Password: admin123'
  },
  {
    id: 2,
    name: 'Tài xế',
    email: 'driver@ssb.vn',
    password: 'driver123',
    role: 'driver',
    phone: '0912345678',
    icon: Truck,
    gradient: 'from-purple-500 to-purple-600',
    description: 'Username: driver1 | Password: driver123'
  },
  {
    id: 3,
    name: 'Phụ huynh',
    email: 'parent@ssb.vn',
    password: 'parent123',
    role: 'parent',
    phone: '0923456789',
    icon: Users,
    gradient: 'from-green-500 to-green-600',
    description: 'Username: parent1 | Password: parent123'
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

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite'
      }}
    >
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div className="relative w-full max-w-5xl z-10">
        {/* Header Card */}
        <Card className="bg-white/95 backdrop-blur-xl shadow-2xl mb-6 border-0">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-orange-400 to-orange-500 p-4 rounded-3xl shadow-xl">
                <Bus className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl text-gray-900 mb-2">
              Smart School Bus
              <Sparkles className="inline-block w-6 h-6 ml-2 text-yellow-500" />
            </h1>
            <p className="text-sm text-gray-600">
              Hệ thống đưa đón học sinh thông minh
            </p>
          </CardContent>
        </Card>

        {/* Main Login Card */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left Side - Login Form (kept minimal) */}
          <Card className="bg-white/95 backdrop-blur-xl shadow-2xl border-0">
            <CardContent className="p-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-6 bg-blue-500 rounded-full" />
                <h2 className="text-xl text-gray-900">Đăng nhập hệ thống</h2>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">Tên đăng nhập</label>
                  <input
                    type="text"
                    placeholder="Nhập tên đăng nhập"
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">Mật khẩu</label>
                  <input
                    type="password"
                    placeholder="Nhập mật khẩu"
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl py-6 shadow-lg"
              >
                Đăng nhập
              </Button>

              <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
                <div className="flex-1 h-px bg-gray-200" />
                <span>hoặc</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 transition-colors">
                Quên mật khẩu?
              </button>
              <button className="w-full mt-2 text-sm text-gray-600 hover:text-gray-700 transition-colors">
                Tạo tài khoản mới
              </button>
            </CardContent>
          </Card>

          {/* Right Side - Demo Accounts */}
          <Card className="bg-white/95 backdrop-blur-xl shadow-2xl border-0">
            <CardContent className="p-8">
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-purple-600" />
                <h2 className="text-xl text-gray-900">Tài khoản Demo</h2>
              </div>

              <div className="space-y-3">
                {DEMO_ACCOUNTS.map((account) => {
                  const Icon = account.icon;
                  return (
                    <button
                      key={account.id}
                      onClick={() => handleQuickLogin(account)}
                      className={`w-full p-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] text-left border-2 ${
                        selectedAccount?.id === account.id
                          ? 'border-blue-500 shadow-lg'
                          : 'border-transparent hover:border-gray-200'
                      } bg-gradient-to-r ${account.gradient} group`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-white text-sm mb-1">{account.name}</div>
                          <div className="text-white/80 text-xs">{account.description}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>


      </div>
    </div>
  );
}
