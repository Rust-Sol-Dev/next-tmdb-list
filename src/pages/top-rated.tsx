import MoviePage from "@/layout/MoviePage";
import { NextPage } from "next";
import React from "react";

const TapRated: NextPage = () => (
  <MoviePage movieType="top_rated" title="Top Rated Movies" />
);

export default TapRated;
