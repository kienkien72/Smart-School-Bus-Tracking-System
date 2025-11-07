import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./card";
import { cn } from "./utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  gradient: string;
  trend?: string;
  trendUp?: boolean;
}

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  gradient,
  trend,
  trendUp = true 
}: StatCardProps) {
  return (
    <Card className="hover:shadow-xl transition-all hover:scale-105 border-0 shadow-md overflow-hidden group">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm text-gray-600">{title}</CardTitle>
        <div className={`${gradient} p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl text-gray-900">{value}</div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs mt-1 ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
            <span>{trendUp ? '↑' : '↓'}</span>
            <span>{trend}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface GlassCardProps extends React.ComponentProps<typeof Card> {
  children: React.ReactNode;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <Card 
      className={cn(
        "bg-white/90 backdrop-blur-xl border-white/20 shadow-xl",
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
}

interface GradientCardProps extends React.ComponentProps<typeof Card> {
  children: React.ReactNode;
  gradient: string;
}

export function GradientCard({ children, className, gradient, ...props }: GradientCardProps) {
  return (
    <Card 
      className={cn(
        gradient,
        "text-white border-0 shadow-xl",
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
}

interface InfoCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

export function InfoCard({ title, description, children, variant = 'default' }: InfoCardProps) {
  const variantStyles = {
    default: 'bg-gray-50 border-gray-200',
    primary: 'bg-blue-50 border-blue-200',
    success: 'bg-green-50 border-green-200',
    warning: 'bg-yellow-50 border-yellow-200',
    danger: 'bg-red-50 border-red-200'
  };

  return (
    <Card className={cn("border-2", variantStyles[variant])}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        )}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: string;
  onClick?: () => void;
}

export function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  color = 'blue',
  onClick 
}: FeatureCardProps) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
    purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
    orange: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
    pink: 'from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700'
  };

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all hover:scale-105 hover:shadow-2xl border-0",
        onClick && "active:scale-95"
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className={`bg-gradient-to-br ${colorClasses[color]} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-lg text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}
