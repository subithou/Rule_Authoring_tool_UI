[
    {
       
        "RuleData": [
            {
                "Version": "1",
                "UserName": "TestUser",
                "DateModified": "1712674274329",
                "RuleDescription": "2e",
                "RuleCategory": "2e",
                "Rule": "BALANCE=500000&&",
                "Actions": [
                    {
                        "ActionID": "1712559300373",
                        "ActionName": "Route to",
                        "ActionValue": "XYZ",
                        "ActionTableID": "1712557703913"
                    }
                ],
                "Conditions": [
                    {
                        "KVP": "BALANCE",
                        "Operator": "=",
                        "Value": "500000",
                        "Logical": "&&"
                    }
                ]
            },
            {
                "Version": "2",
                "UserName": "TestUser",
                "DateModified": "1712675922335",
                "RuleDescription": "TestRule3",
                "RuleCategory": "TestCategory3",
                "Rule": "ACCNT_STATUS=Yes&&",
                "Actions": [
                    {
                        "ActionID": "1712560974936",
                        "ActionName": "Set Participant Data",
                        "ActionValue": "Set Participant Data",
                        "ActionTableID": "1712560924082"
                    }
                ],
                "Conditions": [
                    {
                        "KVP": "ACCNT_STATUS",
                        "Operator": "=",
                        "Value": "Yes",
                        "Logical": "&&"
                    }
                ]
            },
            {
                "Version": "3",
                "UserName": "TestUser",
                "DateModified": "1712676067319",
                "RuleDescription": "TestRule3",
                "RuleCategory": "TestCategory3",
                "Rule": "ACCNT_STATUS=Yes&&",
                "Actions": [
                    {
                        "ActionID": "1712559300373",
                        "ActionName": "Route to",
                        "ActionValue": "zzzzz",
                        "ActionTableID": "1712557703913"
                    }
                ],
                "Conditions": [
                    {
                        "KVP": "ACCNT_STATUS",
                        "Operator": "=",
                        "Value": "Yes",
                        "Logical": "&&"
                    }
                ]
            }
        ]
    }
]


// -------------

// Parse the API response
const responseData = /* Response data from the API */;

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
});

console.log(transformedData);

setTableData((prevData) => [...prevData, { id: rule_id, name: inputName, type: 'Linear Rule', description: inputDescription, category: inputCategory }])
setFinalLR((prevData) => [...prevData, { LRId: rule_id, rule: updatedTempAllData }]);

{
    "id": "1712684858089",
    "BALANCE": {
        "operator": ">",
        "value": "500000"
    },
    "ACCNT_STATUS": {
        "operator": "=",
        "value": "Yes"
    },
    "Route to": "xcvb",
    "Set Participant Data": "qwryui"
}

{
    "LRId": "1712674273883",
    "rule": [
        {
            "id": "1712674273883",
            "ACCNT_STATUS": {
                "operator": "=",
                "value": "Yes"
            },
            "Route to": "zzzzz"
        }
    ]
}

{
    "packageid": "1712557703912",
    "ruleid": "1712674273883",
    "linearrule": [
        {
            "rulename": "LR2",
            "description" : "TestRule3",
            "category" : "TestCategory3",
            "conditions": [
                {
                    "kvp": "ACCNT_STATUS",
                    "operator": "=",
                    "value": "Yes",
                    "logical": "&&"
                }
            ],
            "actions": [
                {
                    "actionname": "Route to",
                    "actionvalue": "zzzzz",
                    "actionid": "1712559300373",
                    "actiontableid": "1712557703913"
                }
            ]
        }
    ]
}
put


[
    {
        "id": "123",
    
            "BALANCE": {
                "operator": "=",
                "value": "100000"
            },
            "ACCNT_STATUS": {
                "operator": "=",
                "value": "Yes"
            },
            
            
            "Set Participant Data": "y"
        
    },
    {
        "id": "1234",
        
            "BALANCE": {
                "operator": ">",
                "value": "800000"
            },
            "ACCNT_STATUS": {
                "operator": "=",
                "value": "Yes"
            },
            
            
            "Set Participant Data": "y"
        
    }
]



