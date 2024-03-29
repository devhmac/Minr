"use client";
import { scrapeAndSaveProduct } from "@/lib/actions/actions";
import { Product } from "@/types";
import { Loader2 } from "lucide-react";
// import { redirect } from "next/navigation";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProgressBar from "./ui/ProgressBar";
import { searchIntentContext } from "@/context/SearchIntentContext";

const isValidAmazonLink = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    if (
      hostname.includes("amazon.com") ||
      hostname.includes("amazon.ca")
      // hostname.endsWith("amazon")
    ) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const SearchBar = () => {
  console.count("SearchBar Rerender");
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLinkValid, setIsLinkValid] = useState<boolean | null>(null);
  const [searchPrompt, setSearchPrompt] = useState<string>(
    searchParams.get("search") || ""
  );

  const { searchIntent, setSearchIntent } = useContext(searchIntentContext);

  const [isLoading, setIsloading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  let categoryActive = searchParams.get("category") ? true : false;

  //nasty robot regex for url prediction
  const urlPattern = /(?:\/{2,}|www\.|\.\w{2,})/;
  // if (categoryActive) setSearchIntent(false);

  useEffect(() => {
    if (!searchIntent && categoryActive && searchPrompt) {
      setSearchPrompt("");
      return;
    }

    const debounce = setTimeout(() => {
      console.log("category active inside of useeffect", categoryActive);
      console.log("search prompt in use effect", searchPrompt);

      if (searchIntent && searchPrompt !== "") {
        console.log(urlPattern.test(searchPrompt));
        const link = isValidAmazonLink(searchPrompt);
        if (
          link ||
          searchPrompt.includes("amazon.") ||
          urlPattern.test(searchPrompt)
        ) {
          setIsLinkValid(link!);
          console.log(isLinkValid);
          return;
        }
        router.push(`/?search=${encodeURIComponent(searchPrompt)}`, {
          scroll: false,
        });
      } else if (searchPrompt === "" && searchIntent) {
        setIsLinkValid(null);
        uploadProgress === 0
          ? router.push("/", {
              scroll: false,
            })
          : null;
        return;
      }
    }, 300);

    return () => {
      clearTimeout(debounce);
    };
  }, [searchPrompt, categoryActive, searchIntent]);

  // useEffect(() => {
  //   if (searchParams.get("category")) {
  //     setSearchPrompt("");
  //   }
  // }, [categoryActive]);

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
              setSearchIntent(true);
              setSearchPrompt(e.target.value);
              console.log(categoryActive);
              // setSearchIntent(true);
              // setSearchIntent(true);
            }}
            placeholder="Search for your product name, or enter a full amazon product link..."
            className="searchbar-input "
          />
        )}

        <div className="relative inline-flex group">
          {searchPrompt === "" || isLinkValid !== true ? null : (
            <div className="btn-gradient-bg"></div>
          )}
          <button
            title="Scrape your product"
            className="relative transition-all duration-200  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 searchbar-btn"
            disabled={searchPrompt === "" || isLinkValid !== true}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Scrape"
            )}
          </button>
        </div>
      </form>

      {searchPrompt !== "" && isLinkValid === false && (
        // searchPrompt !== "" &&
        <p
          className="mx-2 text-red-400 transition-opacity 
        duration-500 
        ease-out opacity-100"
        >
          <span className="underline">Link invalid:</span> Ensure the valid
          amazon link includes the prefix https://
        </p>
      )}
    </>
  );
};

export default SearchBar;
