import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { AgGridReact } from "ag-grid-react"; // React Grid Logic

const rowData2 = new Array(1000000).fill(1).map(() => {
  return {
    mission: "Voyager",
    company: "NASA",
    location: "Cape Canaveral",
    date: "1977-09-05",
    rocket: "Titan-Centaur ",
    price: 86580000,
    successful: true,
  };
});

const TableAg = () => {
  console.log({ rowData2 });

  return (
    <div className="ag-theme-quartz" style={{ height: 500 }}>
      <AgGridReact
        rowData={rowData2}
        columnDefs={[
          { field: "mission" },
          { field: "company" },
          { field: "location" },
          { field: "date" },
          { field: "price" },
          { field: "successful" },
          { field: "rocket" },
        ]}
      />
    </div>
  );
};

export default TableAg;
