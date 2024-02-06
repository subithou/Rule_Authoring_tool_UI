/**

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";


// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";


import MDButton from "components/MDButton";
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';



// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";


// import for available packageid
import { usePackage } from "layouts/PackageContext";
import { PackageProvider } from "layouts/PackageContext";

// calling api for get packages
import { getpackages } from "API/PackageAPI";


function DashboardNavbar({ absolute, light, isMini, packageid }) {
  const [age, setAge] = useState('');
  const {selectedPackageId, setPackageId} = usePackage();


  const handlePackageChange = (event) => {
    const packageId = event.target.value;
    console.log('inside dashboard before', packageId);
    setPackageId(packageId);
    console.log('inside dashboard after', packageId);
  };
 
// console.log('packageid', packageid);

  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);


  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);

    fetchPackages();

  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<Icon>email</Icon>} title="notif 1" />
      <NotificationItem icon={<Icon>podcasts</Icon>} title="notif2" />
      <NotificationItem icon={<Icon>shopping_cart</Icon>} title="notif3" />
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  useEffect(() => {

    fetchPackages();
    
}, []);
const[allPackages, setAllPackages] =  useState([]);

const fetchPackages = async () => {
  
    setAllPackages([]);
   
    try {
        const response = await getpackages();
        
        console.log(response);
        setAllPackages(response);
       
    } catch (error) {
        console.error('Error fetching data:', error);
        
       
    }
 
};

  return (
    
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
          {/* <MDButton size="small" variant="gradient" color="light">
            Package - */}
            {/* <select className="mt-1 p-2 border rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300 bg-transparent"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedPackageId}
              label="Package "
              onChange={handlePackageChange}
            >
              <option value="0" disabled selected>Select Package</option>
              <option value="1702665896795">CTS-Package-Demo</option>
              <option value="1701338667074">PackageTestFinal1</option>
              <option value="p3id">Package3</option>
            </select> */}

          {/* </MDButton> */}

          
        
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            {/* <MDBox pr={1}>
              <MDInput label="Search here" />

            </MDBox> */}
          {route == 'packages' ? null: (
            <select className="mt-1 p-2 border rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300 "
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedPackageId}
            label="Package "
            onChange={handlePackageChange}
          >
            <option value="0" disabled selected>Select Package</option>
            {/* <option value="1702665896795">CTS-Package-Demo</option>
            <option value="1701338667074">PackageTestFinal1</option>
            <option value="p3id">Package3</option> */}
            {allPackages.map((item) => (
              <option value={item.packageid}>{item.packagename}</option>
            ))}
          </select>
          )}
            
            <MDBox color={light ? "white" : "inherit"}>

            

            &nbsp; 
           {/* <Link to='packages'>
           <MDButton size="small" variant="gradient" color="dark">
              Templates
              </MDButton>
            </Link> */}
           

        {/* &nbsp;
        <Link to='/packages/rules'>
        <MDButton size="small" variant="gradient" color="dark" >
          Rules
        </MDButton>
        </Link> */}

        


        
 
              {/* <Link to="/authentication/sign-in/basic">
                <IconButton sx={navbarIconButton} size="small" disableRipple>
                  <Icon sx={iconsStyle}>account_circle</Icon>
                  
                </IconButton>
              </Link>

              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon sx={iconsStyle}>settings</Icon>
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <Icon sx={iconsStyle}>notifications</Icon>
              </IconButton>
              {renderMenu()} */}
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
   
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
