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

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

import MDButton from "components/MDButton";
import { useLocation, Link } from "react-router-dom";


import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useState, useEffect } from "react";
import MouseOverPopover from "./MouseOverPopover";


function Tables() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();

  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MouseOverPopover/>
      {/* <MDButton size="small" variant="gradient" color="dark" > */}
     
               {/* Add Condition */}
               {/* <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                  value={age}
                  label="Package "
                  onChange={handleChange}                  
                  >
              <MenuItem value={10}>Condition 1</MenuItem>
                    <MenuItem value={20}>Condition 2</MenuItem>
                    <MenuItem value={30}>Condition 3</MenuItem>
                    </Select> */}
              {/* </MDButton> */}
              &nbsp;&nbsp;&nbsp;
              <MDButton size="small" variant="gradient" color="dark">
               Add Action
               {/* <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                  value={age}
                  label="Package "
                  onChange={handleChange}                  
                  >
              <MenuItem value={80}>Set Participant Data</MenuItem>
                    <MenuItem value={90}>Route to</MenuItem>
                    <MenuItem value={100}>Disconnect</MenuItem>
                    <MenuItem value={130}>voice mail</MenuItem>
                    </Select> */}
              </MDButton>

              
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
                <MDTypography variant="h6" color="white">

                  Linear Rule
                
                 
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
      
    </DashboardLayout>
  );
}

export default Tables;
