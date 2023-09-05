import SanityImage from "./sanity-image";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function NextImage(props: any) {
  const { value, alt } = props;
  return (
    <SanityImage
      image={value}
      className={"mx-auto object-cover rounded-md my-8 w-full overflow-hidden "}
      alt={alt || "article image"}
    ></SanityImage>
  );
}
export default NextImage;
