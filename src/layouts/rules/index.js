import { Dropdown } from 'primereact/dropdown';

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

import Icon from "@mui/material/Icon";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

import MDButton from "components/MDButton";
import { useLocation, Link } from "react-router-dom";
import { useState, useRef, useEffect, useMemo } from "react";
import Example from "layouts/rules/Example";
import MDInput from "components/MDInput";

//pop
import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// import for available packageid
import { usePackage } from "layouts/PackageContext";
import { PackageProvider } from "layouts/PackageContext";


// api for operators
import { addOperators, createOperators, deleteOperators, getOperators } from "API/OperatorsAPI";

// api for attributes
import { createVariables, deleteVariables, getVariables } from "API/AttributesAPI";

//api for actions
import { createActionsAPi, createActiontable, deleteActions, getActionTable } from "API/ActionAPI";

import MDSnackbar from "components/MDSnackbar";
import { createLinearRule } from 'API/RuleAPI';
import { getLinearRule } from 'API/RuleAPI';
import Loading from "components/Loading";
import { updateLinearRule } from 'API/RuleAPI';


import { LuRefreshCw } from "react-icons/lu";
import { createDecisionTable } from 'API/RuleAPI';
import { addDecisionRules } from 'API/RuleAPI';
import { getDecisionRule } from 'API/RuleAPI';
import { SettingsSystemDaydreamSharp } from '@mui/icons-material';


