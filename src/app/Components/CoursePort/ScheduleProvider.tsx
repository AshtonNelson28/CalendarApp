'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';
import {
  Course,
  Department,
  Semester,
  exampleDatabase,
  timeIntervals,
  departments,
  semesters,
} from './Data'

interface ProviderContextType {
  selectedSemester: string;
  setSelectedSemester: React.Dispatch<React.SetStateAction<string>>;
  selectedCourses: Course[];
  setSelectedCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  selectedDepartment: string;
  setSelectedDepartment: React.Dispatch<React.SetStateAction<string>>;
  database: Semester[];
}

const ScheduleContext = createContext<ProviderContextType | null>(null);

// Create a provider to wrap the components that need access to the board context
export const ScheduleProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [selectedSemester, setSelectedSemester] = useState<string>(semesters[0])
  const [selectedDepartment, setSelectedDepartment] = useState<string>(departments[0])
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  /* const [database, setDatabase] = useState<Semester[]>(exampleDatabase); */
  const database = exampleDatabase;

  return (
    <ScheduleContext.Provider
      value={{
        selectedSemester,
        setSelectedSemester,
        selectedCourses,
        setSelectedCourses,
        selectedDepartment,
        setSelectedDepartment,
        database
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};

// A custom hook to use the board context in components
export const useScheduleContext = () => {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error('useScheduleContext must be used within a ScheduleProvider');
  }
  return context;
};
