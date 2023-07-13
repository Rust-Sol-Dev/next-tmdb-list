/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Header from "@/components/Header";
import Link from "next/link";
import { getMovieCreditsById, getMovieDataById } from "@/utils/api";
import { useRouter } from "next/router";
import { FC, useEffect, useMemo, useState } from "react";
import { MovieDetail as MovieDetailType } from "@/types/movie";
import { FaCalendar } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";
import { CastItem, CrewItem } from "@/types/credits";
import LoadingScreen from "@/components/Loading";

export default function MovieDetail() {
  const { query } = useRouter();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<{
    detail: MovieDetailType;
    credits: { cast: CastItem[]; crew: CrewItem[] };
  } | null>(null);

  const getDetail = async () => {
    const { movie_id } = query;
    if (movie_id) {
      setLoading(true);
      try {
        const detail = (await getMovieDataById(
          movie_id as unknown as number
        )) as MovieDetailType;
        const credits = await getMovieCreditsById(
          movie_id as unknown as number
        );
        setData({ detail, credits });
      } catch (error) {
        // Handle error
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    let isMounted = true;

    getDetail();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Header />
      {data && data.detail ? (
        <main className="min-h-screen">
          <div
            className="relative pt-20"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${data.detail.poster_path})`,
              backgroundSize: "cover",
              backgroundPositionY: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[#000] opacity-80" />
            <div className="container relative z-10 py-10 mx-auto">
              <div className="flex gap-4 px-6 xl:gap-6">
                <img
                  src={`https://image.tmdb.org/t/p/w342${data.detail.poster_path}`}
                  className="hidden lg:block"
                  alt=""
                />
                <div className="w-[calc-370px] text-white px-2 lg:px-10">
                  <h1 className="text-3xl lg:text-[36px] font-bold">
                    {data.detail.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-1 mt-2 text-sm lg:text-md">
                    <Link href={data.detail.homepage} passHref target="_blank">
                      <AiOutlineGlobal size={24} className="mr-2" />
                    </Link>
                    <FaCalendar />
                    {data.detail.release_date}
                    {data.detail.genres.map((item, key) => (
                      <p key={item.name + key} className="">
                        {item.name}
                        {key !== data.detail.genres.length - 1 && ", "}
                      </p>
                    ))}
                  </div>
                  <div className="my-5">
                    <h5 className="font-bold text-md lg:text-lg">Overview</h5>
                    <p className="text-sm lg:text-md">{data.detail.overview}</p>
                  </div>
                  <p className="my-1 text-sm capitalize lg:text-lg">
                    status:{" "}
                    <span className="font-bold">{data.detail.status}</span>
                  </p>
                  <p className="my-1 text-sm capitalize lg:text-lg">
                    popularity:{" "}
                    <span className="font-bold">{data.detail.popularity}</span>
                  </p>
                  <p className="my-1 text-sm capitalize lg:text-lg">
                    vote average:{" "}
                    <span className="font-bold">
                      {data.detail.vote_average}
                    </span>
                  </p>
                  <div className="flex flex-wrap items-center gap-1 my-1 mt-2 text-sm capitalize lg:text-lg">
                    Production countries:
                    {data.detail.production_countries.map((item, key) => (
                      <p key={item.name + key} className="font-bold">
                        {item.name}
                        {key !== data.detail.production_countries.length - 1 &&
                          ", "}
                      </p>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-1 my-1 mt-2 text-sm capitalize lg:text-lg">
                    Production companies:
                    {data.detail.production_companies.map((item, key) => (
                      <p key={item.name + key} className="font-bold">
                        {item.name}({item.origin_country})
                        {key !== data.detail.production_companies.length - 1 &&
                          ", "}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {data && data.credits && (
            <div className="container mx-auto max-w-[1280px] pt-10 pb-20 px-4 lg:px-0">
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                <div className="">
                  <h2 className="mb-2 text-2xl font-bold">
                    Cast ({data.credits.cast.length})
                  </h2>
                  <div className="grid grid-cols-4 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {data.credits.cast.map((cast, key) => (
                      <CastOne key={key} {...cast} />
                    ))}
                  </div>
                </div>
                <div className="">
                  <h2 className="mb-2 text-2xl font-bold">
                    Crew ({data.credits.crew.length})
                  </h2>
                  <div className="grid grid-cols-4 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {data.credits.crew.map((crew, key) => (
                      <CrewOne key={key} {...crew} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      ) : (
        <LoadingScreen loading={loading} />
      )}
    </>
  );
}

const CastOne: FC<CastItem> = ({ profile_path, name, gender, character }) => {
  const image = useMemo(() => {
    if (profile_path) {
      return `https://image.tmdb.org/t/p/w342${profile_path}`;
    } else {
      return gender === 1 ? "/imgs/famale.svg" : "/imgs/male.svg";
    }
  }, [gender, profile_path]);
  return (
    <div className="overflow-hidden rounded-md shadow-lg">
      <div className="bg-gray-300">
        <img src={image} className="" alt={name} />
      </div>
      <div className="p-2">
        <p className="text-sm font-bold">{name}</p>
        <p className="text-xs">{character}</p>
      </div>
    </div>
  );
};

const CrewOne: FC<CrewItem> = ({ profile_path, gender, name, job }) => {
  const image = useMemo(() => {
    if (profile_path) {
      return `https://image.tmdb.org/t/p/w342${profile_path}`;
    } else {
      return gender === 1 ? "/imgs/famale.svg" : "/imgs/male.svg";
    }
  }, [gender, profile_path]);
  return (
    <div className="overflow-hidden rounded-md shadow-lg">
      <div className="bg-gray-300">
        <img src={image} className="" alt={name} />
      </div>
      <div className="p-2">
        <p className="text-sm font-bold">{name}</p>
        <p className="text-xs">{job}</p>
      </div>
    </div>
  );
};
