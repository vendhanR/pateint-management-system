import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Header from './component/Header.jsx'
import AddPatient from './component/AddPatient.jsx'
import PatientList from './component/PatientList.jsx'
import NotPage from './component/NotPage.jsx'
import PatientDataContextProvider from './contexts/PatientDataContextProvider.jsx'
import PatientProfile from './component/PatientProfile.jsx'
import Appointment from './component/Appointment.jsx'
import AppointmentContextProvider from './contexts/AppointmentContextProvider.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Header />,
    children:[
      {index:true,element:<PatientDataContextProvider> <PatientList /></PatientDataContextProvider>,  errorElement:<NotPage  />,},
      {path:'addpatient',element:<PatientDataContextProvider> <AddPatient /></PatientDataContextProvider>,  errorElement:<NotPage  />,},
      {path:'addpatient/:name',element:<PatientDataContextProvider> <AddPatient /></PatientDataContextProvider>,  errorElement:<NotPage  />,},
      {path:'patientlist/:name',element:<PatientProfile />,  errorElement:<NotPage  />,},
      {path:'appointment',element:<AppointmentContextProvider><Appointment /></AppointmentContextProvider>,  errorElement:<NotPage  />,},
      { path: "*", element: <NotPage /> } 
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)