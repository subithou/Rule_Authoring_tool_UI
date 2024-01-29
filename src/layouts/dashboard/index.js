/**


* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";


import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";

import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();


// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { useState } from "react";

import Example from "layouts/rules/Example";

import { PackageProvider } from "layouts/PackageContext";
import { usePackage } from "layouts/PackageContext";

// api for operators
import { addOperators, createOperators, deleteOperators, getOperators } from "API/OperatorsAPI";

// api for attributes
import { createVariables, deleteVariables, getVariables } from "API/AttributesAPI";

// api for actions 
import { createActionsAPi, createActiontable, deleteActions, getAllActions } from "API/ActionAPI";
import MDInput from "components/MDInput";


// select
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

// notification
import MDSnackbar from "components/MDSnackbar";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;


  // for available packageid
  const  {selectedPackageId} = usePackage();
  console.log(selectedPackageId, 'inside actual dashboard');



  const [showOperator, setShowOperator] = useState(false);
  const [showAttributes, setShowAttributes] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [showTemplate, setShowTemplate] = useState(true);
  const [showRule, setShowRule] = useState(false);

  const OpenOperator = async() => {
    setOperatorTableData([]);
    setShowOperator(true);
    setShowActions(false);
    setShowAttributes(false);
    setShowOverview(false);
    try {

      const response = await getOperators(selectedPackageId);
      console.log(response.data);
      if (response.data.Operators.length > 0) {
       
        
        let responseOperator = response.data.Operators;
        {responseOperator.map((operator) => {
          setOperatorTableData((prevData) => [...prevData, operator]);
        })}
        console.log(operatorTableData,'op table data', response.data.Operators)
      }
    }catch(error){
      console.log(error, 'while fetching operator')

    }

  }

  


  const [actionTableData, setActionTableData] = useState([]);
  const OpenActions =  async() => {
    setShowOperator(false);
    setShowActions(true);
    setShowAttributes(false);
    setShowOverview(false);
    try {

      const response = await getAllActions(selectedPackageId);
      console.log(response.data);
      if (response.data.length === 0) {
       console.log(response.data.length);
        try{
          const response = await createActiontable({packageid:selectedPackageId ,actiontablename: "ActionTable", actiontableid:String(Date.now()) })
          console.log(response, 'successfully created actiontable')
        }
        catch(error){
          console.log(error, 'getting error for creating action table if not there')
        }
      }
      else{
        console.log(response.data)
      }
    }catch(error){
      console.log(error, 'while fetching actions')

    }
  }

  const OpenOverview = () => {
    setShowOperator(false);
    setShowActions(false);
    setShowAttributes(false);
    setShowOverview(true);
  }

  const [operatorTableData, setOperatorTableData] = useState([]);
  const [showAddOperator, setShowAddOperator] = useState(false);

  //select operator
  const [selectedOperator, setSelectedOperator] = useState('');

  const handleChangeOperator = (event) => {
    setSelectedOperator(event.target.value);
  };
  const allOperators = [
    {
      name:"Lessthan",
      value: "<"
    },
    {
      name: "Greaterthan",
      value: ">"
    },
    {
      name: "NOT EQUAL",
      value: "!="
    },
    {
      name: "EQUAL",
      value: "="
    }
  ]
// success notification 
const [successSB, setSuccessSB] = useState(false);
const closeSuccessSB = () => setSuccessSB(false);



const renderSuccessSB = (
  <MDSnackbar
    color="success"
    icon="check"
    title="Successs"
    content=""
    dateTime="11 mins ago"
    open={successSB}
    onClose={closeSuccessSB}
    close={closeSuccessSB}
    bgWhite
  />
);

//error notification
const [errorSB, setErrorSB] = useState(false);
  const closeErrorSB = () => setErrorSB(false);

const renderErrorSB = (
  <MDSnackbar
    color="error"
    icon="warning"
    title="Error"
    content="This is a notification message"
    dateTime=""
    open={errorSB}
    onClose={closeErrorSB}
    close={closeErrorSB}
    bgWhite
  />
);

  // adding operator function

  const handleAddOperator = async() => {
    if(selectedOperator){
      try {
        let opName = '';
        { allOperators.map((item) => {
          if(selectedOperator === item.value){
            opName = item.name
            console.log(opName, 'opName')
          }
        })}
        

        const response = await addOperators({packageid:String(selectedPackageId), packagename:"CTS-Package-Demo", operators:[
          
          {
            operatorid: String(Date.now()),
            operatorname: opName,
            operatorvalue: selectedOperator
          }
        ]
      })
      console.log(response, 'insert one operator succe');
      setShowAddOperator(false);
      OpenOperator();
      setSuccessSB(true);


      }catch(error){
        console.log(error, 'error in adding an operator')
        setErrorSB(true)
      }
      
    }
    setSelectedOperator('');
  }

  const handleCancelAddOperator = async() => {
    setShowAddOperator(false);
    setSelectedOperator('');
    
  }
  // const op = allOperators.map((option) =>{

  // })

  // for attributes managing
  const [attributesTableData, setAttributesTableData] = useState([]);
  const OpenAttributes = async() => {
    setAttributesTableData([]);

    setShowOperator(false);
    setShowActions(false);
    setShowAttributes(true);
    setShowOverview(false);
    try{
      const response = await getVariables(selectedPackageId);
      console.log(response, 'get attributes')
      if (response.data.item.length > 0) {

        let responseAttributes = response.data.item;
        {responseAttributes.map((attributes) => {
          setAttributesTableData((prevData) => [...prevData, attributes]);
        })}
        console.log(attributesTableData,'attri table data', response.data.item)
      }
    }catch(error){
      console.log(error, 'error in get attributes')
    }
  }

const [showAddAttributes, setShowAddAttributes] = useState(false);


// select attribute name,type,values
const [attributeName, setAttributeName] = useState('');
const handleAttributeName = (event) => {
  setAttributeName(event.target.value)
}

const [attributeValue, setAttributeValue] = useState('');
const handleAttributeValue = (event) => {
  setAttributeValue(event.target.value)
}

const [selectedAttribute, setSelectedAttribute] = useState('');
const handleSelectedAttribute = (event) => {
  setSelectedAttribute(event.target.value);
}

const handleAddAttribute = async() => {
  if(selectedAttribute, attributeName, attributeValue){
    try {
      
      
      const response = await createVariables({packageid:String(selectedPackageId), item: [{
        id: String(Date.now()),
        name: attributeName,
        type: selectedAttribute,
        values: attributeValue
      }] })
      
   
    console.log(response, 'insert one attribute succe', {packageid:String(selectedPackageId), item: [{
      id: String(Date.now()),
      name: attributeName,
      type: selectedAttribute,
      values: attributeValue
    }] });
    setShowAddAttributes(false);
    OpenAttributes();
    setSuccessSB(true);


    }catch(error){
      console.log(error, 'error in adding an attributes', {packageid:String(selectedPackageId), item: [{
        id: String(Date.now()),
        name: attributeName,
        type: selectedAttribute,
        values: attributeValue
      }] })
      setErrorSB(true)
    }

    setAttributeName('');
    setAttributeValue('');
    setSelectedAttribute('');

    
  }
}

const handleCancelAddAttribute = async() => {
  setShowAddAttributes(false);
  
  setAttributeName('');
    setAttributeValue('');
    setSelectedAttribute('');
  
}


// manage actions

const [showAddAction, setShowAddAction] = useState(false);

  //select Action
  const [selectedAction, setSelectedAction] = useState('');

  const allActions = [
    {
      name:"Set Participant Data",
      value: "Set Participant Data"
    },
    {
      name: "Route to",
      value: "Route to"
    },
    {
      name: "Voicemail",
      value: "Voicemail"
    },
    
  ]

  const handleChangeAction = (event) => {
    setSelectedAction(event.target.value);
  };
  const handleAddAction = async() => {
    if(selectedAction){
      try {
        // let opName = '';
        // { allOperators.map((item) => {
        //   if(selectedOperator === item.value){
        //     opName = item.name
        //     console.log(opName, 'opName')
        //   }
        // })}
        

      //   const response = await addOperators({packageid:String(selectedPackageId), packagename:"CTS-Package-Demo", operators:[
          
      //     {
      //       operatorid: String(Date.now()),
      //       operatorname: opName,
      //       operatorvalue: selectedOperator
      //     }
      //   ]
      // })
      setActionTableData((prevData) => [...prevData, { actionid: String(Date.now()), actionname: selectedAction}]);

      console.log(response, 'insert one action succe');
      setShowAddAction(false);
      OpenActions();
      setSuccessSB(true);


      }catch(error){
        console.log(error, 'error in adding an action')
        // setErrorSB(true)
      }
      
    }
    setSelectedAction('');
  }

  const handleCancelAddAction = async() => {
    setShowAddAction(false);
    setSelectedAction('');
    
  }

  

  return (
    
    <DashboardLayout>
      <DashboardNavbar packageid="123" />
      <MDBox py={3}> 
         <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1}>
               
              <ComplexStatisticsCard
                color="dark"
                icon="equalizer"
                title={<MDButton size="small" variant="outlined" color="success" onClick={OpenOperator}>
                {/* <Icon sx={{ fontWeight: "bold" }}>open eye</Icon> */}
                view
              </MDButton>}
                count={"Operators"}
                percentage={{color: "success",
                amount: "",
                label: "Manage all the operators",
                
              }}
              onClick={OpenOperator}
              
              />
                
                
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title={<MDButton size="small" variant="outlined" color="success" onClick={OpenAttributes}>
                {/* <Icon sx={{ fontWeight: "bold" }}>open eye</Icon> */}
                view
              </MDButton>}
                count="Attributes"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Manage all the attributes",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            {/* <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Manage"
                count="Actions"
                percentage={{
                  color: "success",
                  amount: "",
                  label: <MDButton size="small" variant="outlined" color="success">
                  Templates
                </MDButton>,
                }}
              />
            </MDBox> */}
            <MDBox mb={1}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title={<MDButton size="small" variant="outlined" color="success" onClick={OpenActions}>
                {/* <Icon sx={{ fontWeight: "bold" }}>open eye</Icon> */}
                view
              </MDButton>}
                count="Actions"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Manage all the actions",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="preview"
                title={<MDButton size="small" variant="outlined" color="success" onClick={OpenOverview}>
                {/* <Icon sx={{ fontWeight: "bold" }}>open eye</Icon> */}
                view
              </MDButton>}
                count="Overview"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "actions,operators, attributes",
                }}
              />
            </MDBox>
          </Grid>
        </Grid> 
        <div>
     
        </div>

        
         {/* <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>  */}

         {/* <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}
       </MDBox>
       {renderSuccessSB}
       {renderErrorSB}
       {showOperator? (
        <MDBox pt={3} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white" display="flex" justifyContent="space-between">
                  Operators Table

                  <MDBox display="flex" justifyContent="flex-end">
                  <MDButton size="small" variant="outlined" color="white"
                    onClick={() => setShowAddOperator(true)}
                    >
                    New - 2 Operator
                  </MDButton>
              </MDBox>
                  
                </MDTypography>

                
              </MDBox>
            

            {showAddOperator && (
              
                  <div>
                  <br/>
                  <MDBox  mx={2}
                mt={-3}
                py={3}
                px={2} >
                  <MDBox display="flex" justifyContent="space-between"> 

                  {/* <MDInput type="text" label="Name" value="" onChange="" />  */}
                        {/* <Box sx={{ minWidth: 120 }}>
                          <FormControl fullWidth>
                            
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={selectedOperator}
                              label="Operator"
                              onChange={handleChangeOperator}
                              placeholder="Select operator"
                            >
                              {allOperators.map((op) => {
                                {
                                  if(operatorTableData.length>0){
                                    operatorTableData.map((opTable) => {
                                      if (op.name != opTable.operatorname) {
                                        console.log(op.name, opTable.operatorname);
                                        <MenuItem value={op.value}>{op.name}</MenuItem>
                                      }
                                    })
                                  }
                                  else{
                                    <MenuItem value={op.value}>{op.name}</MenuItem>
                                  }
                                }
                              })}




                            </Select>
                          </FormControl>
                        </Box> */}
                        <select
                        value={selectedOperator}
                        onChange={handleChangeOperator}>
                          {allOperators.map((op) => (
                            <option value={op.value}>{op.name}</option>
                                // {
                                //   if(operatorTableData.length>0){
                                //     operatorTableData.map((opTable) => {
                                //       if (op.name != opTable.operatorname) {
                                //         console.log(op.name, opTable.operatorname);
                                //         <option value={op.value}>{op.name}</option>
                                //       }
                                //     })
                                //   }
                                //   else{
                                //     <option value={op.value}>{op.name}</option>
                                //   }
                                // }
                              ))}



                        </select>
                 
                  <MDBox display="flex" justifyContent="flex-end">
                    
                  <MDButton size="small" variant="gradient" color="success"
                    onClick={handleAddOperator}>
                    Save
                  </MDButton>
                  &nbsp;&nbsp;

                 
                  
                  {/* </Link> */}
                  
        
                  <MDButton size="small" variant="gradient" color="error"
                    onClick={handleCancelAddOperator}>
                    Cancel
                  </MDButton>
                  </MDBox>
                  </MDBox>
                  
                  </MDBox>
                  
        
        
                </div>
              
                )}

            
              <MDBox pt={3}>
                {/* <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                /> */}
                
                <DataTable
                table={{
                  columns: [
                    { Header: "ID", accessor: "operatorid", width: "15%" },
                    { Header: "Name", accessor: "operatorname", width: "20%" },
                    { Header: "Value", accessor: "operatorvalue", width: "20%" },
                    // { Header: "Actions", accessor: "actions", width: "25%", Cell: ActionsColumn },
                    // { Header: "age", accessor: "age", width: "12%" },
                  ],
                  rows: operatorTableData }}

                  // onRowClick={(rowData) => {
                  //   // Handle row click, e.g., navigate to a detail page
                  //   console.log("Row Clicked:", rowData);
                  // }}
                  />
              </MDBox>
            </Card>
          </Grid>

          
        </Grid>
      </MDBox>
       ): null}
       {showAttributes? (
        <MDBox pt={3} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white" display="flex" justifyContent="space-between">
                  Attributes Table

                  <MDBox display="flex" justifyContent="flex-end">
              <MDButton size="small" variant="outlined" color="white"
                    onClick={() => setShowAddAttributes(true)}
                    >
                    New Attribute
                  </MDButton>
              </MDBox>
                  
                </MDTypography>
                
              </MDBox>
              {showAddAttributes && (
                  <div>
                    <br />
                    <MDBox mx={2}
                      mt={-3}
                      py={3}
                      px={2} >
                      <MDBox display="flex" justifyContent="space-between">

                        <MDInput type="text" label="Name" value={attributeName} onChange={handleAttributeName} /> 
                        {/* <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedOperator}
                            label="Operator"
                            onChange={handleChangeOperator}
                            placeholder="Select operator"
                          >
                            {allOperators.map((op) => {
                              {
                                if(operatorTableData.length>0){
                                  operatorTableData.map((opTable) => {
                                    if (op.name != opTable.operatorname) {
                                      console.log(op.name, opTable.operatorname);
                                      <MenuItem value={op.value}>{op.name}</MenuItem>
                                    }
                                  })
                                }
                                else{
                                  <MenuItem value={op.value}>{op.name}</MenuItem>
                                }
                              }
                            })}




                          </Select>
                        </FormControl>
                      </Box> */}

                        <select
                          value={selectedAttribute}
                          onChange={handleSelectedAttribute}>
                            <option value=''>Select Type</option>
                                <option value="INT">Int</option>
                                <option value="BOOL">Boolean</option>
                                <option value="STRING">String</option>
                          {/* {allOperators.map((op) => (
                            <option value={op.value}>{op.name}</option>
                            // {
                            //   if(operatorTableData.length>0){
                            //     operatorTableData.map((opTable) => {
                            //       if (op.name != opTable.operatorname) {
                            //         console.log(op.name, opTable.operatorname);
                            //         <option value={op.value}>{op.name}</option>
                            //       }
                            //     })
                            //   }
                            //   else{
                            //     <option value={op.value}>{op.name}</option>
                            //   }
                            // }
                          ))} */}



                        </select>
                        <MDInput type="text" label="values" value={attributeValue} onChange={handleAttributeValue} />

                        <MDBox display="flex" justifyContent="flex-end">

                          <MDButton size="small" variant="gradient" color="success"
                            onClick={handleAddAttribute}>
                            Save
                          </MDButton>
                          &nbsp;&nbsp;

                          <MDButton size="small" variant="gradient" color="error"
                            onClick={handleCancelAddAttribute}>
                            Cancel
                          </MDButton>
                        </MDBox>
                      </MDBox>

                    </MDBox>



                  </div>
              )}

              <MDBox pt={3}>
              <DataTable
                table={{
                  columns: [
                    
                    {
                       Header: "Name", accessor: "name", width: "10%" },
                       { Header: "Type", accessor: "type", width: "10%" },
                    { Header: "Values", accessor: "values", width: "10%" },
                    // { Header: "Actions", accessor: "actions", width: "25%", Cell: ActionsColumn },
                    // { Header: "age", accessor: "age", width: "12%" },
                  ],
                  rows: attributesTableData }}

                  // onRowClick={(rowData) => {
                  //   // Handle row click, e.g., navigate to a detail page
                  //   console.log("Row Clicked:", rowData);
                  // }}
                  />
              </MDBox>
            </Card>
          </Grid>

          
        </Grid>
      </MDBox>
       ): null}
       {showActions? (
        <MDBox pt={3} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white" display="flex" justifyContent="space-between">
                  Actions Table
                  <MDBox display="flex" justifyContent="flex-end">
                  <MDButton size="small" variant="outlined" color="white"
                    onClick={() => setShowAddAction(true)}
                    >
                    New Action
                  </MDButton>
              </MDBox>
                  
                </MDTypography>

                
              </MDBox>
              {showAddAction && (
              
              <div>
              <br/>
              <MDBox  mx={2}
            mt={-3}
            py={3}
            px={2} >
              <MDBox display="flex" justifyContent="space-between"> 

              
                    <select
                    value={selectedAction}
                    onChange={handleChangeAction}>
                      {allActions.map((op) => (
                        <option value={op.value}>{op.name}</option>
                            
                          ))}

                    </select>
             
              <MDBox display="flex" justifyContent="flex-end">
                
              <MDButton size="small" variant="gradient" color="success"
                onClick={handleAddAction}>
                Save
              </MDButton>
              &nbsp;&nbsp;

             
              
              {/* </Link> */}
              
    
              <MDButton size="small" variant="gradient" color="error"
                onClick={handleCancelAddAction}>
                Cancel
              </MDButton>
              </MDBox>
              </MDBox>
              
              </MDBox>
              
    
    
            </div>
          
            )}

        
          <MDBox pt={3}>
            {/* <DataTable
              table={{ columns, rows }}
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={false}
              noEndBorder
            /> */}
            
            <DataTable
            table={{
              columns: [
                { Header: "ID", accessor: "actionid", width: "15%" },
                { Header: "Name", accessor: "actionname", width: "20%" },
                // { Header: "Value", accessor: "operatorvalue", width: "20%" },
                // { Header: "Actions", accessor: "actions", width: "25%", Cell: ActionsColumn },
                // { Header: "age", accessor: "age", width: "12%" },
              ],
              rows: actionTableData }}

              // onRowClick={(rowData) => {
              //   // Handle row click, e.g., navigate to a detail page
              //   console.log("Row Clicked:", rowData);
              // }}
              />
          </MDBox>
            </Card>
          </Grid>

          
        </Grid>
      </MDBox>
       ): null}
       {showOverview? (
        <MDBox pt={3} pb={3}>
          <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
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
                  Operator Table
                  
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
              </MDBox>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <MDBox
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
                  Attributes Table
                  
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
              </MDBox>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <MDBox
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
                  Action Table
                  
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
              </MDBox>
            </Card>
          </Grid>

          

          
        </Grid>
        
      </MDBox>
      
       ): null}

       
     {/* <Footer />  */}
    </DashboardLayout>
  
  );
}

export default Dashboard;
