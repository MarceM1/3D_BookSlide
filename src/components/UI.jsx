import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";
// import { Audio } from "three";
// import { Audio } from "three";

const pictures = [
  "DSC00680",
  "DSC00933",
  "DSC00966",
  "DSC00983",
  "DSC01011",
  "DSC01040",
  "DSC01064",
  "DSC01071",
  "DSC01103",
  "DSC01145",
  "DSC01420",
  "DSC01461",
  "DSC01489",
  "DSC02031",
  "DSC02064",
  "DSC02069",
];

export const pageAtom = atom(0);
export const pages = [
  {
    front: "book-cover",
    back: pictures[0],
  },
];
for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "book-back",
});

export const UI = () => {
  const bgAudioRef = useRef(null);
  const [page, setPage] = useAtom(pageAtom);

  useEffect(() => {
    // Configurar el audio de fondo solo una vez al montar el componente
    if (!bgAudioRef.current) {
      bgAudioRef.current = new Audio("/audios/background-music.ogg");
      bgAudioRef.current.loop = true;
      bgAudioRef.current.volume = 0.5;
    }

    const playAudio = () => {
      if (bgAudioRef.current.paused) {
        bgAudioRef.current
          .play()
          .catch((err) => console.error("Error al reproducir audio:", err));
      }
    };

    document.addEventListener("click", playAudio, { once: true });

    return () => {
      document.removeEventListener("click", playAudio);
      bgAudioRef.current.pause();
    };
  }, []);

  useEffect(() => {
    const audio = new Audio("/audios/page-flip-01a.mp3");
    audio.play();
  }, [page]);

  return (
    <>
      <main className=" pointer-events-none select-none z-10 fixed  inset-0  flex justify-between flex-col">
        <a
          className="pointer-events-auto mt-10 ml-10"
          target="_blank"
          href="https://marcelomelogno.netlify.app"
        >
          <img className="w-20" src="/images/wawasensei-white.png" />
        </a>
        <div className="w-full overflow-auto pointer-events-auto flex justify-center max-sm:w-1/4">
          <div className="overflow-auto flex items-center gap-4 max-w-full p-10 flex  max-sm:flex-col max-sm:p-2 max-sm:gap-2 max-sm:items-start max-sm:overflow-hidden">
            {[...pages].map((_, index) => (
              <button
                key={index}
                className={`max-sm:text-sm max-sm:py-2 max-sm:px-3 border-transparent hover:border-white transition-all duration-300  px-4 py-3 rounded-full  text-lg uppercase shrink-0 border ${
                  index === page
                    ? "bg-white/90 text-black"
                    : "bg-black/30 text-white"
                }`}
                onClick={() => setPage(index)}
              >
                {index === 0 ? "Cover" : `Page ${index}`}
              </button>
            ))}
            <button
              className={`max-sm:text-xs max-sm:py-2 max-sm:px-3 border-transparent hover:border-white transition-all duration-300  px-4 py-3 rounded-full  text-lg uppercase shrink-0 border ${
                page === pages.length
                  ? "bg-white/90 text-black"
                  : "bg-black/30 text-white"
              }`}
              onClick={() => setPage(pages.length)}
            >
              Back Cover
            </button>
          </div>
        </div>
      </main>

      <div className="fixed inset-0 flex items-center -rotate-2 select-none ">
        <div className="relative">
          <div className="bg-white/0  animate-horizontal-scroll flex items-center gap-8 w-max px-8">
            <h1 className="shrink-0 text-white text-10xl font-black ">
              Wawa Sensei
            </h1>
            <h2 className="shrink-0 text-white text-8xl italic font-light">
              Adventure
            </h2>
            <h2 className="shrink-0 text-white text-12xl font-bold">
              Minimalist
            </h2>
            <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">
              Creative
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-medium">
              Emotional
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-extralight italic">
              Melancolic
            </h2>
            <h2 className="shrink-0 text-white text-13xl font-bold">Nature</h2>
            <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
              Urban
            </h2>
          </div>
          <div className="absolute top-0 left-0 bg-white/0 animate-horizontal-scroll-2 flex items-center gap-8 px-8 w-max">
            <h1 className="shrink-0 text-white text-10xl font-black ">
              Wawa Sensei
            </h1>
            <h2 className="shrink-0 text-white text-8xl italic font-light">
              Adventure
            </h2>
            <h2 className="shrink-0 text-white text-12xl font-bold">
              Minimalist
            </h2>
            <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">
              Creative
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-medium">
              Emotional
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-extralight italic">
              Melancolic
            </h2>
            <h2 className="shrink-0 text-white text-13xl font-bold">Nature</h2>
            <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
              Urban
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};
