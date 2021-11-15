import { Component } from "react";
import { v4 as uuidv4 } from 'uuid';

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

import "./app.scss";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{ name: 'John Cina', salary: 300, increase: true, promotion: true, id: 1 },
				{ name: 'Sherlock Holmes', salary: 15000, increase: false, promotion: false, id: 2 },
				{ name: 'Doctor Whatson', salary: 700, increase: false, promotion: false, id: 3 },
			],
			term: '',
			filter: 'all'
		}
		this.maxId = this.state.data.length;
	}
	addItem = (name, salary) => {
		const newItem = {
			name,
			salary,
			increase: false,
			promotion: false,
			id: uuidv4()
		}
		this.setState(({ data }) => {
			const newArr = [...data, newItem];
			return {
				data: newArr
			}
		})
	}

	deleteItem = (id) => {
		this.setState(({ data }) => ({
			data: data.filter(item => item.id !== id)
		}))
	}

	onToggleProp = (id, prop) => {
		this.setState(({ data }) => ({
			data: data.map(item => {
				if (item.id === id) {
					return { ...item, [prop]: !item[prop] }
				}
				return item
			})
		}))
	}

	searchEmp = (items, term) => {
		if (term.length === 0) {
			return items
		}
		return items.filter(item => {
			return item.name.indexOf(term) > -1
		})
	}
	filterEmp = (items, filter) => {
		switch (filter) {
			case 'promotion':
				return items.filter(item => item.promotion);
			case 'salary':
				return items.filter(item => item.salary > 1000);
			default:
				return items;
		}
	}
	onUpdateSearch = (term) => {
		this.setState({ term });
	}
	onUpdateFilter = (filter) => {
		this.setState({ filter });
	}
	onChangeSalary = (id, salary) => {
		this.setState(({ data }) => ({
			data: data.map(item => {
				if (item.id === id) {
					return { ...item, salary }
				}
				return item
			})
		}))
	}
	render() {
		const { data, term, filter } = this.state;
		const employees = data.length;
		const increased = data.filter(item => item.increase).length;
		const visibleData = this.filterEmp(this.searchEmp(data, term), filter);
		return (
			<div className="app">
				<AppInfo employees={employees} increased={increased} />

				<div className="search-panel">
					<SearchPanel onUpdateSearch={this.onUpdateSearch} />
					<AppFilter onUpdateFilter={this.onUpdateFilter} filter={filter} />
				</div>
				<EmployeesList
					data={visibleData}
					onDelete={this.deleteItem}
					onToggleProp={this.onToggleProp}
					onChangeSalary={this.onChangeSalary}
				/>
				<EmployeesAddForm addItem={this.addItem} />
			</div>
		);
	}
}
export default App;