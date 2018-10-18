import React from "react";
import {connect} from "react-redux";
import ExpenseForm from "./ExpenseForm";
import {startEditExpense, startRemoveExpense} from "../actions/expenses";

export class EditExpensePage extends React.Component {

	onSubmit = (updatedExpense) => {
		this.props.startEditExpense(this.props.expense.id, updatedExpense);
		this.props.history.push("/");
	};

	onDelete = () => {
		this.props.startRemoveExpense({id: this.props.expense.id});
		this.props.history.push("/");
	};


	render() {
		return (
			<div>
				<h1>EditExpensePage</h1>
				<ExpenseForm
					expense={this.props.expense}
					onSubmit={this.onSubmit}
				/>

				<button
					onClick={this.onDelete}
				>
					Remove
				</button>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
		startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
	}
};


const mapStateToProps = (state, props) => {
	return {
		expense: state.expenses.find((expense) => expense.id === props.match.params.id)
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
