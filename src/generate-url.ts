export default function generateUrl(url: string) {
  if (url.match(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/)) {
    return url;
  }

  return `${process.env.EXPO_PUBLIC_API_URL || "http://localhost:3333"}${url}`;
}
