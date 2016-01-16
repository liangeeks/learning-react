import React 		from 'react'
import TodoItem 	from './TodoItem'
import TodoStore 	from '../stores/TodoStore'

let TodoList = React.createClass({
	propTypes: {
		todos: React.PropTypes.array
	},
	getInitialState() {
		return {updateAt: Date.now()}
	},
	componentDidMount() {
		TodoStore.subscribe(this.onStoreChange);
	},
	componentWillUnmount() {
		TodoStore.sunubscribe(this.onStoreChange);
	},
	onStoreChange(state) {
		this.setState({updateAt: Date.now()})
	},
	render() {
		let {todos} = TodoStore.getState();
		return (
			<ul>
				{todos.map((todo, index)=><TodoItem key={index} todo={todo} index={index}/>)}
			</ul>
		)
	}
});

export default TodoList;