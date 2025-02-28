'use client'
import { SearchBar } from "./searchBar";
import { useRouter } from "next/navigation";
import { memo } from "react";

const Toolbar = memo(() => {
    const router = useRouter();
    
    return (
      <div className="flex justify-center w-full mb-4 space-x-10 ">
        <SearchBar />
        <button 
          onClick={() => router.push("/create")} 
          className="whitespace-nowrap inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm border-purple-200 hover:bg-purple-50 text-purple-700 hover:text-purple-800"
        >
          Create Note
        </button>
      </div>
    );
});
Toolbar.displayName = "Toolbar";

export default Toolbar;