import { Grid, Slider } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ScriptableContext,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const marks = [
  {
    value: 0,
    label: "0 Hs.",
  },
  {
    value: 12,
    label: "12",
  },
  {
    value: 24,
    label: "24",
  },
  {
    value: 48,
    label: "48 Hs.",
  },
];

const colors = [
  "rgba(0,0,255,0.6)",
  "rgba(0,128,128,0.6)",
  "rgba(0,0,0,0.6)",
  "rgba(255,0,255,0.6)",
];

const BatteryUsageChart = () => {
  const [time, setTime] = React.useState("24");

  const devices = useSelector((state) => state.devices);
  const measures = useSelector((state) => state.measures);

  const labelsToMap = [];
  const expectedHigh = [];
  const expectedLow = [];

  let maxIndex = 0;

  const dataToShow = [];

  for (let i = 0; i < measures.length; i++) {
    let arrayToMap = [];
    if (measures[i + 1]) {
      if (measures[i].length > measures[maxIndex].length) {
        maxIndex = i;
      }
    }

    const measuresCopy = measures[i].slice();
    const batteryData = measuresCopy?.map((measure, index) => {
      return measure.DevEUI_uplink.payload.batteryVoltage;
    });

    if (batteryData.length >= 12) {
      for (let j = time; j > 0; j--) {
        let averageArray = batteryData.slice(j * 12, (j + 1) * 12);

        let sum = averageArray.reduce(
          (previous, current) => (current += previous),
          0
        );

        let avg = sum / averageArray.length;
        arrayToMap.push(avg);
      }
    } else {
      let sum = batteryData.reduce(
        (previous, current) => (current += previous),
        0
      );

      let avg = sum / batteryData.length;
      arrayToMap.push(avg);
    }

    dataToShow.push(arrayToMap);
  }

  const formattedDatasets = [];
  for (let i = 0; i < dataToShow.length; i++) {
    formattedDatasets.push({
      label: `${devices[i].qrCode} Battery (V)`,
      data: dataToShow[i],
      borderColor: colors[i],
    });
  }

  const finalData = formattedDatasets.push({
    fill: true,
    label: "Expected Battery Voltage (V)",
    data: expectedHigh,
    backgroundColor: (context: ScriptableContext<"line">) => {
      const ctx = context.chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, "rgba(0,255,0,0.2)");
      gradient.addColorStop(0.5, "rgba(255,255,0,0.2)");
      gradient.addColorStop(1, "rgba(255,0,0,0.2)");
      return gradient;
    },
    pointRadius: 0,
  });

  const largestMeasure = measures[maxIndex].slice();

  const labels = largestMeasure.map((measure) => {
    if (measure.DevEUI_uplink.Time) {
      return new Date(`${measure.DevEUI_uplink.Time}`).toLocaleString();
    } else {
      return new Date(measure.DevEUI_uplink.Time).toLocaleString();
    }
  });

  for (let i = time; i >= 0; i--) {
    labelsToMap.push(labels[i * 12]);
    expectedHigh.push(3.8);
  }

  const data = {
    labels: labelsToMap,
    datasets: formattedDatasets,
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Devices' Battery Voltages",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 0.1,
        },
      },
    },
  };

  const handleChange = (event) => {
    setTime(event.target.textContent);
  };

  function valuetext(value) {
    return `${value} Hs`;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={2}>
        <Grid xs={8}>
          <Line options={options} data={data} />
        </Grid>
        <Grid sx={{ p: 5 }} xs={4}>
          <Box textAlign={"center"}>Hours To Show</Box>
          <Box sx={{ p: 5 }}>
            <Slider
              aria-label="Hs."
              defaultValue={24}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={1}
              marks={marks}
              min={0}
              max={48}
              onChangeCommitted={handleChange}
            />
          </Box>
          {/* <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Time</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={time}
              label="Time"
              onChange={handleChange}
            >
              <MenuItem value={24}>Últimas 24hs</MenuItem>
              <MenuItem value={12}>Últimas 12hs</MenuItem>
              <MenuItem value={6}>Últimas 6hs</MenuItem>
            </Select>
          </FormControl> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default BatteryUsageChart;
