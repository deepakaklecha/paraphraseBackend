const client_id = "77i0i6u2hd04ke";
const client_secret = "0Y8Yh7t1g1XqyMRc";
const redirect_uri = "http://localhost:8000/auth/linkedin/callback";

const login = async (req, res) => {
  const scope = "r_liteprofile r_emailaddress";
  const state = "987654321";

  res.redirect(
    `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}&scope=${scope}`
  );
};

const callback = async (req, res) => {
  const code = req.query.code;

  const options = {
    url: "https://www.linkedin.com/oauth/v2/accessToken",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    form: {
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "https://www.linkedin.com/",
      client_id: client_id,
      client_secret: client_secret,
    },
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = JSON.parse(body).access_token;
      // use the access token to make API requests
      console.log(access_token);
    } else {
      // handle error
    }
  });
};

module.exports = {
  login,
  callback,
};
