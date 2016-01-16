import fetch from 'isomorphic-fetch'
import {ADD_TODO, CLOSE_TODO, DONE, UNDO, RECEIVE_TODOS} from '../actions/TodoActions'

const state = {
	todos: [{text: "Hello"}]
};

const __subscribes__ = [];

const getState = () =>{
	return state;
}

const subscribe = (callback) =>{
	__subscribes__.push(callback);
}


const unsubscribe = (callback) =>{
	let index = __subscribes__.indexOf(callback);
	__subscribes__.splice(index, 1);
}


const dispatch = ({actionType, ...payload}) =>{
	let state = getState();
	switch(actionType) {
		case (ADD_TODO):
			var {todo} = payload;
			if (todo) {
				state.todos = [{text: todo, done: false}].concat(state.todos);
			}
			break;
		case (CLOSE_TODO): 
			var {index} = payload;
			if (!!state.todos[index]) {
				state.todos.splice(index, 1)
			}
			break;
		case (DONE): 
			var {index} = payload;
			if (!!state.todos[index]) {
				state.todos[index].done = true
			}
			break;
		case (UNDO): 
			var {index} = payload;
			if (!!state.todos[index]) {
				state.todos[index].done = false
			}
			break;
		case (RECEIVE_TODOS): 
			var {todos} = payload;
			state.todos = todos;
			break;
	}
	__subscribes__.forEach((callback)=>callback(state))
}


export default {
	dispatch, subscribe, unsubscribe, getState
}


// Initialize
fetch("/src/mock/todo.json").then((resp)=>resp.json()).then((json)=>{
	dispatch({actionType: RECEIVE_TODOS, todos: json})
})


