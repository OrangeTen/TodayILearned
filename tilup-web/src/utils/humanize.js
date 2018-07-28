import { locale } from "../consts/locale";


export function dateHumanize(rawDate) {
  let date = new Date(rawDate);

  return date.toLocaleString(locale);
}
