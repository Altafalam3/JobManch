import React, { useState } from 'react';
import axios from 'axios';

const Fileupload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState({});
  const [result2, setResult2] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleFileChange2 = (event) => {
    const file = event.target.files[0];
    setJobDescription(file);
  };


  const handleFileSubmit = async () => {
    if (selectedFile && jobDescription) {
      const formData = new FormData();
      formData.append('resume_file', selectedFile);
      formData.append('job_file', jobDescription);

      try {
        const response = await axios.post('http://localhost:5000/resumeMatcher', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Resume 1 uploaded successfully:', response.data);
        setResult(response.data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }

      try {
        const response2 = await axios.post('http://localhost:5000/resumeCheck', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Resume 2 uploaded successfully:', response2.data);
        setResult2(response2.data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.warn('Please select a file and enter job description before submitting.');
    }
  };

  return (
    <>
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
              Drop Resume here or
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
              <p className="mt-2 text-gray-600">Selected Resume: {selectedFile.name}</p>
            )}
            <p className="mt-4 text-center text-xl font-medium text-gray-800">
              Drop Job Description or
              <label className="shadow-blue-100 mt-2 block rounded-full border bg-white px-4 py-0.5 font-normal text-blue-500 shadow hover:bg-blue-50">
                <input
                  className="hidden"
                  type="file"
                  name="file"
                  id=""
                  onChange={handleFileChange2}
                />
                Browse
              </label>
            </p>
            {jobDescription && (
              <p className="mt-2 text-gray-600"> Job Description: {jobDescription.name}</p>
            )}
          </div>
          <button onClick={handleFileSubmit} className="mt-4 rounded-full bg-blue-600 px-10 py-2 font-semibold text-white">
            Submit
          </button>
        </div>
        <br />

      </div>{result && result2 && <div className='px-10'>

        <p><strong>Job skills : </strong>{result.job_skills}</p><br />
        <p><strong>Resume skills: </strong>{result.resume_skills}</p><br />
        <p><strong>Skill Match percentage: </strong>{result.skill_match_percentage}</p><br /><br />
        <p><strong>Overall : </strong>{result2.response}</p></div>}

      <div>

      </div>
    </>
  );
};

export default Fileupload;
