define(function(require){
	'use strict';

	// deps
	var React = require('react');

	//
	// Braincell
	//
	var Braincell = React.createClass({
		propTypes: {
			fill: React.PropTypes.object,
			noise: React.PropTypes.any,

			size: React.PropTypes.oneOfType([
				React.PropTypes.string,
				React.PropTypes.number
			]),

			query: React.PropTypes.string
		},

		shouldComponentUpdate: function(nextProps, nextState) {
			return nextProps.query !== this.props.query;
		},

		render: function() {
			var cellColor = this.props.fill;

			var style = {
				width: this.props.size,
				height: this.props.size,
				fontSize: (this.props.size * 0.5),

				color: cellColor.textColor,
				backgroundColor: cellColor.bgColor || ''
			};

			return (
				<li className="Braincell" style={style}>{this.props.query}</li>
			);
		}
	});

	// expose
	return Braincell;
});
