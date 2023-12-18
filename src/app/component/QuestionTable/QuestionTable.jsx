import React from "react";
import "./QuestionTable.css";
const QuestionTable = () => {
  return (
    <div className="mt-10 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="flex justify-around items-center text-gray-400 border-b border-gray-400 border-opacity-30 uppercase h-8">
            <th className="w-[12.5%] text-md  text-white">#</th>
            <th className="w-[50%] text-xs ml-2 text-white font-semi-bold">
              Title
            </th>
            <th className="text-xs w-[25%]  text-white">Album</th>

            <th className="w-[12.5%] text-white">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 1024 1024"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"></path>
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
              </svg>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            id={"check2"}
            className="flex justify-around items-center text-gray-400 m-2 font-mono hover:bg-gray-200 hover:bg-opacity-10 rounded-md py-2"
          >
            <td className="w-[12.5%] flex justify-center mr-2 items-center">
              2
            </td>
            <td className="ml-3 text-center w-[50%]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus non quibusdam blanditiis similique saepe dicta,
              amet incidunt obcaecati neque aperiam.
            </td>
            <td className="text-sm text-center w-[25%]">dadad Girl!</td>

            <td className="text-sm w-[12.5%]">
              <input
                type="checkbox"
                name={"check2"}
                onChange={(e) => {
                  const id = e.target.name;
                  const isChecked = e.target.checked;
                  const element = document.getElementById(id);
                  if (isChecked) {
                    element.classList.add("strikethrough");
                  } else {
                    element.classList.remove("strikethrough");
                  }
                }}
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </td>
          </tr>
          <tr
            id={"check"}
            className="flex justify-around items-center text-gray-400 m-2 font-mono hover:bg-gray-200 hover:bg-opacity-10 rounded-md py-2"
          >
            <td className="w-[12.5%] flex justify-center mr-2 items-center">
              2
            </td>
            <td className="ml-3 text-center w-[50%]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus non quibusdam blanditiis similique saepe dicta,
              amet incidunt obcaecati neque aperiam.
            </td>
            <td className="text-sm text-center w-[25%]">dadad Girl!</td>

            <td className="text-sm w-[12.5%]">
              <input
                type="checkbox"
                name={"check"}
                onChange={(e) => {
                  const id = e.target.name;
                  const isChecked = e.target.checked;
                  const element = document.getElementById(id);
                  if (isChecked) {
                    element.classList.add("strikethrough");
                  } else {
                    element.classList.remove("strikethrough");
                  }
                }}
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default QuestionTable;
