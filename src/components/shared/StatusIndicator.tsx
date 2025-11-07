import { CheckCircle, Clock, AlertCircle, XCircle } from "lucide-react";

interface StatusIndicatorProps {
  status: "active" | "pending" | "warning" | "inactive" | "success" | "error";
  label?: string;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  animated?: boolean;
}

export function StatusIndicator({
  status,
  label,
  size = "md",
  showIcon = true,
  animated = true,
}: StatusIndicatorProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "active":
        return {
          color: "bg-green-500",
          textColor: "text-green-700",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          icon: CheckCircle,
          text: label || "Hoạt động",
        };
      case "pending":
        return {
          color: "bg-yellow-500",
          textColor: "text-yellow-700",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          icon: Clock,
          text: label || "Chờ xử lý",
        };
      case "warning":
        return {
          color: "bg-orange-500",
          textColor: "text-orange-700",
          bgColor: "bg-orange-50",
          borderColor: "border-orange-200",
          icon: AlertCircle,
          text: label || "Cảnh báo",
        };
      case "inactive":
      case "error":
        return {
          color: "bg-red-500",
          textColor: "text-red-700",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          icon: XCircle,
          text: label || "Không hoạt động",
        };
      case "success":
        return {
          color: "bg-blue-500",
          textColor: "text-blue-700",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          icon: CheckCircle,
          text: label || "Thành công",
        };
      default:
        return {
          color: "bg-gray-500",
          textColor: "text-gray-700",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          icon: Clock,
          text: label || "Không xác định",
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  const sizeClasses = {
    sm: {
      dot: "w-2 h-2",
      text: "text-xs",
      icon: "w-3 h-3",
      padding: "px-2 py-1",
      gap: "gap-1",
    },
    md: {
      dot: "w-3 h-3",
      text: "text-sm",
      icon: "w-4 h-4",
      padding: "px-3 py-1.5",
      gap: "gap-2",
    },
    lg: {
      dot: "w-4 h-4",
      text: "text-base",
      icon: "w-5 h-5",
      padding: "px-4 py-2",
      gap: "gap-2",
    },
  };

  const classes = sizeClasses[size];

  if (!label && !showIcon) {
    return (
      <div className="inline-flex items-center">
        <div
          className={`${config.color} ${classes.dot} rounded-full ${
            animated && status === "active" ? "animate-pulse" : ""
          }`}
        />
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center ${classes.gap} ${classes.padding} ${config.bgColor} ${config.textColor} border ${config.borderColor} rounded-full`}
    >
      {showIcon ? (
        <Icon className={classes.icon} />
      ) : (
        <div
          className={`${config.color} ${classes.dot} rounded-full ${
            animated && (status === "active" || status === "pending")
              ? "animate-pulse"
              : ""
          }`}
        />
      )}
      {label !== undefined && (
        <span className={classes.text}>{config.text}</span>
      )}
    </div>
  );
}
