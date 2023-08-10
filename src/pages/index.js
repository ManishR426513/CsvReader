import React from 'react'
import TimeTracker from './TimeTracker'
import Newtime from './Newtime'
import TimeWatcher from '@/Components/TimeWatcher'
import TimeApp from '@/Components/TimeApp'
import { ToastContainer, toast } from 'react-toastify';

const index = () => {
  return (
    <><TimeWatcher/>
            <ToastContainer />
</>
  )
}

export default index