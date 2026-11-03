import { BrowserRouter, Route, Routes } from "react-router";
import StudentDetail from "./modules/students/pages/StudentDetail";
import StudentList from "./modules/students/pages/StudentList";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/students/new" element={<StudentDetail />} />
        <Route path="/students/:id" element={<StudentDetail />} />
        <Route path="/student/:id" element={<StudentDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
