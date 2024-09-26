// tooltip.tsx
import React, { useState, useRef, useEffect } from 'react';
import styles from './tooltip.module.css';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, placement = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const handleMouseOver = () => setIsVisible(true);
  const handleMouseOut = () => setIsVisible(false);

  useEffect(() => {
    if (isVisible && tooltipRef.current && targetRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      let left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
      let top = targetRect.top - tooltipRect.height;

      switch (placement) {
        case 'bottom':
          top = targetRect.top + targetRect.height;
          break;
        case 'left':
          left = targetRect.left - tooltipRect.width;
          top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
          break;
        case 'right':
          left = targetRect.left + targetRect.width;
          top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
          break;
      }

      tooltipRef.current.style.left = `${left}px`;
      tooltipRef.current.style.top = `${top}px`;
    }
  }, [isVisible, placement]);

  return (
    <div className={styles.tooltipContainer} ref={targetRef} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      {children}
      {isVisible && (
        <div className={`${styles.tooltip} ${styles[placement]}`} ref={tooltipRef}>
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;