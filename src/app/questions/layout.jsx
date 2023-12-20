import { QuestionContextProvider } from "@/context/question.context";

const Layout = ({ children }) => {
  return (
    <QuestionContextProvider>
      <div>{children}</div>
    </QuestionContextProvider>
  );
};

export default Layout;
