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
import { useEffect, useState } from "react";

import Example from "layouts/rules/Example";

import { PackageProvider } from "layouts/PackageContext";
import { usePackage } from "layouts/PackageContext";

// api for operators
import { addOperators, createOperators, deleteOperators, getOperators } from "API/OperatorsAPI";

// api for attributes
import { createVariables, deleteVariables, getVariables } from "API/AttributesAPI";

// api for actions 
import { createActionsAPi, createActiontable, deleteActions, getActionTable } from "API/ActionAPI";
import MDInput from "components/MDInput";

import { LuRefreshCw } from "react-icons/lu";

// select
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

// notification
import MDSnackbar from "components/MDSnackbar";

import Loading from "components/Loading";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  const [loading, setLoading] = useState(false);

  // for available packageid
  const  {selectedPackageId} = usePackage();
  console.log(selectedPackageId, 'inside actual dashboard');
// if chnage the package close all the open windows
  useEffect (() => {
    setShowOperator(false);
      setShowActions(false);
      setShowAttributes(false);
      setShowOverview(false);

      //operator
      setSelectedOperator('');
      setShowDeleteConfirmationOperator(false);
      setShowAddOperator(false);

      //atribute
    setAttributeName('');
    setAttributeValue('');
    setSelectedAttribute('');
    setShowAddAttributes(false);

  }, [selectedPackageId]);

  const [showDeleteConfirmationOperator, setShowDeleteConfirmationOperator] = useState(false);
  const [showDeleteConfirmationAttribute, setShowDeleteConfirmationAttribute] = useState(false);
  const [showDeleteConfirmationAction, setShowDeleteConfirmationAction] = useState(false);



  const [showOperator, setShowOperator] = useState(false);
  const [showAttributes, setShowAttributes] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [showTemplate, setShowTemplate] = useState(true);
  const [showRule, setShowRule] = useState(false);

  const OpenOperator = async() => {

    if (selectedPackageId != null) {
      setLoading(true);

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
          {
            responseOperator.map((operator) => {
              setOperatorTableData((prevData) => [...prevData, operator]);
            })
          }
          console.log(operatorTableData, 'op table data', response.data.Operators)
        }
      } catch (error) {
        console.log(error, 'while fetching operator');
        setErrorSB(true);
        setTitle('Failed to fetch operators');
        setContent('Due to server issue, not able to fetch');

      }
    setLoading(false);
    }else{
      setErrorSB(true);
      setTitle('Please select Package');
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

  //defineoperator
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
      name: "Not Equal",
      value: "!="
    },
    {
      name: "Equal",
      value: "="
    },
    {
      name: "Greaterthan or equal",
      value: ">="
    },
    {
      name: "Lessthan or equal",
      value: "<="
    },
    {
      name: "Contains",
      value: "Contains"
    },
    {
      name: "Substring",
      value: "Substring"
    },
    {
      name: "Replace",
      value: "Replace"
    },
    {
      name: "Find",
      value: "Find"
    }
  ]

  // select operator
  const [selectedOperator, setSelectedOperator] = useState('');


  const handleChangeOperator = (event) => {
    setSelectedOperator(event.target.value);
  };

  const unSelectedOperators = allOperators.filter(
    operator => !operatorTableData.some(stoperator => stoperator.operatorvalue === operator.value)
  );
  
// success notification 
const [title, setTitle] = useState('');
const [content, setContent] = useState('');

const [successSB, setSuccessSB] = useState(false);
const closeSuccessSB = () => {
  setSuccessSB(false);
  setTitle('');
  setContent('');
}

const renderSuccessSB = (
  <MDSnackbar
    color="success"
    icon="check"
    title={title}
    content={content}
    dateTime=""
    open={successSB}
    onClose={closeSuccessSB}
    close={closeSuccessSB}
    // bgWhite
  />
);

