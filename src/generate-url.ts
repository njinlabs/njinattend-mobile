export default function generateUrl(url: string) {
  if (url.match(/^(http:\/\/|https:\/\/)/)) {
    return url;
  }

  return `${process.env.EXPO_PUBLIC_API_URL || "http://localhost:3333"}${url}`;
}
