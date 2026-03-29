import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./styles.css"
import { BrowserRouter } from "react-router-dom"
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <React.StrictMode>
    {/* Use your v3 Site Key here */}
    <GoogleReCaptchaProvider reCaptchaKey="6Lcdm5wsAAAAAHZZA6GaCOQgXKoo4DXk4GRvdOyq">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleReCaptchaProvider>
  </React.StrictMode>
)