"use client";
import { scrapeAndSaveProduct } from "@/lib/actions/actions";
import { Product } from "@/types";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
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
  const [searchPrompt, setSearchPrompt] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidAmazonLink(searchPrompt);

    !isValidLink &&
      // ? toast("wow its good")
      toast.error(
        "Sorry, the link was invalid. Please try again with a valid Amazon link",
        {
          position: "top-center",
          closeOnClick: true,
          pauseOnHover: true,
          // className: "border-2px border-red-200",
        }
      );

    try {
      setIsloading(true);
      //scrape linked product
      const productId: string = await scrapeAndSaveProduct(searchPrompt);
      setSearchPrompt("");
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
          }}
          placeholder="Enter your product link to get started..."
          className="searchbar-input "
        />
        <button
          type="submit"
          className="searchbar-btn"
          disabled={searchPrompt === ""}
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
        </button>
      </form>
    </>
  );
};

export default SearchBar;
