import { useEffect, useState } from "react";
import api from "../api/axios";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");

  // form state
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  // fetch expenses
  const fetchExpenses = async () => {
    try {
      const response = await api.get("expenses/");
      setExpenses(response.data);
    } catch (err) {
      setError("Failed to load expenses");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // create expense
  const handleAddExpense = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("expenses/", {
        title,
        amount,
        category,
        date,
      });

      // clear form
      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");

      // refresh list
      fetchExpenses();
    } catch (err) {
      setError("Failed to add expense");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/";
  };

  return (
    <div className="page">
      <header>
        <div className="container flex-between">
          <h1>My Expenses</h1>
          <button className="btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <section className="section">
        <div className="container grid">
          {/* ADD EXPENSE FORM */}
          <div className="card">
            <h3>Add Expense</h3>

            {error && <p className="text-error">{error}</p>}

            <form className="grid expense-form" onSubmit={handleAddExpense}>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border"
                required
              />

              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border"
                required
              />

              <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border"
                required
              />

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border"
                required
              />

              <button className="btn-primary">Add Expense</button>
            </form>
          </div>

          {/* EXPENSE LIST */}
          <div className="grid">
            {expenses.length === 0 && (
              <p className="text-muted">No expenses yet</p>
            )}

            {expenses.map((expense) => (
              <div key={expense.id} className="card">
                <h3>{expense.title}</h3>
                <p>₹ {expense.amount}</p>
                <p className="text-muted">{expense.category}</p>
                <p className="text-muted">{expense.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Expenses;
