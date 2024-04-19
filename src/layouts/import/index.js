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
 import { createActiontable } from "API/ActionAPI";

 //loading import
 import Loading from "components/Loading";
 import LoadingComponent from "components/LoadingComponent";
import TemplateDemo from "./TemplateDemo";
import AdvanceDemo from "./AdvanceDemo";
import axios from 'axios';
import UploadPage from "./UploadPage";

import BASE_URL from 'API/BASE_URL';
 


function Tables() {
  const [showRollbackConfirmation, setShowRollbackConfirmation] = useState(false);

  const [loading, setLoading] = useState(false);
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
      content=""
      dateTime=""
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      // bgWhite
    />
  );
 
  
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    setShowRollbackConfirmation(false);
    if (!file) {
      // alert('Please select a file to upload');
      setErrorSB(true);
      setTitleContent('Please select a file to upload');
      
    }else{
      try {
        const formData = new FormData();
        formData.append('file', file);
  
        await axios.post(`${BASE_URL}/uploadxml`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setLoading(true);
  
        // File uploaded successfully, you can add your logic here
        // alert('File uploaded successfully!');
        
  
          setTimeout(() => {
            setLoading(false);
            console.log('20second after');
            setSuccessSB(true);
          setTitleContent('Successfully imported the file');
          }, 20000);
  
      } catch (error) {
        console.error('Error uploading file:', error);
        // Handle error
        // alert('Error uploading file. Please try again.');
        setErrorSB(true);
        setTitleContent('Sorry, failed to import file')
      }

    }
    

    
    setFile(null);
  };

  const openUploadConfirmation = () => {
    
    if (!file) {
      // alert('Please select a file to upload');
      setErrorSB(true);
      setTitleContent('Please select a file to upload');
      
    }else{
      setShowRollbackConfirmation(true);
    }
  }

  const cancelUploadConfirmation = () => {
    setShowRollbackConfirmation(false);
   
  }


  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <UploadPage/> */}
      
      {/* <div> */}
      {/* <TemplateDemo/> */}
      {/* <AdvanceDemo/>
      </div> */}
  {renderSuccessSB}
               {renderErrorSB}
      {loading ? (<LoadingComponent/>) : (
        <div className="min-v-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Upload XML File</h2>
          <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                  Select XML File
                </label>
                <div className="mt-1 flex items-center">
                  <input id="file" name="file" type="file" className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={handleFileChange} />
                </div>
              </div>

              <div className="flex items-center justify-end">
                <button onClick={openUploadConfirmation}  type="button" className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Upload
                  
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

              
{showRollbackConfirmation ? (
            <><div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
            <form onSubmit={handleUpload}>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex text-red-500 font-bold items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
         

              Import the XML File
              


                            </div>

                            <div className="relative p-3 flex-auto">
                                <p className="my-4 text-sm late-500 text-md leading-relaxed">
                                    <div className="mt-2">
                                      <p className="text-s ml-2 text-gray-500 text-justify whitespace-pre-line">
                                        Are you sure want to import the XML file ?    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/><br/>
                                        * Importing the XML file will take some time to process. <br/>
                                        * Please do not refresh the page or close the browser. <br/>
                                        * You will be notified once the process is completed. <br/>
                                        
                                        {/* All of your data <br/>will be permanently removed. This action cannot be undone. */}
                                        
                                      </p>
                                    </div>
                                
                                </p>
                            </div>

                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="text-black-500 border rounded-lg font-semibold  px-4 py-2 text-sm  mr-1 mb-1 ease-linear"
                                    type="button"
                                    onClick={cancelUploadConfirmation}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-blue-500  text-sm  text-white font-semibold py-2 px-4 rounded-lg mx-2 flex items-center space-x-2"
                                    type="submit"

                                >
                                    Import
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
              
              
       
              
      
    </DashboardLayout>
  );
}

export default Tables;
