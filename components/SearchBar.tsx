"use client";
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidAmazonLink(searchPrompt);
    isValidLink ? toast("wow its good") : toast("baaad link");
  };

  return (
    <>
      <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchPrompt}
          onChange={(e) => {
            setSearchPrompt(e.target.value);
          }}
          placeholder="Enter your Product Link"
          className="searchbar-input"
        />
        <button type="submit" className="searchbar-btn">
          Search
        </button>
      </form>
    </>
  );
};

export default SearchBar;
