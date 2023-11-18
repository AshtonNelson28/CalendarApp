'use client'

/* import { Popover } from "../UI/Popover"; */
import { useScheduleContext } from "./ScheduleProvider";
import { useState, useEffect } from "react";
import { Database, Course, mapDaysToShortForm, timeStringToMinutes } from "./Data";
import { columns } from "./Columns";
import { DataTable } from "./DataTable"
import { SelectedPlaceHolder } from "./SelectedPlaceholder";
import Settings from "./Settings";

function MainContainer() {
  const {
    selectedSemester,
    /* setSelectedSemester, */
    /* selectedCourses, */
    /* setSelectedCourses, */
    selectedDepartment,
    /* setSelectedDepartment, */
    selectedDays,
    /* setSelectedDays, */
    database,
    activePageIndex,
    /* setActivePageIndex, */
    filterString,
    isShowTBADays,
    isShowTBATime,
    fromTime,
    toTime,
  } = useScheduleContext();
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  // Use useEffect to update filtered data when selectedSemester or selectedDepartment changes
  useEffect(() => {
    /* console.log("Update"); */
    /* const courses = database[selectedSemester][selectedDepartment]; */
    /* const sourses: Course[] = database[selectedSemester][selectedDepartment]; */
    const courses: Course[] | undefined = database[selectedSemester]?.[selectedDepartment];
    if (courses) {
      const newFilteredCourses = courses.filter(course => {
        const courseDaysArray = course.days.split("");
        /* const selectedDaysShortForm = selectedDays.map(day => mapDaysToShortForm[day]); */
        const selectedDaysShortForm = Object.keys(selectedDays)
        .filter(day => selectedDays[day])
        .map(day => mapDaysToShortForm[day]);
        const hasMatchingDays = selectedDaysShortForm.some(
          selectedDay => (
            (courseDaysArray.includes(selectedDay) && course.days !== "TBA")
              || isShowTBADays && course.days === "TBA"
          )
        );
        const matchesTitle = course.title.toLowerCase().includes(filterString.toLowerCase());
        const matchesNumber = String(course.number).includes(filterString);
        const matchesInstructor = course.instructor ? course.instructor.toLowerCase().includes(filterString.toLowerCase()) : false;
        const fromTimeMinute = timeStringToMinutes[fromTime];
        const toTimeMinute = timeStringToMinutes[toTime];
        const isTimeValid = fromTimeMinute <= toTimeMinute;
        const isWithinTime = (
          ((course.begin !== "TBA") ? course.begin : Number.MIN_SAFE_INTEGER) >= fromTimeMinute
            && ((course.end !== "TBA") ? course.end : Number.MAX_SAFE_INTEGER) <= toTimeMinute
        );
        return (
          hasMatchingDays
          && isTimeValid
          && (isWithinTime || (isShowTBATime && course.begin === "TBA"))
          && (filterString === '' || matchesTitle || matchesNumber || matchesInstructor)
        );
      })
      setFilteredCourses(newFilteredCourses);
    }
  }, [
      selectedSemester,
      selectedDepartment,
      selectedDays,
      filterString,
      isShowTBADays,
      isShowTBATime,
      fromTime,
      toTime,
      database
    ]);

  const pages = [
    <Settings/>,
    <DataTable columns={columns} data={filteredCourses} />,
    <SelectedPlaceHolder/>
  ]

  return (
    <div
      style={{
        display:'flex',
        flexDirection:'column',
        flexGrow:'1',
        backgroundColor: 'hsla(var(--black))',
        /* borderBottomLeftRadius:'0.75rem', */
        /* borderBottomRightRadius:'0.75rem', */
        /* borderRadius:'0.75rem', */
        /* margin:"0 0.5rem" */
        /* padding:"0 0.5rem" */
      }}
    >
      {/* <DataTable columns={columns} data={filteredData} /> */}
      {pages[activePageIndex]}

    </div>
  )
}

export default MainContainer;
