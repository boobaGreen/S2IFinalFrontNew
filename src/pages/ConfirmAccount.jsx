import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import Cookies from "js-cookie";

function ConfirmAccount() {
  const navigate = useNavigate();
  const [loadingStatus, setLoadingStatus] = useState("isLoading");
  const { token: tokenMail } = useParams();

  useEffect(() => {
    async function verifyEmail() {
      try {
        const response = await Axios.get(
          `http://localhost:3005/api/v1/users/confirmAccount/${tokenMail}`
        );

        console.log("Risposta dal server:", response.data);

        const { token } = response.data;
        Cookies.set("jwt", token, { secure: true, sameSite: "strict" });
        setLoadingStatus("tokenReceived");
        console.log("loadingStatus in token", loadingStatus);
      } catch (error) {
        console.error("Errore durante la richiesta GET:", error);
        console.log("loadingStatus in error 1", loadingStatus);
        if (loadingStatus !== "tokenReceived") setLoadingStatus("error");
        console.log("loadingStatus in error 2", loadingStatus);
      }
    }

    if (loadingStatus === "isLoading") {
      verifyEmail();
    } else if (loadingStatus === "tokenReceived") {
      const timeoutId = setTimeout(() => {
        window.location.reload(); // Ricarica l'applicazione per vedere il token altrimenti lo vede solo la seconda volta
        navigate("/home");
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [tokenMail, loadingStatus, navigate]);

  if (loadingStatus === "isLoading") return <div> is loading ....</div>;
  if (loadingStatus === "error")
    return <div>account gia' verificato o link errato</div>;
  if (loadingStatus === "tokenReceived") {
    return (
      <div>
        Account confermato correttamente.... verrai reindirizzato in 2 sec
      </div>
    );
  }

  return null;
}

export default ConfirmAccount;
