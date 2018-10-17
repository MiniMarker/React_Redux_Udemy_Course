import React from "react";
import {connect} from "react-redux";
import selectExpenses from "../selectors/expenses";
import selectExpensesTotal from "../selectors/expenses-total";
import numeral from "numeral";

export const ExpenseSummary = ({expensesCount, totalAmount}) => (

	<div>
		<p>
			{
				`Showing ${expensesCount} ${expensesCount === 1 ? "expense" : "expenses"} totalling ${numeral(totalAmount / 100).format("$0,0.00")}`
			}
		</p>
	</div>
);

const mapStateToProps = (state) => {

	const visibleExpenses = selectExpenses(state.expenses, state.filters);

	return {
		expensesCount: visibleExpenses.length,
		totalAmount: selectExpensesTotal(visibleExpenses)
	};
};

export default connect(mapStateToProps)(ExpenseSummary);