import React 		from 'react'
import TodoList 	from './TodoList'
import TodoStore 	from '../stores/TodoStore'
import {addTodo} 	from '../actions/TodoActions'
import './todo.css'

let TodoInput = React.createClass({
	handleNewInput(e) {
		let {value} = e.target;	
		if (e.keyCode == 13 && e.target.value) {
			e.target.value = '';
			TodoStore.dispatch(addTodo(value));
		}
	},
	render () {
		return (
			<div>
				<input name='newTodo' type='text' onKeyDown={this.handleNewInput}/>
			</div>
		)
	}
})

let TodoApp = React.createClass({
	getInitialState() {
		return {}
	},
	render() {
		return (
			<div>
				<TodoInput />
				<TodoList />
			</div>
		)
	}
});

export default TodoApp;