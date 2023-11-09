import { ColumnDef } from "@tanstack/react-table"
import { Course } from "./Data";

import { PlusCircle, MinusCircle } from "lucide-react";

export const columns: ColumnDef<Course>[] = [
  {
    id: "add",
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "available",
    header: () => <div style={{width:"5rem"}}>Available</div>,
  },
  {
    accessorKey: "enrollmentCount",
    header: "Enrollment",
  },
  {
    accessorKey: "abbreviation",
    header: "Abbreviation",
  },
  {
    accessorKey: "number",
    header: "Number",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "begin",
    header: "Begin",
  },
  {
    accessorKey: "end",
    header: "End",
  },
  {
    accessorKey: "days",
    header: "Days",
  },
  {
    accessorKey: "roomNumber",
    header: "Room",
  },
  {
    accessorKey: "building",
    header: "Building",
  },
  {
    accessorKey: "instructor",
    header: "Instructor",
  },
]