function Tables() {

  const SMChange = (selectedOption, actionMeta) => {
    console.log('selected action', selectedOption);
    console.log('action meta', actionMeta);
  }

  // for pop over 
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  const [tempAllData, setTempAllData] = useState([]);

  
  const [loading, setLoading] = useState(false);


  // for available packageid
  const { selectedPackageId } = usePackage();
  console.log(selectedPackageId, 'inside rule');
  

// for rollback confirmmation

const [showRollbackConfirmation, setShowRollbackConfirmation] = useState(false);


  //if any change is happpen in package need to reload
  useEffect (() => {
    setLinearRuleData([]);
    setActionData([]);
    setConditions([])
    setConditionData({});
    setLRCurrentVersion(false);

    setShowLinearRule(false);

    setLinearRuleData([]);
    setInputName('');
    setInputDescription('');
    setInputCategory('');

    setShowAddLinearName(false);
    setLR(false);
    setDT(false);


    FetchAllRules();
    
  }, [selectedPackageId]);

// loading the rules whne the page load and package change
//   useEffect(() => {
//     fetchLinearRule();
// }, []);


const FetchAllRules = async () => {
  setTableData([]);
  setFinalLR([]);
  await fetchLinearRule();
  await fetchDecisionRule();
}

const [LRCurrentVersion, setLRCurrentVersion] = useState(false);

  const fetchLinearRule = async () => {
    setLoading(true);
    // setTableData([]);
    // setFinalLR([]);

    if(selectedPackageId != null){
      try {

        const response = await getLinearRule(selectedPackageId);
  
        console.log(response, "successfully fetchedapi get linear rule ");
        console.log(response.data, "fetched api get linear rule ");
  
        // Parse the API response
        /* Response data from the API */;
        const responseData =response.data;
        
  
        // Initialize an empty array to store transformed data
        const transformedData = [];
  
        // Iterate over the response data
        responseData.forEach(rule => {
          // Sort RuleData array by Version in descending order
          rule.RuleData.sort((a, b) => parseInt(b.Version) - parseInt(a.Version));
  
          // Take the first element which will be the highest version
          const highestVersionData = rule.RuleData[0];

  
          // Transform the highest version data into the expected format
          const transformedRule = {
            id: rule.RuleID,
          };
  
          console.log(highestVersionData.RuleCategory, 
            highestVersionData.RuleDescription,
            rule.RuleName,
            "Rule details,cat,des,name"
          )
          // adding the main table values in TableData 
          setTableData((prevData) => [...prevData, { 
             id: rule.RuleID, 
             name: rule.RuleName,
             type: 'Linear Rule',
             description: highestVersionData.RuleDescription,
             category: highestVersionData.RuleCategory,
             version: highestVersionData.Version
             }])
  
  
          highestVersionData.Conditions.forEach(condition => {
            transformedRule[condition.KVP] = {
              operator: condition.Operator,
              value: condition.Value
            };
          });
  
          highestVersionData.Actions.forEach(action => {
            transformedRule[action.ActionName] = action.ActionValue;
          });
  
          // Add the transformed rule to the array
          transformedData.push(transformedRule);
          
          //adding data to FinalLR array
          setFinalLR((prevData) => [...prevData, { LRId: rule.RuleID, rule: [transformedRule] }]);
  
  
        });
  
        console.log(transformedData, "after fetching the get LR api");
        // setSuccessSB(true);
        // setTitle('Successfully fetched all the Rules');
          
         
      } catch (error) {
          console.error('Error fetching data:', error);
          setErrorSB(true);
          setTitle('Failed to load Linear Rules');
          setContent('Sorry, due to server issue!');
         
      }
    }else{
      console.error('Error fetching data:');
      setErrorSB(true);
      setTitle('Please select valid package')
    }
    
   
    
  setLoading(false)
};

const transformOutput = (outputData) => {
 
  for(const key of outputData.rule){
    const inputData = key.DecisionRule.map((decisionRule) => {
      const { RuleID, Conditions, Actions } = decisionRule;
      const rule = {
          id: RuleID,
      };

      // Extract conditions
      Conditions.forEach((condition) => {
          rule[condition.KVP] = {
              operator: condition.Operator,
              value: condition.Value
          };
      });

      // Extract actions
      Actions.forEach((action) => {
          rule[action.ActionName] = action.ActionValue;
      });

      return rule;

  });

 
  setFinalLR((prevData) => [...prevData, { LRId: key.DecisionID, rule: inputData }]);
  console.log(inputData, 'transformOUTPUT - DT')
  setTableData((prevData) => [...prevData, { 
    id: key.DecisionID, 
    name: key.DecisionTableName,
    type: 'Decision Table',
    description: key.DecisionRule[0].RuleDescription,
    category:  key.DecisionRule[0].RuleCategory,
    version: "1"
    }])

  }
 
};



const fetchDecisionRule = async () => {
  setLoading(true);
  // setTableData([]);
  // setFinalLR([]);

  if(selectedPackageId != null){
    try {

      const response = await getDecisionRule(selectedPackageId);

      console.log(response, "successfully fetchedapi get decision rule ");
      console.log(response.data, "fetched api get decision rule ");

      transformOutput(response.data);
      // console.log(inputData, 'DRules after transform from fetch api');


      // console.log(transformedData, "after fetching the get LR api");
      // setSuccessSB(true);
      // setTitle('Successfully fetched all the Decision Rules');
        
       
    } catch (error) {
        console.error('Error fetching data:', error);
        setErrorSB(true);
        setTitle('Failed to load Decision Rules');
        setContent('Sorry, due to server issue!');
       
    }
  }else{
    console.error('Error fetching data:');
    setErrorSB(true);
    setTitle('Please select valid package')
  }
  
 
  
setLoading(false)
};

const refreshRules = async() => {
  // await fetchLinearRule();
  // await fetchDecisionRule();
  await FetchAllRules();

}



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
  const [inputCategory, setInputCategory] = useState('') // for adding category got linear rule
  const [tableData, setTableData] = useState([]);

  const [linearRuleData, setLinearRuleData] = useState([]);

  const [value, setValue] = useState(''); // testing for set participant data

  // for linearRule identification
  const [LR, setLR] = useState(false);

  // for Decision Table identification
  const [DT, setDT] = useState(false);



  const handleInputName = (event) => {
    setInputName(event.target.value);
  }
  const handleInputDescription = (event) => {
    setInputDescription(event.target.value);
  }
  const handleInputCategory = (event) => {
    setInputCategory(event.target.value);
  }


  // call operators
  const [operatorTableData, setOperatorTableData] = useState([]);

  const getOperator = async () => {
    setOperatorTableData([]);

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
      console.log(error, 'while fetching operator')

    }

  }

  const [attributesTableData, setAttributesTableData] = useState([]);
  const getAttributes = async () => {
    setAttributesTableData([]);
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
  }

  const [actionTableData, setActionTableData] = useState([]);
  const [actionTableId, setActionTableId] = useState("");

  const getActions = async () => {
    setActionTableData([]);
    try {

      const response = await getActionTable(String(selectedPackageId));
      console.log(response);
      console.log(response.data[0].Actions)

      setActionTableData(response.data[0].Actions);
      setActionTableId(response.data[0].ActionTableID);

      

    } catch (error) {
      console.log(error, 'while fetching actions')
    }
  }

  const [currentrule, setCurrentRule] = useState('');



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
          View
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

  // Selected Rule Name 
  const [ruleName, setRuleName] = useState('');

  // Example view function (replace with your actual view logic)
  async function handleView(rowId) {
    
    setLoading(true);
    // setLinearRuleData([]);
    // setActionData([]);
    // setConditions([])
    // setConditionData({});
    // setLRCurrentVersion(false);
    setLinearRuleData([]);
    setActionData([]);
    setConditions([])
    setConditionData({});
    setLRCurrentVersion(false);

    setShowLinearRule(false);

    setLinearRuleData([]);
    setInputName('');
    setInputDescription('');
    setInputCategory('');

    setShowAddLinearName(false);
    setLR(false);
    setDT(false);

    // setting current rule
    setCurrentRule(rowId);
    // await fetchLinearRule();
    // await fetchDecisionRule();
    await FetchAllRules();

    setLoading(true);

    await getOperator();
    await getAttributes();
    await getActions();

    // load all the attributes and operators



    console.log("View row with ID:", rowId);
    const selectRuleData = tableData.find((rule) => rule.id === rowId);

    const RuleDataName = selectRuleData.name;
    setRuleName(RuleDataName);

    const RuleDataType = selectRuleData.type;
    if (RuleDataType == 'Linear Rule') {
      setLR(true)
      if(parseInt(selectRuleData.version) > 1 ){
        setLRCurrentVersion(true);
      }

    }
    if (RuleDataType == 'Decision Table') {
      setDT(true)
    }

    


    // Implement your view logic here, e.g., navigate to a detailed view
    const selectRule = finalLR.find((rule) => rule.LRId === rowId);
    console.log(selectRule, 'selected rule')
    const rule_span = selectRule.rule;

    let flag = 0;

    rule_span.forEach(item => {
      // console.log(`ID: ${item.id}`);


      if (flag === 0) {
        Object.entries(item).forEach(([key, value]) => {
          if (typeof value === 'object') {
            console.log(`${key} -`);

            addCondition(`${key}`); // adding condition

            Object.entries(value).forEach(([op, val]) => {
              console.log(` ${op}: ${val}`)
              if (`${op}` === 'operator') {

                handleOperatorChange(`${key}`, `${item.id}`, `${val}`)
              }
              if (`${op}` === 'value') {
                handleValueChange(`${key}`, `${item.id}`, `${val}`)
              }


            });
          }
          else {
            console.log(`${key} - ${value}`);
            if (`${key}` != 'id') {
              setActionData((prevData) => [...prevData, `${key}`])
            }
          }
        });

        flag = flag + 1;

      } else {
        Object.entries(item).forEach(([key, value]) => {
          if (typeof value === 'object') {
            console.log(`${key} -`);

            // addCondition(`${key}`); // adding condition

            Object.entries(value).forEach(([op, val]) => {
              console.log(` ${op}: ${val}`)
              if (`${op}` === 'operator') {

                handleOperatorChange(`${key}`, `${item.id}`, `${val}`)
              }
              if (`${op}` === 'value') {
                handleValueChange(`${key}`, `${item.id}`, `${val}`)
              }


            });
          }
          else {
            console.log(`${key} - ${value}`);
            if (`${key}` != 'id') {
              // setActionData((prevData) => [...prevData, `${key}`])
            }
          }
        });

        flag = flag + 1;


      }

    })


    // setActionData((prevData) => [...prevData, '']);
    setLinearRuleData(selectRule.rule);
    setLoading(false);
    setShowLinearRule(true);

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


  const handleValueChange = (conditionName, rowId, value) => {
    console.log(value, rowId, 'value')
    setConditionData((prevData) => ({
      ...prevData,
      [rowId]: {
        ...prevData[rowId],
        [conditionName]: { ...prevData[rowId]?.[conditionName], value },
      },
    }));
  };

  // hard coded values for condition before implement back end
  const availableConditions = ["ConditionName1", "ConditionName2", "ConditionName3"];
  // --------------------

  // State to track the selected condition
  const [selectedCondition, setSelectedCondition] = useState("");

  const handleConditionChange = (event) => {
    setSelectedCondition(event.target.value);
    addCondition(event.target.value);
    setSelectedCondition("");
  };

  const addSelectedCondition = () => {
    if (selectedCondition) {
      addCondition(selectedCondition);
      setSelectedCondition("");
    }
  };



  const dynamicColumns = useMemo(() => {
    const baseColumns = [
      // { Header: "ID", accessor: "id", width: "10%" },
      // ... Other columns
      { Header: "", accessor: "delete", width: "10%", Cell: DeleteColumn },
    ];
    const dynamicColumns = conditions.map((condition) => ({
      Header: condition,
      accessor: condition,
      width: "15%",
      Cell: ({ row }) => {
        const selectedConditionData = attributesTableData.find((data) => data.name == condition);
        return (
          <div>
            <select className="mt-1 p-2 border rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300 bg-transparent"
              value={conditionData[row.original.id]?.[condition]?.operator || ""}
              onChange={(e) =>
                handleOperatorChange(condition, row.original.id, e.target.value)
              }
            >
              <option value=""></option>
              {/* <option value="equals">Equals</option>
             <option value="contains">Contains</option> */}
              {operatorTableData.map((op) => (
                <option value={op.operatorvalue}>{op.operatorvalue}</option>
              ))}
            </select>
            &nbsp;&nbsp;


            <select className="mt-1 p-2 border rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300 bg-transparent"
              value={conditionData[row.original.id]?.[condition]?.value || ""}
              onChange={(e) =>
                handleValueChange(condition, row.original.id, e.target.value)
              }
            >
              <option value=""></option>
              {selectedConditionData?.values.map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>

          </div>
        )
      },
    }));




    return [...baseColumns, ...dynamicColumns];
  }, [conditions, conditionData]);

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

    setActionData((prevData) => [...prevData, event.target.value]);
    setSelectedAction("");
  };

  const addAction = () => {
    if (selectedAction) {
      // Add selected action as a new column
      setActionData((prevData) => [...prevData, selectedAction]);
      setSelectedAction("");
    }
  };

  console.log(columns, linearRuleData, 'table data linear ')
  const handleActionDataChange = (value, rowId, action) => {
    // // Handle input change and update the data
    console.log('action data change', value, rowId, action)
    const newData = [...linearRuleData];
    const rowIndex = linearRuleData.findIndex(
      (item) => item.id === rowId
    );

    newData[rowIndex] = {
      ...newData[rowIndex],
      [action]: value,
    };

    setLinearRuleData(newData);

  }




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

    setFinalLR((prevData) => [...prevData, { LRId: currentrule, rule: allData }])
    console.log("All Table Data:", allData);
    console.log("All Table Data along with rule id", finalLR);

    setLinearRuleData([]);
    setActionData([]);
    setConditions([])
    setConditionData({});

    setShowLinearRule(false);
    // You can perform further actions with the combined data
    setCurrentRule('');
  };

