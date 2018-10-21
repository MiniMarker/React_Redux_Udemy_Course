import React from "react";
import moment from "moment";
import {SingleDatePicker} from "react-dates";

//const date = new Date();
// const now = moment();
// console.log(now.format("MMM Do, YYYY"));

export default class ExpenseForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			description: props.expense ? props.expense.description : '',
			note: props.expense ? props.expense.note : '',
			amount: props.expense ? (props.expense.amount / 100).toString() : '',
			createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
			calendarFocused: false,
			errorMessage: '',
			buttonText: props.expense ? "Apply" : "Create"
		};
	}

	onDescriptionChange = (e) => {
		const input = e.target.value;
		this.setState(() => ({
			description: input
		}));
	};

	onNoteChange = (e) => {
		const input = e.target.value;
		this.setState(() => ({
			note: input
		}));
	};

	onAmountChange = (e) => {
		const amount = e.target.value;
		const regex = /^\d{1,}(\.\d{0,2})?$/;

		//use regex.test(<value>) instead of amount.match(<regex>)
		if (!amount || regex.test(amount) ) {
			this.setState(() => ({
				amount
			}));
		}
	};

	/*
	*   DATE!!
	* */

	onDateChange = (createdAt) => {
		if (createdAt) {
			this.setState(() => ({
				createdAt
			}));
		}
	};

	onFocusChange = ({ focused }) => {
		this.setState(() => ({ calendarFocused: focused }));
	};

	/*
	*   SUBMIT
	*/
	onSubmit = (e) => {
		e.preventDefault();

		if (!this.state.description || !this.state.amount) {

			this.setState(() => ({
				errorMessage: 'Please provide description and amount.'
			}));

		} else {

			this.setState(() => ({
				errorMessage: ''
			}));

			this.props.onSubmit({
				description: this.state.description,
				amount: parseFloat(this.state.amount, 10) * 100,
				createdAt: this.state.createdAt.valueOf(),
				note: this.state.note
			});
		}
	};

	render() {
		return (
			<div>
				{this.state.errorMessage && <p>{this.state.errorMessage}</p>}
				<form onSubmit={this.onSubmit}>
					<input
						type={"text"}
						placeholder={"Description"}
						autoFocus={true}
						value={this.state.description}
						onChange={this.onDescriptionChange}
					/>

					<input
						type={"text"}
						placeholder={"Amount"}
						value={this.state.amount}
						onChange={this.onAmountChange}
					/>

					<SingleDatePicker
						date={this.state.createdAt}
						onDateChange={this.onDateChange}
						focused={this.state.calendarFocused}
						onFocusChange={this.onFocusChange}
						numberOfMonths={1}
						isOutsideRange={() => false}
					/>

					<textarea
						placeholder={"Add a note for your expense (optional)"}
						value={this.state.note}
						onChange={this.onNoteChange}
					/>

					<button id={"submit-btn"} type={"submit"}>{this.state.buttonText}</button>
				</form>
			</div>
		);
	}
}

//make the change
