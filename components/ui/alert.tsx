// alert.tsx
import React from 'react';
import styles from './alert.module.css';

interface AlertProps {
  type?: 'success' | 'info' | 'warning' | 'error';
  message: string;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ type = 'info', message, onClose }) => {
  const alertClass = styles.alert + ' ' + styles[type]; // Combine base class with type-specific class

  return (
    <div className={alertClass}>
      <span className={styles.message}>{message}</span>
      {onClose && (
        <button className={styles.closeButton} onClick={onClose}>
          × {/* Close symbol */}
        </button>
      )}
    </div>
  );
};

export default Alert;