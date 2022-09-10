import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import { useDispatch } from 'react-redux';
import { setQrCode } from '../store/reducers/deviceQrCode.reducer';

const QrScanner = (props) => {
  const [data, setData] = useState('No result');
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setQrCode(data))
    
  }, [data]);



  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '100%' }}
      />
     
    </>
  );
};

export default QrScanner