export function dateHumanize(rawDate) {
  let date = new Date(rawDate);

  return date.toLocaleString("ko-KR");
}
