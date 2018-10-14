import React from "react";
import {connect} from "react-redux";
import {DateRangePicker} from "react-dates";
import {
	setEndDate,
	setStartDate,
	setTextFilter,
	sortByAmount,
	sortByDate
} from "../actions/filters";

export class ExpenseListFilters extends React.Component {
	state = {
		calendarFocused: null
	};

	onDatesChange = ({startDate: newStartDate, endDate: newEndDate}) => {
		this.props.setStartDate(newStartDate);
		this.props.setEndDate(newEndDate);
	};

	onFocusChange = (calendarFocused) => {
		this.setState(() => ({
			calendarFocused
		}));
	};

	onTextChange = (e) => {
		this.props.setTextFilter(e.target.value);
	};

	onSortChange = (e) => {
		e.target.value === "date"
			? this.props.sortByDate()
			: this.props.sortByAmount();
	};

	render() {
		return (
			<div>
				<input
					type={"text"}
					value={this.props.filters.text}
					onChange={this.onTextChange}
				/>

				<select
					value={this.props.filters.sortBy}
					onChange={this.onSortChange}
				>
					<option value={"date"}>Date</option>
					<option value={"amount"}>Amount</option>
				</select>

				<DateRangePicker
					startDate={this.props.filters.startDate}
					endDate={this.props.filters.endDate}
					onDatesChange={this.onDatesChange}
					focusedInput={this.state.calendarFocused}
					onFocusChange={this.onFocusChange}
					numberOfMonths={1}
					isOutsideRange={() => false}
					showClearDates={true}
				/>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setTextFilter: (text) => dispatch(setTextFilter(text)),
		sortByDate: () => dispatch(sortByDate()),
		sortByAmount: () => dispatch(sortByAmount()),
		setStartDate: (startDate) => dispatch(setStartDate(startDate)),
		setEndDate: (endDate) => dispatch(setEndDate(endDate))
	}
};

// To access state i need to map the state and add it as a param to connect
const mapStateToProps = (state) => {
	return {
		filters: state.filters
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
