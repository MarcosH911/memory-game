import type { ReadonlyURLSearchParams } from "next/navigation";

function setSearchParams(
  pathname: string,
  searchParams: ReadonlyURLSearchParams,
  newSearchParams: [string, string][],
) {
  const params = new URLSearchParams(searchParams);
  newSearchParams.forEach(([name, value]) => {
    params.set(name, value);
  });
  return pathname + "?" + params.toString();
}

export default setSearchParams;
