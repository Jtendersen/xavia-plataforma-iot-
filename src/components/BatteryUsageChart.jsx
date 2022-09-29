import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDevices } from "../store/reducers/deviceMeasures.reducer";
import { getMeasures } from "../store/reducers/getAllMeasures.reducer";

const BatteryUsageChart = () => {
  const [userData, setUserData] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const devices = useSelector((state) => state.devices);
  const measures = useSelector((state) => state.measures);

  useEffect(() => {
    dispatch(getDevices(user._id));
    dispatch(getMeasures({ entries: 0, user: user._id }));
  }, []);



  return <div>BatteryUsageChart</div>;
};

export default BatteryUsageChart;
