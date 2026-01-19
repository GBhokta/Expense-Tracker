import Expenses from "./pages/Expenses";
import Login from "./pages/Login";

function App() {
  const token = localStorage.getItem("accessToken");
  return token ? <Expenses /> : <Login />;
}

export default App;
