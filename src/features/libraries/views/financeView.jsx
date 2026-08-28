// Scholar's Ledger operations views: people records now support search, status filtering, validated edits, and protected deletion.
import { Download, Plus, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

// internal imports
import SysPanel from "../components/panel.jsx";
import { money, SlimMetrics } from "../lib/utils.js";
import { TransactionForm } from "../components/forms/transactionForm.jsx";

export default function FinancesView({
  data,
  onNotice,
  mutations,
  selectedLibrary,
  onDownloadTransactionReceipt,
}) {
  const [transactionFormOpen, setTransactionFormOpen] = useState(false);
  const income = data.transactions
    .filter(transaction => transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const expenses = data.transactions
    .filter(transaction => transaction.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const categories = data.transactions.filter(
    transaction => transaction.type === "income"
  );
  const peak = Math.max(
    ...categories.map(transaction => transaction.amount),
    1
  );

  function createTransaction(values, callbacks = {}) {
    mutations.createTransaction.mutate(values, {
      onSuccess: transaction => {
        onNotice(
          `${transaction.description} was posted to the financial ledger.`
        );
        onDownloadTransactionReceipt(transaction);
        callbacks.onSuccess?.(transaction);
      },
      onError: callbacks.onError,
    });
  }

  return (
    <div className="page">
      <SlimMetrics
        items={[
          { label: "Income", value: money.format(income), tone: "sage-text" },
          { label: "Expenses", value: money.format(expenses) },
          {
            label: "Net result",
            value: money.format(income - expenses),
            tone: income >= expenses ? "sage-text" : "danger-text",
          },
        ]}
      />
      <div className="finance-grid">
        <SysPanel
          title="Monthly operating trend"
          meta="Income and expenditure across the current cycle."
          action={
            <button className="icon-action" aria-label="Finance filters">
              <SlidersHorizontal size={18} />
            </button>
          }
        >
          <div className="bar-chart">
            <div className="chart-key">
              <span>
                <i className="income-dot" /> Income
              </span>
              <span>
                <i className="expense-dot" /> Expenses
              </span>
            </div>
            <div className="bars">
              {data.monthly.map(entry => (
                <div className="month-bar" key={entry.month}>
                  <div className="bar-pair">
                    <i
                      className="income-bar"
                      style={{ height: `${(entry.income / 57070) * 100}%` }}
                    />
                    <i
                      className="expense-bar"
                      style={{ height: `${(entry.expenses / 57070) * 100}%` }}
                    />
                  </div>
                  <span>{entry.month}</span>
                </div>
              ))}
            </div>
          </div>
        </SysPanel>
        <SysPanel title="Income sources" meta="Current month by category.">
          <div className="category-list">
            {categories.map(transaction => (
              <div key={transaction.id}>
                <span>
                  <strong>{transaction.category}</strong>
                  <small>{money.format(transaction.amount)}</small>
                </span>
                <i>
                  <b
                    style={{ width: `${(transaction.amount / peak) * 100}%` }}
                  />
                </i>
              </div>
            ))}
          </div>
        </SysPanel>
      </div>
      <SysPanel
        title="Transaction ledger"
        meta="The newest financial records within the selected scope."
        action={
          <div className="heading-actions">
            <button
              className="secondary-button compact"
              onClick={() =>
                onNotice(
                  "Export will be enabled when the connected backend can generate a ledger file."
                )
              }
            >
              <Download size={15} /> Export
            </button>
            <button
              className="primary-button compact"
              onClick={() => setTransactionFormOpen(true)}
            >
              <Plus size={15} /> Add entry
            </button>
          </div>
        }
      >
        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Category</th>
                <th>Date</th>
                <th>Direction</th>
                <th>Amount</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {data.transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>
                    <strong>{transaction.description}</strong>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{transaction.date}</td>
                  <td>
                    <span className={`direction ${transaction.type}`}>
                      {transaction.type === "income" ? "+ Income" : "− Expense"}
                    </span>
                  </td>
                  <td
                    className={
                      transaction.type === "income" ? "sage-text" : "ink-text"
                    }
                  >
                    {transaction.type === "income" ? "+" : "−"}
                    {money.format(transaction.amount)}
                  </td>
                  <td>
                    <button
                      className="row-action"
                      onClick={() => onDownloadTransactionReceipt(transaction)}
                    >
                      Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SysPanel>

      <TransactionForm
        open={transactionFormOpen}
        onOpenChange={setTransactionFormOpen}
        libraries={data.libraries}
        selectedLibrary={selectedLibrary}
        onCreate={createTransaction}
        pending={mutations.createTransaction.isPending}
      />
    </div>
  );
}
