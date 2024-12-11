import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useState } from 'react'
import axios from 'axios'

const CaptainProtectedWrapper = ({ children }) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    const { captain, setCaptain } = useContext(CaptainDataContext);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        if (!token) {
            navigate('/captain-login')
        }
        
        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    setCaptain(response.data.captain)
                    setIsLoading(false)
                }
            })
            .catch((error) => {
                console.log(error)
                localStorage.removeItem('token')
                navigate('/captain-login')
            }
        )
    }, [token])


    if (isLoading) {
        return (
            <div className='h-screen flex justify-center items-center'>
                <h1 className='text-2xl'>Loading...</h1>
            </div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectedWrapper