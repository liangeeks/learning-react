
export const RECEIVE_TODOS = 'RECEIVE_TODOS';
export const ADD_TODO 	= 'ADD_TODO';
export const CLOSE_TODO = 'CLOSE_TODO';
export const DONE 		= 'DONE';
export const UNDO 		= 'UNDO';

export const addTodo = (todo) =>{
	return {
		actionType: ADD_TODO,
		todo
	}
}

export const closeTodo = (index) =>{
	return {
		actionType: CLOSE_TODO,
		index
	}
}

export const done = (index) =>{
	return {
		actionType: DONE,
		index
	}
}

export const undo = (index) =>{
	return {
		actionType: UNDO,
		index
	}
}