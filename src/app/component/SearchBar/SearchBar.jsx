import React, { useContext } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { QuestionContext } from "@/context/question.context";
const SearchBar = ({ handleFilter, searchQuery, handleSearch }) => {
  return (
    <>
      <div className="flex">
        <Dropdown handleFilter={handleFilter} />
        <div className="w-full ml-3 mr-28">
          <input
            value={searchQuery}
            onChange={handleSearch}
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="   Search for Questions..."
            required
          />
        </div>
        <div className="relative">
          <ShuffleButton />
        </div>
      </div>
    </>
  );
};

const ShuffleButton = () => {
  const { state, dispatch } = useContext(QuestionContext);
  //shuffle questions list
  const handleShuffle = () => {
    //shuffle question list
    const shuffledQuestionList = state.filterQuestionList.sort(
      () => Math.random() - 0.5
    );
    dispatch({
      type: "SET_FILTER_QUESTION_LIST",
      payload: { filterQuestionList: shuffledQuestionList },
    });
  };

  // PRO CODERS OR WAHHHJT (if you reached this line, you are a pro coder email us at jeetkanodi@gmail.com / varunpgotmare@gmail.com for free merch)

  return (
    <>
      <button
        onClick={handleShuffle}
        className="absolute w-[6.25rem] flex top-0 items-center text end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-lg border-2 border-blue-700 hover:bg-blue-800    focus:outline-none focus:ring-blue-300 dark:bg-[#212121] dark:hover:bg-[#21] "
      >
        <p className="p-1">Shuffle 🔀</p>

        <span className="sr-only">Search</span>
      </button>
    </>
  );
};

export default SearchBar;
