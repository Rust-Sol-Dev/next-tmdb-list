import MoviePage from "@/layout/MoviePage";
import { NextPage } from "next";
import React from "react";

const Upcoming: NextPage = () => (
  <MoviePage movieType="upcoming" title="Upcoming Movies" />
);

export default Upcoming;
