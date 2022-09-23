import { Button } from "@mui/material";
import React from "react";
import axios from "axios";
import { Box } from "@mui/system";

const SeedResults = (data) => {
  let startingDate = Date.now() - 7776000000;

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

  console.log(
    "ESTA ES LA FECHA ACTUAL DATE",
    new Date(startingDate).getHours()
  );

  for (let i = 1; i < 60 * data.data.hours; i++) {
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
          (Math.round(Math.random()) * 2 - 1) * (Math.random() * 0.0001),
        longitude:
          data.data.startLong +
          (Math.round(Math.random()) * 2 - 1) * (Math.random() * 0.0001),
      },
      createdAt: new Date(startingDate + 60000 * i),
      updatedAt: new Date(startingDate + 60000 * i),
    });
  }

  if (data.data.mode === "normal") {
    for (let i = 1; i < 60 * data.data.hours; i++) {
      if (
        result[i].createdAt.getHours() < 6 ||
        result[i].createdAt.getHours() > 18
      ) {
        result[i].payload.latitude = result[0].payload.latitude;
        result[i].payload.longitude = result[0].payload.longitude;
      }
    }
  }

  if (data.data.mode === "dangerTemp") {
    //A una hora random dentro del periodo generado empieza a aumentar
    //0.1 grados. Si llega a 50 se para la maquina. Si llega a 100 se prende fuego todo y la bateria se va a cero.
    const breakingHour = Math.floor(Math.random() * (23 - 1) + 1);
    console.log("Breaking Hour (dentro del periodo simulado)-->", breakingHour);
    for (let i = 1; i < 60 * data.data.hours; i++) {
      if (
        result[i].createdAt.getHours() < 6 ||
        result[i].createdAt.getHours() > 18
      ) {
        result[i].payload.latitude = result[0].payload.latitude;
        result[i].payload.longitude = result[0].payload.longitude;
      }
      if (result[i].createdAt.getHours() >= breakingHour) {
        result[i].temperatureMeasure = result[i - 1].temperatureMeasure + 0.1;
      }
      if (result[i].temperatureMeasure >= 50) {
        result[i].payload.latitude = result[0].payload.latitude;
        result[i].payload.longitude = result[0].payload.longitude;
        result[i].sosFlag = 1;
      }
      if (result[i].temperatureMeasure >= 100) {
        result[i].batteryVoltage = 0;
      }
    }
  }

  if (data.data.mode === "batteryLow") {
    //A una hora random dentro del periodo generado empieza a disminuir
    //la bateria.
    const breakingHour = Math.floor(Math.random() * (23 - 1) + 1);
    console.log("Breaking Hour (dentro del periodo simulado)-->", breakingHour);
    for (let i = 1; i < 60 * data.data.hours; i++) {
      if (
        result[i].createdAt.getHours() < 6 ||
        result[i].createdAt.getHours() > 18
      ) {
        result[i].payload.latitude = result[0].payload.latitude;
        result[i].payload.longitude = result[0].payload.longitude;
      }
      if (result[i].createdAt.getHours() >= breakingHour) {
        result[i].batteryVoltage = result[i - 1].batteryVoltage - 0.1;
      }
      if (result[i].batteryVoltage <= 0) {
        result[i].batteryVoltage = 0;
        result[i].payload.latitude = result[0].payload.latitude;
        result[i].payload.longitude = result[0].payload.longitude;
        result[i].temperatureMeasure = 0;
        result[i].sosFlag = 1;
      }
    }
  }

  // console.log("EL RESULTADO", result);

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
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Send to DB
        </Button>
      </Box>

      <div>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </>
  );
};

export default SeedResults;
