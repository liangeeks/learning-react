'use strict';

var App = React.createClass({
	displayName: 'App',
	render: function render() {
		return React.createElement( 'div', null,
			React.createElement('h1',null,'Hello, world!')
		);
	}
});

ReactDOM.render(React.createElement(App, null), document.getElementById('example'));