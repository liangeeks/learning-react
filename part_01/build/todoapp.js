"use strict";

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var TodoItem = React.createClass({
	displayName: "TodoItem",
	getInitialState: function getInitialState() {
		return {
			done: false
		};
	},
	handleDone: function handleDone() {
		this.setState({ done: !this.state.done });
	},
	render: function render() {
		var done = this.state.done;
		var _props = this.props;
		var todo = _props.todo;
		var onRemove = _props.onRemove;

		var style = {};
		if (done) {
			style.textDecoration = "line-through";
		}
		return React.createElement(
			"li",
			{ style: style },
			React.createElement("input", { type: "checkbox", checked: done, onChange: this.handleDone }),
			todo,
			React.createElement(
				"button",
				{ onClick: onRemove },
				"x"
			)
		);
	}
});

var TodoList = React.createClass({
	displayName: "TodoList",

	propTypes: {
		todos: React.PropTypes.array
	},
	render: function render() {
		var _props2 = this.props;
		var handleRemoveTodo = _props2.handleRemoveTodo;
		var todos = _props2.todos;

		var other = _objectWithoutProperties(_props2, ["handleRemoveTodo", "todos"]);

		return React.createElement(
			"ul",
			other,
			todos.map(function (todo, index) {
				return React.createElement(TodoItem, { todo: todo, onRemove: handleRemoveTodo(index) });
			})
		);
	}
});

var TodoApp = React.createClass({
	displayName: "TodoApp",
	getInitialState: function getInitialState() {
		return {
			todos: []
		};
	},
	componentDidMount: function componentDidMount() {
		this.setState({
			todos: ["学习ReactJS"]
		});
	},
	handleNewInput: function handleNewInput(e) {
		var value = e.target.value;
		var todos = this.state.todos;

		if (e.keyCode == 13 && e.target.value) {
			todos.push(value);
			this.setState({ todos: todos }, function () {
				return e.target.value = '';
			});
		}
	},
	handleRemoveTodo: function handleRemoveTodo(index) {
		var _this = this;

		return function (e) {
			var todos = _this.state.todos;

			todos.splice(index, 1);
			_this.setState({ todos: todos });
		};
	},
	render: function render() {
		var todos = this.state.todos;

		return React.createElement(
			"div",
			{ style: { width: 300 } },
			React.createElement(
				"div",
				null,
				React.createElement("input", { name: "newTodo", onKeyDown: this.handleNewInput })
			),
			React.createElement(TodoList, { todos: todos, handleRemoveTodo: this.handleRemoveTodo })
		);
	}
});