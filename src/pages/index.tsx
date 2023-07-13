import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/upcoming");
  }, []);

  const titleFormat = (value: string) => {
    return (value.charAt(0).toUpperCase() + value.slice(1)).replace(/_/g, " ");
  };
}
