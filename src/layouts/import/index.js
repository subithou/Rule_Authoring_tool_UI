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
import TemplateDemo from "./TemplateDemo";
import AdvanceDemo from "./AdvanceDemo";
import axios from 'axios';
import UploadPage from "./UploadPage";

import BASE_URL from 'API/BASE_URL';
 


function Tables() {

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
      content="Sorry due to server issue, getting failed"
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
    setLoading(true)
    try {
      const formData = new FormData();
      formData.append('file', file);

      await axios.post(`${BASE_URL}/uploadxml`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // File uploaded successfully, you can add your logic here
      // alert('File uploaded successfully!');
      setTimeout(() => {
        setSuccessSB(true);
        setTitleContent('Successfully imported the file')
      })
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle error
      // alert('Error uploading file. Please try again.');
      setErrorSB(true);
      setTitleContent('Sorry, failed to import file')
    }

    setLoading(false);
    setFile(null);
  };



  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <UploadPage/> */}
      
      {/* <div> */}
      {/* <TemplateDemo/> */}
      {/* <AdvanceDemo/>
      </div> */}

      {loading ? (<Loading/>) : (
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
                <button onClick={handleUpload} type="button" className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

              
      
              
              
       
              
      
    </DashboardLayout>
  );
}

export default Tables;