// Function to transform the data based on the UPDATE Linear Rule API format
  const transformDataUpdateLR = async(originalData, packageid,ruleid,rule_name, category, description) => {
    const transformedData = {
        packageid: packageid,
        ruleid: ruleid,
        linearrule: [
            {
                ruleid: ruleid, // You may generate a unique ruleid as per your requirement
                rulename: rule_name,
                description: description,
                category: category,
                conditions: [],
                actions: []
            }
        ]
    };

    // Iterate through originalData and add conditions and actions to transformedData
    originalData.forEach(dataItem => {
      Object.keys(dataItem).forEach(key => {
          if (key !== "id" && key !== "rulename" && key !== "description" && key !== "category") {
              if (key === "Route to" || key === "Voicemail" || key === "Set Participant Data") {
                const actData = actionTableData.find((row) => row.action === key);
                const actId = actData ? actData.actionid : null;

                  transformedData.linearrule[0].actions.push({
                      actionname: key,
                      actionvalue: dataItem[key],
                      actionid: actId,
                      actiontableid: actionTableId
                  });
              } else {
                  transformedData.linearrule[0].conditions.push({
                      kvp: key,
                      operator: dataItem[key].operator,
                      value: dataItem[key].value,
                      logical: "&&"
                  });
              }
          }
      });
  });


    return transformedData;
};

  // overwrite existing rule
  const updateRule = (id, newRule) => {
    setFinalLR(prevRules =>
      prevRules.map(rule => (rule.LRId === id ? { ...rule, rule: newRule } : rule
      )))
  }

  const [tempTableData, setTempTableData] = useState([]);

  const goToPreviousLR = async() => {
    setShowRollbackConfirmation(false);
    setLoading(true);
    setTempTableData([]);
    try {

      const response = await getLinearRule(selectedPackageId);

      console.log(response, "successfully fetchedapi get linear rule ");
      console.log(response.data, "fetched api get linear rule ");

     
      const responseData =response.data;
      

      // Initialize an empty array to store transformed data
      const transformedData = [];
      const basicData = [];

      // Iterate over the response data
      responseData.forEach(rule => {
        // Sort RuleData array by Version in descending order
        rule.RuleData.sort((a, b) => parseInt(b.Version) - parseInt(a.Version));

        // Take the first element which will be the highest version
        const highestVersionData = rule.RuleData[1];


        // Transform the highest version data into the expected format
        const transformedRule = {
          id: rule.RuleID,
        };

        // adding the main table values in TableData 
          basicData.push({ 
            id: rule.RuleID, 
            name: rule.RuleName,
            type: 'Linear Rule',
            description: highestVersionData.RuleDescription,
            category: highestVersionData.RuleCategory,
            version: highestVersionData.Version
            })

           console.log(basicData, 'temp TABLEDATA');

           console.log( rule.RuleID, rule.RuleName,highestVersionData.RuleDescription,highestVersionData.RuleCategory, highestVersionData.Version, 'basic rule details inside TempTableData')


        highestVersionData.Conditions.forEach(condition => {
          transformedRule[condition.KVP] = {
            operator: condition.Operator,
            value: condition.Value
          };
        });


        highestVersionData.Actions.forEach(action => {
          transformedRule[action.ActionName] = action.ActionValue;
        });

        // Add the transformed rule to the array
        transformedData.push(transformedRule);
        
        //adding data to FinalLR array
        // setFinalLR((prevData) => [...prevData, { LRId: rule.RuleID, rule: [transformedRule] }]);

      });
      const RuleDetails = basicData.find((row) => row.id === currentrule);
      const inputName = RuleDetails ? RuleDetails.name: null;
      const inputCategory = RuleDetails ? RuleDetails.category: null;
      const inputDescription = RuleDetails ? RuleDetails.description: null;

      console.log(inputName,inputCategory,inputDescription, "Rule basic info");

      const transformedData1 = await transformDataUpdateLR(transformedData, selectedPackageId,currentrule,inputName, inputCategory,inputDescription );
      console.log('Update LR api format', transformedData1);

      try {
        const response = await updateLinearRule(transformedData1);

       console.log(response, 'succesfully updated Linear rule');

      //  await fetchLinearRule();
      await FetchAllRules();
        setSuccessSB(true);
        setTitle('Successfully Rolled back to previous version');
        setLoading(true);

      } catch (error) {
        console.error('Error updating the linear rule:', error);
        // await fetchLinearRule();
        await FetchAllRules();

        setErrorSB(true);
        setTitle('Failed to update Rule');
        setContent('Sorry, due to technical issue!');
        setLoading(true);
      }

      
        
       
    } catch (error) {
        console.error('Error fetching data:', error);
        setErrorSB(true);
        setTitle('Failed to load Linear Rules');
        setContent('Sorry, due to server issue!');
       
    }

        
    setLoading(false);
    setLinearRuleData([]);
    setActionData([]);
    setConditions([])
    setConditionData({});
    setLRCurrentVersion(false);

    setShowLinearRule(false);

    setLinearRuleData([]);
    setInputName('');
    setInputDescription('');
    setInputCategory('');

    setShowAddLinearName(false);
    setLR(false);
    setDT(false);
    await FetchAllRules();

    
    
  }


  const handleSaveView = async() => {
    setLoading(true);
    const allData = getAllTableData();

    if (LR) {
      // const updatedTempAllData = [{ ...allData[0], id: currentrule }, ...allData.slice(1)];

      const RuleDetails = tableData.find((row) => row.id === currentrule);
      const inputName = RuleDetails ? RuleDetails.name: null;
      const inputCategory = RuleDetails ? RuleDetails.category: null;
      const inputDescription = RuleDetails ? RuleDetails.description: null;

      // below two line is Without API
      // console.log("Updated ID allData ", updatedTempAllData);
      // updateRule(currentrule, updatedTempAllData);

      const transformedData = await transformDataUpdateLR(allData, selectedPackageId,currentrule,inputName, inputCategory,inputDescription );
        console.log('Update LR api format', transformedData);

        try {
          const response = await updateLinearRule(transformedData);

         console.log(response, 'succesfully updated Linear rule');
        //  await fetchLinearRule();
        await FetchAllRules();

         setSuccessSB(true);
        setTitle('Successfully updated Rule');
        setLoading(true);

        } catch (error) {
          console.error('Error updating the linear rule:', error);
          // await fetchLinearRule();
          await FetchAllRules();

          setErrorSB(true);
        setTitle('Failed to update Rule');
        setContent('Sorry, due to technical issue!');
        setLoading(true);
        }

    }
    if (DT) {
      // updateRule(currentrule, allData);
      const RuleDetails = tableData.find((row) => row.id === currentrule);
      const inputName = RuleDetails ? RuleDetails.name: null;
      const inputCategory = RuleDetails ? RuleDetails.category: null;
      const inputDescription = RuleDetails ? RuleDetails.description: null;
      
      const transformedData = await transformDataDT(allData, selectedPackageId,inputName,currentrule,inputDescription, inputCategory );
      try {

        const response = await addDecisionRules(transformedData);
        console.log(response, 'success updated DRule')
        //  await fetchLinearRule();
        //  await fetchDecisionRule();
        await FetchAllRules();
        setSuccessSB(true);
        setTitle('Successfully Updated Decision Table');
        setLoading(true);

      } catch (error) {
        console.log(error, 'failed to update DRule')
        //  await fetchLinearRule();
        //  await fetchDecisionRule();
        await FetchAllRules();
        setErrorSB(true);
        setTitle('Failed to update Decision Table');
        setContent('Sorry, due to technical issue!');
        setLoading(true);
      }



    } 

    // updateRule(currentrule, allData);

    // setFinalLR((prevData) => [...prevData, {LRId: currentrule, rule: allData}])
    console.log("All Table Data: after update", allData);
    console.log("All Table Data along with rule id after update", finalLR);


    setLinearRuleData([]);
    setActionData([]);
    setConditions([])
    setConditionData({});

    setRuleName(''); // clearing current rule Name
    setCurrentRule('') // clearing current rule id
    setLRCurrentVersion(false);

    setShowLinearRule(false);
    setLR(false);
    setDT(false);
    setLoading(false);
    // You can perform further actions with the combined data
  };


  useEffect(() => {
    console.log("Updated tempAllData: ", tempAllData);
  }, [tempAllData]);


  // Function to transform the data based on the ADD Linear Rule API format
  const transformData = async(originalData, packageid,ruleid,rule_name, category, description) => {
    const transformedData = {
        packageid: packageid,
        linearrule: [
            {
                ruleid: ruleid, // You may generate a unique ruleid as per your requirement
                rulename: rule_name,
                description: description,
                category: category,
                conditions: [],
                actions: []
            }
        ]
    };

    // Iterate through originalData and add conditions and actions to transformedData
    originalData.forEach(dataItem => {
      Object.keys(dataItem).forEach(key => {
          if (key !== "id" && key !== "rulename" && key !== "description" && key !== "category") {
              if (key === "Route to" || key === "Voicemail" || key === "Set Participant Data") {
                const actData = actionTableData.find((row) => row.action === key);
                const actId = actData ? actData.actionid : null;

                  transformedData.linearrule[0].actions.push({
                      actionname: key,
                      actionvalue: dataItem[key],
                      actionid: actId,
                      actiontableid: actionTableId
                  });
              } else {
                  transformedData.linearrule[0].conditions.push({
                      kvp: key,
                      operator: dataItem[key].operator,
                      value: dataItem[key].value,
                      logical: "&&"
                  });
              }
          }
      });

  });


    return transformedData;
};

