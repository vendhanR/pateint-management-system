import React, { createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const PatientDataContext = createContext();

const PatientDataContextProvider = ({ children }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [selectedData, setSelectedData] = useState({});

  const [patientdata, setPatientdata] = useState([]);
  const [searchedPatientdata, setSearchedPatientdata] = useState([]);

  useEffect(() => {
    const arr = [];
    let patientData = localStorage.getItem("patientList");
    let parsedData = JSON.parse(patientData || "[]");

    // Add dummy data only if LocalStorage is empty
    if (parsedData.length === 0) {
      const dummyPatients = [
        {
          name: "John Doe",
          age: 45,
          gender: "Male",
          diagnosis: "Diabetes Type 2",
          MedicalHistory: "Diagnosed 5 years ago, managed with medication.",
          Prescriptions: ["Metformin 500mg", "Atorvastatin 10mg"],
          DoctorNotes: "Monitor blood sugar levels daily.",
          date: "2025-03-15",
        },
        {
          name: "Emily Johnson",
          age: 29,
          gender: "Female",
          diagnosis: "Migraine",
          MedicalHistory: "Frequent migraines, no prior hospitalizations.",
          Prescriptions: ["Rizatriptan 10mg", "Naproxen 250mg"],
          DoctorNotes: "Reduce screen time and maintain hydration.",
          date: "2025-04-10",
        },
        {
          name: "Michael Brown",
          age: 51,
          gender: "Male",
          diagnosis: "High Cholesterol",
          MedicalHistory:
            "Elevated LDL levels, family history of heart disease.",
          Prescriptions: ["Rosuvastatin 20mg", "Aspirin 81mg"],
          DoctorNotes: "Regular exercise and low-fat diet recommended.",
          date: "2025-05-20",
        },
        {
          name: "Sophia Davis",
          age: 40,
          gender: "Female",
          diagnosis: "Asthma",
          MedicalHistory: "Asthma since childhood, managed with inhalers.",
          Prescriptions: ["Albuterol Inhaler", "Montelukast 10mg"],
          DoctorNotes: "Avoid dust exposure and cold weather.",
          date: "2025-06-05",
        },
        {
          name: "David Wilson",
          age: 37,
          gender: "Male",
          diagnosis: "Gastritis",
          MedicalHistory: "Chronic acid reflux, occasional ulcers.",
          Prescriptions: ["Omeprazole 20mg", "Sucralfate 1g"],
          DoctorNotes: "Avoid spicy food and alcohol.",
          date: "2025-07-12",
        },
      ];

      localStorage.setItem("patientList", JSON.stringify(dummyPatients));
      parsedData = dummyPatients; // Use the dummy data
    }

    parsedData?.forEach((data) => arr.push(data));
    setPatientdata(arr);
    setSearchedPatientdata(arr);
  }, []);

  const addorUpdatePatient = (data, name, reset) => {
    const patientsdata = JSON.parse(localStorage.getItem("patientList")) || [];
    let updatedList = [];
    if (name) {
      updatedList = patientdata.map((patientData) =>
        patientData.name === name ? { ...patientData, ...data } : patientData
      );
    } else {
      updatedList = [...patientsdata, data];
    }
    // Append new data
    localStorage.setItem("patientList", JSON.stringify(updatedList));
    setSearchedPatientdata(updatedList);
    reset();
    toast.success(
      name ? "Patient updated successfully!" : "New patient added!",
      { position: "top-right" }
    );
  };

  return (
    <PatientDataContext.Provider
      value={{
        patientdata,
        setPatientdata,
        searchedPatientdata,
        setSearchedPatientdata,
        register,
        handleSubmit,
        addorUpdatePatient,
        selectedData,
        setSelectedData,
        setValue,
        reset,
        formState: { errors },
      }}
    >
      {children}
    </PatientDataContext.Provider>
  );
};

export default PatientDataContextProvider;
