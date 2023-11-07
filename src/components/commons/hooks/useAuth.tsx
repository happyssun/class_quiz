import { useRouter } from "next/router";
import { useEffect } from "react";

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const acessToken = localStorage.getItem("accessToken");
    if (!acessToken) {
      router.push("/24-custom-hooks/02-useAuth-hooks/login-page");
    }
  }, [router]);
};