//error notification
const [errorSB, setErrorSB] = useState(false);
  const closeErrorSB = () => {
    setErrorSB(false);
    setTitle('');
    setContent('');
  }

const renderErrorSB = (
  <MDSnackbar
    color="error"
    icon="warning"
    title={title}
    content={content}
    dateTime=""
    open={errorSB}
    onClose={closeErrorSB}
    close={closeErrorSB}
    // bgWhite
  />
);

  // adding operator function
  const handleAddOperator = async() => {
    if(selectedPackageId != null){
      try {
        let opName = '';
        { allOperators.map((item) => {
          if(selectedOperator === item.value){
            opName = item.name
            console.log(opName, 'opName')
          }
        })}
        
        const response = await addOperators({packageid:String(selectedPackageId), 
          operator: 
          {
            operatorid: String(Date.now()),
            operatorname: opName,
            operatorvalue: selectedOperator
          }
        
      })
      console.log(response, 'insert one operator succe');
      setSuccessSB(true);
      setTitle('Successfully added an operator')

      }catch(error){
        console.log(error, 'error in adding an operator')
        setErrorSB(true)
        setTitle('Failed to add an operator');
        setContent('Due to server issue')
      }

      OpenOperator();
      setShowAddOperator(false);
      setSelectedOperator('');
      
    }else{
      console.log('select package')
      setErrorSB(true);
      setTitle('Please select package')
    }
  }


  const handleCancelAddOperator = async() => {
    setShowAddOperator(false);
    setSelectedOperator('');
    
  }

 // delete operator

 function DeleteColumn({ row }) {
  return (
    <MDBox
      onClick={() => handleDeleteRow(row.original.operatorid)}
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
const [deleteOperatorName, setDeleteOperatorName] = useState('');
function handleDeleteRow(rowId) {
  const name = operatorTableData.filter((row) => row.operatorid == rowId)
  console.log(rowId, 'delete operator', name);
  setDeleteOperatorName(name[0]);

  setShowDeleteConfirmationOperator(true);
}

const submitDeleteConfirmationOperator = async () => {
    setShowDeleteConfirmationOperator(false); 
    setLoading(true);

    try {
      const response = await deleteOperators(selectedPackageId, deleteOperatorName.operatorid);
      console.log(response, 'successfully deleted operator');
      setSuccessSB(true);
      setTitle('Successfully deleted Operator');
    } catch (error) {
      console.log(error, 'error in delete operator');
      setErrorSB(true);
      setTitle('Failed to delete operator');
      setContent('Due to server issue');

    }
    setLoading(false);    

    OpenOperator();
    setDeleteOperatorName('');
  
  }

const cancelDeleteConfirmationOperator = () => {
  setDeleteOperatorName('');
  setShowDeleteConfirmationOperator(false);
}



  // for attributes managing
  const [attributesTableData, setAttributesTableData] = useState([]);
  const OpenAttributes = async() => {
    setAttributesTableData([]);
    setLoading(true);

    if (selectedPackageId != null) {
      setShowOperator(false);
      setShowActions(false);
      setShowAttributes(true);
      setShowOverview(false);
      try {
        const response = await getVariables(selectedPackageId);
        console.log(response, 'get attributes')
        if (response.data.item.length > 0) {

          let responseAttributes = response.data.item;
          {
            responseAttributes.map((attributes) => {
              setAttributesTableData((prevData) => [...prevData, attributes]);
            })
          }
          console.log(attributesTableData, 'attri table data', response.data.item)
        }
      } catch (error) {
        console.log(error, 'error in get attributes')
      }
    } else {
      setErrorSB(true);
      setTitle('Please select package');      
    }
    setLoading(false);

    
  }

const [showAddAttributes, setShowAddAttributes] = useState(false);

const [validationMessage, setValidationMessage] = useState('');
const [validationMessageStatus, setvalidationMessageStatus] = useState(false)

// select attribute name,type,values
const [attributeName, setAttributeName] = useState('');
const handleAttributeName = (event) => {
  setAttributeName(event.target.value)
  const newName = event.target.value;

        // check the name already exist or not fro new creating name attribute
        const x = attributesTableData.some((item) => item.name == newName);
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

const [attributeValue, setAttributeValue] = useState('');
const handleAttributeValue = (event) => {
  setAttributeValue(event.target.value)
}

const [selectedAttribute, setSelectedAttribute] = useState('');
const handleSelectedAttribute = (event) => {
  setSelectedAttribute(event.target.value);
}

// const addSpaceAfterComma = (str) => {
//   return str.split(',').join(', ');
// };

const handleAddAttribute = async() => {
  setLoading(true);
  setShowAddAttributes(false);

  if(selectedAttribute, attributeName, attributeValue){
    try {
      // const processedArray = addSpaceAfterComma(attributeValue);

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
    
    
    setSuccessSB(true);
    setTitle('Successfully added an attribute');


    }catch(error){
      console.log(error, 'error in adding an attributes', {packageid:String(selectedPackageId), item: [{
        id: String(Date.now()),
        name: attributeName,
        type: selectedAttribute,
        values: attributeValue
      }] })
      setErrorSB(true);
      setTitle('Failed to add an attribute');
      setContent('Due to server issue')
    }

    OpenAttributes();

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

function ValuesCell({values}) {
  // const valuesWithSpaces = row.values.join(' ');
  console.log(values, 'row.values')
  return <div>{values.join(' ')}</div>;
}

function DeleteColumnAttribute({ row }) {
  return (
    <MDBox
      onClick={() => handleDeleteRowAttribute(row.original.id)}
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
const [deleteAttributeName, setDeleteAttributeName] = useState('');
function handleDeleteRowAttribute(rowId) {
  const name = attributesTableData.filter((row) => row.id == rowId)
  console.log(rowId, 'delete attribute', name);
  setDeleteAttributeName(name[0]);

  setShowDeleteConfirmationAttribute(true);
}

const submitDeleteConfirmationAttribute = async () => {
    setShowDeleteConfirmationAttribute(false); 
setLoading(true)
    try {
      const response = await deleteVariables(selectedPackageId, deleteAttributeName.id);
      console.log(response, 'successfully deleted attribute');
      setSuccessSB(true);
      setTitle('Successfully deleted an Attribute');
    } catch (error) {
      console.log(error, 'error in delete operator');
      setErrorSB(true);
      setTitle('Failed to delete an Attribute');
      setContent('Due to server issue');

    }
    setLoading(false);

    OpenAttributes();
    setDeleteAttributeName('');
  
  }

const cancelDeleteConfirmationAttribute = () => {
  setDeleteAttributeName('');
  setShowDeleteConfirmationAttribute(false);
}




// manage actions
const [selectedActionTableId, setSelectedActionTableID] = useState('');

const [actionTableData, setActionTableData] = useState([]);
  const OpenActions =  async() => {
    
    if(selectedPackageId != null){
      setShowOperator(false);
    setShowActions(true);
    setShowAttributes(false);
    setShowOverview(false);
    setLoading(true);
    try {

      const response = await getActionTable(String(selectedPackageId));
      console.log(response);
      if (response.data.length === 0) {
       console.log(response.data.length);
        try{
          let actiontbID = String(Date.now());
          const response = await createActiontable({packageid:selectedPackageId ,actiontablename: "ActionTable", actiontableid:actiontbID })
          console.log(response, 'successfully created actiontable');
          setSelectedActionTableID(actiontbID);
            setTimeout(() => {
              OpenActions();
            }, 3000)
        }
        catch(error){
          console.log(error, 'getting error for creating action table if not there')
        }
      }
      else{
        console.log(response.data[0].Actions)
        
        setActionTableData(response.data[0].Actions)
        setSelectedActionTableID(response.data[0].ActionTableID);
      }
    }catch(error){
      console.log(error, 'while fetching actions')
      setErrorSB(true);
      setTitle('Failed to fetch Actions')
      setContent('Due to server issue')

    }
    }else{
      setErrorSB(true);
      setTitle('Please select package')
    }
    
    setLoading(false);
  }

const [showAddAction, setShowAddAction] = useState(false);

  //select Action
  const [selectedAction, setSelectedAction] = useState('');

  const allActions = [
    {
      name: "Set Attribute",
      value: "Set Attribute"
    },
    {
      name: "Route to Queue",
      value: "Route to Queue"
    },
    {
      name: "Route to Voicemail",
      value: "Route to Voicemail"
    },
    {
      name: "Play Message",
      value: "Play Message"
    },
    {
      name: "Route External",
      value: "Route External"
    },
    {
      name: "Routing Method - Preferred",
      value: "Routing Method - Preferred"
    },
    {
      name: "Routing Method - Predictive",
      value: "Routing Method - Predictive"
    },
    {
      name: "Pause Recording",
      value: "Pause Recording"
    },
    {
      name: "Set Priority",
      value: "Set Priority"
    },
    {
      name: "Play holiday message",
      value: "Play holiday message"
    },
    {
      name: "Play closure message",
      value: "Play closure message"
    },
    {
      name: "Play emergency message",
      value: "Play emergency message"
    },
    {
      name: "Set skill",
      value: "Set skill"
    },
    {
      name: "Screen pop enable",
      value: "Screen pop enable"
    },
    {
      name: "Screen pop disable",
      value: "Screen pop disable"
    }
     
    
  ]

  const handleChangeAction = (event) => {
    setSelectedAction(event.target.value);
  };

  const unSelectedActions = allActions.filter(
    action => !actionTableData.some(staction => staction.action === action.name)
  );

  const handleAddAction = async() => {
    if(selectedAction){
      try {
        const response = await createActionsAPi(
          {
            packageid : selectedPackageId,
            actiontableid: selectedActionTableId,
            actions : [
              {
                actionid: String(Date.now()),
                action: selectedAction,
                value: selectedAction
              }
            ] 
            
          })
      // setActionTableData((prevData) => [...prevData, { actionid: String(Date.now()), actionname: selectedAction}]);

      console.log(response, 'insert one action succe');
      
      setSuccessSB(true);
      setTitle('Successfully added an Action')


      }catch(error){
        console.log(error, 'error in adding an action')
        setErrorSB(true)
        setTitle('Failed to add an Action');
        setContent('Due to server issue')
      }
      
    }
    setShowAddAction(false);
    OpenActions();
    setSelectedAction('');
  }

  const handleCancelAddAction = async() => {
    setShowAddAction(false);
    setSelectedAction('');
    
  }


  function DeleteColumnAction({ row }) {
    return (
      <MDBox
        onClick={() => handleDeleteRowAction(row.original.actionid)}
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
  const [deleteActionName, setDeleteActionName] = useState('');
  function handleDeleteRowAction(rowId) {
    const name = actionTableData.filter((row) => row.actionid == rowId)
    console.log(rowId, 'delete action', name);
    setDeleteActionName(name[0]);
  
    setShowDeleteConfirmationAction(true);
  }
  
  const submitDeleteConfirmationAction = async () => {
      setShowDeleteConfirmationAction(false); 
      setLoading(true)
      try {
        const response = await deleteActions(selectedPackageId, selectedActionTableId, deleteActionName.actionid);
        console.log(response, 'successfully deleted action');
        setSuccessSB(true);
        setTitle('Successfully deleted an Action');
      } catch (error) {
        console.log(error, 'error in delete action');
        setErrorSB(true);
        setTitle('Failed to delete an Action');
        setContent('Due to server issue');
  
      }
      setLoading(false);
  
      OpenActions();
      setDeleteActionName('');
    
    }
  
  const cancelDeleteConfirmationAction = () => {
    setDeleteActionName('');
    setShowDeleteConfirmationAction(false);
  }

  
const processedAttributeTableData = attributesTableData.map(item => ({
  ...item, values: item.values.join(' ')
}));

  return (
    
    <DashboardLayout>
      <DashboardNavbar packageid="123" />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1}>

              <ComplexStatisticsCard
                color="dark"
                icon="percent"
                title={<MDButton size="small" variant="outlined" color="success" onClick={OpenOperator}>
                  {/* <Icon sx={{ fontWeight: "bold" }}>open eye</Icon> */}
                  view
                </MDButton>}
                count="Operators"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Manage all the operators",

                }}
                onClick={OpenOperator}

              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1}>
              <ComplexStatisticsCard
                icon="dataset"
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
          <Grid item xs={12} md={6} lg={4}>
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
                icon="rulefolder"
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

        </Grid>
        <div>
        </div>

      </MDBox>

      {showDeleteConfirmationOperator ? (
            <><div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
            <form onSubmit={submitDeleteConfirmationOperator}>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex text-red-500 font-bold items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
         

              Delete Operator
              


                            </div>

                            <div className="relative p-3 flex-auto">
                                <p className="my-4 text-sm late-500 text-md leading-relaxed">
                                    <div className="mt-2">
                                      <p className="text-s ml-2 text-gray-500 text-justify whitespace-pre-line">
                                        Are you sure want to delete the operator -<b> {deleteOperatorName.operatorname}</b> ? 
                                        <br/>It will be permanently removed. This action cannot be undone.
                                        
                                      </p>
                                    </div>
                                
                                </p>
                            </div>

                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="text-black-500 border rounded-lg font-semibold  px-4 py-2 text-sm  mr-1 mb-1 ease-linear"
                                    type="button"
                                    onClick={cancelDeleteConfirmationOperator}
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
      {showDeleteConfirmationAttribute ? (
            <><div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
            <form onSubmit={submitDeleteConfirmationAttribute}>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex text-red-500 font-bold items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
         

              Delete Attribute
              


                            </div>

                            <div className="relative p-3 flex-auto">
                                <p className="my-4 text-sm late-500 text-md leading-relaxed">
                                    <div className="mt-2">
                                      <p className="text-s ml-2 text-gray-500 text-justify whitespace-pre-line">
                                        Are you sure want to delete the attribute -<b> {deleteAttributeName.name}</b> ? 
                                        <br/>It will be permanently removed. This action cannot be undone.
                                        
                                      </p>
                                    </div>
                                
                                </p>
                            </div>

                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="text-black-500 border rounded-lg font-semibold  px-4 py-2 text-sm  mr-1 mb-1 ease-linear"
                                    type="button"
                                    onClick={cancelDeleteConfirmationAttribute}
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
      {showDeleteConfirmationAction ? (
            <><div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
            <form onSubmit={submitDeleteConfirmationAction}>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex text-red-500 font-bold items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
         

              Delete Action
              


                            </div>

                            <div className="relative p-3 flex-auto">
                                <p className="my-4 text-sm late-500 text-md leading-relaxed">
                                    <div className="mt-2">
                                      <p className="text-s ml-2 text-gray-500 text-justify whitespace-pre-line">
                                        Are you sure want to delete the aaction -<b> {deleteActionName.action}</b> ? 
                                        <br/>It will be permanently removed. This action cannot be undone.
                                        
                                      </p>
                                    </div>
                                
                                </p>
                            </div>

                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="text-black-500 border rounded-lg font-semibold  px-4 py-2 text-sm  mr-1 mb-1 ease-linear"
                                    type="button"
                                    onClick={cancelDeleteConfirmationAction}
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
      {renderSuccessSB}
      {renderErrorSB}
      {showOperator ? (
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
                        New Operator
                      </MDButton>
                      &nbsp;&nbsp;
                          <MDButton size="small" variant="outlined" color="white"
                            onClick={OpenOperator}
                            >
                           <b><LuRefreshCw /></b>&nbsp; Refresh
                          </MDButton>
                    </MDBox>

                  </MDTypography>


                </MDBox>


                {showAddOperator && (

                  <div>
                    <br />
                    <MDBox mx={2}
                      mt={-3}
                      py={3}
                      px={2} >
                      <MDBox display="flex" >


                        <select className="mt-1 p-2 border rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300 bg-transparent"
                          value={selectedOperator}
                          onChange={handleChangeOperator}>
                          <option value="" disabled>Select Operator</option>
                          {unSelectedOperators.map((op) => (
                            <option value={op.value}>{op.name}</option>

                          ))}
                        </select>
                        &nbsp;&nbsp;&nbsp;
                        <MDBox display="flex" justifyContent="space-between">
                        <MDBox display="flex" justifyContent="flex-end">

                          {selectedOperator != '' ? (
                            <MDButton size="small" variant="gradient" color="success"
                              onClick={handleAddOperator}>
                              Add
                            </MDButton>
                          ) : null}

                          &nbsp;&nbsp;

                          <MDButton size="small" variant="gradient" color="error"
                            onClick={handleCancelAddOperator}>
                            Cancel
                          </MDButton>
                        </MDBox>
                        </MDBox>
                      </MDBox>

                    </MDBox>



                  </div>

                )
                }


                <MDBox pt={3}>
                  {/* <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                /> */}

                  {loading ? (<Loading />) : (
                    <DataTable
                      table={{
                        columns: [
                          { Header: "ID", accessor: "operatorid", width: "10%" },
                          { Header: "Name", accessor: "operatorname", width: "10%" },
                          { Header: "Value", accessor: "operatorvalue", width: "10%" },
                          { Header: "Delete", accessor: "delete", width: "10%", Cell: DeleteColumn },
                          // { Header: "Actions", accessor: "actions", width: "25%", Cell: ActionsColumn },
                          // { Header: "age", accessor: "age", width: "12%" },
                        ],
                        rows: operatorTableData
                      }}


                    // onRowClick={(rowData) => {
                    //   // Handle row click, e.g., navigate to a detail page
                    //   console.log("Row Clicked:", rowData);
                    // }}
                    />
                  )}
                  
                </MDBox>
              </Card>
            </Grid>


          </Grid>
        </MDBox>
      ) : null}
      {showAttributes ? (
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
                      &nbsp;&nbsp;
                          <MDButton size="small" variant="outlined" color="white"
                            onClick={OpenAttributes}
                            >
                           <b><LuRefreshCw /></b>&nbsp; Refresh
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
                      <MDBox display="flex" >

                        <MDInput type="text" label="Name" value={attributeName} onChange={handleAttributeName} />
                        &nbsp;&nbsp;
                        <select className="mt-1 p-2 border rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300 bg-transparent"
                          value={selectedAttribute}
                          onChange={handleSelectedAttribute}>
                          <option value='' disabled>Select Type</option>
                          <option value="INT">Number</option>
                          <option value="STRING">String</option>
                          <option value="BOOL">Boolean</option>                          
                          <option value="Currency">Currency</option>
                          <option value="Date/Time">Date/Time</option>
                        </select>
                        &nbsp;&nbsp;
                        <MDInput type="text" label="values" value={attributeValue} onChange={handleAttributeValue} />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <MDBox display="flex" justifyContent="space-between">
                        <MDBox display="flex" justifyContent="flex-end">

                          {attributeName != '' && selectedAttribute != '' && attributeValue != '' && validationMessageStatus != true ? (
                            <MDButton size="small" variant="gradient" color="success"
                            onClick={handleAddAttribute}>
                            Add
                          </MDButton>
                          ): null}

                          &nbsp;&nbsp;

                          <MDButton size="small" variant="gradient" color="error"
                            onClick={handleCancelAddAttribute}>
                            Cancel
                          </MDButton>
                        </MDBox>
                        </MDBox>
                        
                      </MDBox>
                      {validationMessage} 
                      
                    </MDBox>



                  </div>
                )}

                <MDBox pt={3}>
                {loading ? (<Loading />) : (
                  <DataTable
                    table={{
                      columns: [

                        {
                          Header: "Name", accessor: "name", width: "10%"
                        },
                        { Header: "Type", accessor: "type", width: "10%" },
                        { Header: "Values", accessor: "values", width: "10%" },
                        { Header: "Delete", accessor: "delete", width: "10%", Cell: DeleteColumnAttribute },
                        // { Header: "Actions", accessor: "actions", width: "25%", Cell: ActionsColumn },
                        // { Header: "age", accessor: "age", width: "12%" },
                      ],
                      // rows: attributesTableData
                      rows: processedAttributeTableData
                    }}

                  // onRowClick={(rowData) => {
                  //   // Handle row click, e.g., navigate to a detail page
                  //   console.log("Row Clicked:", rowData);
                  // }}
                  />)}

                </MDBox>
              </Card>
            </Grid>


          </Grid>
        </MDBox>
      ) : null}
      {showActions ? (
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
                      &nbsp;&nbsp;
                          <MDButton size="small" variant="outlined" color="white"
                            onClick={OpenActions}
                            >
                           <b><LuRefreshCw /></b>&nbsp; Refresh
                          </MDButton>
                    </MDBox>

                  </MDTypography>


                </MDBox>
                {showAddAction && (

                  <div>
                    <br />
                    <MDBox mx={2}
                      mt={-3}
                      py={3}
                      px={2} >
                      <MDBox display="flex" >


                        <select className="mt-1 p-2 border rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300 bg-transparent"
                          value={selectedAction}
                          onChange={handleChangeAction}>
                          <option value="" disabled>Select Action</option>
                          {unSelectedActions.map((op) => (
                            <option value={op.value}>{op.name}</option>

                          ))}

                        </select>
                        &nbsp;&nbsp;&nbsp;
                        <MDBox display="flex" justifyContent="space-between">
                        <MDBox display="flex" justifyContent="flex-end">

                          {selectedAction != '' ? (
                            <MDButton size="small" variant="gradient" color="success"
                            onClick={handleAddAction}>
                            Save
                          </MDButton>
                          ):null}
                          &nbsp;&nbsp;



                          {/* </Link> */}


                          <MDButton size="small" variant="gradient" color="error"
                            onClick={handleCancelAddAction}>
                            Cancel
                          </MDButton>
                        </MDBox>
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
{loading ? (<Loading />) : (
                  <DataTable
                    table={{
                      columns: [
                        { Header: "ID", accessor: "actionid", width: "10%" },
                        { Header: "Name", accessor: "action", width: "10%" },
                        // { Header: "Value", accessor: "value", width: "10%" },
                        { Header: "Delete", accessor: "delete", width: "10%", Cell: DeleteColumnAction },
                        // { Header: "Value", accessor: "operatorvalue", width: "20%" },
                        // { Header: "Actions", accessor: "actions", width: "25%", Cell: ActionsColumn },
                        // { Header: "age", accessor: "age", width: "12%" },
                      ],
                      rows: actionTableData
                    }}

                  // onRowClick={(rowData) => {
                  //   // Handle row click, e.g., navigate to a detail page
                  //   console.log("Row Clicked:", rowData);
                  // }}
                  />
)}
                </MDBox>
              </Card>
            </Grid>


          </Grid>
        </MDBox>
      ) : null}
      {showOverview ? (
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

      ) : null}

      {/* <Footer />  */}
    </DashboardLayout>
  
  );
}

export default Dashboard;
