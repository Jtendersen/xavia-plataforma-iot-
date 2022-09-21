import { Button } from "@mui/material";
import React from "react";
import axios from "axios";
import { Box } from "@mui/system";

const SeedResults = (data) => {
  let startingDate = Date.now() - 7776000000;
  let sumoUnMinuto = startingDate + 60000;

  let result = [
    {
      devEUI: data.data.devEUI,
      messageType: "HEARTBEAT",
      trackingMode: "STAND_BY",
      batteryVoltage: Math.random() * (24 - 20) + 20,
      ackToken: 0,
      firmwareVersion: "1.8.1",
      resetCause: 64,
      periodicPosition: true,
      temperatureMeasure: Math.random() * (24 - 20) + 20,
      sosFlag: 0,
      appState: 0,
      dynamicMotionState: "STATIC",
      onDemand: false,
      payload: {
        latitude: data.data.startLat,
        longitude: data.data.startLong,
      },
      createdAt: new Date(startingDate),
      updatedAt: new Date(startingDate),
    },
  ];

  // console.log("ESTA ES LA FECHA ACTUAL DATE", new Date(startingDate));
  // console.log("LE SUMO UN MINUTO", new Date(sumoUnMinuto));

  if (data.data.mode === "normal") {
    for (let i = 1; i < 60 * data.data.hours; i++) {
      {
        if (
          result[i - 1].createdAt.getHours() > 6 &&
          result[i - 1].createdAt.getHours() < 18
        ) {
          result.push({
            devEUI: data.data.devEUI,
            messageType: "HEARTBEAT",
            trackingMode: "STAND_BY",
            batteryVoltage: Math.random() * (24 - 20) + 20,
            ackToken: 0,
            firmwareVersion: "1.8.1",
            resetCause: 64,
            periodicPosition: true,
            temperatureMeasure: Math.random() * (24 - 20) + 20,
            sosFlag: 0,
            appState: 0,
            dynamicMotionState: "STATIC",
            onDemand: false,

            payload: {
              latitude:
                data.data.startLat +
                (Math.round(Math.random()) * 2 - 1) * 0.0001,
              longitude:
                data.data.startLong +
                (Math.round(Math.random()) * 2 - 1) * 0.0001,
            },
            createdAt: new Date(startingDate + 60000 * i),
            updatedAt: new Date(startingDate + 60000 * i),
          });
        } else {
          result.push({
            devEUI: data.data.devEUI,
            messageType: "HEARTBEAT",
            trackingMode: "STAND_BY",
            batteryVoltage: Math.random() * (24 - 20) + 20,
            ackToken: 0,
            firmwareVersion: "1.8.1",
            resetCause: 64,
            periodicPosition: true,
            temperatureMeasure: Math.random() * (20 - 15) + 15,
            sosFlag: 0,
            appState: 0,
            dynamicMotionState: "STATIC",
            onDemand: false,

            payload: {
              latitude: data.data.startLat,
              longitude: data.data.startLong,
            },
            createdAt: new Date(startingDate + 60000 * i),
            updatedAt: new Date(startingDate + 60000 * i),
          });
        }
      }
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/api/measures/seed", result)
      .then(() => alert("Se envio a la DB"))
      .catch((error) => console.log(error));
  };

  // console.log("ESTA ES LA DATA QUE LLEGA", data);
  return (
    <>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Button
          type="submit"
          // onSubmit={handleSubmit}
          // onClick={() => {
          //   navigator.clipboard.writeText(JSON.stringify(result, null, 2));
          // }}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Copy to clipboard
        </Button>
      </Box>

      <div>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </>
  );
};

export default SeedResults;
