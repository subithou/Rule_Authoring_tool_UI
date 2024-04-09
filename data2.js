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