import { formatMoney } from "../utils/format-money";
import { useEntries } from "../hooks/useEntries";

export default function ExpenseList() {
  const { entries, setEntries } = useEntries();
  const expenseEntries = entries.filter((entry) => entry.type === "expense");

  const handleEdit = (expense) => {
    const inputValue = window.prompt("Enter new value:", formatMoney(expense.value));

    if (inputValue !== null) {
      const newValue = parseFloat(inputValue.replace(",", ""));
      if (!isNaN(newValue)) {
        setEntries((prevEntries) =>
          prevEntries.map((entry) =>
            entry.id === expense.id ? { ...entry, value: newValue } : entry
          )
        );
      } else {
        alert("Invalid input.");
      }
    }
  };

  const handleDelete = (expense) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this entry?");

    if (isConfirmed) {
      setEntries((prevEntries) =>
        prevEntries.filter((entry) => entry.id !== expense.id)
      );
    }
  };

  return (
    <div>
      <h2 className="border-b pb-2 font-medium text-red-600">Expense</h2>

      {expenseEntries.length === 0 && (
        <p className="py-2.5 text-gray-600">There are no expenses.</p>
      )}

      <ul id="expense-list" className="divide-y">
        {expenseEntries.map((expense) => {
          return (
            <li key={expense.id} className="py-2.5">
              <div className="group flex justify-between gap-2 text-sm">
                <span>{expense.title}</span>
                <div>
                  <span className="text-red-600">
                    -{formatMoney(expense.value)}
                  </span>
                  <span
                    className="ml-2 hidden cursor-pointer font-medium text-blue-500 group-hover:inline-block"
                    onClick={() => handleEdit(expense)}
                  >
                    Edit
                  </span>
                  <span
                    className="ml-2 hidden cursor-pointer font-medium text-red-500 group-hover:inline-block"
                    onClick={() => handleDelete(expense)}
                  >
                    Delete
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}





