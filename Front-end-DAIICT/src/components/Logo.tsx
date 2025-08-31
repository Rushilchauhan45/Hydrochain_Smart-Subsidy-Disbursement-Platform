import React from 'react';
import { Droplet, CircleOff, Cloud, CloudDrizzle, Waves, Beaker, Droplets } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'footer' | 'hero';
  showText?: boolean;
  className?: string;
  logoStyle?: 'minimal' | 'modern' | 'science' | 'nature'; // Different logo style options
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  variant = 'default', 
  showText = true, 
  className = '',
  logoStyle = 'modern' // Default style
}) => {
  const sizeClasses = {
    sm: {
      icon: 'h-4 w-4',
      text: 'text-base',
      container: 'gap-1.5',
      iconContainer: 'p-0.5 w-7 h-7'
    },
    md: {
      icon: 'h-5 w-5',
      text: 'text-lg sm:text-xl',
      container: 'gap-2',
      iconContainer: 'p-1 w-8 h-8'
    },
    lg: {
      icon: 'h-6 w-6',
      text: 'text-xl sm:text-2xl',
      container: 'gap-2.5',
      iconContainer: 'p-1.5 w-10 h-10'
    },
    xl: {
      icon: 'h-7 w-7',
      text: 'text-2xl sm:text-3xl',
      container: 'gap-3',
      iconContainer: 'p-2 w-12 h-12'
    }
  };

  const variantStyles = {
    default: {
      iconBg: 'bg-primary-green',
      textColor: 'text-foreground',
      border: ''
    },
    footer: {
      iconBg: 'bg-primary-green',
      textColor: 'text-foreground',
      border: ''
    },
    hero: {
      iconBg: 'bg-gradient-to-r from-primary-green to-primary-blue',
      textColor: 'text-foreground',
      border: 'shadow-lg'
    }
  };

  const currentSize = sizeClasses[size];
  const currentVariant = variantStyles[variant];

  // Different logo designs based on style prop
  const renderLogoIcon = () => {
    switch (logoStyle) {
      case 'minimal':
        return (
          <div className={`relative flex items-center justify-center rounded-full ${currentSize.iconContainer} ${currentVariant.iconBg} ${currentVariant.border} shadow-md`}>
            <Droplet className={`${currentSize.icon} text-white`} />
          </div>
        );
        
      case 'science': 
        return (
          <div className={`relative flex items-center justify-center ${currentSize.iconContainer} ${currentVariant.border}`}>
            <div className="absolute inset-0 rounded-lg bg-primary-green/10"></div>
            <Beaker className={`${currentSize.icon} text-primary-green`} />
            <div className="absolute -bottom-1 -right-1">
              <Droplet className="h-3 w-3 text-primary-blue" />
            </div>
          </div>
        );
      
      case 'nature':
        return (
          <div className={`relative flex items-center justify-center rounded-md ${currentSize.iconContainer} bg-gradient-to-br from-green-500 to-blue-500 ${currentVariant.border} overflow-hidden`}>
            <Waves className={`${currentSize.icon} text-white`} />
            <div className="absolute top-0 right-0">
              <Cloud className="h-3 w-3 text-white opacity-50" />
            </div>
          </div>
        );
        
      case 'modern':
      default:
        return (
          <div className="relative">
            <div className={`
              flex items-center justify-center rounded-lg 
              ${currentSize.iconContainer} bg-transparent 
              ${currentVariant.border}
            `}>
              {/* Hexagon shape using inline clip-path */}
              <div className="absolute inset-0 bg-primary-green" 
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
              
              {/* Icon */}
              <Droplets className={`${currentSize.icon} text-white relative z-10`} />
              
              {/* Small accent elements */}
              <div className="absolute top-0 right-0 w-2 h-2 bg-primary-blue rounded-full opacity-70"></div>
              <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-primary-blue/50 rounded-full"></div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`flex items-center ${currentSize.container} ${className}`}>
      {/* Logo Icon based on selected style */}
      {renderLogoIcon()}
      
      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold ${currentSize.text} ${currentVariant.textColor}`}>
            Hydrochain
          </span>
          {(size === 'lg' || size === 'xl') && (
            <span className="text-xs text-muted-foreground">
              Smart Subsidy Platform
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
