import { GenresItem } from "@/types/movie";
import { getGenres } from "@/utils/api";
import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";

// Create the context
const PageDataContext = createContext<{
  genres: GenresItem[];
}>({
  genres: [],
});

interface PageDataProviderProps {
  children: React.ReactNode;
}

// Create the PageDataProvider component
const PageDataProvider: React.FC<PageDataProviderProps> = ({ children }) => {
  const [genres, setGenres] = useState<GenresItem[]>([]);

  const getGenreData = async () => {
    const genres = await getGenres();
    if (genres?.genres) {
      setGenres(genres?.genres);
    }
  };

  useEffect(() => {
    getGenreData();
  }, []);

  return (
    <PageDataContext.Provider value={{ genres }}>
      {children}
    </PageDataContext.Provider>
  );
};

export { PageDataContext, PageDataProvider };
