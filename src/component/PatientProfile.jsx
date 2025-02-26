import React from "react";
import { useParams } from "react-router-dom";

const PatientProfile = () => {
  const { name } = useParams();
  const patientArr = JSON.parse(localStorage.getItem("patientList"));
  const patient = {};
  patientArr.map((data) => name === data.name && Object.assign(patient, data));

  return (
    <div className="w-full h-full px-20 flex flex-col p-5 items-center  mt-2 ">
      <div className="w-80  flex flex-col items-center">
        <div className="flex flex-col items-center gap-3 text-2xl capitalize">
          <img
            className="w-20 h-20 rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOH2aZnIHWjMQj2lQUOWIL2f4Hljgab0ecZQ&s"
            alt=""
          />
          <div className="border-b w-full">
            <h1 className="text-sm">Name:</h1>
            <p className="text-lg font-thin">{patient.name}</p>
          </div>
          <div className="border-b w-80">
            <h1 className="text-sm">Age:</h1>
            <p className="text-lg font-thin">{patient.age}</p>
          </div>
          <div className="border-b w-80">
            <h1 className="text-sm">Gender:</h1>
            <p className="text-lg font-thin">{patient.gender}</p>
          </div>
          <div className="border-b w-80">
            <h1 className="text-sm">MedicalHistory:</h1>
            <p className="text-lg font-thin">{patient.MedicalHistory}</p>
          </div>
          <div className="border-b w-80">
            <h1 className="text-sm">Prescriptions:</h1>
            <p className="text-lg font-thin">{patient.Prescriptions}</p>
          </div>
          <div className="border-b w-80">
            <h1 className="text-sm">DoctorNotes:</h1>
            <p className="text-lg font-thin">{patient.DoctorNotes}</p>
          </div>
        </div>
        <div className=" flex gap-2"></div>
      </div>
    </div>
  );
};

export default PatientProfile;
