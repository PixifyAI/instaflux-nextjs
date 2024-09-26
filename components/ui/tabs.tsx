// tabs.tsx
import React, { useState } from 'react';
import styles from './tabs.module.css';

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultActiveTab?: number;
  onChange?: (index: number) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, defaultActiveTab = 0, onChange }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    if (onChange) {
      onChange(index);
    }
  };

  return (
    <div className={styles.tabsContainer}>
      <ul className={styles.tabList}>
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={`${styles.tab} ${activeTab === index ? styles.activeTab : ''}`}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </li>
        ))}
      </ul>
      <div className={styles.tabPanels}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`${styles.tabPanel} ${activeTab === index ? styles.activeTabPanel : ''}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;