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
    name: "Rule Packages",
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
    icon: <SiIcons.SiGithubactions />,
    route: "/templates",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Rules",
    key: "rules",
    icon: <BsIcons.BsFileEarmarkRuledFill />,
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
];

export default routes;
