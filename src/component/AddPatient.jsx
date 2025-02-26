import React, { useContext, useEffect, useState } from "react";
import { PatientDataContext } from "../contexts/PatientDataContextProvider";
import { useParams } from "react-router-dom";

const AddPatient = () => {
  const { register, handleSubmit, addorUpdatePatient, setValue, reset,  formState: { errors } } =
    useContext(PatientDataContext);

  const { name } = useParams();

  useEffect(() => {
    if (name) {
      const patient = JSON.parse(localStorage.getItem("patientList"));
      if (patient) {
        patient.map((data) => {
          if (data.name === name) {
            Object.keys(data).forEach((key) => {
              setValue(key, data[key]);
            });
          }
        });
      }
    } else {
      reset();
    }
  }, []);

  return (
    <div className="flex justify-center items-center flex-col w-full gap-2 p-5 sm:px-10 md:px-20 lg:px-40 ">
      <form
        onSubmit={handleSubmit((data) => addorUpdatePatient(data,name,reset))}
        className="bg-white p-3 rounded-md w-full shadow-2xl px-5 "
      >
        <div className="mb-2 ">
          <label htmlFor="name" className="text-blue-800 font-medium">
            Name:
          </label>
          <br />
          <input
            {...register("name",{required:"name require"})}
            className={`border outline-none w-full mt-1 border-blue-800 rounded px-2 h-8 ${
              name ? " bg-[#e9ecef] text-[#495057]" : ""
            }`}
            type="text"
            name="name"
            id="name"
            readOnly={name ? true : false}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className="mb-2 ">
          <label htmlFor="age" className="text-blue-800 font-medium">
            Age
          </label>
          <br />
          <input
            {...register("age",{required:true})}
            className="border outline-none w-full mt-1 border-blue-800 rounded px-2 h-8"
            type="text"
            name="age"
            id="age"
          />
        </div>
        <div className="mb-2 flex h-5 items-center gap-1 ">
          <label htmlFor="gender" className="text-blue-800 font-medium mr-2">
            Gender
          </label>
          <input
            {...register("gender")}
            type="radio"
            value="male"
            name="gender"
            id="gender"
          />
          <span className="">Male</span>
          <input
            {...register("gender")}
            type="radio"
            value="female"
            name="gender"
            id="gender"
          />
          <span className="">Female</span>
          <input
            {...register("gender")}
            type="radio"
            value="other"
            name="gender"
            id="gender"
          />
          <span className="">Other</span>
        </div>
        {/*  Diagnosis*/}
        <div className="mb-2 ">
          <label htmlFor="diagnosis" className="text-blue-800 font-medium">
            Diagnosis
          </label>
          <br />
          <input
            {...register("diagnosis",{required:true})}
            className="border outline-none w-full mt-1 border-blue-800 rounded px-2 h-8"
            type="text"
            name="diagnosis"
            id="diagnosis"
          />
        </div>
        {/* date */}
        <div className="mb-2 ">
          <label htmlFor="date" className="text-blue-800 font-medium">
            Appointment Date
          </label>
          <br />
          <input
            {...register("date",{required:true})}
            className="border outline-none w-full mt-1 border-blue-800 rounded px-2 h-8"
            type="date"
            name="date"
            id="date"
          />
        </div>
        <div className="mb-2 ">
          <label htmlFor="diagnosis" className="text-blue-800 font-medium">
            Medical History
          </label>
          <br />
          <textarea
            {...register("MedicalHistory",{required:true})}
            className="border outline-none w-full mt-1 border-blue-800 rounded px-2 h-8"
            name="MedicalHistory"
            id="diagnosis"
          />
        </div>
        {/*  Diagnosis*/}
        <div className="mb-2 ">
          <label htmlFor="diagnosis" className="text-blue-800 font-medium">
            Current Prescriptions:
          </label>
          <br />
          <input
            {...register("Prescriptions",{required:true})}
            className="border outline-none w-full mt-1 border-blue-800 rounded px-2 h-8"
            type="text"
            name="Prescriptions"
            id="diagnosis"
          />
        </div>
        {/*  Diagnosis*/}
        <div className="mb-2 ">
          <label htmlFor="diagnosis" className="text-blue-800 font-medium">
            Doctor’s Notes
          </label>
          <br />
          <textarea
            {...register("DoctorNotes",{required:true})}
            className="border outline-none w-full mt-1 border-blue-800 rounded px-2 h-8"
            type=""
            name="DoctorNotes"
            id="diagnosis"
          />
        </div>

        <div className="mb-2 ">
          <button className="bg-blue-800 text-white w-full mt-1 border-blue-800 rounded px-2 h-10 font-medium">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPatient;
