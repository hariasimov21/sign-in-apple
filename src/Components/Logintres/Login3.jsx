import React, { useState, useEffect } from 'react';
import AppleLogin from 'react-apple-login';
import axios from 'axios';

const Login3 = () => {
  const [authResponse, setAuthResponse] = useState(null);

  const appleResponse = async (response) => {
    console.log("llamando callback");
    if (!response.error) {
      try {
        const res = await axios.post("https://localhost:3001/auth", response);
        setAuthResponse(res.data);
        console.log("res", res);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("error, apple response: ", response.error);
    }
  };

  useEffect(() => {
    if (authResponse && authResponse.email) {
      console.log("Correo Electrónico: ", authResponse.email);
    }
  }, [authResponse]);

  return (
    <AppleLogin
      clientId="loginpudostarkencl"
      redirectURI="https://loginappleprueba.com"
      responseMode="query"
      callback={appleResponse}
      usePopup={true}
    />
  );
};

export default Login3;