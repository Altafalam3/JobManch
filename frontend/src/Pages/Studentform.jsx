import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios'
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom'

export default function Studentform() {
  const navigate = useNavigate();
  const Jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyYmE4NjU3MS1jZDcwLTQ1YWYtYmFjMC0wNjUyMzlkZjg0YmMiLCJlbWFpbCI6ImFsdGFmLmFsYW0wMDMyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIxODhkOGMyOGNlN2U3OTU4MTNmMSIsInNjb3BlZEtleVNlY3JldCI6IjViMzM1ZTEzZTQ5NWE4ZWJkMzBhYzIzNWNhMGMzMzg0ODk5MDk4NWI4MzNmMTI0MTgyMmQyYzk2NWRkMWE0MjciLCJpYXQiOjE3MDk3NjEyMjh9.l1EXP7cdT7aNuMtyONtxJ363TdKXs7p06dU3yw2kKQ4";

  const [values, setValues] = useState({
    about: '',
    profilePic: '',
    tenth: '',
    twelth: '',
    cgpa: '',
    roll: '',
    dob: null,
    department: '',
    passphrase: false,
    gender: '',
    drop: false,
    kt: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };


  // const handleCheckboxChange = (event) => {
  //   const selectedDepartment = event.target.innerText;

  //   setValues(prevState => ({
  //     ...prevState,
  //     department: selectedDepartment // Update the department value in state
  //   }));
  // };
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setValues(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", values.profilePic);
    let formData2 = values;

    try {
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Jwt}`,
          },
        }
      );

      console.log("File uploaded successfully:", response.data);
      formData2.profilePic = "https://ipfs.io/ipfs/" + response.data.IpfsHash;
      console.log(formData2);
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    axios
      .post("http://localhost:8800/api/user/profile", formData2)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12 m-5 border-solid border-4 border-[#000]  rounded-3xl p-4" >
      <div className="space-y-12 m-10 ">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">


            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                About
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                  value={values.about}
                  onChange={handleChange}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
            </div>
            {/* 
            <div className="col-span-full">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div> */}

            <div className="col-span-full">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                Photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-[#0077ff] focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e) =>
                        setValues({
                          ...values,
                          profilePic: e.target.files[0],
                        })
                      } accept="image/*" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Internships and Work Experience</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">fill up your past Experience</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className='sm:col-span-4 '>
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                Education
              </label>
              <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="number" className="block text-sm font-medium leading-6 text-gray-900">
                  10th %
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="tenth"
                    id="tenth"
                    autoComplete="tenth"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={values.tenth}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="12th" className="block text-sm font-medium leading-6 text-gray-900">
                  12th %
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="twelth"
                    id="twelth"
                    autoComplete="twelth"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={values.twelth}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="cgpa" className="block text-sm font-medium leading-6 text-gray-900">
                  Average CGPA
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="cgpa"
                    id="cgpa"
                    autoComplete="cgpa"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={values.cgpa}
                    onChange={handleChange}

                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="12th" className="block text-sm font-medium leading-6 text-gray-900">
            Roll no.
          </label>
          <div className="mt-2">
            <input
              type="number"
              name="roll"
              id="roll"
              autoComplete="roll"
              className="block w-400 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={values.roll}
              onChange={handleChange}
            />
          </div>
        </div>

        <label htmlFor="cgpa" className="block text-sm font-medium leading-6 text-gray-900">
          Enter DOB
        </label>
        <div className="relative max-w-sm">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <input
            type="date"
            id="round1Date"
            name="round1Date"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={values.dob}
            onChange={(e) => {
              setValues({
                ...values,
                dob: values.dob,
              });
            }}
          />
        </div>

        <div className="p-2">

          <div className="relative w-56">
            <input className="peer hidden" type="checkbox" name="select-1" id="select-1"
              // checked={isChecked}
              onChange={handleCheckboxChange} />
            <label for="select-1" className="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-400 peer-checked:ring">Select Department</label>
            <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-gray-600 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            <ul className="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-xl transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
              <li className="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white">COMPS</li>
              <li className="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white">IT</li>
              <li className="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white">AIDS</li>
              <li className="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white">EXTC</li>
              <li className="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white">ELECTRICAL</li>
              <li className="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white">CHEMICAL</li>
            </ul>
          </div>


        </div>
        <div className="border-b border-gray-900/10 pb-12">


          <div className="mt-10 space-y-10">

            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">please select an option</legend>
              {/* <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p> */}
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-passphrase"
                    name="push-passphrase"
                    type="radio"
                    value="yes"
                    checked={values.passphrase === "yes"}
                    onChange={setValues({ ...values, [values.passphrase]: "yes" })}
                    className="h-4 w-4 border-gray-300 text-[#0077ff] focus:ring-indigo-600"
                  />
                  <label htmlFor="push-passphrase" className="block text-sm font-medium leading-6 text-gray-900">
                    I have received a passphrase from my college placement cell
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-passphrase"
                    name="push-passphrase"
                    type="radio"
                    value="no"
                    checked={values.passphrase === false}
                    onChange={setValues({ ...values, [values.passphrase]: false })}
                    className="h-4 w-4 border-gray-300 text-[#0077ff] focus:ring-indigo-600"
                  />
                  <label htmlFor="push-passphrase" className="block text-sm font-medium leading-6 text-gray-900">
                    I'm here to apply for job
                  </label>
                </div>

              </div>
            </fieldset>
          </div>
          <div className="mt-10 space-y-10">

            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">please select Gender</legend>
              {/* <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p> */}
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-gender"
                    name="push-gender"
                    type="radio"
                    value="Female"
                    checked={values.gender === "Female"}
                    onChange={setValues({ ...values, [values.gender]: "Female" })}
                    className="h-4 w-4 border-gray-300 text-[#0077ff] focus:ring-indigo-600"
                  />
                  <label htmlFor="push-gender" className="block text-sm font-medium leading-6 text-gray-900">
                    Female
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-gender"
                    name="push-gender"
                    type="radio"
                    value="Male"
                    checked={values.gender === "Male"}
                    onChange={setValues({ ...values, [values.gender]: "Male" })}
                    className="h-4 w-4 border-gray-300 text-[#0077ff] focus:ring-indigo-600"
                  />
                  <label htmlFor="push-gender" className="block text-sm font-medium leading-6 text-gray-900">
                    Male
                  </label>
                </div>

              </div>
            </fieldset>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">Drop</legend>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-everything3"
                      name="push-everything3"
                      type="radio"
                      value="yes"
                      checked={values.selectedDrop === true}
                      onChange={setValues({ ...values, [values.gender]: "Male" })}
                      className="h-4 w-4 border-gray-300 text-[#0077ff] focus:ring-indigo-600"
                    />
                    <label htmlFor="push-everything3" className="block text-sm font-medium leading-6 text-gray-900">
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-everything3"
                      name="push-everything3"
                      type="radio"
                      value="no"
                      checked={values.selectedDrop === 'no'}
                      // onChange={handleOptionChange}
                      className="h-4 w-4 border-gray-300 text-[#0077ff] focus:ring-indigo-600"
                    />
                    <label htmlFor="push-email3" className="block text-sm font-medium leading-6 text-gray-900">
                      No
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">Active KT</legend>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-everything4"
                      name="push-notifications-kt"
                      type="radio"
                      value="yes"
                      checked={values.selectedKT === 'yes'}
                      // onChange={handleOptionChange}
                      className="h-4 w-4 border-gray-300 text-[#0077ff] focus:ring-indigo-600"
                    />
                    <label htmlFor="push-everything4" className="block text-sm font-medium leading-6 text-gray-900">
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-email4"
                      name="push-notifications-kt"
                      type="radio"
                      value="no"
                      checked={values.selectedKT === 'no'}
                      // onChange={handleOptionChange}
                      className="h-4 w-4 border-gray-300 text-[#0077ff] focus:ring-indigo-600"
                    />
                    <label htmlFor="push-email4" className="block text-sm font-medium leading-6 text-gray-900">
                      NO
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          We'll always let you know about important changes, but you pick what else you want to hear about.
        </p>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-[#0077ff] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  )
}