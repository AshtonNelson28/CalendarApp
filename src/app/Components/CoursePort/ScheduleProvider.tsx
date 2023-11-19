'use client';

import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect
} from 'react';
import {
  Course,
  /* Department, */
  /* Semester, */
  /* exampleDatabase, */
  bookletData,
  timeIntervals,
  departments,
  initialDays,
  timeStringToMinutes,
  semesters,
  days,
  Database,
} from './Data'
import { initialVisibleColumnId } from './Columns';
import { changeTheme, ThemeMap } from './Colorscheme';

interface ProviderContextType {
  selectedSemester: string;
  setSelectedSemester: React.Dispatch<React.SetStateAction<string>>;
  selectedCourses: Course[];
  setSelectedCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  addCourse: <T extends Course>(course: T) => void;
  removeCourse: <T extends Course>(course: T) => void;
  selectedDepartment: string;
  setSelectedDepartment: React.Dispatch<React.SetStateAction<string>>;
  /* selectedDays: string[]; */
  /* setSelectedDays: React.Dispatch<React.SetStateAction<string[]>>; */
  selectedDays: { [day: string]: boolean };
  setSelectedDays: React.Dispatch<React.SetStateAction<{ [day: string]: boolean }>>;
  database: Database;
  activePageIndex: number;
  setActivePageIndex: React.Dispatch<React.SetStateAction<number>>;
  filterString: string;
  setFilterString: React.Dispatch<React.SetStateAction<string>>;
  visibleColumns: string[];
  setVisibleColumns: React.Dispatch<React.SetStateAction<string[]>>;
  /* isExclusiveDays: boolean; */
  /* setIsExclusiveDays: React.Dispatch<React.SetStateAction<boolean>>; */
  isShowTBADays: boolean;
  setIsShowTBADays: React.Dispatch<React.SetStateAction<boolean>>;
  isShowTBATime: boolean;
  setIsShowTBATime: React.Dispatch<React.SetStateAction<boolean>>;
  /* toggleIsExclusiveDays: () => void; */
  toggleSelectedDays: () => void;
  toggleDaySelection: (day: string) => void;
  timeIntervals: string[];
  reversedTimeIntervals: string[];
  fromTime: string;
  setFromTime: React.Dispatch<React.SetStateAction<string>>;
  toTime: string;
  setToTime: React.Dispatch<React.SetStateAction<string>>;
  selectedTheme: string;
  setSelectedTheme: React.Dispatch<React.SetStateAction<string>>;
}

const ScheduleContext = createContext<ProviderContextType | null>(null);

// Create a provider to wrap the components that need access to the board context
export const ScheduleProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const database: Database = bookletData;
  const timeIntervals = Object.keys(timeStringToMinutes);
  const reversedTimeIntervals = Object.keys(timeStringToMinutes).reverse();
  const [selectedTheme, setSelectedTheme] = useState(Object.keys(ThemeMap)[0]); // Set initial theme

  const [selectedSemester, setSelectedSemester] = useState<string>(semesters[0])
  /* const [selectedDepartment, setSelectedDepartment] = useState<string>(departments[0]) */
  const [selectedDepartment, setSelectedDepartment] = useState<string>("COMPUTER SCIENCE");
  /* const [selectedDays, setSelectedDays] = useState<string[]>(days) */
  const [selectedDays, setSelectedDays] = useState<{ [key: string]: boolean }>(initialDays);
  /* const [isExclusiveDays, setIsExclusiveDays] = useState<boolean>(false); */
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [isShowTBADays, setIsShowTBADays] = useState<boolean>(true);
  const [isShowTBATime, setIsShowTBATime] = useState<boolean>(true);
  /* const [database, setDatabase] = useState<Semester[]>(exampleDatabase); */
  const [filterString, setFilterString] = useState<string>("");

  const [visibleColumns, setVisibleColumns] = useState<string[]>(initialVisibleColumnId);
  const [activePageIndex, setActivePageIndex] = useState<number>(1);

  const [fromTime, setFromTime] = useState(timeIntervals[0]);
  const [toTime, setToTime] = useState(reversedTimeIntervals[0]);

  useEffect(() => {
    changeTheme(selectedTheme);
  }, [selectedTheme]);

  const toggleDaySelection = (day: string) => {
    setSelectedDays(prevSelectedDays => ({
      ...prevSelectedDays,
      [day]: !prevSelectedDays[day], // Toggle the value for the specific day
    }));
  };

  // Toggle the value for each day
  const toggleSelectedDays = () => {
    setIsShowTBADays(!isShowTBADays);
    const updatedDays: { [day: string]: boolean } = {};

    Object.keys(selectedDays).forEach(day => {
      updatedDays[day] = !selectedDays[day];
    });

    setSelectedDays(updatedDays);
  };

  const addCourse = <T extends Course>(course: T) => {
    setSelectedCourses((prevSelectedCourses) => {
      // Check if the course is already in the selectedCourses array
      if (prevSelectedCourses.some((selectedCourse) => selectedCourse.number === course.number && selectedCourse.section === course.section)) {
        return prevSelectedCourses; // Course is already selected, no need to add it again
      }

      // Add the course to the selectedCourses array
      return [...prevSelectedCourses, course];
    });
  };

  const removeCourse = <T extends Course>(course: T) => {
    setSelectedCourses((prevSelectedCourses) => {
      // Filter out the course with the specified number and section
      const updatedSelectedCourses = prevSelectedCourses.filter(
        (selectedCourse) => selectedCourse.number !== course.number || selectedCourse.section !== course.section
      );
      return updatedSelectedCourses;
    });
  };

  return (
    <ScheduleContext.Provider
      value={{
        selectedSemester,
        setSelectedSemester,
        selectedCourses,
        setSelectedCourses,
        addCourse,
        removeCourse,
        selectedDepartment,
        setSelectedDepartment,
        selectedDays,
        setSelectedDays,
        database,
        activePageIndex,
        setActivePageIndex,
        filterString,
        setFilterString,
        visibleColumns,
        setVisibleColumns,
        toggleSelectedDays,
        toggleDaySelection,
        isShowTBADays,
        setIsShowTBADays,
        isShowTBATime,
        setIsShowTBATime,
        timeIntervals,
        reversedTimeIntervals,
        fromTime,
        setFromTime,
        toTime,
        setToTime,
        selectedTheme,
        setSelectedTheme,
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

