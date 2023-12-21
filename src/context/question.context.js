"use client";
import React, { useEffect, createContext, useReducer } from "react";

const initialState = {
  questionList: [1, 2, 3],
  filterQuestionList: [1, 2, 3],
  category: "null",
  solvedQuestionList: [1, 2, 3],
  categoryList: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_INITAL_STATE":
      return {
        ...state,
        questionList: action.payload.questionList,
        category: action.payload.category,
        filterQuestionList: action.payload.questionList,
      };
    case "SET_SOLVED_QUESTION_LIST":
      return {
        ...state,
        solvedQuestionList: action.payload.solvedQuestionList,
      };
    case "SET_FILTER_QUESTION_LIST":
      return {
        ...state,
        filterQuestionList: action.payload.filterQuestionList,
      };
    case "SET_CATEGORYLIST":
      console.log(state);
      return {
        ...state,
        categoryList: action.payload.categoryList,
      };
    default:
      return state;
  }
};

export const QuestionContext = createContext({
  state: initialState,
  dispatch: () => {},
});

export const QuestionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    console.log("fetching data");
    function fetchData() {
      fetch("/api/questions")
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            const categoryList = data?.questions;
            dispatch({
              type: "SET_CATEGORYLIST",
              payload: {
                categoryList,
              },
            });
          }
        });
    }
    fetchData();
  }, []);
  return (
    <QuestionContext.Provider value={{ state, dispatch }}>
      {children}
    </QuestionContext.Provider>
  );
};
