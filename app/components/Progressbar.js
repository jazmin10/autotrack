var React = require('react');

var ProgressBar = require('react-progressbar.js');
var SemiCircle = ProgressBar.SemiCircle;

var Progress = React.createClass({
	getInitialState:function(){
		return {
			progress: 1
		}
	},
	render:function(){

		var options = {
				strokeWidth:2,
				color: '#fb1'
		};

		var containerStyle = {
			width:'300px',
			height:'150px'
		};

		return(
			<div>
				<SemiCircle
					progress={this.state.progress}
					text={(this.state.progress * 100) + "%"}
					options={options}
					initialAnimate={true}
					containerStyle={containerStyle}
					containerClassName={'.progressbar'}
				/>
			</div>

		);
	}
});

module.exports = Progress;