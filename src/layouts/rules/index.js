/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "layouts/rules/Tables/DataTable";
import DataTable1 from "layouts/rules/linear/Tables/DataTable";


// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

import MDButton from "components/MDButton";
import { useLocation, Link } from "react-router-dom";
import { useState, useRef, useEffect, useMemo } from "react"
import Example from "layouts/rules/Example";
import MDInput from "components/MDInput";

// import for available packageid
import { usePackage } from "layouts/PackageContext";
import { PackageProvider } from "layouts/PackageContext";



function Tables() {
  // for available packageid
  const  {selectedPackageId} = usePackage();
  console.log(selectedPackageId, 'inside rule');



  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();

  const [showLinearRule, setShowLinearRule] = useState(false);
  
  const newRuleRef = useRef(null);

  useEffect(() => {
    if (showLinearRule && newRuleRef.current) {
      newRuleRef.current.focus();
    }
  }, [showLinearRule]);

  // add linear rule name, description and details..
  const [showAddLinearName, setShowAddLinearName] = useState(false);

  const [inputName, setInputName] = useState(''); // for adding linear rule name
  const [inputDescription, setInputDescription] = useState('') // for adding linear rule description
  const [tableData, setTableData] = useState([]);

  const [linearRuleData, setLinearRuleData] = useState([]);


  const handleInputName = (event) => {
    setInputName(event.target.value);
  }
  const handleInputDescription = (event) => {
    setInputDescription(event.target.value);
  }

  const [currentrule, setCurrentRule] = useState('');

  const addLinearName = async(event) => {
    event.preventDefault();
    if (inputName && inputDescription) {
      let rule_id = String(Date.now())
      setTableData((prevData) => [...prevData, { id: rule_id , name: inputName, description: inputDescription }])
      setCurrentRule(rule_id);

      setInputName('');
      setInputDescription('');
      setShowAddLinearName(false);
      setShowLinearRule(true);
    }
  }

  // current rule and display rule data



  const handleCellEdit = (rowData, columnId, value) => {
    // Handle cell edit logic here
    console.log('Cell Edited:', rowData, columnId, value);
    // You might want to update your data or perform other actions based on the cell edit
  };

  function ActionsColumn({ row }) {
    // Custom Cell component for the actions column
    return (
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {/* Add your view button/icon and handle the onClick event */}
        <MDBox
          onClick={() => handleView(row.original.id)} // Replace with your view function
          style={{ cursor: "pointer", marginRight: "8px" }}
        >
          visibility
        </MDBox>
        {/* Add your delete button/icon and handle the onClick event */}
        <MDBox
          onClick={() => handleDelete(row.original.id)} // Replace with your delete function
          style={{ cursor: "pointer" }}
        >
          delete
        </MDBox>
      </div>
    );
  }
  
  // ...
  
  // Example view function (replace with your actual view logic)
  function handleView(rowId) {
    console.log("View row with ID:", rowId);
    // Implement your view logic here, e.g., navigate to a detailed view
  }
  
  // ...
  
  // Example delete function (replace with your actual delete logic)
  function handleDelete(rowId) {
    console.log("Delete row with ID:", rowId);
    // Implement your delete logic here, e.g., make an API call
  }


  //-------------
  // for adding custom column

  const [conditions, setConditions] = useState([]);
  // State to manage operator and value selections for each condition
  const [conditionData, setConditionData] = useState({});

  // Function to add a new condition
  const addCondition = (conditionName) => {
    setConditions((prevConditions) => [...prevConditions, conditionName]);
    setConditionData((prevData) => ({
      ...prevData,
      [conditionName]: { operator: "", value: "" },
    }));
  };

  // Function to handle operator selection
  // const handleOperatorChange = (conditionName, operator) => {
  //   setConditionData((prevData) => ({
  //     ...prevData,
  //     [conditionName]: { ...prevData[conditionName], operator },
  //   }));
  // };
  const handleOperatorChange = (conditionName, rowId, operator) => {
    console.log(operator, 'operator')
    setConditionData((prevData) => ({
      ...prevData,
      [rowId]: {
        ...prevData[rowId],
        [conditionName]: { ...prevData[rowId]?.[conditionName], operator },
      },
    }));
  };

  // Function to handle value selection
  // const handleValueChange = (conditionName, value) => {
  //   setConditionData((prevData) => ({
  //     ...prevData,
  //     [conditionName]: { ...prevData[conditionName], value },
  //   }));
  // };
  const handleValueChange = (conditionName, rowId, value) => {
    console.log(value,rowId, 'value')
    setConditionData((prevData) => ({
      ...prevData,
      [rowId]: {
        ...prevData[rowId],
        [conditionName]: { ...prevData[rowId]?.[conditionName], value },
      },
    }));
  };
  const availableConditions = ["ConditionName1", "ConditionName2", "ConditionName3"];

   // State to track the selected condition
   const [selectedCondition, setSelectedCondition] = useState("");

   const handleConditionChange = (event) => {
    setSelectedCondition(event.target.value);
    addSelectedCondition();
  };

  const addSelectedCondition = () => {
    if (selectedCondition) {
      addCondition(selectedCondition);
      setSelectedCondition("");
    }
  };
  
  // const dynamicColumns = useMemo(() => {
  //   const baseColumns = [
  //     { Header: "ID", accessor: "id", width: "15%" },
      
  //   ];

  //   // Add columns for conditions dynamically
  //   const dynamicColumns = conditions.map((condition) => ({
  //     Header: condition,
  //     accessor: condition,
  //     width: "20%",
  //     Cell: ({ row }) => (
  //       <div>
  //         <select
  //           value={conditionData[row.original.id]?.[condition]?.operator || ""}
  //           onChange={(e) => handleOperatorChange(condition, row.original.id, e.target.value)}
  //         >
  //           <option value="">Select Operator</option>
  //           <option value="equals">Equals</option>
  //           <option value="contains">Contains</option>
  //           {/* Add more operators as needed */}
  //         </select>
  //         <input
  //           type="text"
  //           value={conditionData[row.original.id]?.[condition]?.value || ""}
  //           onChange={(e) => handleValueChange(condition, row.original.id, e.target.value)}
  //         />
  //       </div>
  //     ),
  //   }));

  //   return [...baseColumns, ...dynamicColumns];
  // }, [conditions, conditionData]);

  const dynamicColumns = useMemo(() => {
    const baseColumns = [
      { Header: "ID", accessor: "id", width: "15%" },
      // ... Other columns
      { Header: "Delete", accessor: "delete", width: "15%", Cell: DeleteColumn },
    ];
  
    const dynamicColumns = conditions.map((condition) => ({
      Header: condition,
      accessor: condition,
      width: "15%",
      Cell: ({ row }) => (
        <div>
          <select
            value={conditionData[row.original.id]?.[condition]?.operator || ""}
            onChange={(e) =>
              handleOperatorChange(condition, row.original.id, e.target.value)
            }
          >
            <option value="">Select Operator</option>
            <option value="equals">Equals</option>
             <option value="contains">Contains</option>
          </select>
          <input
            type="text"
            value={conditionData[row.original.id]?.[condition]?.value || ""}
            onChange={(e) =>
              handleValueChange(condition, row.original.id, e.target.value)
            }
          />
        </div>
      ),
    }));

  
    return [...baseColumns, ...dynamicColumns];
  }, [conditions, conditionData]);

  

  //   return [...baseColumns, ...dynamicColumns];
  // }, [conditions, conditionData]);


  // new row setups
  // const addRowToDataTable1 = () => {
  //   const newRow = {
  //     id: String(Date.now()), // Unique ID for each row
  //     // name: `New Row ${linearRuleData.length + 1}`,
  //     // description: `Description ${linearRuleData.length + 1}`,
  //   };
  
  //   // Include conditions data for the new row
  //   conditions.forEach((condition) => {
  //     newRow[condition] = {
  //       operator: conditionData[condition]?.operator || "",
  //       value: conditionData[condition]?.value || "",
  //     };
  //   });
  
  //   setLinearRuleData((prevData) => [...prevData, newRow]);
  //   resetConditionData(); // Reset conditionData after adding a new row
  // };

  // const addRowToDataTable1 = () => {
  //   const newRow = {
  //     id: String(Date.now()), // Unique ID for each row
  //     // name: `New Row ${linearRuleData.length + 1}`,
  //     // description: `Description ${linearRuleData.length + 1}`,
  //   };
  
  //   // Include conditions data for the new row
  //   conditions.forEach((condition) => {
  //     newRow[condition] = {
  //       operator: conditionData[condition]?.operator || "",
  //       value: conditionData[condition]?.value || "",
  //     };
  //   });
  
  //   setLinearRuleData((prevData) => [...prevData, newRow]);
  //   resetConditionData(); // Reset conditionData after adding a new row
  // };

  // const addRowToDataTable1 = () => {
  //   const newRow = {
  //     id: String(Date.now()), // Unique ID for each row
  //   };
  
  //   // Include conditions data for the new row
  //   conditions.forEach((condition) => {
  //     newRow[condition] = {
  //       operator: conditionData[newRow.id]?.[condition]?.operator || "",
  //       value: conditionData[newRow.id]?.[condition]?.value || "",
  //     };
  //   });
  
  //   setLinearRuleData((prevData) => [...prevData, newRow]);
  //   resetConditionData(); // Reset conditionData after adding a new row
  // };
  const addRowToDataTable1 = () => {
    const newRow = {
      id: String(Date.now()), // Unique ID for each row
    };
  
    // Include conditions data for the new row
    conditions.forEach((condition) => {
      newRow[condition] = {
        operator: conditionData[condition]?.operator || "",
        value: conditionData[condition]?.value || "",
      };
    });
  
    // Include actions data for the new row
    actionData.forEach((action) => {
      newRow[action] = "";
    });
  
    setLinearRuleData((prevData) => [...prevData, newRow]);
    // resetConditionData(); // Reset conditionData after adding a new row
  };
  
  
  
  
  // Function to reset conditionData
  const resetConditionData = () => {
    const resetData = {};
    conditions.forEach((condition) => {
      resetData[condition] = { operator: "", value: "" };
    });
    setConditionData(resetData);
  };
  

  const [selectedAction, setSelectedAction] = useState("");
  const [actionData, setActionData] = useState([]);

  const handleActionChange = (event) => {
    setSelectedAction(event.target.value);
  };

  const addAction = () => {
    if (selectedAction) {
      // Add selected action as a new column
      setActionData((prevData) => [...prevData, selectedAction]);
      setSelectedAction("");
    }
  };

  console.log(columns, linearRuleData, 'table data linear ')

  // Function to get all data with conditions and actions
const getAllTableData = () => {
  const allData = linearRuleData.map((row) => {
    const rowData = { ...row };

    // Add conditions data for the row
    conditions.forEach((condition) => {
      rowData[condition] = {
        operator: conditionData[row.id]?.[condition]?.operator || "",
        value: conditionData[row.id]?.[condition]?.value || "",
      };
    });

    // Add actions data for the row
    actionData.forEach((action) => {
      rowData[action] = row[action] || "";
    });

    return rowData;
  });

  return allData;
};

// final rule data and main rule id's
// Usage:
const [finalLR, setFinalLR] = useState([]);

const handleSave = () => {
  const allData = getAllTableData();

  setFinalLR((prevData) => [...prevData, {LRId: currentrule, rule: allData}])
  console.log("All Table Data:", allData);
  console.log("All Table Data along with rule id", finalLR);

  setShowLinearRule(false);
  // You can perform further actions with the combined data
};


function DeleteColumn({ row }) {
  return (
    <MDBox
      onClick={() => handleDeleteRow(row.original.id)}
      style={{ cursor: "pointer" }}
    >
      delete
    </MDBox>
  );
}

// ...

function handleDeleteRow(rowId) {
  // Implement your delete logic here
  // For conditions table
  const updatedConditions = conditions.filter((condition) => condition !== rowId);
  setConditions(updatedConditions);

  // For conditionData
  const updatedConditionData = { ...conditionData };
  delete updatedConditionData[rowId];
  setConditionData(updatedConditionData);

  // For actions table
  const updatedActions = actionData.filter((action) => action !== rowId);
  setActionData(updatedActions);

  // For linearRuleData
  const updatedLinearRuleData = linearRuleData.filter((row) => row.id !== rowId);
  setLinearRuleData(updatedLinearRuleData);
}

// ...




  return (
    
    <DashboardLayout>
      <DashboardNavbar />
      {/* <Link to='/packages/rules/linear_rule'> */}
      <MDButton size="small" variant="gradient" color="info"
        onClick={() => setShowAddLinearName(true)}>
        Add Linear Rule
      </MDButton>
      {/* </Link> */}
      &nbsp;&nbsp;&nbsp;
      <Link to='/packages/rules/decision_table'>
        <MDButton size="small" variant="gradient" color="info">
          Add Decision Table
        </MDButton>
      </Link>

      {/* for adding the new linear rule....so creating rulename...description..etc */}
      {showAddLinearName && (

        <div>
          <br />
          <br />
          <MDInput type="text" label="Name" value={inputName} onChange={handleInputName} />  &nbsp;&nbsp;&nbsp;

          <MDInput type="text" label="Description" value={inputDescription} onChange={handleInputDescription} /> &nbsp;&nbsp;&nbsp;

          <MDButton size="small" variant="gradient" color="info"
            onClick={addLinearName}>
            Add
          </MDButton>
          {/* </Link> */}
          &nbsp;&nbsp;&nbsp;

          <MDButton size="small" variant="gradient" color="info"
            onClick={() => setShowAddLinearName(false)}>
            Cancel
          </MDButton>


        </div>
      )}




      <MDBox pt={6} pb={3}>



        <Grid container spacing={6}>
          <Grid item xs={12}>


            <Card>
              <DataTable
                table={{
                  columns: [
                    { Header: "ID", accessor: "id", width: "25%" },
                    { Header: "Name", accessor: "name", width: "30%" },
                    { Header: "Description", accessor: "description" },
                    { Header: "Actions", accessor: "actions", width: "25%", Cell: ActionsColumn },
                    // { Header: "age", accessor: "age", width: "12%" },
                  ],
                  rows: tableData }}

                  // onRowClick={(rowData) => {
                  //   // Handle row click, e.g., navigate to a detail page
                  //   console.log("Row Clicked:", rowData);
                  // }}
                  />





                  {/* <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">

                  Rules
                
                 
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox> */}

            </Card>
          </Grid>


          {showLinearRule && (

            <Grid item xs={12}>

              <Card ref={newRuleRef} tabIndex={-1}>

                <MDBox pt={3}>
                  <MDButton size="small" variant="gradient" color="secondary" align="right"
                    // onClick={() => addCondition("ConditionName1")}
                    >
                    Condition
                  </MDButton>
                  &nbsp;
                  <MDButton size="small" variant="gradient" color="secondary"
                    onClick={() => setShowLinearRule(false)}>
                    Action
                  </MDButton>
                  &nbsp;&nbsp;
                  <MDButton size="small" variant="gradient" color="success"
                    onClick={handleSave}>
                    Save
                  </MDButton>
                  &nbsp;

                  <MDButton size="small" variant="gradient" color="error"
                    onClick={() => setShowLinearRule(false)}>
                    Close
                  </MDButton>
                  <div>
                    {/* UI for adding conditions */}
                    <select value={selectedCondition} onChange={handleConditionChange}>
                  <option value="" disabled>Select Condition</option>
                  {availableConditions.map((condition) => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))}
                </select>
                <button onClick={addSelectedCondition}>Add Condition</button>
                <button onClick={addRowToDataTable1}>Add Row</button>
                <div>
                  <select value={selectedAction} onChange={handleActionChange}>
                    <option value="" disabled>Select Action</option>
                    <option value="Set Participant Data">Set Participant Data</option>
                    <option value="Route to ">Route to</option>
                    
                    {/* Add more actions as needed */}
                  </select>
                  <button onClick={addAction}>Add Action</button>
                </div>

                    {/* DataTable with added conditions */}
                    {/* <DataTable1
                      table={{
                        columns: dynamicColumns,
                        rows: linearRuleData,
                      }}
                    /> */}
                    {/* <DataTable1
                table={{
                  columns: [
                    ...dynamicColumns,
                    ...actionData.map((action) => ({
                      Header: action,
                      accessor: action,
                      width: "20%",
                      Cell: ({ row }) => (
                        <input
                          type="text"
                          value={row.original[action] || ""}
                          onChange={(e) => {
                            // Handle input change and update the data
                            const newData = [...linearRuleData];
                            const rowIndex = linearRuleData.findIndex(
                              (item) => item.id === row.original.id
                            );
                            newData[rowIndex][action] = e.target.value;
                            setLinearRuleData(newData);
                          }}
                        />
                      ),
                    })),
                  ],
                  rows: linearRuleData,
                }}
              />
               */}

                    {/* <DataTable1
                      table={{
                        columns: [
                          ...dynamicColumns,
                          ...actionData.map((action) => ({
                            Header: action,
                            accessor: action,
                            width: "20%",
                            Cell: ({ row }) => (
                              <input
                                type="text"
                                value={row.original[action] || ""}
                                onChange={(e) => {
                                  // Handle input change and update the data
                                  const newData = [...linearRuleData];
                                  const rowIndex = linearRuleData.findIndex(
                                    (item) => item.id === row.original.id
                                  );
                                  newData[rowIndex][action] = e.target.value;
                                  setLinearRuleData(newData);
                                }}
                              />
                            ),
                          })),
                        ],
                        rows: linearRuleData,
                      }}
                    /> */}

{/* 
<DataTable1
  table={{
    columns: [
      ...dynamicColumns,
      ...actionData.map((action) => ({
        Header: action,
        accessor: action,
        width: "20%",
        Cell: ({ row }) => (
          <input
            type="text"
            value={row.original[action] || ""}
            onChange={(e) => {
              // Handle input change and update the data
              const newData = [...linearRuleData];
              const rowIndex = linearRuleData.findIndex(
                (item) => item.id === row.original.id
              );
              newData[rowIndex] = {
                ...newData[rowIndex],
                [action]: e.target.value,
              };
              setLinearRuleData(newData);
            }}
          />
        ),
      })),
    ],
    rows: linearRuleData,
  }}
/> */}

{/* <DataTable1
  table={{
    columns: [
      ...dynamicColumns,
      ...actionData.map((action) => ({
        Header: action,
        accessor: action,
        width: "20%",
        Cell: ({ row }) => (
          <input
            type="text"
            value={row.original[action] || ""}
            onChange={(e) => {
              // Handle input change and update the data
              const newData = [...linearRuleData];
              const rowIndex = linearRuleData.findIndex(
                (item) => item.id === row.original.id
              );
              newData[rowIndex] = {
                ...newData[rowIndex],
                [action]: e.target.value,
              };
              setLinearRuleData([...newData]); // Use the spread operator to ensure a new reference
            }}
          />
        ),
      })),
    ],
    rows: linearRuleData,
  }}
/> */}

<DataTable1
  table={{
    columns: [
      ...dynamicColumns,
      ...actionData.map((action) => ({
        Header: action,
        accessor: action,
        width: "20%",
        Cell: ({ row }) => (
          <input
            type="text"
            value={row.original[action] || ""}
            onChange={(e) => {
              // Handle input change and update the data
              const newData = [...linearRuleData];
              const rowIndex = linearRuleData.findIndex(
                (item) => item.id === row.original.id
              );

              newData[rowIndex] = {
                ...newData[rowIndex],
                [action]: e.target.value,
              };

              setLinearRuleData(newData); // Update the state with the new array
            }}
          />
        ),
      })),
    ],
    rows: linearRuleData,
  }}
/>


{/* <div>
  <p>{linearRuleData}</p>
  </div> */}

                  </div>


                  

                  




                  {/* <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                /> */}
                </MDBox>
              </Card>

            </Grid>



          )}
        </Grid>
      </MDBox>

    </DashboardLayout>
  );
}



export default Tables;
