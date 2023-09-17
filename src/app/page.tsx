import Link from "next/link";

function Page() {
  return (
    <div className="">
      <Link href="/jugar">
        <button className="hover:animate-paused animate-up-down rounded-lg bg-teal-500 px-10 py-4 text-5xl font-extrabold uppercase tracking-wider text-black shadow-xl duration-150 hover:scale-105 hover:shadow-2xl active:scale-100 active:shadow-xl">
          Play
        </button>
      </Link>
    </div>
  );
}

export default Page;
