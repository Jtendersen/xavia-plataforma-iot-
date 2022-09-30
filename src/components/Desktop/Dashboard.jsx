import * as React from "react";
import { Stack, Divider, Box, Typography, Container, Grid, Paper, Avatar, styled, IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import TimeOfUsePie from "../Charts/TimeOfUsePie";
import CyclesUsePie from "../Charts/CyclesUsePie";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState, useEffect } from "react";
import { getCycles } from "../../utils/dataProcess";

const CustomTypography = styled(Typography)`
    color: "black";
`;

function DashboardContent() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const measures = useSelector((state) => state.measures);
    const [date, setDate] = useState(new Date());
    const [stringDate, setStringDate] = useState(dateToString(date));
    const [deviceArrIndex, setDeviceArrIndex] = useState(0);
    const filteredMeasures = measures.filter((e) => e.length > 0);

    function sumarDias(date, dias) {
        date.setDate(date.getDate() + dias);
        setDate(date);
        return date;
    }

    function dateToString(date) {
        var dateObj = date;
        var month = dateObj.getMonth() + 1;
        var day = dateObj.getDate();
        var year = dateObj.getFullYear();

        return year + "/" + month + "/" + day;
    }

    function lastDayDates(date) {
        var dateObj = date;
        var month = dateObj.getMonth() + 1;
        month < 10 ? (month = "0" + month) : (month = month);
        var day = dateObj.getDate();
        var year = dateObj.getFullYear();
        return { from: new Date(+year, +month - 1, +day, +0, +0, +0), to: new Date(+year, +month - 1, +day, +23, +59, +59) };
    }

    const handleDateClick = (num, date) => {
        const newDate = sumarDias(date, num);
        const toString = dateToString(newDate);
        setStringDate(toString);
    };
    const handleDeviceClick = (num, deviceArrIndex) => {
        if (deviceArrIndex === 0 && num === -1) {
            return setDeviceArrIndex(measures.length - 1);
        } else if (deviceArrIndex === measures.length - 1 && num === 1) {
            return setDeviceArrIndex(0);
        }
        return setDeviceArrIndex(deviceArrIndex + num);
    };

    const measuresByDay =
        filteredMeasures[deviceArrIndex] &&
        measures[deviceArrIndex].filter((e) => {
            return (
                new Date(e.DevEUI_uplink.Time) >= lastDayDates(date).from.getTime() &&
                new Date(e.DevEUI_uplink.Time) <= lastDayDates(date).to.getTime()
            );
        });
    // console.log(measures)
    // console.log(filteredMeasures)
    console.log(measuresByDay);
    //console.log("FROM", lastDayDates(date).from, "TO",lastDayDates(date).to)
    //console.log("inicio", measuresByDay[0].DevEUI_uplink.Time,"final",measuresByDay[measuresByDay.length-1].DevEUI_uplink.Time)

    const bateria = measures[0] && Math.ceil(measuresByDay[measuresByDay.length - 1]?.DevEUI_uplink?.payload.batteryVoltage / 0.038) + "%";

    const temperatura = measures[0] && Math.ceil(measuresByDay[measuresByDay.length - 1]?.DevEUI_uplink?.payload.temperatureMeasure) + "C";

    return (
        <>
            <Stack direction="row" justifyContent="space-between" alignItems="center" maxHeight={120} marginRight={12} marginTop={2}>
                <Stack direction="row" alignItems="center" spacing={3}>
                    <Avatar alt="Usuario" src={user.imgUrl} sx={{ width: 100, height: 100, border: "solid 1px" }} />
                    <Stack direction="column">
                        <CustomTypography sx={{ fontSize: "1.5rem" }}>{user.empresa}</CustomTypography>
                        <CustomTypography sx={{ fontSize: "1rem" }}>{user.fullname}</CustomTypography>
                        <CustomTypography sx={{ fontSize: "1rem" }}>{user.email}</CustomTypography>
                    </Stack>
                </Stack>

                <Stack direction="row" justifyContent="flex-start" alignItems="center">
                    <IconButton onClick={() => handleDeviceClick(-1, deviceArrIndex)}>
                        <ArrowBackIosIcon />
                    </IconButton>
                    <Box sx={{ p: 1, fontSize: 22, fontWeight: "bold" }}>{measures && measures[deviceArrIndex][0].DevEUI_uplink.DevEUI}</Box>
                    <IconButton onClick={() => handleDeviceClick(1, deviceArrIndex)}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Stack>

                <Stack direction="row" justifyContent="flex-start" alignItems="center">
                    <IconButton onClick={() => handleDateClick(-1, date)}>
                        <ArrowBackIosIcon />
                    </IconButton>
                    <Box sx={{ fontSize: 22 }}>{stringDate}</Box>
                    <IconButton onClick={() => handleDateClick(+1, date)}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Stack>
            </Stack>

            {measuresByDay !== undefined ? (
                <Box sx={{ display: "flex" }}>
                    <Container maxWidth="false" sx={{ mt: 2, mb: 2 }}>
                        <Grid container spacing={2}>
                            {/* Uso diario */}
                            <Grid item xs={12} md={8} lg={9} sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} spacing={1}>
                                    {/* ciclos de trabajo */}
                                    <Grid item xs={12} md={5.5} lg={5.5}>
                                        <Paper elevation={3} sx={{ p: 2, display: "flex", flexDirection: "column", height: 360 }}>
                                            <Box sx={{ p: 1, fontWeight: "bold" }}>Ciclos de trabajo</Box>
                                            <Divider orientation="horizontal" flexItem />
                                            <CyclesUsePie measures={measures[0] && getCycles(measuresByDay)} />
                                        </Paper>
                                    </Grid>

                                    {/* tiempos de uso */}
                                    <Grid item xs={12} md={5.5} lg={5.5}>
                                        <Paper elevation={3} sx={{ p: 2, display: "flex", flexDirection: "column", height: 360 }}>
                                            <Box sx={{ p: 1, fontWeight: "bold" }}>Tiempo de uso</Box>
                                            <Divider orientation="horizontal" flexItem />
                                            <TimeOfUsePie measures={measures[0] && getCycles(measuresByDay)} />
                                        </Paper>
                                    </Grid>
                            </Grid>

                            {/* Bateria */}
                            <Grid item xs={12} md={4} lg={3}>
                                <Stack spacing={2}>
                                    <Paper
                                        elevation={3}
                                        sx={{
                                            p: 2,
                                            display: "flex",
                                            flexDirection: "column",
                                            height: 155,
                                        }}
                                    >
                                        <Box sx={{ p: 1, fontWeight: "bold" }}>Bateria</Box>
                                        <Divider orientation="horizontal" flexItem />
                                        <Box
                                            sx={{
                                                p: 3,
                                                textAlign: "center",
                                                fontSize: 56,
                                                color: grey.A700,
                                                "&:hover": { opacity: [0.9, 0.8, 0.7] },
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {bateria}
                                        </Box>
                                    </Paper>

                                    {/* Temperatura */}
                                    <Paper
                                        elevation={3}
                                        sx={{
                                            p: 2,
                                            display: "flex",
                                            flexDirection: "column",
                                            height: 155,
                                        }}
                                    >
                                        <Box sx={{ p: 1, fontWeight: "bold" }}>Temperatura</Box>
                                        <Divider orientation="horizontal" flexItem />
                                        <Box
                                            sx={{
                                                p: 3,
                                                textAlign: "center",
                                                fontSize: 56,
                                                color: grey.A700,
                                                "&:hover": { opacity: [0.9, 0.8, 0.7] },
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {temperatura}
                                        </Box>
                                    </Paper>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            ) : (
                <Box>No hay medidas</Box>
            )}
        </>
    );
}

export default DashboardContent;
