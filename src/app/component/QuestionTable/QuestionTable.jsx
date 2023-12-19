import React, { use, useEffect, useState } from "react";
import "./QuestionTable.css";
import Link from "next/link";
const QuestionTable = ({ setSolvedQuestionLength, questionList, category }) => {
  const [hover, setHover] = useState([]);
  const [solvedQuestions, setSolvedQuestions] = useState([]);
  useEffect(() => {
    function fetchSolvedData() {
      fetch("/api/questions/fetchsolved", {
        method: "POST",
        body: JSON.stringify({ category: category, username: "terimummy" }),
      })
        .then((res) => res.json())
        .then((data) => {
          setSolvedQuestions(data?.solvedList);
          setSolvedQuestionLength(data?.solvedList.length);
          const handleInitalCheckbox = (question) => {
            const id = question.qid;
            const element = document.getElementById(id);
            if (data?.solvedList.includes(question.qid)) {
              console.log(question.qid);
              element.classList.add("strikethrough");
              element.childNodes[3].childNodes[0].checked = true;
            }
          };
          questionList.forEach((element) => {
            handleInitalCheckbox(element);
          });
        });
    }
    fetchSolvedData();
    const length = questionList?.length;
    const hover = new Array(length).fill(false);
    setHover(hover);
  }, []);

  // another useEffect to handle checkbox state
  useEffect(() => {
    const handleInitalCheckbox = (question) => {
      const id = question.qid;
      const element = document.getElementById(id);
      if (solvedQuestions.includes(question.qid)) {
        element.classList.add("strikethrough");
        element.childNodes[3].childNodes[0].checked = true;
      }
    };
    questionList.forEach((element) => {
      handleInitalCheckbox(element);
    });
  }, [questionList]);

  const handleHover = (index) => {
    const length = questionList.length;
    const newHover = new Array(length).fill(false);
    newHover[index] = !hover[index];
    setHover(newHover);
  };

  const handleCheckboxChange = (e) => {
    fetch("/api/questions/markquestion", {
      method: "POST",
      body: JSON.stringify({
        qid: e.target.name,
        category: category,
        username: "terimummy",
      }),
    });
    const id = e.target.name;
    const isChecked = e.target.checked;
    const element = document.getElementById(id);
    if (isChecked) {
      setSolvedQuestionLength((prev) => prev + 1);
      element.classList.add("strikethrough");
    } else {
      setSolvedQuestionLength((prev) => prev - 1);
      element.classList.remove("strikethrough");
    }
  };

  return (
    <div className="mt-10 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="flex justify-around items-center text-gray-400 border-b border-gray-400 border-opacity-30 uppercase h-8">
            <th className="w-[12.5%] text-md  text-white">#</th>
            <th className="w-[50%] text-xs ml-2 text-white font-semi-bold">
              Title
            </th>
            <th className="text-xs w-[25%]  text-white">Difficulty</th>

            <th className="w-[12.5%] text-white">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
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
          {questionList?.map((question, index) => (
            <tr
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={() => handleHover(index)}
              key={question.qid}
              id={question.qid}
              className="flex justify-around items-center text-gray-400 m-2 font-mono hover:bg-gray-200 hover:bg-opacity-10 rounded-md py-2"
            >
              <td className="w-[12.5%] flex justify-center  mr-2 items-center">
                {hover[index] ? (
                  <Link
                    target="_blank"
                    className="hover:text-blue-500"
                    href={question.link}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 16 16"
                      height="1.5em"
                      width="1.5em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 010 1.393z"></path>
                    </svg>
                  </Link>
                ) : (
                  <>{index + 1}</>
                )}
              </td>
              <td className="ml-3 text-center w-[50%]">
                <Link
                  target="_blank"
                  className="hover:text-blue-500"
                  href={question.link}
                >
                  {question.title}
                </Link>
              </td>
              <td className="text-sm text-center w-[25%]">
                {question.difficulty}
              </td>

              <td className="text-sm w-[12.5%]">
                <input
                  type="checkbox"
                  name={question.qid}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionTable;
