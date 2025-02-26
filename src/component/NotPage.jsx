import React from 'react'
import { Link } from 'react-router-dom'

const NotPage = () => {
  return (
    <div className='flex flex-col items-center w-screen h-screen'>
        <h1>404 Error</h1>
        <Link to='/' className='text-blue-500 underline'>Go Home</Link>
    </div>
  )
}

export default NotPage