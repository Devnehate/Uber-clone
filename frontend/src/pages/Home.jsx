import React, { useRef, useState } from 'react'
import map from '../assets/map.gif'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'

const Home = () => {

  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);

  const submitHandler = () => {
    e.preventDefault()
  }

  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        opacity:1
      })
      gsap.to(panelCloseRef.current, {
        opacity:1
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        opacity:0
      })
      gsap.to(panelCloseRef.current, {
        opacity:0
      })
    }
  }, [panelOpen])

  return (
    <div className='h-screen relative'>
      <img className='w-20 absolute left-5 top-5' src="https://logospng.org/download/uber/logo-uber-4096.png" alt="" />
      <div className='h-screen w-screen'>
        <img className='h-full w-full object-cover' src={map} alt="" />
      </div>
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false)
            }}
            className='absolute opacity-0 right-6 top-6 text-2xl'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-3xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <div className="line absolute h-16 top-[38%] left-10 bg-gray-700 w-1 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true)
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value)
              }}
              className='bg-[#eee] placeholder-gray-600 px-12 py-2 text-lg rounded-lg w-full mt-5'
              type="text"
              placeholder='Add a Pick-up location' />
            <input
              onClick={() => {
                setPanelOpen(true)
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value)
              }}
              className='bg-[#eee] placeholder-gray-600 px-12 py-2 text-lg rounded-lg w-full mt-3'
              type="text"
              placeholder='Enter your destination' />
          </form>
        </div>
        <div ref={panelRef} className='h-0 opacity-0 bg-red-500 '>

        </div>
      </div>
    </div>
  )
}

export default Home