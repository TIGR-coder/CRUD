import { Component } from "react";
import "./employees-list-item.css";

class EmployeesListItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentSalary: this.props.salary
		}
	}
	onChangeSalary = (e) => {
		this.setState({ currentSalary: parseInt(e.target.value) });
		this.props.onChangeSalary(e);
	}
	render() {
		console.log(this.props.id);
		const { name, onDelete, onToggleProp, increase, promotion } = this.props;
		const { currentSalary } = this.state;
		let classes = "list-group-item d-flex justify-content-between";
		if (increase) {
			classes += " increase";
		}
		if (promotion) {
			classes += " like";
		}
		return (
			<li className={classes}>
				<span
					onClick={onToggleProp}
					data-toggle="promotion"
					className="list-group-item-label">{name}</span>
				<input
					type="text"
					className="list-group-item-input"
					defaultValue={currentSalary + '$'}
					onChange={this.onChangeSalary} />
				<div className='d-flex justify-content-center align-items-center'>
					<button type="button"
						className="btn-cookie btn-sm "
						data-toggle="increase"
						onClick={onToggleProp}>
						<i className="fas fa-cookie"></i>
					</button>
					<button type="button"
						className="btn-trash btn-sm "
						onClick={onDelete}>
						<i className="fas fa-trash"></i>
					</button>
					<i className="fas fa-star"></i>
				</div>
			</li>
		);
	}
}
export default EmployeesListItem;