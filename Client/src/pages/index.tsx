import AuthModal from "@/components/AuthModal";
import LayoutAuth from "@/layouts/LayoutAuth"
import { request } from "@umijs/max";
import { useModel } from "@umijs/max";
import { useAccess } from "@umijs/max";
import { message } from "antd";
import { useState } from "react";


export default () => {
  const { initialState, setInitialState, refresh } = useModel("@@initialState");
  const access = useAccess();
  const [loading, setLoading] = useState(false);
  const loginHandler = async (data: any) => {
    setLoading(true);
    request("/api/auth/login", {
      method: "POST",
      data,
    })
      .then((result: any) => {
        if (result.status == 0) {
          localStorage.setItem("token", result.token);

          setInitialState({ ...initialState, ...result });
          refresh();
          location.reload();
        } else {
          message.error(result.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
    <LayoutAuth>
      <p>
        привет
      </p>
      
    </LayoutAuth>
    </>
  )
}