const transformDataDT = async(originalData, packageid, decisionrulename,tableid,description,category) => {
  const transformedData = {
    packageid: packageid,
    rule: [
        {
            decisionrulename: decisionrulename,
            decisionruletableid: tableid,
            decisionrule: []
        }
    ]
};

  // Iterate through originalData and add conditions and actions to transformedData
  originalData.forEach((dataItem,index) => {
    const conditionsDT = [];
    const actionsDT = [];
    Object.keys(dataItem).forEach(key => {
      
        if (key !== "id" && key !== "rulename" && key !== "description" && key !== "category") {
            if (key === "Route to" || key === "Voicemail" || key === "Set Participant Data") {
              const actData = actionTableData.find((row) => row.action === key);
              const actId = actData ? actData.actionid : null;

                actionsDT.push({
                    actionname: key,
                    actionvalue: dataItem[key],
                    actionid: actId,
                    actiontableid: actionTableId
                });
            } else {
                conditionsDT.push({
                    kvp: key,
                    operator: dataItem[key].operator,
                    value: dataItem[key].value,
                    logical: "&&"
                });
            }
        }
    });
    const decisionRule = {
      id: dataItem.id,
      description: description,
      category: category,
      order: String(index + 1), // Assuming order starts from 1
      conditions: conditionsDT,
      actions: actionsDT
  };
  
  // Push the decision rule to the array in the output
  transformedData.rule[0].decisionrule.push(decisionRule);

});


  return transformedData;
};




  // creating linear Name
  const addLinearName = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (inputName && inputDescription && inputCategory && linearRuleData.length > 0) {
      const rule_id = String(Date.now())
      if (LR) {
        // setTableData((prevData) => [...prevData, { id: rule_id, name: inputName, type: 'Linear Rule', description: inputDescription, category: inputCategory }])
        // above single line is without API
        const allData = getAllTableData();
    
        // Update tempAllData with new id - without API
        // const updatedTempAllData = [{ ...allData[0], id: rule_id }, ...allData.slice(1)];
        // console.log("Updated ID allData ",updatedTempAllData);
        // setFinalLR((prevData) => [...prevData, { LRId: rule_id, rule: updatedTempAllData }]); //withou api


        const transformedData = await transformData(allData, selectedPackageId,rule_id,inputName, inputCategory,inputDescription );
        console.log('add LR api format', transformedData);

        try {
          const response = await createLinearRule(transformedData);

         console.log(response, 'succesfully added Linear rule');
        //  await fetchLinearRule();
        //  await fetchDecisionRule();
        await FetchAllRules();
         setSuccessSB(true);
        setTitle('Successfully Added New Rule');
        setLoading(true);

        } catch (error) {
          console.error('Error adding the linear rule:', error);
         //  await fetchLinearRule();
        //  await fetchDecisionRule();
        await FetchAllRules();
          setErrorSB(true);
          setTitle('Failed to add New Rule');
          setContent('Sorry, due to technical issue!');
          setLoading(true);
         
        }

      }
      if (DT) {
        // setTableData((prevData) => [...prevData, { id: rule_id, name: inputName, type: 'Decision Table', description: inputDescription, category: inputCategory, version:"1" }]);
        const allData = getAllTableData();
        // setFinalLR((prevData) => [...prevData, { LRId: rule_id, rule: allData }]);
        console.log('DT alldata', allData);

        const decisionTBid = String(Date.now());
        
        //originalData, packageid, decisionrulename,tableid,description,category
        const transformedData = await transformDataDT(allData, selectedPackageId,inputName,decisionTBid,inputDescription, inputCategory );
        console.log(transformedData, 'DT - transformed data');

        
        try{
          const item = {
            packageid:selectedPackageId,
            decisiontablename:inputName,
            decisiontableid: decisionTBid

        }
          const response = await createDecisionTable(item);
          console.log(response,'success added DTable')


          try{

            const response = await addDecisionRules(transformedData);
            console.log(response,'success added DRule')
            //  await fetchLinearRule();
        //  await fetchDecisionRule();
        await FetchAllRules();
        setSuccessSB(true);
        setTitle('Successfully added new Decision Table');
        setLoading(true);

          }catch(error){
            console.log(error, 'failed to add DRule')
            //  await fetchLinearRule();
        //  await fetchDecisionRule();
        await FetchAllRules();
        setErrorSB(true);
        setTitle('Failed to add NewDecision Table');
        setContent('Sorry, due to technical issue!');
        setLoading(true);
          }


        }catch(error){
          console.log(error, 'failed to add DTable')
         //  await fetchLinearRule();
        //  await fetchDecisionRule();
        await FetchAllRules();
        setErrorSB(true);
        setTitle('Failed to add NewDecision Table');
        setContent('Sorry, due to technical issue!');
        setLoading(true);
        }


      }

      setCurrentRule(rule_id);
      await getOperator();
      await getAttributes();
      await getActions();

      setInputName('');
      setInputDescription('');
      setInputCategory('');

      

      // adding and saving the linear rule

      // const allData = getAllTableData();
    
      // Update tempAllData with new id
      // const updatedTempAllData = [{ ...allData[0], id: rule_id }, ...allData.slice(1)];
  
      
      // console.log("Updated ID allData ",updatedTempAllData);



      // setFinalLR((prevData) => [...prevData, { LRId: rule_id, rule: updatedTempAllData }])
      // console.log("All Table Data:", allData);
      // console.log("All Table Data along with rule id", finalLR);

      setTempAllData([]);
      setLinearRuleData([]);
      setActionData([]);
      setConditions([])
      setConditionData({});


      setShowAddLinearName(false);

      setLR(false);
      setDT(false);
    }
    setLoading(false);
  }

  const handleCancelLinearName = async() => {
    setLinearRuleData([]);
    setActionData([]);
    setConditions([])
    setConditionData({});
    setInputName('');
    setInputDescription('');
    setInputCategory('');

    setShowAddLinearName(false);
    setLR(false);
    setDT(false);

    await FetchAllRules();
  }

  const handleCancel = async() => {
    setLinearRuleData([]);
    setActionData([]);
    setConditions([])
    setConditionData({});
    setLRCurrentVersion(false);

    setShowLinearRule(false);

    setLinearRuleData([]);
    setInputName('');
    setInputDescription('');
    setInputCategory('');

    setShowAddLinearName(false);
    setLR(false);
    setDT(false);
    await FetchAllRules();

  
  }



  function DeleteColumn({ row }) {
    return (
      <MDBox
        onClick={() => handleDeleteRow(row.original.id)}
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

  const showLinearNameFunction = async () => {
    if (selectedPackageId != null) {
      setShowAddLinearName(true);
      setLR(true);
      setDT(false);
      await getOperator();
      await getAttributes();
      await getActions();
    } else {
      setErrorSB(true);
      setTitle('Please select valid package')
    }

  }

  const showDecisionNameFunction = async () => {
    if (selectedPackageId != null) {
      setShowAddLinearName(true);
      setDT(true);
      setLR(false);
      await getOperator();
      await getAttributes();
      await getActions();
    } else {
      setErrorSB(true);
      setTitle('Please select valid package')
    }

  }

  // for display conditions
  console.log(conditions, 'conditions');



  const unSelectedActions = actionTableData.filter(
    action => !actionData.includes(action.action));

  const unSelectedConditions = attributesTableData.filter(
    attribute => !conditions.includes(attribute.name));


  return (

    <DashboardLayout>
      <DashboardNavbar />
      {/* <Link to='/packages/rules/linear_rule'> */}
      <br/>
    

      
      <MDButton size="small" variant="gradient" color="info"
        onClick={showLinearNameFunction}>
        Add Linear Rule
      </MDButton>
      {/* </Link> */}
      &nbsp;&nbsp;&nbsp;
      {/* <Link to='/packages/rules/decision_table'> */}
     
      <MDButton  size="small" variant="gradient" color="info"
        onClick={showDecisionNameFunction}>
        Add Decision Table
      </MDButton>


      <MDBox display="flex" justifyContent="flex-end">
      <MDButton  size="small" variant="gradient" color="info"
        onClick={refreshRules}>
         <b><LuRefreshCw /></b>&nbsp; Refresh
      </MDButton>


      </MDBox>
     
     
      {/* </Link> */}



      {/* for adding the new linear rule....so creating rulename...description..etc */}
      {showAddLinearName && (

        <div>
          <br />

          <MDInput type="text" label="Name" className="mt-1 p-2 text-sm" value={inputName} onChange={handleInputName} />  &nbsp;&nbsp;&nbsp;

          <MDInput type="text" label="Description" value={inputDescription} onChange={handleInputDescription} /> &nbsp;&nbsp;&nbsp;

          <MDInput type="text" label="Category" value={inputCategory} onChange={handleInputCategory} /> &nbsp;&nbsp;&nbsp;


          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {inputName && inputDescription && inputCategory && linearRuleData.length > 0 ? (

            <MDButton size="small" variant="gradient" color="success"
              onClick={addLinearName}>
              Save
            </MDButton>


          ) : null}

          {/* </Link> */}
          &nbsp;&nbsp;&nbsp;

          <MDButton size="small" variant="gradient" color="error"
            onClick={handleCancelLinearName}>
            Cancel
          </MDButton>

          <Grid item xs={12}>

            <MDBox pt={3}  >
              <MDBox mx={0}
                mt={-3}
                py={3}
                px={0} display="flex" justifyContent="space-between">
                <MDBox>




                  {/* <div className="card flex justify-content-center">
            <Dropdown value={selectedCondition} onChange={handleConditionChange} options={unSelectedConditions} optionLabel="name" 
                editable placeholder="Select a City" className="w-full md:w-14rem" />
        </div> */}


                  <select className="mt-1 p-2 border rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300 bg-transparent" value={selectedCondition} onChange={handleConditionChange}>
                    <option value="" disabled>Select Condition</option>

                    {unSelectedConditions.map((condition) => (
                      <option key={condition.id} value={condition.name}>
                        {condition.name}
                      </option>
                    ))}

                    {/* {attributesTableData.map((condition) => (
                    <option key={condition.id} value={condition.name}>
                      {condition.name}
                    </option>
                  ))}
                  {availableConditionOptions()} */}

                  </select>
                  &nbsp;&nbsp;&nbsp;
                  <select className="mt-1 p-2 border rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300 bg-transparent" value={selectedAction} onChange={handleActionChange}>
                    <option value="" disabled>Select Action</option>
                    {unSelectedActions.map((actions) => (
                      <option key={actions.actionid} value={actions.value}>
                        {actions.action}
                      </option>
                    ))}

                    {/* Add more actions as needed */}
                  </select>
                  &nbsp;&nbsp;&nbsp;
                  <MDButton size="small" className="px-4" variant="outlined" color="info"
                    onClick={addRowToDataTable1}
                    disabled={(linearRuleData.length === 1 && LR)}
                  >
                    Add Row
                  </MDButton>





                  {/* <MDButton size="small" variant="gradient" color="secondary" align="right"
                    // onClick={() => addCondition("ConditionName1")}
                    aria-describedby={id}  onClick={handleClick}
                    >
                    Condition
                  </MDButton>
                  &nbsp;
                  <MDButton size="small" variant="gradient" color="secondary"
                    onClick={() => setShowLinearRule(false)}>
                    Action
                  </MDButton> */}
                </MDBox>
                &nbsp;&nbsp;
                {/* <MDBox display="flex" justifyContent="flex-end">
                  <MDButton size="small" variant="gradient" color="success"
                    onClick={handleSave}>
                    Save
                  </MDButton>
                  &nbsp;

                  <MDButton size="small" variant="gradient" color="error"
                    onClick={handleCancel}>
                    Close
                  </MDButton>
                  </MDBox> */}
              </MDBox>

              {/* logic for the add rules condition andactions */}

              <div>
                {/* UI for adding conditions */}


                {/* <button onClick={addSelectedCondition}>Add Condition</button> */}
                {/* <button onClick={addRowToDataTable1}>Add Row</button> */}

                <div>

                  {/* <button onClick={addAction}>Add Action</button> */}
                </div>

                {/* pop over buttion */}




                {/* <input className="mt-1 p-2 border rounded-lg text-sm border-gray-300 bg-transparent"
                  type="text"
                  value=""

                  onChange={(e) => {
                    handleActionDataChange(e.target.value, "x", "y")


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
                          <input className="mt-1 p-2 border rounded-lg text-sm border-gray-300 bg-transparent"
                            type="text"
                            value={row.original[action] || ""}

                            onChange={(e) => {
                              handleActionDataChange(e.target.value, row.original.id, action)

                              // setValue(e.target.value)
                              // // Handle input change and update the data
                              //  // Update the state with the new array
                              //  const newData = [...linearRuleData];
                              // const rowIndex = linearRuleData.findIndex(
                              //   (item) => item.id === row.original.id
                              // );

                              // newData[rowIndex] = {
                              //   ...newData[rowIndex],
                              //   [action]: value,
                              // };

                              // setLinearRuleData(newData);
                            }}

                          // onBlur={
                          //   {

                          //   }
                          // }
                          />
                        ),
                      })),
                    ],
                    rows: linearRuleData,
                  }}
                />


              </div>

            </MDBox>


          </Grid>

        </div>
      )}




      <MDBox pt={6} pb={3}>



        <Grid container spacing={6}>
          <Grid item xs={12}>

            <Card>
              {loading ? <Loading/> :
              <DataTable
              table={{
                columns: [
                  { Header: "ID", accessor: "id", width: "15%" },
                  { Header: "Name", accessor: "name", width: "15%" },
                  { Header: "Description", accessor: "description" },
                  { Header: "Category", accessor: "category" },
                  // { Header: "Version", accessor: "version" },
                  { Header: "Type", accessor: "type" },

                  // **column for visibility and delete - deprecated the feature
                  // { Header: "Actions", accessor: "actions", width: "25%", Cell: ActionsColumn },
                  // { Header: "age", accessor: "age", width: "12%" },
                ],
                rows: tableData
              }}

              onRowClick={(rowData) => {
                // Handle row click, e.g., navigate to a detail page
                console.log("Row Clicked:", rowData.id);
                handleView(rowData.id);


              }}

            />}





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

          {renderSuccessSB}
          {renderErrorSB}
          {showLinearRule && (


           <Grid item xs={12}>

              <Card ref={newRuleRef} tabIndex={-1}>
  
                <MDBox pt={3}  >
                  <MDBox mx={2}
                    mt={-3}
                    py={3}
                    px={2} display="flex" justifyContent="">
  
                    <MDTypography className="pt-2" variant="h6" color="inherit">
  
                      Rule Name : {ruleName}
  
  
                    </MDTypography>
                    &nbsp;&nbsp;
  
  
                    <select
                      className="mt-1 p-2  border rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300 bg-transparent"
                      value={selectedCondition}
                      onChange={handleConditionChange}
                    >
                      <option value="" disabled>Select Condition</option>
                      {/* {availableConditions.map((condition) => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))} */}
                      {unSelectedConditions.map((condition) => (
                        <option key={condition.id} value={condition.name}>
                          {condition.name}
                        </option>
                      ))}
  
                    </select>
                    &nbsp;&nbsp;&nbsp;
                    <select className="mt-1 p-2 border rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300 bg-transparent" value={selectedAction} onChange={handleActionChange}>
                      <option value="" disabled>Select Action</option>
                      {unSelectedActions.map((actions) => (
                        <option key={actions.actionid} value={actions.value}>
                          {actions.action}
                        </option>
                      ))}
  
                      {/* Add more actions as needed */}
                    </select>
                    &nbsp;&nbsp;&nbsp;
                    <MDButton size="small" className="px-4 text-sm" variant="outlined" color="info"
                      onClick={addRowToDataTable1}
                      disabled={(linearRuleData.length === 1 && LR)}
                    >
                      Add Row
                    </MDButton>
  
                    &nbsp;&nbsp;&nbsp;
                   
                      <MDButton size="small" variant="gradient" color="success"
                        onClick={handleSaveView}>
                        Save
                      </MDButton>
                      &nbsp;
  
                      <MDButton size="small" variant="gradient" color="error"
                        onClick={handleCancel}>
                        Close
                      </MDButton>

                      &nbsp;&nbsp;&nbsp;
                     {LR && LRCurrentVersion ? (
                       
                          <MDButton size="small" variant="gradient" color="warning"
                            onClick={() => setShowRollbackConfirmation(true)}>
                            Rollback
                          </MDButton>

                       
                       
                     ): null}

                    

                  </MDBox>
  
                  {/* logic for the add rules condition andactions */}
  
  
  
  
                  {loading ? <Loading/> :(
                    <div>
  
                    <DataTable1
                      table={{
                        columns: [
                          ...dynamicColumns,
                          ...actionData.map((action) => ({
                            Header: action,
                            accessor: action,
                            width: "10%",
                            Cell: ({ row }) => (
                              <input
                                type="text"
                                className="mt-1 p-2 border rounded-lg text-sm border-gray-300 bg-transparent"
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
  
  
                  </div>
                  )}
  


                    {/* rollback confimation */}
                    {showRollbackConfirmation ? (
            <><div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
            <form onSubmit={goToPreviousLR}>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex text-red-500 font-bold items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
         

              Rollback Linear Rule
              


                            </div>

                            <div className="relative p-3 flex-auto">
                                <p className="my-4 text-sm late-500 text-md leading-relaxed">
                                    <div className="mt-2">
                                      <p className="text-s ml-2 text-gray-500 text-justify whitespace-pre-line">
                                        Are you sure want to Rollback the <b>{ruleName}</b> linear rule to previous version ? 
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
                                    onClick={() => setShowRollbackConfirmation(false)}
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
