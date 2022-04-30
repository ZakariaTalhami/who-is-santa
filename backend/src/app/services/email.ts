const API_KEY = "";

import { CourierClient } from "@trycourier/courier";

const courier = CourierClient({ authorizationToken: API_KEY });

interface IEmailConfig {
  to: {
    email: string;
  };
  template: string;
  data: object;
}

const sendEmail = async (emailConfig: IEmailConfig) => {
  return await courier.send({
    message: emailConfig,
  });
};

// {
//     to: {
//       email: "zakaria.a.a.talhami@gmail.com",
//     },
//     template: "0J2A9ZVPKN4SFSP7F9NM4ZFWM48Q",
//     data: {
//       user_name: "Zakaria",
//       reset_password_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNWU3YTRkZWZiNjg1MDAxMzEzODgxZiIsIm1lbWJlcklkIjoiNjI1ZTdhNGRlZmI2ODUwMDEzMTM4ODFmIiwiZW1haWwiOiJ0ZXN0Lm1jdGVzdG9AdGVzdC5jb20iLCJyb2xlIjp7InVzZXIiOnRydWUsImFnZW50Ijp0cnVlLCJhZG1pbiI6ZmFsc2V9LCJpYXQiOjE2NTAzNTg5NDAsImV4cCI6MTY1MDM1OTI0MH0.wvHSY5Ixjl5rSnxPHaQ-HJ04eSzEOqwC4LcBVtZzgqU",
//     },
//   },
