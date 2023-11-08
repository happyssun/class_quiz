import { useRouter } from "next/router";
import { useEffect } from "react";

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const acessToken = localStorage.getItem("accessToken");
    if (!acessToken) {
      alert("로그인 후 이용 가능");
      void router.push("/24-custom-hooks/02-useAuth-hooks/login-page");
    }
  }, [router]);
};
