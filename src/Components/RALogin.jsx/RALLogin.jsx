import { useEffect } from "react";


const clientId = "loginpudostarkencl";
const scope = "name email";
const redirectURI = "https://www.jaimeprueba.com";
const state = "origin:web";

export default function RALogin() {
  useEffect(() => {
    window.AppleID.auth.init({
      clientId,
      scope,
      redirectURI,
      state,
      usePopup: true
    });

    document.addEventListener("AppleIDSignInOnSuccess", (event) => {
      // Handle successful response.
      console.log("Success ", event);
    });

    document.addEventListener("AppleIDSignInOnFailure", (event) => {
      console.log("Error ", event);
    });
  }, []);

  return (
    <div className="App">
      <div
        id="appleid-signin"
        className="signin-button"
        data-color="black"
        data-border="true"
        data-type="sign-in"
      ></div>
    </div>
  );
}

