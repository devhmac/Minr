export const amazonAsinUrl = (url: string) => {
  const splitUrl = url.split("/");
  const shortenedUrlpieces = [];

  for (let i = 0; i < splitUrl.length; i++) {
    // console.log(splitUrl[i]);
    // console.log(shortenedUrlpieces);
    shortenedUrlpieces.push(splitUrl[i]); //
    if (splitUrl[i - 1] === "dp") return shortenedUrlpieces.join("/");
  }

  return shortenedUrlpieces.join("/");
};
