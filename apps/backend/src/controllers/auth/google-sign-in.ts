import { User, UserResponseObject } from "@/models/user";
import { createMethodHandler } from "@/lib/controllerUtil";
import { OAuth2Client } from "google-auth-library";
import { getEnv } from "@/lib/env";

const googleClient = new OAuth2Client({
  clientId: getEnv().GOOGLE_CLIENT_ID,
  clientSecret: getEnv().GOOGLE_CLIENT_SECRET,
  redirectUri: new URL(
    "/auth/google-sign-in",
    getEnv().FRONTEND_DOMAIN
  ).toString(),
});

export type GoogleSignInQuery = object;
export type GoogleSignInParams = object;
export type GoogleSignInBody = {
  authuser: string;
  code: string;
  prompt: string;
  scope: string;
};
export type GoogleSignInResponse = {
  user: UserResponseObject;
  token: string;
};

export default createMethodHandler<
  GoogleSignInParams,
  GoogleSignInBody,
  GoogleSignInQuery
>({
  async handleRequest(req, res) {
    const { code } = req.body;
    const tokensData = await googleClient.getToken({
      code,
    });

    const { id_token } = tokensData.tokens;
    if (id_token) {
      const ticket = await googleClient.verifyIdToken({
        idToken: id_token,
      });
      const ticketPayload = ticket.getPayload();
      const { email } = ticketPayload || {};
      const user = await User.findOne({ email });
      if (user) {
        const response: GoogleSignInResponse = {
          token: user.generateAuthToken(),
          user: user.getUserResponseObject(),
        };
        return res.send(response);
      }
      const newUser = new User({
        email,
        isVerified: true,
        meta: {
          project: "BLACKBUCKS",
        },
        password: "",
      });
      await newUser.save();
      const response: GoogleSignInResponse = {
        token: newUser.generateAuthToken(),
        user: newUser.getUserResponseObject(),
      };
      return res.send(response);
    }
    return res.send({});
  },
});
