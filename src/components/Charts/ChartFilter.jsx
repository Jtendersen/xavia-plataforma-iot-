import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getDevices } from "../../store/reducers/deviceMeasures.reducer";
import { getMeasures } from "../../store/reducers/measuresChart.reducer";

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
    const userDevices = useSelector((state) => state.devices);

    const [user, setUser] = React.useState("");
    const [device, setDevice] = React.useState("");
    const [measures, setMeasures] = React.useState("");
    const [time, setTime] = React.useState("");

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
        dispatch(getDevices(user));
        dispatch(getMeasures({measures, device}));
    }, [dispatch, user, measures, device]);

    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ maxWidth: 400 }}
        >
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
                        allUsers.map((eachUser) => (
                            <MenuItem id={eachUser._id} value={eachUser._id}>
                                {eachUser.fullname}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem>nothing</MenuItem>
                    )}
                </Select>
            </FormControl>

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
                        userDevices.map((eachDevice) => (
                            
                            <MenuItem
                                id={eachDevice._id}
                                value={eachDevice.qrCode}
                            >
                                {eachDevice.qrCode} 
                            </MenuItem>
                            
                        ))
                    ) : (
                        <MenuItem>Sin dispositivos asociados</MenuItem>
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
                >
                    <MenuItem value={10}>Últimas 10</MenuItem>
                    <MenuItem value={50}>Últimas 50</MenuItem>
                    <MenuItem value={100}>Últimas 100</MenuItem>
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
                >
                    <MenuItem value={24}>24h</MenuItem>
                    <MenuItem value={72}>3 días</MenuItem>
                    <MenuItem value={168}>1 semana</MenuItem>
                    <MenuItem value={720}>1 mes</MenuItem>
                    <MenuItem value={8760}>1 año</MenuItem>
                    <MenuItem value={'all'}>Todo</MenuItem>
                </Select>
            </FormControl>

            <Box>Soy algo que dice el recorrido en el tiempo</Box>
        </Stack>
    );
};

export default ChartFilter;
