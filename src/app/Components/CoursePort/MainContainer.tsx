'use client'

/* import { Popover } from "../UI/Popover"; */
import { useScheduleContext } from "./ScheduleProvider";
import { useState, useEffect } from "react";
import { Database, Course, mapDaysToShortForm } from "./Data";
import { columns } from "./Columns";
import { DataTable } from "./DataTable"
import { SelectedPlaceHolder } from "./SelectedPlaceholder";

function MainContainer() {
  const {
    selectedSemester,
    setSelectedSemester,
    selectedCourses,
    setSelectedCourses,
    selectedDepartment,
    setSelectedDepartment,
    selectedDays,
    setSelectedDays,
    database,
    activePageIndex,
    setActivePageIndex,
    filterString
  } = useScheduleContext();
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  // Use useEffect to update filtered data when selectedSemester or selectedDepartment changes
  useEffect(() => {
    /* const courses = database[selectedSemester][selectedDepartment]; */
    /* const sourses: Course[] = database[selectedSemester][selectedDepartment]; */
    const courses: Course[] | undefined = database[selectedSemester]?.[selectedDepartment];
    if (courses) {
      const newFilteredCourses = courses.filter(course => {
        const courseDaysArray = course.days.split("");
        const selectedDaysShortForm = selectedDays.map(day => mapDaysToShortForm[day]);
        const hasMatchingDays = selectedDaysShortForm.some(
          selectedDay => courseDaysArray.includes(selectedDay)
        );
        const matchesTitle = course.title.toLowerCase().includes(filterString.toLowerCase());
        const matchesNumber = String(course.number).includes(filterString);
        const matchesInstructor = course.instructor ? course.instructor.toLowerCase().includes(filterString.toLowerCase()) : false;
        return hasMatchingDays && (filterString === '' || matchesTitle || matchesNumber || matchesInstructor);
      })
      setFilteredCourses(newFilteredCourses);
    }
    /* const filteredSemester = database.find( */
    /*   (semester) => semester.semesterTitle === selectedSemester */
    /* ); */

    /* console.log('Filtered Semester:', filteredSemester); */
    /* if (filteredSemester) { */
    /*   const filteredDepartment = filteredSemester.departments.find( */
    /*     (dept) => dept.departmentTitle === selectedDepartment */
    /*   ); */
    /*   if (filteredDepartment) { */
    /*     setFilteredData(filteredDepartment.courses.filter(course => { */
    /*       const courseDaysArray = course.days.split(""); */
    /*       const selectedDaysShortForm = selectedDays.map(day => mapDaysToShortForm[day]); */
    /*       const hasMatchingDays = selectedDaysShortForm.some( */
    /*         selectedDay => courseDaysArray.includes(selectedDay) */
    /*       ); */
    /*       const matchesTitle = course.title.toLowerCase().includes(filterString.toLowerCase()); */
    /*       const matchesNumber = String(course.number).includes(filterString); */
    /*       const matchesInstructor = course.instructor ? course.instructor.toLowerCase().includes(filterString.toLowerCase()) : false; */
    /*       return hasMatchingDays && (filterString === '' || matchesTitle || matchesNumber || matchesInstructor); */
    /*     })) */
    /*   } */
    /* } */
  }, [selectedSemester, selectedDepartment, selectedDays, filterString, database]);

  const pages = [
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
        padding: "1rem",
        borderRadius:'0.75rem',
      }}
    >
      {/* <DataTable columns={columns} data={filteredData} /> */}
      {pages[activePageIndex]}

    </div>
  )
}

export default MainContainer;
