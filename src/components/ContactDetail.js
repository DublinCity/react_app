import React from 'react'

export default class ContactDetail extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			isEdit: false,
			name:"",
			phone:""
		}

		this.handleClick = this.handleClick.bind(this)
		this.handleToggle = this.handleToggle.bind(this)
	}
	
	handleClick() {
		console.log('click')
		{this.props.onRemove()}
	}

	handleEdit() {
		if(this.state.name && this.state.phone){
			{this.props.onEdit(this.state.name,this.state.phone)}
		}	
	}

	handleToggle() {
		if(this.state.isEdit) {
			this.handleEdit()
		}
		this.setState({
			isEdit: !this.state.isEdit
		}) 
	}

	handleChange(e) {
		let nextState ={}
		nextState[e.target.name] = e.target.value
		this.setState(nextState)
	}
	render() {
		const editDiv = (
			<div>
				<input 
					name="name" onChange={e=>this.handleChange(e)} placeholder={this.props.contact.name}
				/>
				<input
					name="phone" onChange={e=>this.handleChange(e)} placeholder={this.props.contact.phone}
				/>
			</div>
			)
		return (
				<div> 
					<h2>Detail</h2>
					{this.props.contact.name} {this.props.contact.phone}
					<div>
						{this.state.isEdit? editDiv: ""}
						<button onClick={this.handleToggle}>{this.state.isEdit? "OK": "Edit"}</button>
						<button onClick={this.handleClick}>Remove</button>
					</div>
				</div>
			)
	}
}

ContactDetail.defaultProps = {
	contact: {
		name:'',
		phone:''
	}
}
