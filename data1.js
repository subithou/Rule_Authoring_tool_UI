

const originalData = {
    "id": "1712576200689",
    "rulename": "Lr1",
    "description": "TestRule",
    "category": "TestCategory",
    "BALANCE": {
        "operator": "=",
        "value": "100000"
    },
    "ACCNT_STATUS": {
        "operator": "=",
        "value": "yes"
    },
    "Route to": "x",
    "Set Participant Data": "y"
};

// Function to transform data
const transformData = (originalData) => {
    const transformedData = {
        packageid: originalData.id,
        linearrule: [
            {
                ruleid: "123", // You may generate a unique ruleid as per your requirement
                rulename: originalData.rulename,
                description: originalData.description,
                category: originalData.category,
                conditions: [],
                actions: []
            }
        ]
    };

    // Iterate through originalData and add conditions and actions to transformedData
    Object.keys(originalData).forEach(key => {
        if (key !== "id" && key !== "rulename" && key !== "description" && key !== "category" && key !== "Route to") {
            if (key === "Set Participant Data" || key.startsWith("Route to")) {
                transformedData.linearrule[0].actions.push({
                    actionname: key,
                    actionvalue: originalData[key],
                    actionid: "1712560974936", // You may generate a unique actionid as per your requirement
                    actiontableid: "1712560924082" // You may generate a unique actiontableid as per your requirement
                });
            } else {
                transformedData.linearrule[0].conditions.push({
                    kvp: key,
                    operator: originalData[key].operator,
                    value: originalData[key].value,
                    logical: ""
                });
            }
        }
    });

    return transformedData;
};

// Call the function to transform data
const transformedData = transformData(originalData);
console.log(transformedData);


[
    {
        "id": "1712662546791",
        "BALANCE": {
            "operator": "=",
            "value": "500000"
        },
        "ACCNT_STATUS": {
            "operator": "=",
            "value": "Yes"
        },
        
        "Route to": "x",
        "Set Participant Data": "y"
    }
]

//------------

