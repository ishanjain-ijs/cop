const express = require("express");
const msal = require("@azure/msal-node");
const app = express();
const config = {
    auth: {
      clientId: "23556e38-150f-428c-ba08-e450a6e32376",
      authority:
        "https://login.microsoftonline.com/e4e34038-ea1f-4882-b6e8-ccd776459ca0",
      clientSecret: "cKB7Q~rsnncGe2cgiUStqC.I9V2UR3K3ACJ7n",
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
        redirectUri: "https://ctcof2.azurewebsites.net/redirect",
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
      redirectUri: "https://ctcof2.azurewebsites.net/redirect",
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