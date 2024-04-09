{
    "packageid": "1712560852231",
    "linearrule": [
        {
            "ruleid": "123",
            "rulename": "Lr1",
            "description" : "TestRule",
            "category" : "TestCategory",
            "conditions": [
                {
                    "kvp": "BALANCE",
                    "operator": "=",
                    "value": "100000",
                    "logical": ""
                },
                {
                    "kvp": "ACCNT_STATUS",
                    "operator": "=",
                    "value": "Yes",
                    "logical": "&&"
                }
                
            ],
            "actions": [
                {
                    "actionname": "Set Participant Data",
                    "actionvalue": "y",
                    "actionid": "1712560974936",
                    "actiontableid": "1712560924082"
                },
                {
                    "actionname": "Route tp",
                    "actionvalue": "x",
                    "actionid": "1712560974936",
                    "actiontableid": "1712560924082"
                }

            ]
        }
    ]
}


// Iterate through originalData and add conditions and actions to transformedData
originalData.forEach(dataItem => {
    Object.keys(dataItem).forEach(key => {
        if (key !== "id" && key !== "rulename" && key !== "description" && key !== "category") {
            if (key === "Route to" || key === "Voicemail" || key === "Set Participant Data") {
                transformedData.linearrule[0].actions.push({
                    actionname: key,
                    actionvalue: dataItem[key],
                    actionid: "1712560974936",
                    actiontableid: "1712560924082"
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

[
    {
        "actionid": "1712560980322",
        "action": "Route to",
        "value": "Route to"
    },
    {
        "actionid": "1712560974936",
        "action": "Set Participant Data",
        "value": "Set Participant Data"
    }
]