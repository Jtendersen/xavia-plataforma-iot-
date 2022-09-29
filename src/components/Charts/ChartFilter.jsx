import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getDevices } from "../../store/reducers/deviceMeasures.reducer";
import { getMeasures } from "../../store/reducers/getAllMeasures.reducer";
import axios from "axios";
import { distanceDataSet } from "../../utils/distanceDataSet";
import { setChart } from "../../store/reducers/distanceChart.reducer";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const ChartFilter = () => {
    const dispatch = useDispatch();

    const allUsers = useSelector((state) => state.users);
    const loggedUser = useSelector((state) => state.user);
    const userDevices = useSelector((state) => state.devices);
    const measures = useSelector((state) => state.measures);

    const [user, setUser] = React.useState("");
    const [device, setDevice] = React.useState("");
    const [entries, setEntries] = React.useState("");
    const [time, setTime] = React.useState("");
    const [dataSet, setDataSet] = React.useState([]);

    const handleUserChange = (event) => {
        setUser(event.target.value);
        if (!userDevices) setDevice("");
    };
    const handleDeviceChange = (event) => {
        setDevice(event.target.value);
    };
    const handleMeasureChange = (event) => {
        setEntries(event.target.value);
    };
    const handleTimeChange = (event) => {
        setTime(event.target.value);
    };

    React.useEffect(() => {
        if (loggedUser.roles[0] === "admin" && user) {
            dispatch(getDevices(user));
            dispatch(getMeasures({ entries, user, device }));
        }
    }, [device, dispatch, entries, loggedUser.roles, user]);

    React.useEffect(() => {
        if (loggedUser.roles[0] === "user") {
            function filteredDevice() {
                return measures.filter((deviceArray, i) => {
                    return device === deviceArray[i].DevEUI_uplink.DevEUI;
                });
            }
            function filteredData() {
                const data = filteredDevice();
                let filtered = [];
                if (entries) {
                    for (let i = 0; i < entries; i++) {
                        if (data[0][i] === undefined) break;
                        filtered.push(data[0][i]);
                    }
                } else {
                    filtered = data[0];
                }
                dispatch(setChart(filtered || false));
            }
            filteredData();
        }
    }, [dispatch, user, entries, device, loggedUser, measures]);

    React.useEffect(() => {
        // me aburrió hacer otro reducer
        (async function fetchDistance() {
            if (!time) return;
            const { data } = await axios.get(
                `/api/measures/all?entries=${time}&user=${loggedUser.roles[0] === "admin" ? user : loggedUser._id}&device=${device}`
            );
            const newDataSet = distanceDataSet(data[0]);
            setDataSet(newDataSet);
        })()

    }, [time, device, measures, user, loggedUser.roles, loggedUser._id]);

    return (
        <Stack
            direction={{ xs: "row", sm: "column" }}
            justifyContent="center"
            alignItems="center"
            spacing={{ xs: 1, sm: 2 }}
            sx={{ width: "100%", display: { xs: "flex", sm: "block" } }}
        >
            {loggedUser.roles[0] === "admin" ? (
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Usuario final</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-multiple-name"
                        value={user}
                        label="Usuario final"
                        onChange={handleUserChange}
                        MenuProps={MenuProps}
                    >
                        {allUsers[0].email ? (
                            allUsers.map((eachUser, i) => (
                                <MenuItem key={i} id={i} value={eachUser._id}>
                                    {eachUser.fullname}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem id="noUser">nothing</MenuItem>
                        )}
                    </Select>
                </FormControl>
            ) : (
                <></>
            )}

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Dispositivos</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={device}
                    label="Dispositivos"
                    onChange={handleDeviceChange}
                    MenuProps={MenuProps}
                >
                    {userDevices ? (
                        userDevices.map((eachDevice, i) => (
                            <MenuItem id={"dev" + i} key={"dev" + i} value={eachDevice.qrCode}>
                                {eachDevice.qrCode}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem id="noDevice">Sin dispositivos asociados</MenuItem>
                    )}
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Medidas</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={entries}
                    label="Medidas"
                    onChange={handleMeasureChange}
                    MenuProps={MenuProps}
                >
                    <MenuItem id="measure1" value={10}>
                        Últimas 10
                    </MenuItem>
                    <MenuItem id="measure2" value={50}>
                        Últimas 50
                    </MenuItem>
                    <MenuItem id="measure3" value={100}>
                        Últimas 100
                    </MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Tiempo</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={time}
                    label="Tiempo"
                    onChange={handleTimeChange}
                    MenuProps={MenuProps}
                >
                    <MenuItem id="time1" value={24 * 60}>
                        24h
                    </MenuItem>
                    <MenuItem id="time2" value={72 * 60}>
                        3 días
                    </MenuItem>
                    <MenuItem id="time3" value={168 * 60}>
                        1 semana
                    </MenuItem>
                    <MenuItem id="time4" value={720 * 60}>
                        1 mes
                    </MenuItem>
                    <MenuItem id="time5" value={8760 * 60}>
                        1 año
                    </MenuItem>
                    <MenuItem id="time6" value={0}>
                        Todo
                    </MenuItem>
                </Select>
            </FormControl>

            <Box>Ha recorrido: {Number(dataSet.reduce((sum, { distance }) => sum + distance, 0).toFixed(2))} metros</Box>
        </Stack>
    );
};

export default ChartFilter;
