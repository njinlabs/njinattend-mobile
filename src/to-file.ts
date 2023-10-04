export default function toFile(uri: string, name: string, type: string): File {
  return {
    uri,
    type,
    name: "camera.jpg",
  } as unknown as File;
}
