import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  startOfMonth,
} from "date-fns";
import React, { useContext, useEffect } from "react";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { AppointmentsContext } from "../contexts/AppointmentContextProvider";
import { useForm } from "react-hook-form";

const WEEKS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Calendar = () => {
  const {
    selectedDate,
    setSelectedDate,
    handleSetMonth,
    handleSetYear,
    handleAppoinment,
    handleSaveAppointment,
    appointmentDate,
    isVisible,
    setIsVisible,
    appointmentList,
  } = useContext(AppointmentsContext);

  const firstDayOfMonth = startOfMonth(selectedDate);
  const lastDayOfMonth = endOfMonth(selectedDate);
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });
  const startingDayIndex = getDay(firstDayOfMonth);

  const { register, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    if (appointmentDate) {
      const formattedDate = format(appointmentDate, "MM/dd/yyyy");
      setValue("appointmentDate", formattedDate);
    }
  }, [appointmentDate, setValue]);

  return (
    <div className="mx-1 p-2">
      <h1 className="text-center text-2xl font-semibold my-1 text-teal-900">
        Book Appointment
      </h1>
      <div className="bg-slate-700 w-full max-w-2xl min-h-[30rem] p-3 relative mx-auto">
        <div className="flex justify-between p-2">
          <button
            className="p-2 bg-slate-500 rounded-full"
            onClick={() =>
              setSelectedDate(
                add(new Date(selectedDate), {
                  years: -1,
                })
              )
            }
          >
            <IoIosArrowBack className="text-white text-xl" />
          </button>

          {/* month */}
          <select
            className="bg-slate-800 text-white outline-none font-semibold rounded-lg px-1"
            onChange={handleSetMonth}
            value={selectedDate.getMonth()}
          >
            {MONTHS.map((month, index) => (
              <option className="" value={index} key={month + index}>
                {month}
              </option>
            ))}
          </select>

          {/* year */}
          <select
            className="bg-slate-800 text-white outline-none font-semibold rounded-lg px-1"
            onChange={handleSetYear}
            value={selectedDate.getFullYear()}
          >
            {Array.from({ length: 3 }, (_, i) => (
              <option key={`year${i}`}>{new Date().getFullYear() + i}</option>
            ))}
          </select>

          <button
            className="p-2 bg-slate-500 rounded-full"
            onClick={() =>
              setSelectedDate(
                add(new Date(selectedDate), {
                  years: 1,
                })
              )
            }
          >
            <IoIosArrowForward className="text-white text-xl" />
          </button>
        </div>

        {/* weeks */}
        <div className="grid grid-cols-7 place-items-center text-xs sm:text-sm md:text-base">
          {WEEKS.map((day, index) => (
            <span className="text-white" key={`week${index}`}>
              {day}
            </span>
          ))}
        </div>

        {/* calendar grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 md:gap-3">
          {Array.from({ length: startingDayIndex }).map((_, index) => (
            <button
              className="border w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-16 text-center text-white rounded-md"
              key={`empty-${index}`}
            />
          ))}

          {daysInMonth.map((day, index) => (
            <button
              onClick={() => handleAppoinment(day)}
              className="border w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-16 text-center text-white rounded-md hover:bg-blue-600 transition-all"
              key={`month${index}`}
            >
              {format(day, "d")}

              {appointmentList
                ?.filter((data) => isSameDay(data.appointmentDate, day))
                ?.map((data, index) => (
                  <div
                    className="truncate text-xs bg-green-600  mx-1 rounded-2xl px-1 mb-5 text-white text-clip"
                    key={`data.date${index}`}
                  >
                    {data.patientName}
                  </div>
                ))}
            </button>
          ))}
        </div>

        {/* appointment box */}
        {isVisible ? (
          <div className="flex flex-col items-center gap-2 w-full max-w-xs sm:max-w-md absolute top-1/3 sm:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-xl shadow-lg">
            <form
              onSubmit={handleSubmit((e) => handleSaveAppointment(e, reset))}
              className="w-full"
            >
              <button
                type="button"
                className="float-right text-2xl rounded-full text-red-500 hover:text-red-700"
                onClick={() => setIsVisible(false)}
              >
                <MdOutlineCancel />
              </button>

              <div className="w-full">
                <div className="mb-2">
                  <label htmlFor="name" className="text-blue-800 font-medium">
                    Name:
                  </label>
                  <input
                    {...register("patientName")}
                    className="border outline-none w-full mt-1 border-blue-800 rounded px-2 h-8"
                    type="text"
                    name="patientName"
                    id="name"
                  />
                </div>

                <div className="mb-2">
                  <label
                    htmlFor="appointmentDate"
                    className="text-blue-800 font-medium"
                  >
                    Date:
                  </label>
                  <input
                    {...register("appointmentDate",{required : true})}
                    className="border outline-none w-full mt-1 border-blue-800 rounded px-2 h-8"
                    type="text"
                    name="appointmentDate"
                    id="appointmentDate"
                    readOnly
                  />
                </div>
              </div>

              <button className="bg-sky-500 w-full p-2 text-white rounded-md hover:bg-sky-600 transition-all">
                Book an Appointment
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Calendar;
