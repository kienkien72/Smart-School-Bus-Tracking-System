import { Bus, MapPin } from 'lucide-react';

export function MapLoadingAnimation() {
  return (
    <div className="w-full h-full min-h-[500px] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-xl flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-pink-200/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Animated road path */}
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path 
          d="M 10,50 Q 30,20 50,50 T 90,50" 
          fill="none" 
          stroke="#3B82F6" 
          strokeWidth="0.5"
          strokeDasharray="2,2"
          className="animate-pulse"
        />
      </svg>

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Animated bus icon */}
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
          <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-3xl shadow-2xl">
            <Bus className="w-12 h-12 text-white animate-bounce" style={{ animationDuration: '2s' }} />
          </div>
          
          {/* Floating map pins */}
          <div className="absolute -top-2 -right-2 bg-red-500 p-2 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2s' }}>
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <div className="absolute -bottom-2 -left-2 bg-green-500 p-2 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '1s', animationDuration: '2s' }}>
            <MapPin className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Loading text */}
        <div className="space-y-2">
          <h3 className="text-xl text-gray-800">Đang tải bản đồ</h3>
          <p className="text-sm text-gray-600">Vui lòng đợi trong giây lát...</p>
          
          {/* Progress dots */}
          <div className="flex justify-center gap-2 pt-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>

      {/* Animated route line */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span>Đang kết nối đến máy chủ bản đồ</span>
          </div>
        </div>
      </div>
    </div>
  );
}
