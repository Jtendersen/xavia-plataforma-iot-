import { Button } from "@mui/material";
import React from "react";
import axios from "axios";
import { Box } from "@mui/system";

const SeedResults = (data) => {
  let startingDate = Date.now() - 7776000000;

  let result = [
    {
      DevEUI_uplink: {
        Time: "2022-09-23T17:20:58.683+00:00",
        DevEUI: data.data.devEUI,
        FPort: 17,
        FCntUp: 54414,
        ADRbit: 1,
        MType: 2,
        FCntDn: 796,
        payload_hex: "0500997c0040010801",
        mic_hex: "4ed565ea",
        Lrcid: "00000211",
        LrrRSSI: -49,
        LrrSNR: 9.5,
        LrrESP: -49.461838,
        SpFact: 7,
        SubBand: "G0",
        Channel: "LC7",
        DevLrrCnt: 1,
        Lrrid: "100009AB",
        Late: 0,
        LrrLAT: data.data.startLat,
        LrrLON: data.data.startLong,
        Lrrs: {
          Lrr: [
            {
              Lrrid: "100009AB",
              Chain: 0,
              LrrRSSI: -49,
              LrrSNR: 9.5,
              LrrESP: -49.461838,
            },
          ],
        },
        CustomerID: "100041823",
        CustomerData: {
          alr: {
            pro: "ABEE/APY",
            ver: "1",
          },
        },
        ModelCfg: "1:TPX_457352bd-f47c-4686-84fb-7c69be15284d",
        DriverCfg: {
          mod: {
            pId: "abeeway",
            mId: "indus-tracker",
            ver: "2",
          },
          app: {
            pId: "abeeway",
            mId: "asset-tracker",
            ver: "2",
          },
          id: "abeeway:asset-tracker:3",
        },
        InstantPER: 0,
        MeanPER: 0,
        DevAddr: "05346ADA",
        TxPower: 2,
        NbTrans: 1,
        Frequency: 916.6,
        DynamicClass: "A",
        payload: {
          messageType: "HEARTBEAT",
          trackingMode: "STAND_BY",
          batteryVoltage: 3.64,
          ackToken: 0,
          firmwareVersion: "1.8.1",
          resetCause: 64,
          periodicPosition: false,
          temperatureMeasure: 18.7,
          sosFlag: 0,
          appState: 0,
          dynamicMotionState: "STATIC",
          onDemand: false,
          payload: "0500997c0040010801",
        },
        deviceConfiguration: {
          mode: "STAND_BY",
        },
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
      DevEUI_uplink: {
        Time: "2022-09-23T17:20:58.683+00:00",
        DevEUI: data.data.devEUI,
        FPort: 17,
        FCntUp: 54414,
        ADRbit: 1,
        MType: 2,
        FCntDn: 796,
        payload_hex: "0500997c0040010801",
        mic_hex: "4ed565ea",
        Lrcid: "00000211",
        LrrRSSI: -49,
        LrrSNR: 9.5,
        LrrESP: -49.461838,
        SpFact: 7,
        SubBand: "G0",
        Channel: "LC7",
        DevLrrCnt: 1,
        Lrrid: "100009AB",
        Late: 0,
        LrrLAT:
          data.data.startLat +
          (Math.round(Math.random()) * 2 - 1) * (Math.random() * 0.0001),
        LrrLON:
          data.data.startLong +
          (Math.round(Math.random()) * 2 - 1) * (Math.random() * 0.0001),
        Lrrs: {
          Lrr: [
            {
              Lrrid: "100009AB",
              Chain: 0,
              LrrRSSI: -49,
              LrrSNR: 9.5,
              LrrESP: -49.461838,
            },
          ],
        },
        CustomerID: "100041823",
        CustomerData: {
          alr: {
            pro: "ABEE/APY",
            ver: "1",
          },
        },
        ModelCfg: "1:TPX_457352bd-f47c-4686-84fb-7c69be15284d",
        DriverCfg: {
          mod: {
            pId: "abeeway",
            mId: "indus-tracker",
            ver: "2",
          },
          app: {
            pId: "abeeway",
            mId: "asset-tracker",
            ver: "2",
          },
          id: "abeeway:asset-tracker:3",
        },
        InstantPER: 0,
        MeanPER: 0,
        DevAddr: "05346ADA",
        TxPower: 2,
        NbTrans: 1,
        Frequency: 916.6,
        DynamicClass: "A",
        payload: {
          messageType: "HEARTBEAT",
          trackingMode: "STAND_BY",
          batteryVoltage: Math.random() * (24 - 20) + 20,
          ackToken: 0,
          firmwareVersion: "1.8.1",
          resetCause: 64,
          periodicPosition: false,
          temperatureMeasure: Math.random() * (24 - 20) + 20,
          sosFlag: 0,
          appState: 0,
          dynamicMotionState: "STATIC",
          onDemand: false,
          payload: "0500997c0040010801",
        },
        deviceConfiguration: {
          mode: "STAND_BY",
        },
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
        result[i].DevEUI_uplink.LrrLAT = result[0].DevEUI_uplink.LrrLAT;
        result[i].DevEUI_uplink.LrrLON = result[0].DevEUI_uplink.LrrLON;
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
        result[i].DevEUI_uplink.LrrLAT = result[0].DevEUI_uplink.LrrLAT;
        result[i].DevEUI_uplink.LrrLON = result[0].DevEUI_uplink.LrrLON;
      }
      if (result[i].createdAt.getHours() >= breakingHour) {
        result[i].DevEUI_uplink.payload.temperatureMeasure =
          result[i - 1].DevEUI_uplink.payload.temperatureMeasure + 0.1;
      }
      if (result[i].DevEUI_uplink.payload.temperatureMeasure >= 50) {
        result[i].DevEUI_uplink.LrrLAT = result[0].DevEUI_uplink.LrrLAT;
        result[i].DevEUI_uplink.LrrLON = result[0].DevEUI_uplink.LrrLON;
        result[i].DevEUI_uplink.payload.sosFlag = 1;
      }
      if (result[i].DevEUI_uplink.payload.temperatureMeasure >= 100) {
        result[i].DevEUI_uplink.payload.batteryVoltage = 0;
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
        result[i].DevEUI_uplink.LrrLAT = result[0].DevEUI_uplink.LrrLAT;
        result[i].DevEUI_uplink.LrrLON = result[0].DevEUI_uplink.LrrLON;
      }
      if (result[i].createdAt.getHours() >= breakingHour) {
        result[i].DevEUI_uplink.payload.batteryVoltage =
          result[i - 1].DevEUI_uplink.payload.batteryVoltage - 0.1;
      }
      if (result[i].DevEUI_uplink.payload.batteryVoltage <= 0) {
        result[i].DevEUI_uplink.payload.batteryVoltage = 0;
        result[i].DevEUI_uplink.LrrLAT = result[0].DevEUI_uplink.LrrLAT;
        result[i].DevEUI_uplink.LrrLON = result[0].DevEUI_uplink.LrrLON;
        result[i].DevEUI_uplink.payload.temperatureMeasure = 0;
        result[i].DevEUI_uplink.payload.sosFlag = 1;
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