//------
const transformInput = (inputData, packageId, decisionRuleName) => {
    const transformedData = {
        packageid: packageId,
        rule: [
            {
                decisionrulename: decisionRuleName,
                decisionrule: []
            }
        ]
    };

    // Iterate over each rule in the input data
    inputData.forEach((rule, index) => {
        const { id, ...rest } = rule;
        const { "Set Participant Data": setParticipantData, ...conditions } = rest;

        const ruleConditions = [];
        // Create conditions for each key in the rule
        Object.keys(conditions).forEach(key => {
            const condition = conditions[key];
            ruleConditions.push({
                kvp: key,
                operator: condition.operator,
                value: condition.value,
                logical: ""
            });
        });

        // Create actions for each key in the rule
        const actions = Object.keys(rule)
            .filter(key => key !== "id")
            .map(key => ({
                actionname: key,
                actionvalue: rule[key],
                actionid: "1712560974936", // Example action ID
                actiontableid: "1712560924082" // Example action table ID
            }));

        // Create a decision rule object
        const decisionRule = {
            id: id,
            description: decisionRuleName,
            category: decisionRuleName,
            order: index + 1, // Assuming order starts from 1
            conditions: ruleConditions,
            actions: actions
        };

        // Push the decision rule to the array in the output
        transformedData.rule[0].decisionrule.push(decisionRule);
    });

    return transformedData;
};

// Example usage
const inputData = [
    {
        "id": "123",
        "BALANCE": {
            "operator": "=",
            "value": "100000"
        },
        "ACCNT_STATUS": {
            "operator": "=",
            "value": "Yes"
        },
        "Set Participant Data": "y"
    },
    {
        "id": "1234",
        "BALANCE": {
            "operator": ">",
            "value": "800000"
        },
        "ACCNT_STATUS": {
            "operator": "=",
            "value": "Yes"
        },
        "Set Participant Data": "y"
    }
];

const packageId = "x";
const decisionRuleName = "DT1";

const transformedOutput = transformInput(inputData, packageId, decisionRuleName);
console.log(transformedOutput);




///----
const transformOutput = (outputData) => {
    const inputData = outputData.rule[0].decisionrule.map((decisionRule) => {
        const { id, conditions, actions } = decisionRule;
        const rule = {
            id: id,
        };

        // Extract conditions
        conditions.forEach((condition) => {
            rule[condition.kvp] = {
                operator: condition.operator,
                value: condition.value
            };
        });

        // Extract actions
        actions.forEach((action) => {
            rule[action.actionname] = action.actionvalue;
        });

        return rule;
    });

    return inputData;
};

// Example usage
const outputData = {
    "packageid": "x",
    "rule": [
        {
            "decisionrulename": "DT1",
            "decisionrule": [
                {
                    "id": "1234",
                    "description": "DT1",
                    "category": "DT1",
                    "order": "1",
                    "conditions": [
                        {
                            "kvp": "ACCNT_STATUS",
                            "operator": "=",
                            "value": "Yes",
                            "logical": "&&"
                        },
                        {
                            "kvp": "BALANCE",
                            "operator": "=",
                            "value": "100000",
                            "logical": ""
                        }
                    ],
                    "actions": [
                        {
                            "actionname": "Set Participant Data",
                            "actionvalue": "Set Participant Data",
                            "actionid": "1712560974936",
                            "actiontableid": "1712560924082"
                        }
                    ]
                },
                {
                    "id": "12344",
                    "description": "DT1",
                    "category": "DT1",
                    "order": "2",
                    "conditions": [
                        {
                            "kvp": "ACCNT_STATUS",
                            "operator": ">",
                            "value": "Yes",
                            "logical": "&&"
                        },
                        {
                            "kvp": "BALANCE",
                            "operator": ">",
                            "value": "800000",
                            "logical": ""
                        }
                    ],
                    "actions": [
                        {
                            "actionname": "Set Participant Data",
                            "actionvalue": "Set Participant Data",
                            "actionid": "1712560974936",
                            "actiontableid": "1712560924082"
                        }
                    ]
                }
            ]
        }
    ]
};

const inputData = transformOutput(outputData);
console.log(inputData);

-----
// Assume `xmlFile` is the XML file you want to send

// Convert XML content to a Blob object
const blob = new Blob([xmlFile], { type: 'text/xml' });

// Create FormData object to append the Blob object
const formData = new FormData();
formData.append('file', blob, 'filename.xml'); // 'file' is the name of the field on the backend, 'filename.xml' is the name of the file

// Send the FormData object to the backend using Fetch API
fetch('http://your-backend-api.com/upload', {
  method: 'POST',
  body: formData
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
