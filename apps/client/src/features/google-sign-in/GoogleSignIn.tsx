import LoadingButton from "../loading-button";
import GoogleIcon from "@mui/icons-material/Google";
import { googleSignInURL } from "./config";

export default function GoogleSignIn() {
  return (
    <LoadingButton
      variant="outlined"
      fullWidth
      startIcon={<GoogleIcon />}
      onClick={() => window.open(googleSignInURL, "_self")}
    >
      Sign In with Google
    </LoadingButton>
  );
}
