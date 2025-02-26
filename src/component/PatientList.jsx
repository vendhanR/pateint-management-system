import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PatientDataContext } from "../contexts/PatientDataContextProvider";

const PatientList = () => {
  const { patientdata, searchedPatientdata, setSearchedPatientdata } =
    useContext(PatientDataContext);

  const navigate = useNavigate();

  function handleSearch(value) {
    const searchList = patientdata.filter((patient) =>
      patient.name.includes(value)
    );
    setSearchedPatientdata(searchList);
  }

  function handleSort(value) {
    if (value === "Age by ascending") {
      const ascendingAge = [...patientdata].sort(
        (a, b) => parseInt(a.age) - parseInt(b.age)
      );
      setSearchedPatientdata(ascendingAge);
    } else if (value === "Age by decending") {
      const decendingAge = [...patientdata].sort(
        (a, b) => parseInt(b.age) - parseInt(a.age)
      );
      setSearchedPatientdata(decendingAge);
    } else if (value === "Name") {
      const sortByName = [...patientdata].sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      setSearchedPatientdata(sortByName);
    } else if (value === "Date") {
      const sortByDate = [...patientdata].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setSearchedPatientdata(sortByDate);
    }
  }

  function hanleFilter(value) {
    if (value === "Male") {
      const maleList = [...patientdata].filter(
        (data) => data.gender === "Male"
      );
      setSearchedPatientdata(maleList);
    } else if (value === "Female") {
      const feMaleList = [...patientdata].filter(
        (data) => data.gender === "Female"
      );
      setSearchedPatientdata(feMaleList);
    } else if (value === "Below 18") {
      const below18 = [...patientdata].filter((data) => data.age <= 18);
      setSearchedPatientdata(below18);
    }
  }

  return (
    <>
      <div className="sm:px-10 md:px-32 px-5 flex flex-col">
        <div className="flex justify-end">
          <button
            onClick={() => navigate("/addpatient")}
            className="bg-green-600 text-white p-1 rounded-md cursor-pointer hover:bg-green-700"
          >
            Add Patient
          </button>
        </div>
        <div className="flex flex-col md:flex-row md:items-center mt-10 gap-3">
          <div className="w-full flex flex-col sm:flex-row md:justify-between items-center bg-gray-900 rounded-md px-5 py-1 gap-3">
           <div className="flex gap-2 ">
           <div className="flex gap-1">
              <p className="text-white">Sort:</p>
              <select
                name="sort"
                className="outline-none rounded-md bg-gray-700 text-white text-xs"
                onChange={(e) => handleSort(e.target.value)}
              >
                <option>...choose...</option>
                <option>Age by asc</option>
                <option>Age by dec</option>
                <option>Date</option>
                <option>Name</option>
              </select>
            </div>
            <div className="flex gap-1 ">
              <p className="text-white">Filter:</p>
              <select
                onChange={(e) => hanleFilter(e.target.value)}
                className="outline-none rounded-md bg-gray-700 text-white text-xs"
              >
                <option>...choose...</option>
                <option>Male</option>
                <option>Female</option>
                <option>Below 18</option>
              </select>
            </div>
           </div>
            <input
              // {...register("name")}
              className="border outline-none w-[90%] md:w-[40%] border-blue-800 rounded px-2 h-8"
              type="text"
              name="name"
              id="name"
              placeholder="Search..."
              onInput={(e) => handleSearch(e.target.value)}
            />
            
            <button
              onClick={() => setSearchedPatientdata(patientdata)}
              className="text-white text-sm bg-gray-700 px-3 pb-1 rounded-full"
              title="clear"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 ">
                  name
                </th>
                <th scope="col" className="px-6 py-3">
                  Age
                </th>
                <th scope="col" className="px-6 py-3">
                  Gender
                </th>
                <th scope="col" className="px-6 py-3">
                  Diagnosis
                </th>
                <th scope="col" className="px-6 py-3">
                  Appointment Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Modification
                </th>
              </tr>
            </thead>
            <tbody>
              {searchedPatientdata?.map((data, index) => {
                return (
                  <tr
                    key={index}
                    className="odd:bg-white  odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200 hover:"
                  >
                    <td className="px-6 py-4">{data.name}</td>
                    <td className="px-6 py-4">{data.age}</td>
                    <td className="px-6 py-4">{data.gender}</td>
                    <td className="px-6 py-4">{data.diagnosis}</td>
                    <td className="px-6 py-4">{data.date}</td>
                    <td className="px-6 py-4 flex">
                      <button
                        onClick={() => navigate(`addpatient/${data.name}`)}
                        className="bg-teal-500 text-white p-1 rounded-lg ml-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => navigate(`/patientlist/${data.name}`)}
                        className="bg-blue-800 text-white p-1 rounded-lg ml-2"
                      >
                        Profile
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PatientList;
