var TodoItem = React.createClass({
	getInitialState() {
		return {
			done: false
		}
	},
	handleDone() {
		this.setState({done: !this.state.done});
	},
	render() {
		let {done} = this.state;
		let {todo, onRemove} = this.props;
		let style = {};
		if (done) {
			style.textDecoration = "line-through"
		}
		return (
			<li style={style}>
				<input type="checkbox" checked={done} onChange={this.handleDone}/>
				{todo} 
				<button onClick={onRemove}>x</button>
			</li>
		);
	}
});

var TodoList = React.createClass({
	propTypes: {
		todos: React.PropTypes.array
	},
	render() {
		let {handleRemoveTodo, todos, ...other} = this.props;
		return (
			<ul {...other}>
				{todos.map((todo, index)=><TodoItem todo={todo} onRemove={handleRemoveTodo(index)}/>)}
			</ul>
		)
	}
});

var TodoApp = React.createClass({
	getInitialState() {
		return {
			todos: []
		}
	},
	componentDidMount() {
		this.setState({
			todos: [
				"学习ReactJS"
			]
		})
	},
	handleNewInput(e) {
		let {value} = e.target;
		let {todos} = this.state;	
		if (e.keyCode == 13 && e.target.value) {
			todos.push(value);
			this.setState({todos}, ()=>e.target.value = '');
		}
	},
	handleRemoveTodo(index) {
		return (e) => {
			let {todos} = this.state;
			todos.splice(index, 1);
			this.setState({todos});
		}
	},
	render() {
		let {todos} = this.state;
		
		return (
			<div style={{width: 300}}>
				<div>
					<input name='newTodo' onKeyDown={this.handleNewInput}/>
				</div>
				<TodoList todos={todos} handleRemoveTodo={this.handleRemoveTodo}/>
			</div>
		)
	}
});
