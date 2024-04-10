const { Upload } = require("@mui/icons-material");

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

{
    "packageid": "x",
    "rule": [
        {
            "decisionrulename": "DT1",
            
            "decisionrule": [
                {
                    "id": "1234",
                    "description": "DT1",
                    "category": "DT1",
                    "order":"1",
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
                    "order":"2",
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
}


-----
xml Upload
import React, { useState } from 'react';
import axios from 'axios';

const UploadPage = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      await axios.post('http://your-backend-api.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // File uploaded successfully, you can add your logic here
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle error
      alert('Error uploading file. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Upload XML File</h2>
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                Select XML File
              </label>
              <div className="mt-1 flex items-center">
                <input id="file" name="file" type="file" className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={handleFileChange} />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button onClick={handleUpload} type="button" className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;



// Convert XML content to a Blob object
const blob = new Blob([xmlFile], { type: 'text/xml' });

// Create FormData object to append the Blob object
const formData = new FormData();
formData.append('file', blob, 'filename.xml'); // 'file' is the name of the field on the backend, 'filename.xml' is the name of the file

// Send the FormData object to the backend using Axios
axios.post('http://your-backend-api.com/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
.then(response => {
  console.log('Success:', response.data);
})
.catch(error => {
  console.error('Error:', error);
});


//////new upfile
import React, { useState } from 'react';
import axios from 'axios';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      await axios.post('http://your-backend-api.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // File uploaded successfully, you can add your logic here
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle error
      alert('Error uploading file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Upload XML File</h2>
          </div>
          <div className="mt-8 space-y-6">
            <div>
              <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M37 18H11a3 3 0 00-3 3v20a3 3 0 003 3h26a3 3 0 003-3V21a3 3 0 00-3-3z" />
                    <path d="M24 8L12 16l-1 1V9a3 3 0 013-3h8zM12 32v-9l6 4.5L24 24l6 4.5L36 23v9H12z" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">XML files only</p>
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={handleUpload}
                type="button"
                disabled={!file || isUploading}
                className={`w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                  (file && !isUploading) ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500' : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                {isUploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
