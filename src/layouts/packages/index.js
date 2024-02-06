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
import DataTable from "examples/Tables/DataTable";

import { LuRefreshCw } from "react-icons/lu";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { useLocation, Link } from "react-router-dom";


import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useState, useEffect } from "react";
import MouseOverPopover from "./MouseOverPopover";
import Icon from "@mui/material/Icon";
import MDSnackbar from "components/MDSnackbar";

// calling API's
 import { getpackages, createPackage, deletePackage } from "API/PackageAPI";

 //loading import
 import Loading from "components/Loading";


function Tables() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();

  const [loading, setLoading] = useState(false);

  // to display delete confirmation
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // success notification 
const [titleContent, setTitleContent] = useState('');

const [successSB, setSuccessSB] = useState(false);
const closeSuccessSB = () =>{
  setTitleContent('');
  setSuccessSB(false);
} 

const renderSuccessSB = (
  <MDSnackbar
    color="success"
    icon="check"
    title={titleContent}
    content=""
    dateTime=""
    open={successSB}
    onClose={closeSuccessSB}
    close={closeSuccessSB}
    // bgWhite
  />
);

//error notification
const [errorSB, setErrorSB] = useState(false);

const closeErrorSB = () =>{
  setErrorSB(false);
  setTitleContent('');
} 

const renderErrorSB = (
  <MDSnackbar
    color="error"
    icon="warning"
    title={titleContent}
    content="Sorry due to server issue, getting failed"
    dateTime=""
    open={errorSB}
    onClose={closeErrorSB}
    close={closeErrorSB}
    // bgWhite
  />
);


  // check the name duplication
const [validationMessage, setValidationMessage] = useState('');
const [validationMessageStatus, setvalidationMessageStatus] = useState(false)


  const [packageName, setPackageName] = useState('');
  
  const handleChangePackageName = (event) =>{
    setPackageName(event.target.value);
    const newName = event.target.value;

        // check the name already exist or not fro new creating name

        const x = allPackages.some((item) => item.packagename === newName);
        if (x) {
            // console.log('exist')
            setValidationMessage(<span className="text-sm text-red-500"><i class="bi bi-x"></i> Already exist </span>)
            setvalidationMessageStatus(true)
        } else {
            // console.log('notexist')
            setValidationMessage(<span className="text-sm text-green-500"><i class='bi bi-check-lg'></i> Available</span>)
            setvalidationMessageStatus(false)

        }
  }

  const [showCreatePackage, setShowCreatePackage] = useState(false);

  const [allPackages, setAllPackages] = useState([]);

  const submit = async() => {
    setLoading(true);

    const id = String(Date.now());
    // setAllPackages((prevData) => [...prevData, {packageid: id, packagename: packageName}]);

    try {
      let name = {packageid: id, packagename: packageName}
      const newName = await createPackage(name);

      console.log(newName, 'succesfully created Package');
      fetchPackages();
      setSuccessSB(true); // for snack bar success
      setTitleContent('Successfully created a package');
   
    } catch (error) {
      console.error('Error creating the package:', error);
      setErrorSB(true); // for error snack bar
      setTitleContent('Failed to create package');

    }
    setPackageName('');
    setShowCreatePackage(false);
    setValidationMessage('');
    setvalidationMessageStatus(false);
    setLoading(false);

  }

  const cancelCreatePackage = () => {
    setShowCreatePackage(false);
    setPackageName('');
    setValidationMessage('');
    setvalidationMessageStatus(false);
  }


useEffect(() => {

    fetchPackages();
    
}, []);

const fetchPackages = async () => {
  setLoading(true);
    setAllPackages([]);
   
    try {
        const response = await getpackages();
        
        console.log(response);
        setAllPackages(response);
       
    } catch (error) {
        console.error('Error fetching data:', error);
        setErrorSB(true);
        setTitleContent('Failed to load packages')
       
    }
  setLoading(false)
};

function DeleteColumn({ row }) {
  return (
    <MDBox
      onClick={() => handleDeleteRow(row.original.packageid)}
      style={{ cursor: "pointer" }}
    >
      <MDBox display="flex" alignItems="" mt={{ xs: 2, sm: 0 }} ml={{ xs: 0, sm: 0 }}>
            <MDBox mr={1}>
              <MDButton variant="text" color="error">
                <Icon>delete</Icon>&nbsp;delete
              </MDButton>
            </MDBox>
            
          </MDBox>
    </MDBox>
  );
}

// ...
const [deletePackageName, setDeletePackageName] = useState('');
function handleDeleteRow(rowId) {
  console.log(rowId, 'delete package');
  const name = allPackages.filter((row) => row.packageid == rowId)
  setDeletePackageName(name[0]);

  setShowDeleteConfirmation(true);
}

