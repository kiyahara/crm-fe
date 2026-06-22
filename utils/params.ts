import { Params } from "@/types";

export function generateSearchParams({
  name,
  page,
  pageSize,
  num,
  offset,
  elements,
  sets,
  effect,
  stats,
  legality_format,
  legality_state,
}: Params): string {
  const result: string[] = [];
  if (
    !name &&
    !page &&
    !pageSize &&
    !num &&
    !offset &&
    !elements &&
    !sets &&
    !effect &&
    !stats &&
    !legality_format &&
    !legality_state
  ) {
    return "";
  }

  if (name) {
    result.push(`name=${name}`);
  }
  if (page) {
    result.push(`page=${page}`);
  }
  if (pageSize) {
    result.push(`page_size=${pageSize}`);
  }
  if (num) {
    result.push(`num=${num}`);
  }
  if (offset) {
    result.push(`offset=${offset}`);
  }
  if (elements && elements?.length > 0) {
    elements.map((value) => result.push(`element=${value}`));
  }
  if (sets && sets?.length > 0) {
    sets.map((value) => result.push(`prefix=${value}`));
  }
  if (effect) {
    result.push(`effect=${effect}`);
  }
  if (stats) {
    result.push(`stats=${stats}`);
  }
  if (legality_format) {
    result.push(`legality_format=${legality_format}`);
  }
  if (legality_state) {
    result.push(`legality_state=${legality_state}`);
  }

  return result.join("&");
}
