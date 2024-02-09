"use client";
import { scrapeAndSaveProduct } from "@/lib/actions/actions";
import { Product } from "@/types";
import { Loader2 } from "lucide-react";
// import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProgressBar from "./ui/ProgressBar";

const isValidAmazonLink = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    if (
      hostname.includes("amazon.com") ||
      hostname.includes("amazon.") ||
      hostname.endsWith("amazon")
    ) {
      return true;
    }
  } catch (error) {
    return false;
  }
};

const SearchBar = () => {
  const router = useRouter();

  const [isLinkValid, setIsLinkValid] = useState<boolean | null>(null);
  const [searchPrompt, setSearchPrompt] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [uploadProgress, setUploadProgress] = useState<number>(50);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchPrompt !== "") {
        setIsLinkValid(isValidAmazonLink(searchPrompt)!);
      } else {
        setIsLinkValid(null);
      }
    }, 200);

    return () => {
      clearTimeout(debounce);
    };
  }, [searchPrompt]);

  // for progress bar
  const startSimulatedProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 85) {
          clearInterval(interval);
          return prev;
        }
        return prev + 2;
      });
    }, 25);
    return interval;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidAmazonLink(searchPrompt);

    if (!isValidLink) {
      toast.error(
        "Sorry, the link was invalid. Please try again with a valid Amazon link",
        {
          position: "top-center",
          closeOnClick: true,
          pauseOnHover: true,
        }
      );
      return;
    }

    try {
      setIsloading(true);
      const progressInterval = startSimulatedProgress();
      //scrape linked product
      const productId: string = await scrapeAndSaveProduct(searchPrompt);
      setSearchPrompt("");

      console.log("in scrape submit try, before redirect");
      clearInterval(progressInterval);
      setUploadProgress(100);
      router.push(`/products/${productId}`);
    } catch (error) {
      console.log("--------- in search bars catch function -----------");
      console.log(error);
      toast.error(
        "Sorry, we were unable to scrape this link. Please confirm that it's valid and try again.",
        {
          position: "top-center",
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        }
      );
    } finally {
      setIsloading(false);
    }
  };

  return (
    <>
      <form className="flex flex-wrap gap-4 mt-12 " onSubmit={handleSubmit}>
        {isLoading ? (
          <ProgressBar progress={uploadProgress} />
        ) : (
          <input
            type="text"
            value={searchPrompt}
            onChange={(e) => {
              setSearchPrompt(e.target.value);
            }}
            placeholder="Enter your product link to get started..."
            className="searchbar-input "
          />
        )}

        <button
          type="submit"
          className="searchbar-btn"
          disabled={searchPrompt === "" || isLinkValid !== true}
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
          {/* <ProgressBar progress={uploadProgress} /> */}
        </button>
      </form>

      {searchPrompt !== "" && isLinkValid === false && (
        // searchPrompt !== "" &&
        <p
          className="mx-2 text-red-400 transition-opacity 
        duration-500 
        ease-out opacity-100"
        >
          <span className="underline">Link invalid:</span> Sorry, we are
          currently only scraping valid amazon product links
        </p>
      )}
    </>
  );
};

export default SearchBar;
