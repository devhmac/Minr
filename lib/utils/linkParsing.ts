export const amazonAsinUrl = (url: string) => {
  const splitUrl = url.split("/");
  console.log(splitUrl);
  let asinFound = false;
  // const parsedUrl = splitUrl.map((val, i) => {
  //   console.log(val);
  //   if(

  // });

  const shortenedUrlpieces = [];

  for (let i = 0; i < splitUrl.length; i++) {
    shortenedUrlpieces.push(splitUrl[i]); //
    if (splitUrl[i - 1] === "dp") return;
  }
  return shortenedUrlpieces.join("/");
};

amazonAsinUrl("hello/this/is/test");
