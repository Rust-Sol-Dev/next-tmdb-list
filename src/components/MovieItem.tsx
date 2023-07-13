/* eslint-disable @next/next/no-img-element */
import { PageDataContext } from "@/context/PageDataContext";
import { MovieItem } from "@/types/movie";
import { FC, useContext } from "react";
import Link from "next/link";
import { FaCalendar } from "react-icons/fa";

interface MovieItemProps {
  movie: MovieItem;
}
const MovieItem: FC<MovieItemProps> = ({ movie }) => {
  const { title, release_date, id, vote_average, genre_ids, poster_path } =
    movie;
  const { genres } = useContext(PageDataContext);
  return (
    <Link href={`/movie/${id}`} passHref>
      <div className="shadow-md cursor-pointer">
        <img
          src={`https://www.sasuke.dev/projects/project-20.webp`}
          // src={`https://image.tmdb.org/t/p/w342${poster_path}`}
          className="opacity h-[360px]"
          alt=""
        />
        <div className="p-4">
          <div className="">
            <h5 className="my-1 font-bold text-md">{title}</h5>
            <div className="flex items-center gap-1 my-1 text-sm">
              <FaCalendar color="#444" />
              {release_date}
            </div>
            <p className="mb-1 text-sm">
              Vote Average: <span className="font-bold">{vote_average}</span>
            </p>
            <div className="flex flex-wrap gap-1">
              {genre_ids.map((id, key) => (
                <div
                  className="px-2 py-1 text-[10px] text-white bg-blue-600 rounded-2xl"
                  key={key}
                >
                  {genres.find((genre) => genre.id === id)?.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <img src={`https://www.sasuke.dev/projects/project-20.webp`} alt="" /> */}
      </div>
    </Link>
  );
};

export default MovieItem;
