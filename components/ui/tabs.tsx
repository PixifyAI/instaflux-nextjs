// components/ui/tabs.tsx
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
      <TabsList>
        {tabs.map((tab, index) => (
          <TabsTrigger key={index} index={index} isActive={index === activeTab} onClick={() => handleTabClick(index)}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className={styles.tabPanels}>
        {tabs.map((tab, index) => (
          <TabsContent key={index} isActive={index === activeTab}>
            {tab.content}
          </TabsContent>
        ))}
      </div>
    </div>
  );
};

// Separate components for TabsList, TabsTrigger, and TabsContent
const TabsList: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ul className={styles.tabList}>{children}</ul>
);

const TabsTrigger: React.FC<{ children: React.ReactNode; index: number; isActive: boolean; onClick: () => void }> = ({ children, index, isActive, onClick }) => (
  <li 
    className={`${styles.tab} ${isActive ? styles.activeTab : ''}`} 
    onClick={onClick}
  >
    {children}
  </li>
);

const TabsContent: React.FC<{ children: React.ReactNode; isActive: boolean }> = ({ children, isActive }) => (
  <div className={`${styles.tabPanel} ${isActive ? styles.activeTabPanel : ''}`}>
    {children}
  </div>
);

export { Tabs, TabsList, TabsTrigger, TabsContent }; 