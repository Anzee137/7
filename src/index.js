import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.css';

var audio = new Audio("https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav");

class App extends React.Component {
	constructor(props){
		super(props);
	
		this.state ={
			beginSessionTime: '25',
			beginBreakTime: '5',
			breakTime : '5',
			sessionTime: '25',
			status:'Session',
			seconds:'00',
			disabled:false,

		};
		this.play = this.play.bind(this);
		this.stop = this.stop.bind(this);

	}

	start(){

		if(this.state.status === "Session"){
			if (+this.state.seconds === 0 && +this.state.sessionTime===0){
				audio.play();
				this.setState({
					status:"Break",
					sessionTime:this.state.beginSessionTime,
					seconds:"01",
					
				})
			}
			if (+this.state.seconds === 0){
				this.setState({
					sessionTime:this.state.sessionTime-1,
					seconds:60,
				})
			}



			this.setState({
				seconds:+this.state.seconds-1,

			})}else{
				 if (+this.state.seconds === 0 && +this.state.breakTime===0){
				 	audio.play();
				 	this.setState({
					status:"Session",
					breakTime:this.state.beginBreakTime,
					seconds:"01",
					
				})
				}
				if(+this.state.seconds === 0){
					this.setState({
					breakTime:this.state.breakTime-1,
					seconds:60,
				})
				}

			this.setState({
				seconds:+this.state.seconds-1,})
			}
	}

	play() {
		this.setState({disabled:true});
		this.timerID = setInterval(() => this.start(),1000);
		}

	stop(){
		this.setState({disabled:false});
		clearInterval(this.timerID);
	}


	
	
	render(){
	let now = this.state.status === "Session" ? `${this.state.sessionTime}:${this.state.seconds}`: `${this.state.breakTime}:${this.state.seconds}`;
    return (
    <div className="app">
    	<h2>25+5 Clock</h2>
    	<div className="box1">
    		<span className="box2">
    			<h3>Break Length</h3>
    			<span className="box3">
    				<button disabled={this.state.disabled} id="block" onClick={() => this.state.breakTime < 60 ? this.setState({breakTime:+this.state.breakTime+1,beginBreakTime:+this.state.beginBreakTime+1}) : this.setState({breakTime:+this.state.breakTime,beginBreakTime:+this.state.beginBreakTime})}><i className="fas fa-arrow-up"></i></button>
    				<h4>{`${this.state.beginBreakTime}`}</h4>
    				<button disabled={this.state.disabled} id="block" onClick={() => this.state.breakTime > 1 ? this.setState({breakTime:+this.state.breakTime-1,beginBreakTime:+this.state.beginBreakTime-1}) : this.setState({breakTime:+this.state.breakTime,beginBreakTime:+this.state.beginBreakTime})}><i className="fas fa-arrow-down"></i></button>
    			</span>
    		</span>
    		
    		<span className="box2">
    			<h3>Session Length</h3>
    			<span className="box3">
    				<button disabled={this.state.disabled} id="block" onClick={() => this.state.sessionTime < 60 ? this.setState({sessionTime:+this.state.sessionTime+1,beginSessionTime:+this.state.beginSessionTime+1}) : this.setState({sessionTime:this.state.sessionTime,beginSessionTime:+this.state.beginSessionTime})}><i className="fas fa-arrow-up"></i></button>
    				<h4>{`${this.state.beginSessionTime}`}</h4>
    				<button disabled={this.state.disabled} id="block" onClick={() => this.state.sessionTime > 1 ? this.setState({sessionTime:+this.state.sessionTime-1,beginSessionTime:+this.state.beginSessionTime-1}) : this.setState({sessionTime:this.state.sessionTime,beginSessionTime:+this.state.beginSessionTime})}><i className="fas fa-arrow-down"></i></button>
    		</span>
    		</span>
    	</div>
    	<div className="box4">
    		<h3>{this.state.status}</h3>
    		<h2>{now}</h2>
    	</div>
    	<span>
    		<button id="block" onClick={this.play} disabled={this.state.disabled}><i className="fas fa-play"></i></button>
    		<button onClick={this.stop}><i className="fas fa-pause"></i></button>
    		<button onClick = {() => {this.setState({beginSessionTime: '25',beginBreakTime: '5',breakTime : '5',sessionTime: '25',status:'Session',seconds:'00',});this.stop()}}><i className="fas fa-retweet"></i></button>
    	</span>
    </div>
  );
}}



	




ReactDOM.render(
    <App />,
  document.getElementById('root')
);
