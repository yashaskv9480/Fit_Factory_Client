import React, { useEffect, useState } from 'react'
import { ImageList,ImageListItem } from '@mui/material'
import Fit_Factory_api from '../../Fit_Factory_Api/Fit_Factory_api'
import { useAuth } from '../../Auth/useAuth/useAuth'
import { toast } from 'react-toastify'
import { Navigate, useNavigate } from 'react-router-dom'

export const GymImages = () => {
    const [images,setImages] = useState(" ")
    const {token} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("inside")
        getGymImages();
    }, [])

    const getGymImages = async () => {
        try {
            const response  = await Fit_Factory_api.get(`/client/getgymimages`, {
                headers: {
                    'Authorization': token
                }
            })
            if(response.status == 200)
            {
                console.log(response.data)
                setImages(response.data);
            }
            else{
                toast.error("Something went wrong!! Please Contact admin")
                navigate("/dashboard")
            }
        } catch (error) {
            if(error.response.status == 401){
                toast.error("Unauthorized User !!")
                navigate("/unauthorized")
            }
            console.log(error)
            toast.error("Something went wrong", { autoClose: 500, theme: 'colored' })
            navigate("/dashboard")

        }
    }



  return (
{/* <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
  {itemData.map((item) => (
    <ImageListItem key={item.img}>
      <img
        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
        alt={item.title}
        loading="lazy"
      />
    </ImageListItem>
  ))}
</ImageList>  ) */} )
}
