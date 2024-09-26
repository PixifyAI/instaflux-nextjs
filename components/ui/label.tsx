// label.tsx
import React from 'react';
import styles from './label.module.css';

interface LabelProps {
  htmlFor: string; // The ID of the form element the label is associated with
  required?: boolean; // Whether the field is required
  children: React.ReactNode; // The label text or content
}

const Label: React.FC<LabelProps> = ({ htmlFor, required, children }) => {
  return (
    <label htmlFor={htmlFor} className={styles.label}>
      {children}
      {required && <span className={styles.required}>*</span>}
    </label>
  );
};

export default Label;