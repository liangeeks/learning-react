import React 		from 'react'
import TodoStore 	from '../stores/TodoStore'
import {done as actionDone, undo, closeTodo} 	from '../actions/TodoActions'

let TodoItem = React.createClass({
	render() {
		let {todo, index} = this.props;
		let {text, done} = todo;
		let style = {};
		if (done) {
			style.textDecoration = "line-through"
		}
		return (
			<li style={style} className={done ? 'done' : ''}>
				<input type="checkbox" checked={done} onChange={(e)=> e.target.checked ? TodoStore.dispatch(actionDone(index)) : TodoStore.dispatch(undo(index))}/>
				{text} 
				<button className='close' onClick={()=>TodoStore.dispatch(closeTodo(index))}>x</button>
			</li>
		);
	}
});

export default TodoItem;