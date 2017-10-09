import React from 'react'

export default class ContactDetail extends React.Component {
	render() {
		return (
				<div>
					<h2>Detail</h2>
					{this.props.contact.name} {this.props.contact.phone}
				</div>
			)
	}
}

ContactDetail.defaultProps = {
	contact:{
		name:'',
		phone:''
	}
}