import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getDevices } from "../store/reducers/deviceMeasures.reducer";
import { getMeasures } from "../store/reducers/getAllMeasures.reducer";
import axios from "axios";
import { distanceDataSet } from "../utils/distanceDataSet";
import { setChart } from "../store/reducers/distanceChart.reducer";

const PolylinesFilter = () => {
    const dispatch = useDispatch();
    const loggedUser = useSelector((state) => state.user);
    const userDevices = useSelector((state) => state.devices);
    const measures = useSelector((state) => state.measures);

    const [user, setUser] = React.useState("");
    const [device, setDevice] = React.useState("");
    const [entries, setEntries] = React.useState("");
    const [time, setTime] = React.useState("");
    const [dataSet, setDataSet] = React.useState([]);

    const handleDeviceChange = (event) => {
        setDevice(event.target.value);
    };
    const handleMeasureChange = (event) => {
        setEntries(event.target.value);
    };

    React.useEffect(() => {
        if (loggedUser.roles[0] === "user") {
            function filteredDevice() {
                const measuresFiltered = measures.filter((el) => {
                    return el.length != 0;
                });
                return measuresFiltered.filter((deviceArray, i) => {
                    return device === deviceArray[i]?.DevEUI_uplink.DevEUI;
                });
            }
            function filteredData() {
                const data = filteredDevice();
                console.log("data filtrada en historico: ", data);
                let filtered = [];
                if (entries && data.length) {
                    for (let i = 0; i < entries; i++) {
                        if (data[0][i] === undefined) break;
                        filtered.push(data[0][i]);
                    }
                } else {
                    filtered = data[0];
                }
               entries && dispatch(setChart(filtered || false));
            }
            filteredData();
        }
    }, [dispatch, user, entries, device, loggedUser, measures]);

    return (
        <Stack
            /*  direction={{ xs: "row", sm: "column" }} */
            justifyContent="flex-start"
            /* alignItems="-moz-initial" */
            /* spacing={{ xs: 1, sm: 2 }} */
            sx={{ width: "100%", display: { xs: "flex", sm: "block" } }}
        >
            <Typography sx={{ m: 1, minWidth: 120 }}>Ver Recorrido:</Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Dispositivos</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={device} label="Dispositivos" onChange={handleDeviceChange}>
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

            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Medidas</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={entries} label="Medidas" onChange={handleMeasureChange}>
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
        </Stack>
    );
};

export default PolylinesFilter;
