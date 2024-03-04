"use client";
import { scrapeAndSaveProduct } from "@/lib/actions/actions";
import { Product } from "@/types";
import { Loader2 } from "lucide-react";
// import { redirect } from "next/navigation";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
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
  const searchParams = useSearchParams();

  const [isLinkValid, setIsLinkValid] = useState<boolean | null>(null);
  const [searchPrompt, setSearchPrompt] = useState<string>(
    searchParams.get("search") || ""
  );
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchPrompt !== "") {
        const link = isValidAmazonLink(searchPrompt);
        // setIsLinkValid(link!);

        link === false && searchPrompt.includes("amazon.c")
          ? setIsLinkValid(link!)
          : router.push(`/?search=${encodeURIComponent(searchPrompt)}`, {
              scroll: false,
            });
      } else {
        setIsLinkValid(null);
        uploadProgress === 0
          ? router.push("/", {
              scroll: false,
            })
          : null;
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
      clearInterval(progressInterval);
      setUploadProgress(100);
      router.push(`/products/${productId}`);
    } catch (error: any) {
      console.log("--------- in search bars catch function -----------");
      console.log(error);
      toast.error(
        // "Sorry, we were unable to scrape this link. Please confirm that it's valid and try again."
        error.message,
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
            placeholder="Search for your product name, or enter a full amazon product link..."
            className="searchbar-input "
          />
        )}

        <div className="relative inline-flex group">
          <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r  from-primary via-[#ff44ecb6] to-[#44BCFF]  rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>

          <button
            title="Get quote now"
            className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-lowEmph font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 border-lowEmph border-2"
            role="button"
            disabled={true}
          >
            Scrape
          </button>
        </div>

        {/* <button
          type="submit"
          className="searchbar-btn "
          disabled={searchPrompt === "" || isLinkValid !== true}
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Scrape"}
        </button> */}
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
