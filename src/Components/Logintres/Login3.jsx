import React, { useState, useEffect } from 'react';
import AppleLogin from 'react-apple-login';
import axios from 'axios';

const Login3 = () => {
  const [authResponse, setAuthResponse] = useState(null);

  const appleResponse = async (response) => {
    console.log("llamando callback");
    if (!response.error) {
      try {
        const res = await axios.post("https://serverapple.onrender.com/auth", response);
        setAuthResponse(res.data);
        console.log("authresponse",authResponse)
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("error, apple response: ", response.error);
    }
  };

  const consultaEmail = async (res) => {
      const consulta = await axios.post("https://serverapple.onrender.com/consultaEmail", res)
    console.log(consulta)
  }

  useEffect(() => {
    if (authResponse && authResponse.email) {
consultaEmail(authResponse.email);
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