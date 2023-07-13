import MoviePage from "@/layout/MoviePage";
import { NextPage } from "next";
import React from "react";

const Popular: NextPage = () => (
  <MoviePage movieType="popular" title="Popular Movies" />
);

export default Popular;
