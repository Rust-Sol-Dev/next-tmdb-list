import React from "react";

interface LoadingScreenProps {
  loading?: boolean;
  title?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  loading = false,
  title,
}) => {
  const opacityClass = loading
    ? "opacity-100 pointer-events-auto bg-[#0000006e]"
    : "opacity-0 pointer-events-none bg-transparent";

  return (
    <div
      className={`fixed w-full h-screen z-[2000] backdrop-blur-md flex items-center justify-center flex-col duration-200 ${opacityClass}`}
    >
      <div className="lds-roller">
        {[...Array(8)].map((_, i) => (
          <div key={i}></div>
        ))}
      </div>
      <p className="text-2xl font-bold text-white">{title ?? ""}</p>
    </div>
  );
};

export default LoadingScreen;
