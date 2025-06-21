import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  targetSection: string;
  onClick: (section: string) => void;
}

const ScrollIndicator = ({ targetSection, onClick }: ScrollIndicatorProps) => {
  return (
    <div 
      className="scroll-indicator cursor-pointer" 
      onClick={() => onClick(targetSection)}
      aria-label={`Défiler vers ${targetSection}`}
    >
      <div className="flex flex-col items-center text-white/80 hover:text-white transition-colors">
        <span className="text-xs mb-2 animate-pulse">Défiler</span>
        <ChevronDown className="animate-bounce" size={24} />
      </div>
    </div>
  );
};

export default ScrollIndicator;
