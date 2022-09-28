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

    const [user, setUser] = React.useState("");
    const [device, setDevice] = React.useState("");
    const [measures, setMeasures] = React.useState("");
    const [time, setTime] = React.useState("");
    const [dataSet, setDataSet] = React.useState([]);

    const handleUserChange = (event) => {
        setUser(event.target.value);
    };
    const handleDeviceChange = (event) => {
        setDevice(event.target.value);
    };
    const handleMeasureChange = (event) => {
        setMeasures(event.target.value);
    };
    const handleTimeChange = (event) => {
        setTime(event.target.value);
    };

    React.useEffect(() => {
        if (loggedUser.roles[0] === "admin" && user) {
            dispatch(getDevices(user));
            dispatch(getMeasures({ entries: measures, user, device}));
        }
        if (loggedUser.roles[0] === "user") {
            dispatch(getDevices(loggedUser._id));
            dispatch(getMeasures({ entries: measures, user: loggedUser._id, device }));
        }
        
    }, [dispatch, user, measures, device, loggedUser]);

    React.useEffect(() => {
        // me aburrió hacer otro reducer
        if(user) {
        // return axios
        //     .get(`/api/measures/all?entries=${time}&user=${user}`)
        //     .then(({ data }) => {
        //         const newDataSet = measures ? distanceDataSet(data) : [];
        //         setDataSet(newDataSet);
        //     });
        }
    }, [time, device, measures, user]);

    return (
        <Stack
            direction={{xs:'row', sm:'column'}}
            justifyContent="center"
            alignItems="center"
            spacing={{xs:1, sm:2}}
            sx={{ width: '100%', display: {xs: 'flex', sm: 'block'} }}
        >
            {loggedUser.roles[0] === "admin" ? (
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                        Usuario final
                    </InputLabel>
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
                                <MenuItem
                                key={i}
                                    id={i}
                                    value={eachUser._id}
                                >
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
                <InputLabel id="demo-simple-select-label">
                    Dispositivos
                </InputLabel>
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
                            <MenuItem
                                id={'dev'+i}
                                key={'dev'+i}
                                value={eachDevice.qrCode}
                            >
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
                    value={measures}
                    label="Medidas"
                    onChange={handleMeasureChange}
                    MenuProps={MenuProps}
                >
                    <MenuItem id="measure1" value={10}>Últimas 10</MenuItem>
                    <MenuItem id="measure2" value={50}>Últimas 50</MenuItem>
                    <MenuItem id="measure3" value={100}>Últimas 100</MenuItem>
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
                    <MenuItem id="time1" value={24 * 60}>24h</MenuItem>
                    <MenuItem id="time2" value={72 * 60}>3 días</MenuItem>
                    <MenuItem id="time3" value={168 * 60}>1 semana</MenuItem>
                    <MenuItem id="time4" value={720 * 60}>1 mes</MenuItem>
                    <MenuItem id="time5" value={8760 * 60}>1 año</MenuItem>
                    <MenuItem id="time6" value={0}>Todo</MenuItem>
                </Select>
            </FormControl>

            <Box>
                Ha recorrido:{" "}
                {Number(
                    dataSet
                        .reduce((sum, { distance }) => sum + distance, 0)
                        .toFixed(2)
                )}{" "}
                metros
            </Box>
        </Stack>
    );
};

export default ChartFilter;
