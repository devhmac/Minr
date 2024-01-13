"use client";
import { scrapeAndSaveProduct } from "@/lib/actions/actions";
import { Product } from "@/types";
import { Loader2 } from "lucide-react";
// import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const [isLinkValid, setIsLinkValid] = useState<boolean>(false);
  const [searchPrompt, setSearchPrompt] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);

  const handleInputChange = (url: string) => {
    setIsLinkValid(isValidAmazonLink(url)!);
  };

  const debounce = (fn: any, delay: number) => {
    let timerId: any;
    return (...args: any) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => fn(...args), delay);
    };
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      console.log("from inside UE", searchPrompt);
      setIsLinkValid(isValidAmazonLink(searchPrompt)!);
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [searchPrompt]);

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
          // className: "border-2px border-red-200",
        }
      );
      return;
    }
    // ? toast("wow its good")

    try {
      setIsloading(true);
      //scrape linked product
      const productId: string = await scrapeAndSaveProduct(searchPrompt);
      setSearchPrompt("");

      router.push(`/products/${productId}`);
      // redirect(`/products/${productId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <>
      <form className="flex flex-wrap gap-4 mt-12 " onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchPrompt}
          onChange={(e) => {
            setSearchPrompt(e.target.value);
            // console.log("state", searchPrompt);
            // console.log("targetval", e.target.value);

            // handleInputChange(e.target.value);
          }}
          placeholder="Enter your product link to get started..."
          className="searchbar-input "
        />

        <button
          type="submit"
          className="searchbar-btn"
          disabled={searchPrompt === "" || !isLinkValid}
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
        </button>
      </form>
      {searchPrompt !== "" && !isLinkValid && (
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
