import type { ReadonlyURLSearchParams } from "next/navigation";

function setSearchParams(
  pathname: string,
  searchParams: ReadonlyURLSearchParams,
  newSearchParams: [string, string][],
) {
  if (!newSearchParams.length) {
    return pathname;
  }

  const params = new URLSearchParams(searchParams);
  newSearchParams.forEach(([name, value]) => {
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
  });
  return pathname + "?" + params.toString();
}

export default setSearchParams;
