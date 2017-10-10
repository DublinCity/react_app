import React from 'react'
import update from 'react-addons-update'

import ContactDetail from './ContactDetail'
import ContactCreate from './ContactCreate'

export default class Contact extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			keyword:"",
			selectedKey:-1,
			contactData : [{
				name:'David',
				phone:'010-0000-1111'
			},{
				name:'Rabbit',
				phone:'010-0000-1112'
			},{
				name:'Hamster',
				phone:'010-0000-1113'
			},{
				name:'Peackok',
				phone:'010-0000-1114'
			}]
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleClick = this.handleClick.bind(this)
		this.handleCreate = this.handleCreate.bind(this)
		this.handleRemove = this.handleRemove.bind(this)
		this.handleEdit = this.handleEdit.bind(this)
	}

	handleChange(e) {
		this.setState({
			keyword:e.target.value
		})
	}

	handleClick(key) {
		this.setState({
			selectedKey: key
		})
	}

	handleCreate(contact) {
		this.setState({
			contactData: update(this.state.contactData,{
				$push:[contact]
			})
		})
	}

	handleRemove() {
		if(this.state.selectedKey ==-1) {
			return 
		}
		this.setState({
			contactData: update(this.state.contactData, {
				$splice: [[this.state.selectedKey,1]]
			}),
			selectedKey: -1
		})
	}

	handleEdit(name,phone) {
		this.setState({
			contactData: update(this.state.contactData, {
				[this.state.selectedKey]: {
					name:{$set:name},
					phone:{$set:phone}
				}
			})
		})
	}


	render() {
		const displayContacts = (data) => {
			data = data.filter((contact) => {
				return contact.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1
			})
			return data.map((contact,i) => {
				return (
					<div onClick={()=>{this.handleClick(i)}} key={i}>{contact.name}</div>
					)
			})
		}
		return (
			<div>
				<h1>Contact!!</h1>
				<input onChange={this.handleChange} name="search" value={this.state.keyword} placeholder="search"/>
				{displayContacts(this.state.contactData)}
				<ContactDetail contact = {this.state.contactData[this.state.selectedKey]} onRemove={this.handleRemove} onEdit={this.handleEdit}/>
				<ContactCreate onCreate={this.handleCreate}/>
			</div>
			)
	}
}