import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import { useDispatch } from "react-redux";
import { setQrCode } from "../store/reducers/deviceQrCode.reducer";
import * as ReactDOM from "react-dom";

const QrScanner = (props) => {
  const [data, setData] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setQrCode(data));
  }, [data]);

  const [isUnmounted, setIsUnmounted] = useState(false);
  return (
    <>

        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);

              ReactDOM.unmountComponentAtNode(QrReader);
              setIsUnmounted(true);
            }
            // if (!!error) {
            //   console.info(error);
            // }
          }}
          style={{ width: "100%" }}
        />

    </>
  );
};

export default QrScanner;
