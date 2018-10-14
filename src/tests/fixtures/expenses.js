import moment from "moment";

export default [{
	id: '1',
	description: 'Gum',
	amount: 195,
	note: '',
	createdAt: 0
}, {
	id: '2',
	description: 'Rent',
	amount: 1000,
	note: '',
	createdAt: moment(0).subtract(4, 'days')
}, {
	id: '3',
	description: 'Credit Card',
	amount: 4500,
	note: '',
	createdAt: moment(0).add(4, 'days')
}];