import { ColumnDef } from "@tanstack/react-table";
import TableTS from "./components/TableTS/TableTS";

import { faker } from "@faker-js/faker";

export type Person = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: string;
  createdAt: Date | string;
  children?: React.ReactNode;
};

type Column = ColumnDef<Person>;

const columns2: Column[] = [
  {
    accessorKey: "id",
    header: "ID",
    size: 60,
  },
  {
    accessorKey: "firstName",
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.lastName,
    id: "lastName",
    cell: (info) => info.getValue(),
    header: () => <span>Last Name</span>,
  },
  {
    accessorKey: "age",
    header: () => "Age",
    // size: 50,
  },
  {
    accessorKey: "visits",
    header: () => <span>Visits</span>,
    size: 50,
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "progress",
    header: "Profile Progress",
    size: 80,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: (info) => info.getValue<Date>().toLocaleString(),
  },
];
const columns: Column[] = [
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) => {
      return row.getCanExpand() && row.original.children ? (
        <button
          {...{
            onClick: row.getToggleExpandedHandler(),
            style: { cursor: "pointer" },
          }}
        >
          {row.getIsExpanded() ? "-" : "+"}
        </button>
      ) : null;
    },
  },
  {
    accessorKey: "id",
    header: "ID",
    size: 60,
  },
  {
    accessorKey: "firstName",
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.lastName,
    id: "lastName",
    cell: (info) => info.getValue(),
    header: () => <span>Last Name</span>,
  },
  {
    accessorKey: "age",
    header: () => "Age",
    // size: 50,
  },
  {
    accessorKey: "visits",
    header: () => <span>Visits</span>,
    size: 50,
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "progress",
    header: "Profile Progress",
    size: 80,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: (info) => info.getValue<Date>().toLocaleString(),
  },
];

const subRowsCount = 1000;
const subRows = new Array(subRowsCount).fill(1).map(() => {
  const item: Person = {
    id: 1,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int({ min: 1, max: 100 }),
    visits: 299,
    progress: 54,
    createdAt: faker.date.anytime(),
    status: "relationship",
  };
  return item;
});

const rowsCount = 1000;
// @ts-ignore
const rows = new Array(rowsCount).fill(1).map(() => {
  const item: Person = {
    id: 1,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int({ min: 1, max: 100 }),
    visits: 299,
    progress: 54,
    createdAt: faker.date.anytime(),
    status: "relationship",

    children:
      Math.random() > 0.5 ? (
        // @ts-ignore
        <TableTS columns={columns2} data={subRows} height={490} />
      ) : null,
  };
  return item;
});

function App() {
  // @ts-ignore
  return <TableTS columns={columns} data={rows} />;
}

export default App;
