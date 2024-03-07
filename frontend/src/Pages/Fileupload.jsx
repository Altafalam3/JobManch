import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const Fileupload = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
    };
  
    const handleFileSubmit = async () => {
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
  
        try {
          const response = await axios.post('YOUR_API_ENDPOINT', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
  
          // Handle the response, e.g., show a success message
          console.log('File uploaded successfully:', response.data);
        } catch (error) {
          // Handle errors, e.g., show an error message
          console.error('Error uploading file:', error);
        }
      } else {
        // Handle the case where no file is selected
        console.warn('Please select a file before submitting.');
      }
    };
  


  return(<>
  
  <div className="sm:w-[32rem] shadow-blue-100 mx-auto my-10 overflow-hidden rounded-2xl bg-white shadow-lg sm:max-w-lg">
        <div className="relative bg-blue-600 py-6 pl-8 text-xl font-semibold uppercase tracking-wider text-white">
          Upload Files
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 right-0 m-5 h-6 w-6 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="space-y-4 px-8 py-10">
          <div className="flex flex-col items-center justify-center rounded-lg border-4 border-dashed px-4 py-10">
            <p className="mt-4 text-center text-xl font-medium text-gray-800">
              Drop Files here or
              <label className="shadow-blue-100 mt-2 block rounded-full border bg-white px-4 py-0.5 font-normal text-blue-500 shadow hover:bg-blue-50">
                <input
                  className="hidden"
                  type="file"
                  name="file"
                  id=""
                  onChange={handleFileChange}
                />
                Browse
              </label>
            </p>
            {selectedFile && (
              <p className="mt-2 text-gray-600">Selected File: {selectedFile.name}</p>
            )}
          </div>
          <button onClick={handleFileSubmit} className="mt-4 rounded-full bg-blue-600 px-10 py-2 font-semibold text-white">
            Submit
          </button>
        </div>
      </div>

  </>)
}

export default Fileupload