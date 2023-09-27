"use client";

import { useEffect, useState } from "react";

import FeedbackItem from "./(components)/FeedbackItem";
import FeedbackInputBox from "./(components)/FeedbackInputBox";
import Spinner from "@/components/Spinner";

const getFeedbackItems = async (
  setFeedbackItems: React.Dispatch<any>,
  offset: number,
) => {
  const feedbackItemsPromise = await fetch(
    `/api/feedback/get-feedback?offset=${offset}`,
    {
      method: "get",
    },
  );

  const { data: feedbackItemsData } = await feedbackItemsPromise.json();

  setFeedbackItems((items: any) => [...items, ...feedbackItemsData]);
};

function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [feedbackItems, setFeedbackItems] = useState<
    {
      id: string;
      text: string;
      tags: string[];
      votes: number;
    }[]
  >([]);

  useEffect(() => {
    const getItems = async () => {
      setIsLoading(true);
      await getFeedbackItems(setFeedbackItems, offset);
      setIsLoading(false);
    };

    getItems();
  }, [offset]);

  return (
    <div className="overflow-x-hidden pb-20">
      <h1 className="pt-8 text-center text-5xl font-bold text-emerald-950 sm:text-6xl">
        Feedback
      </h1>
      <h2 className="mb-8 mt-4 text-center text-lg text-teal-800 sm:mb-10 sm:mt-6 sm:text-xl">
        Ayúdanos a mejorar
      </h2>
      <div className="mx-auto flex max-w-4xl flex-col justify-start gap-6 px-3 xs:px-5 sm:px-10 md:px-20">
        <FeedbackInputBox />
        <hr className="-mx-[100vw] my-4 w-[200vw] border-slate-300 sm:my-6" />
        {feedbackItems.map((item, index) => (
          <FeedbackItem
            key={index}
            data={item}
            setOffset={setOffset}
            isLast={index === feedbackItems.length - 1}
          />
        ))}
      </div>
      <div className="relative mt-20">
        <Spinner visible={isLoading} size="5xl" />
      </div>
    </div>
  );
}

export default Page;
