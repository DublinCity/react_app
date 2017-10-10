import React from 'react'
import PropTypes from 'prop-types'
export default class ContactCreate extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name:"",
			phone:""
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick() {
		{this.props.onCreate({
			name:this.state.name,
			phone:this.state.phone
		})}
		this.setState({
			name:"",
			phone:""
		})
		this.nameInput.focus()
	}      

	handleChange(e) {
		let nextState = {}
		nextState[e.target.name] = e.target.value
		this.setState(nextState)
	}
	render() {
		return (
			<div>
				<h2>Contact Create</h2>
				<input onChange={(e)=>this.handleChange(e)}
					name="name"
					value={this.state.name}
					placeholder="name"
					ref={(ref) => {this.nameInput = ref}}
				/>
				<input onChange={(e)=>this.handleChange(e)}
					name="phone"
					value={this.state.phone}
					placeholder="phone"
					onKeyPress={e=>{return e.key==='Enter'? this.handleClick(): console.log('hi')}} 
				/>
				<button onClick={this.handleClick}>Add</button>
			</div>
			)
	}
}

ContactCreate.propTypes = {
	onCreate: PropTypes.func
}

ContactCreate.defaultProps = {
	name:"",
	phone:""
}