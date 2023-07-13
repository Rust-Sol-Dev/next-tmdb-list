import Header from "@/components/Header";
import MainGrid from "@/components/MainGrid";
import { MovieItem as MovieItemType } from "@/types/movie";
import { getMoviesByPage } from "@/utils/api";
import { useEffect, useState } from "react";

export default function TopRated() {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<MovieItemType[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const getMovieList = async (page: number) => {
    setIsLoading(true);
    const { results, total_pages } = await getMoviesByPage("top_rated", page);
    if (total_pages) {
      setTotalPages(total_pages as number);
    }
    if (results) {
      setMovies(results);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getMovieList(page);
  }, [page]);

  const onPageChange = (num: number) => {
    setPage(num);
  };

  return (
    <>
      <Header />
      <MainGrid
        title="Top Rated Movies"
        isLoading={isLoading}
        list={movies}
        totalPages={totalPages}
        currentPage={page}
        onPageChange={onPageChange}
      />
    </>
  );
}
