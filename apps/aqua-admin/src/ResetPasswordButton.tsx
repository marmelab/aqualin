import * as React from "react";
import { Button, useRecordContext } from "react-admin";
const AQUALIN_URL = process.env.REACT_APP_AQUALIN_URL;

const ResetPasswordButton = ({ source }: { source: string }) => {
  const [message, setMessage] = React.useState("");

  const resetPassword = async (email: string) => {
    try {
      return await fetch(AQUALIN_URL + "api/users/resetPasswordRequest", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
        }),
      })
        .then((response) => {
          if (response.ok) {
            setMessage("The reset password request succeed.");
          }
        })
        .catch((error) => {
          throw new Error(error);
        });
    } catch (e) {
      setMessage("Error: The reset password request failed.");
    }
  };

  const record = useRecordContext();
  return record ? (
    <div>
      <Button variant="outlined" onClick={() => resetPassword(record[source])}>
        <>Reset Password</>
      </Button>
      <p>{message}</p>
    </div>
  ) : null;
};

export default ResetPasswordButton;
