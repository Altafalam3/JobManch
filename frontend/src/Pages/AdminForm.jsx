import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminForm() {
    const navigate = useNavigate();
    const Jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyYmE4NjU3MS1jZDcwLTQ1YWYtYmFjMC0wNjUyMzlkZjg0YmMiLCJlbWFpbCI6ImFsdGFmLmFsYW0wMDMyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIxODhkOGMyOGNlN2U3OTU4MTNmMSIsInNjb3BlZEtleVNlY3JldCI6IjViMzM1ZTEzZTQ5NWE4ZWJkMzBhYzIzNWNhMGMzMzg0ODk5MDk4NWI4MzNmMTI0MTgyMmQyYzk2NWRkMWE0MjciLCJpYXQiOjE3MDk3NjEyMjh9.l1EXP7cdT7aNuMtyONtxJ363TdKXs7p06dU3yw2kKQ4";
    // State for form inputs
    const [values, setValues] = useState({
        companyName: "",
        jobDescription: "",
        roleDescription: "",
        duration: "",
        branchEligibility: "",
        requiredSkills: "",
        preferredSkills: "",
        additionalInformation: "",
        documents: null,
        links: "",
        upcomingSchedule: [], // Array to store rounds and dates
        eligibilityCriteria: "",
        stipend: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };
    console.log(values);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", values.documents);
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
            formData2.documents = "https://ipfs.io/ipfs/" + response.data.IpfsHash;
            console.log(formData2);
        } catch (error) {
            console.error("Error uploading file:", error);
        }

        axios
            .post("http://localhost:8800/api/company", formData2)
            .then((res) => {
                console.log(res);
                navigate("/");
            })
            .catch((err) => console.error(err));
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-12 m-5 border-solid border-4 border-[#000] rounded-3xl p-4"
        >
            <div className="space-y-12 m-10">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Profile
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        This information will be displayed publicly so be
                        careful what you share.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label
                                htmlFor="companyName"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Company Name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="companyName"
                                    id="companyName"
                                    autoComplete="company-name"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    value={values.companyName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="jobDescription"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Job Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="jobDescription"
                                    name="jobDescription"
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={""}
                                    value={values.jobDescription}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="roleDescription"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Role Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="roleDescription"
                                    name="roleDescription"
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={""}
                                    value={values.roleDescription}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label
                                htmlFor="duration"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Duration
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="duration"
                                    id="duration"
                                    autoComplete="duration"
                                    className="block w-full rounded-md border-0 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={values.duration}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="branchEligibility"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Branch Eligibility
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="branchEligibility"
                                    id="branchEligibility"
                                    autoComplete="branch-eligibility"
                                    className="block w-full rounded-md border-0 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={values.branchEligibility}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="requiredSkills"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Required Skills
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="requiredSkills"
                                    id="requiredSkills"
                                    autoComplete="required-skills"
                                    className="block w-full rounded-md border-0 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={values.requiredSkills}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="preferredSkills"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Preferred Skills
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="preferredSkills"
                                    id="preferredSkills"
                                    autoComplete="preferred-skills"
                                    className="block w-full rounded-md border-0 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={values.preferredSkills}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="additionalInformation"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Additional Information
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="additionalInformation"
                                    name="additionalInformation"
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={""}
                                    value={values.additionalInformation}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="documents"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Documents
                            </label>
                            <div className="mt-2">
                                <input
                                    type="file"
                                    name="documents"
                                    id="documents"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e) =>
                                        setValues({
                                            ...values,
                                            documents: e.target.files[0],
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="links"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Links to Attach
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="links"
                                    id="links"
                                    autoComplete="links"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={values.links}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Upcoming Schedule
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Add upcoming rounds and their respective dates.
                    </p>

                    {/* Input fields for upcoming rounds and dates */}
                    <div className="mt-6 space-y-6">
                        {/* Round 1 */}
                        <div className="flex items-center gap-x-3">
                            <input
                                type="text"
                                id="round1"
                                name="round1"
                                placeholder="Round 1"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={values.upcomingSchedule[0]?.round}
                                onChange={(e) => {
                                    const updatedSchedule = [
                                        ...values.upcomingSchedule,
                                    ];
                                    updatedSchedule[0] = {
                                        round: e.target.value,
                                        date: updatedSchedule[0]?.date || "",
                                    };
                                    setValues({
                                        ...values,
                                        upcomingSchedule: updatedSchedule,
                                    });
                                }}
                            />
                            <input
                                type="date"
                                id="round1Date"
                                name="round1Date"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={values.upcomingSchedule[0]?.date}
                                onChange={(e) => {
                                    const updatedSchedule = [
                                        ...values.upcomingSchedule,
                                    ];
                                    updatedSchedule[0] = {
                                        date: e.target.value,
                                        round: updatedSchedule[0]?.round || "",
                                    };
                                    setValues({
                                        ...values,
                                        upcomingSchedule: updatedSchedule,
                                    });
                                }}
                            />
                        </div>
                        {/* Round 2 */}
                        <div className="flex items-center gap-x-3">
                            <input
                                type="text"
                                id="round2"
                                name="round2"
                                placeholder="Round 2"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={values.upcomingSchedule[1]?.round}
                                onChange={(e) => {
                                    const updatedSchedule = [
                                        ...values.upcomingSchedule,
                                    ];
                                    updatedSchedule[1] = {
                                        round: e.target.value,
                                        date: updatedSchedule[1]?.date || "",
                                    };
                                    setValues({
                                        ...values,
                                        upcomingSchedule: updatedSchedule,
                                    });
                                }}
                            />
                            <input
                                type="date"
                                id="round2Date"
                                name="round2Date"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={values.upcomingSchedule[1]?.date}
                                onChange={(e) => {
                                    const updatedSchedule = [
                                        ...values.upcomingSchedule,
                                    ];
                                    updatedSchedule[1] = {
                                        date: e.target.value,
                                        round: updatedSchedule[1]?.round || "",
                                    };
                                    setValues({
                                        ...values,
                                        upcomingSchedule: updatedSchedule,
                                    });
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Eligibility Criteria
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Specify the eligibility criteria for the role.
                    </p>

                    {/* Input fields for eligibility criteria */}
                    <div className="mt-6 space-y-6">
                        <textarea
                            id="eligibilityCriteria"
                            name="eligibilityCriteria"
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Enter eligibility criteria..."
                            value={values.eligibilityCriteria}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Stipend
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Specify the stipend for the role.
                    </p>

                    <div className="mt-6 space-y-6">
                        <input
                            type="text"
                            id="stipend"
                            name="stipend"
                            placeholder="Enter stipend amount"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={values.stipend}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900"
                    >
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
    );
}
