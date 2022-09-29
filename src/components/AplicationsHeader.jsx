import { Avatar, Stack, styled, Box,IconButton, Typography} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const CustomTypography = styled(Typography)`
    color: "black";
`;

const arr = ["dispositivo1","dispositivo2","dispositivo3","dispositivo4",]




const AplicationsHeader = () => {
    const user = useSelector((state) => state.user);
    const [date, setDate] = useState(new Date());
    const [stringDate, setStringDate] = useState(dateToString(date));
    const [arrIndex, setArrIndex] = useState(0);
    
    function sumarDias(date, dias){
        date.setDate(date.getDate() + dias);
        setDate(date)
        return date 
      }

    function dateToString(date){
    var dateObj = date
    var month = dateObj.getMonth() + 1; 
    var day = dateObj.getDate();
      console.log("datetostring", day)
    var year = dateObj.getFullYear();
      
      return year + "/" + month + "/" + day;

    }
    const handleDateClick = (num,date) => {
        const newDate = sumarDias(date, num)
        const toString = dateToString(newDate)
        setStringDate(toString)
    }
    const handleDeviceClick = (num,arrIndex) => {
        if(arrIndex===0&&num===-1){return setArrIndex(arr.length-1)}
        else if(arrIndex===arr.length-1&&num===1){return setArrIndex(0)}
        return setArrIndex(arrIndex + num)
        
    }
    
      

useEffect(()=>{


},[])


    if (user.email) {
        return (
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                maxHeight={120}
                marginRight={12}
                marginTop={2}
            >
                <Stack direction="row"
                alignItems="center"
                spacing={3}>
                    <Avatar
                        alt="Usuario"
                        src={user.imgUrl}
                        sx={{ width: 100, height: 100, border: "solid 1px" }}
                    />
                    <Stack direction="column">
                        <CustomTypography sx={{ fontSize: "1.5rem" }}>
                            {user.empresa}
                        </CustomTypography>
                        <CustomTypography sx={{ fontSize: "1rem" }}>
                            {user.fullname}
                        </CustomTypography>
                        <CustomTypography sx={{ fontSize: "1rem" }}>
                            {user.email}
                        </CustomTypography>
                    </Stack>
                </Stack>

                <Stack direction="row"
                            justifyContent="flex-start"
                            alignItems="center">
                        <IconButton onClick={()=> handleDeviceClick(-1, arrIndex)}><ArrowBackIosIcon/></IconButton>
                        <Box sx={{p:1, fontSize: 22, fontWeight: 'bold'}}>{arr[arrIndex]}</Box>
                        <IconButton onClick={()=> handleDeviceClick(1, arrIndex)}><ArrowForwardIosIcon/></IconButton>
                    </Stack>
                

                    
                    <Stack direction="row"
                            justifyContent="flex-start"
                            alignItems="center">
                        <IconButton onClick={()=> handleDateClick(-1, date)}><ArrowBackIosIcon/></IconButton>
                        <Box sx={{fontSize: 22}}>{stringDate}</Box>
                        <IconButton onClick={()=> handleDateClick(+1, date)}><ArrowForwardIosIcon/></IconButton>
                    </Stack>
                
                    
                
            </Stack>
        );
    } else {
        return <></>;
    }
};

export default AplicationsHeader;