const cancelDeleteConfirmation = () => {
  setDeletePackageName('');
  setShowDeleteConfirmation(false);
}

const submitDeleteConfirmation = async() => {
  setShowDeleteConfirmation(false);
  setLoading(true);

  try {
    const deleteResponse = await deletePackage(deletePackageName.packageid);
    console.log('deleted package', deleteResponse);
    setSuccessSB(true);
    setTitleContent('Successfully deleted the package')

  } catch (error) {
    console.error('Error deleting the package:', error);
    setErrorSB(true);
    setTitleContent('Failed to delete the package')
  }

  setDeletePackageName('');
  
  
  // calling all the packages
  await fetchPackages();
}




  return (
    <DashboardLayout>
      <DashboardNavbar />
      
      
              

              
      
              
              {loading ? (<Loading/>): (
                <MDBox pt={6} pb={3}>
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
        
                          Packages
                          
                          <MDBox display="flex" justifyContent="flex-end">
                          <MDButton size="small" variant="outlined" color="white"
                            onClick={() => setShowCreatePackage(true)}
                            >
                            New Package
                          </MDButton>
                          &nbsp;&nbsp;
                          <MDButton size="small" variant="outlined" color="white"
                            onClick={fetchPackages}
                            >
                           <b><LuRefreshCw /></b>&nbsp; Refresh
                          </MDButton>
                          
                          
                      </MDBox>
                         
                        </MDTypography>
                      </MDBox>
        
        
                      {showCreatePackage ? (
                      <div>
                        <br />
                        <MDBox mx={2}
                          mt={-3}
                          py={3}
                          px={2} >
                          <MDBox display="flex" justifyContent="space-between">
        
                            <MDInput type="text"  className="mt-1 p-2 text-sm" label="Package Name" value={packageName} onChange={handleChangePackageName} />
                            
                            <MDBox display="flex" justifyContent="flex-end">
        
                            
                              <MDButton size="small" variant="gradient" color="success"
                                onClick={submit}>
                                Add
                              </MDButton>
                              &nbsp;&nbsp;
        
                              <MDButton size="small" variant="gradient" color="error"
                                onClick={cancelCreatePackage}>
                                Cancel
                              </MDButton>
                            </MDBox>
                          </MDBox>
                          {validationMessage}
        
                        </MDBox>
        
                      </div>
                      
                      ): null }
        
              {renderSuccessSB}
               {renderErrorSB}
                      <MDBox pt={3}>

                <DataTable
                table={{
                  columns: [
                    { Header: "ID", accessor: "packageid", width: "10%" },
                    { Header: "Name", accessor: "packagename", width: "20%" },
                    { Header: "Delete", accessor: "delete", width: "10%", Cell: DeleteColumn },
                    // { Header: "Value", accessor: "operatorvalue", width: "20%" },
                    // { Header: "Actions", accessor: "actions", width: "25%", Cell: ActionsColumn },
                    // { Header: "age", accessor: "age", width: "12%" },
                  ],
                  rows: allPackages }}

                  // onRowClick={(rowData) => {
                  //   // Handle row click, e.g., navigate to a detail page
                  //   console.log("Row Clicked:", rowData);
                  // }}
                  />
                  </MDBox>
            </Card>
          </Grid>
          {showDeleteConfirmation ? (
            <><div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
            <form onSubmit={submitDeleteConfirmation}>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex text-red-500 font-bold items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
         

              Delete Package
              


                            </div>

                            <div className="relative p-3 flex-auto">
                                <p className="my-4 text-sm late-500 text-md leading-relaxed">
                                    <div className="mt-2">
                                      <p className="text-s ml-2 text-gray-500 text-justify whitespace-pre-line">
                                        Are you sure want to delete the package -<b> {deletePackageName.packagename}</b> ? 
                                        All of your data <br/>will be permanently removed. This action cannot be undone.
                                        
                                      </p>
                                    </div>
                                
                                </p>
                            </div>

                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="text-black-500 border rounded-lg font-semibold  px-4 py-2 text-sm  mr-1 mb-1 ease-linear"
                                    type="button"
                                    onClick={cancelDeleteConfirmation}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-red-500  text-sm  text-white font-semibold py-2 px-4 rounded-lg mx-2 flex items-center space-x-2"
                                    type="submit"

                                >
                                    Delete
                                </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </form>
            </div>
        </>
          ): null}
          {/* <Grid item xs={12}>
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
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid> */}
        </Grid>
      </MDBox>
                  )}
              
      
    </DashboardLayout>
  );
}

export default Tables;
