/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import Header from "@/components/Header";
import MainGrid from "@/components/MainGrid";
import { MovieItem as MovieItemType } from "@/types/movie";
import { getMoviesByPage } from "@/utils/api";

const SCROLL_THRESHOLD = 150;

interface MoviePageProps {
  movieType: string;
  title: string;
}

const MoviePage: React.FC<MoviePageProps> = ({ movieType, title }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<MovieItemType[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  const scrollPositionRef = useRef<number>(0);

  const getMovieList = async (page: number) => {
    setIsLoading(true);
    const oldMovies = movies;
    const { results, total_pages } = await getMoviesByPage(movieType, page);
    setTotalPages(total_pages);
    if (results && results.length > 0) {
      setMovies(oldMovies.concat(results));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageBottomPosition = document.body.offsetHeight - SCROLL_THRESHOLD;

      if (
        scrollPosition >= pageBottomPosition &&
        !isLoading &&
        page < totalPages
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, page, totalPages]);

  const onPageChange = (num: number) => {
    setPage(num);
  };

  useEffect(() => {
    // Store the scroll position before the component re-renders
    scrollPositionRef.current = window.scrollY;
  });

  useEffect(() => {
    getMovieList(page);
  }, [page]);

  useEffect(() => {
    // Restore the scroll position after the component re-renders
    window.scrollTo(0, scrollPositionRef.current);
  });

  return (
    <>
      <Header />
      <MainGrid title={title} isLoading={isLoading} list={movies} />
    </>
  );
};

export default MoviePage;
