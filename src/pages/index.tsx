import Header from "@/components/Header";
import MainGrid from "@/components/MainGrid";
import MovieItem from "@/components/MovieItem";
import { MovieItem as MovieItemType } from "@/types/movie";
import { getMoviesByPage } from "@/utils/api";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/upcoming");
  }, []);

  const titleFormat = (value: string) => {
    return (value.charAt(0).toUpperCase() + value.slice(1)).replace(/_/g, " ");
  };
}
