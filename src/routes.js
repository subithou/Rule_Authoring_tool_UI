// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Rules from "layouts/rules";
import Packages from "layouts/packages";
import Import from "layouts/import";

import Decision from "layouts/rules/decision";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

import * as TbIcons from "react-icons/tb";
import * as BsIcons from "react-icons/bs";
import * as SiIcons from "react-icons/si";
import { CiImport } from "react-icons/ci";


// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Packages",
    key: "packages",
    icon: <TbIcons.TbPackages />,
    route: "/packages",
    component: <Packages />,
  },
  // <Icon fontSize="small">notifications</Icon> package original icon
  {
    type: "collapse",
    name: "Templates",
    key: "templates",
    icon: <SiIcons.SiGithubactions/>,
    route: "/templates",
    component: <Dashboard />,
    // child : [
    //   {
    //     name: "package 1"
    //   },
    //   {
    //     name: "package 2"
    //   }
    // ]

  },
  // {
  //   type: "collapse",
  //   name: "Rules",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/tables",
  //   component: <Tables />,
  // },
  
  // {
  //   type: "collapse",
  //   name: "Rules",
  //   key: "rules",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/rules",
  //   component: <Dashboard/>,
  // },
  // {
  //   type: "collapse",
  //   name: "Audit",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  {
    type: "collapse",
    name: "Rules",
    key: "rules",
    icon: <BsIcons.BsFileEarmarkRuledFill/>,
    route: "/rules",
    component: <Rules />,
  },
  {
    type: "collapse",
    name: "Import",
    key: "import",
    icon: <CiImport />,
    route: "/import",
    component: <Import />,
  },
  
  {
    type: "",
    name: "",
    key: "",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "packages/rules/decision_table",
    component: <Decision />,
  },

  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign In",
  //   key: "sign-in",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/authentication/sign-in",
  //   component: <SignIn />,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
];

export default routes;
