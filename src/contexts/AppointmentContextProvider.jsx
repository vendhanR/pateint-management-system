import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppointmentsContext = createContext(null);

const AppointmentContextProvider = ({ children }) => {
  const [appointmentDate, setAppointmentDate] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);
  const [appointmentList, setAppointmentList] = useState([]);

  useEffect(() => {
    const arr = [];
    const appointmentData = JSON.parse(localStorage.getItem("appointment"));
    if(appointmentData === null){
      const dummyAppointments = [
        { appointmentDate: "02/06/2025", patientName: "Karthi" },
        { appointmentDate: "02/10/2025", patientName: "Aarav" },
        { appointmentDate: "02/15/2025", patientName: "Samantha" },
        { appointmentDate: "02/20/2025", patientName: "Rahul" },
        { appointmentDate: "02/25/2025", patientName: "Priya" },
        { appointmentDate: "03/02/2025", patientName: "Vikram" },
        { appointmentDate: "03/08/2025", patientName: "Meera" },
        { appointmentDate: "03/14/2025", patientName: "Ajay" },
        { appointmentDate: "03/22/2025", patientName: "Deepa" },
        { appointmentDate: "03/30/2025", patientName: "Surya" }
      ];
      localStorage.setItem("appointment",JSON.stringify(dummyAppointments))      
    }
    appointmentData?.map((data) => arr.push(data))
    setAppointmentList(arr);
  }, []);

  const handleSetMonth = (e) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(Number(e.target.value));
    setSelectedDate(newDate);
  };

  const handleSetYear = (e) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(Number(e.target.value));
    setSelectedDate(newDate);
  };

  function handleAppoinment(day) {
    setAppointmentDate(day); // This updates the appointment date
    setIsVisible((prev) => !prev);
  }

  function handleSaveAppointment(appointment, reset) {
    setAppointmentList((prev) => [...prev, appointment]);
    const previousList = [...appointmentList, appointment];
    localStorage.setItem("appointment", JSON.stringify(previousList));
    reset();
    setIsVisible(false);
    toast.success(
     "Appontment Booked",
      { position: "top-right" }
    );
  }

  return (
    <AppointmentsContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        handleSetMonth,
        handleSetYear,
        handleAppoinment,
        handleSaveAppointment,
        appointmentDate,
        setAppointmentDate,
        isVisible,
        setIsVisible,
        appointmentList
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};

export default AppointmentContextProvider;
