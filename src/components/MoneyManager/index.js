import {Component} from 'react'
import {v4 as uniqueId} from 'uuid'

import TransactionItem from '../TransactionItem'
import MoneyDetails from '../MoneyDetails'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionsList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state
    const updatedTransactionList = transactionsList.filter(
      eachTrans => id !== eachTrans.id,
    )
    this.setState({transactionsList: updatedTransactionList})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTrans => eachTrans.optionId === optionId,
    )
    const {displayText} = typeOption
    const newTransaction = {
      id: uniqueId(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(preState => ({
      transactionsList: [...preState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  getExpenses = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0

    transactionsList.forEach(eachTrans => {
      if (eachTrans.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTrans.amount
      }
    })
    return expensesAmount
  }

  getIncome = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0
    transactionsList.forEach(eachTrans => {
      if (eachTrans.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTrans.amount
      }
    })
    return incomeAmount
  }

  getBalance = () => {
    const {transactionsList} = this.state
    let balanceAmount = 0
    let expensesAmount = 0
    let incomeAmount = 0

    transactionsList.forEach(eachTrans => {
      if (eachTrans.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTrans.amount
      } else {
        expensesAmount += eachTrans.amount
      }
    })
    balanceAmount = incomeAmount - expensesAmount
    return balanceAmount
  }

  render() {
    const {titleInput, amountInput, optionId, transactionsList} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()
    return (
      <div className="app-container">
        <div className="profile-container">
          <h1 className="user-name">Hi, Richard</h1>
          <p className="description">
            Welcome back to your
            <span className="money-manager"> Money Manager</span>
          </p>
        </div>
        <MoneyDetails
          balanceAmount={balanceAmount}
          incomeAmount={incomeAmount}
          expensesAmount={expensesAmount}
        />

        <div className="transaction-details">
          <form className="transaction-form" onSubmit={this.onAddTransaction}>
            <h1 className="transaction-header">Add Transaction</h1>
            <label htmlFor="title" className="input-label">
              TITLE
            </label>
            <input
              type="text"
              id="title"
              value={titleInput}
              className="input"
              placeholder="TITLE"
              onChange={this.onChangeTitleInput}
            />
            <label htmlFor="amount" className="input-label">
              AMOUNT
            </label>
            <input
              className="input"
              id="amount"
              type="text"
              value={amountInput}
              onChange={this.onChangeAmountInput}
              placeholder="AMOUNT"
            />
            <label htmlFor="select" className="input-label">
              TYPE
            </label>
            <select
              id="select"
              className="input"
              value={optionId}
              onChange={this.onChangeOptionId}
            >
              {transactionTypeOptions.map(eachOpt => (
                <option key={eachOpt.optionId} value={eachOpt.optionId}>
                  {eachOpt.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="button">
              Add
            </button>
          </form>

          <div className="history-transactions">
            <h1 className="transaction-header">History</h1>
            <div className="transaction-table-container">
              <ul className="transactions-table">
                <li className="table-header">
                  <p className="table-header-cell">Title</p>
                  <p className="table-header-cell">Amount</p>
                  <p className="table-header-cell">Type</p>
                </li>
                {transactionsList.map(eachTrans => (
                  <TransactionItem
                    key={eachTrans.id}
                    transactionDetails={eachTrans}
                    deleteTransaction={this.deleteTransaction}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
