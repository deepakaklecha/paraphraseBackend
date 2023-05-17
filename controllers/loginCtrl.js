const express = require("express");
const axios = require("axios");
const querystring = require("querystring");
const userModel = require("../models/userModel");

// Parameters for LinkedIn App
const clientId = "77i0i6u2hd04ke";
const clientSecret = "0Y8Yh7t1g1XqyMRc";
const redirectUri = "https://commention-backend.onrender.com/callback"; // Your redirect URI

// Create an Express application
const app = express();

// Define a route for initiating the LinkedIn login process
const login = (req, res) => {
  const queryParams = querystring.stringify({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: "r_liteprofile r_emailaddress", // Specify the required scope(s) based on your needs
  });

  const authorizationUrl = `https://www.linkedin.com/oauth/v2/authorization?${queryParams}`;
  res.redirect(authorizationUrl);
};

// Define the callback route to handle the authorization code exchange
// const callback = (req, res) => {
//   const authorizationCode = req.query.code;

//   // Request access token from LinkedIn
//   const requestBody = querystring.stringify({
//     grant_type: "authorization_code",
//     code: authorizationCode,
//     client_id: clientId,
//     client_secret: clientSecret,
//     redirect_uri: redirectUri,
//   });

//   const config = {
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//   };

//   axios
//     .post("https://www.linkedin.com/oauth/v2/accessToken", requestBody, config)
//     .then((response) => {
//       const accessToken = response.data.access_token;
//       // Use the access token for authenticated API requests
//       // For example, you can make a request to the user's profile
//       axios
//         .get(
//           "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         )
//         .then((response) => {
//           const emailData = response.data;
//           const emailAddress = emailData.elements[0]["handle~"].emailAddress;

//           // Respond with the email address only
//           res.send(emailAddress);
//         })
//         .catch((error) => {
//           console.error("Error making API request:", error.response.data);
//           res
//             .status(500)
//             .send("An error occurred while making the API request");
//         });
//     })
//     .catch((error) => {
//       console.error("Error getting access token:", error.response.data);
//       res.status(500).send("An error occurred while getting the access token");
//     });
// };

module.exports = {
  login,
  callback,
};
