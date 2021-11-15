import { Component } from "react";
import EmployeesListItem from "../employees-list-item/employees-list-item";
import "./employees-list.css";

class EmployeesList extends Component {
	render() {
		const { data, onDelete, onToggleProp, onChangeSalary } = this.props
		const elements = data.map((item) => {
			const { id, ...props } = item;
			return (
				<EmployeesListItem
					key={id}
					{...props}
					onDelete={() => onDelete(id)}
					onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}
					onChangeSalary={(e) => onChangeSalary(id, parseInt(e.currentTarget.value))} />
			);
		});

		return (
			<ul className="app-list list-group">
				{elements}
			</ul>
		);
	}
}
export default EmployeesList;