import Link from "next/link";

function Home() {
  return (
    <div className="flex h-full items-center justify-center">
      <Link href="/">
        <button className="animate-up-down rounded-lg bg-teal-500 px-10 py-4 text-5xl font-bold uppercase tracking-wider text-black shadow-xl duration-150 hover:scale-105 hover:shadow-2xl hover:animate-paused active:scale-100 active:shadow-xl">
          Play
        </button>
      </Link>
    </div>
  );
}

export default Home;
