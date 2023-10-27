import { useRouter } from "next/router";
import { useEffect } from "react";

export const useAuth = () => {
  const router = useRouter();

  useEffect(()=> {
if(localStorage.getItem("accessToken")===null)
  },[])
}