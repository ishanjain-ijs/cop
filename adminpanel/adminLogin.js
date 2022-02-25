const express = require("express");
const msal = require("@azure/msal-node");
const app = express();
const config = {
    auth: {
      clientId: "e801ff5b-59b6-4a51-ba1d-35a4815c921f",
      authority:
        "https://login.microsoftonline.com/b3d5ca7e-6dcd-4510-9a4c-8a4733ff6f5e",
      clientSecret: "hWP7Q~V_rwrjsljat2Jrr4BHyXnqYLR3lI3we",
    },
    system: {
      loggerOptions: {
        loggerCallback(loglevel, message, containsPii) {
          console.log(message);
        },
        piiLoggingEnabled: false,
        logLevel: msal.LogLevel.Verbose,
      },
    },
  };
  
  // Create msal application object
  const cca = new msal.ConfidentialClientApplication(config);
  
  const getLogin = (req, res) => {
    const authCodeUrlParameters = {
        scopes: ["user.read"],
        redirectUri: "http://localhost:3000/redirect",
    };
  
    // get url to sign user in and consent to scopes needed for application
    cca
      .getAuthCodeUrl(authCodeUrlParameters)
      .then((response) => {
        res.redirect(response);
      })
      .catch((error) => console.log(JSON.stringify(error)));
  };
  
  const getRedirect = (req, res) => {
    const tokenRequest = {
      code: req.query.code,
      scopes: ["user.read"],
      redirectUri: "http://localhost:3000/redirect",
    };
  
    cca
      .acquireTokenByCode(tokenRequest)
      .then((response) => {
        console.log("\nResponse: \n:", response);
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send(error);
      });
  };
  
  module.exports ={
      getLogin,
      getRedirect
  }