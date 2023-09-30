"use client";

import { SWRConfig } from "swr";

interface Props {
  children: React.ReactNode;
}

export const SWRProvider = ({ children }: Props) => {
  return (
    <SWRConfig
      value={{ fetcher: (url) => fetch(url).then((res) => res.json()) }}
    >
      {children}
    </SWRConfig>
  );
};
