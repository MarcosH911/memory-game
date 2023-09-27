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
    <div className="pb-20 overflow-x-hidden">
      <h1 className="text-5xl sm:text-6xl font-bold text-emerald-950 pt-8 text-center">
        Feedback
      </h1>
      <h2 className="text-lg sm:text-xl text-center text-teal-800 mt-4 sm:mt-6 sm:mb-10 mb-8">
        Ayúdanos a mejorar
      </h2>
      <div className="md:px-20 sm:px-10 xs:px-5 px-3 mx-auto flex max-w-4xl flex-col justify-start gap-6">
        <FeedbackInputBox />
        <hr className="w-[200vw] -mx-[100vw] border-slate-300 my-4 sm:my-6" />
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
