import React from 'react'
import ContactInfo from './ContactInfo'
import ContactDetail from './ContactDetail'
import ContactCreate from './ContactCreate'

import update from 'react-addons-update'

export default class Contact extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			selectedKey:-1,
			searchKeyword:"",

			contactData: [{
                name: 'Abet',
                phone: '010-0000-0001'
            }, {
                name: 'Betty',
                phone: '010-0000-0002'
            }, {
                name: 'Charlie',
                phone: '010-0000-0003'
            }, {
                name: 'David',
                phone: '010-0000-0004'
            }]
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleCreate = this.handleCreate.bind(this)
		this.handleRemove = this.handleRemove.bind(this)
		this.handleEdit = this.handleEdit.bind(this)
	}

	handleClick(key) {
		this.setState({selectedKey:key})
	}

	handleChange(e) {
		this.setState({
			searchKeyword:e.target.value
		})
	}

	handleCreate(contact) {
		this.setState({
			contactData: update(
				this.state.contactData, 
				{
					$push: [contact]
				})
		})
	}

	handleRemove() {
		this.setState({
			contactData: update(this.state.contactData, {
				$splice: [[this.state.selectedKey, 1]]
			}),
			selectedKey:-1
		})
	}

	handleEdit(name,phone) {
		this.setState({
			contactData: update(this.state.contactData, 
			{
				[this.state.selectedKey]: {
					name: { $set: name },
					phone: { $set: phone }
				}
			})
		})
	}

	render() {
		const mapToContact = (data) => {

			data = data.filter(contact => {
				return contact.name.toLowerCase().indexOf(this.state.searchKeyword.toLowerCase()) > -1
			})
			return data.map((contact,i) => {
				return(
						<ContactInfo onClick={() => {this.handleClick(i)}} contact={contact} key={i}/>
					)
			})
		}

		return (
				<div>
					<h1>Contact!!</h1>
					<input onChange={this.handleChange} name="search" value={this.state.searchKeyword} placeholder="name"/>
					<div>{mapToContact(this.state.contactData)}</div>
					<ContactDetail contact={this.state.contactData[this.state.selectedKey]}/>
					<ContactCreate onCreate={this.handleCreate}/>
				</div>
			)
	}
}