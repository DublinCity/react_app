import React from 'react'

export default class ContactDetail extends React.Component {
	render() {
		const isSelected = (<div>{this.props.contact.name} {this.props.contact.phone}</div>)
		const blank = (<div>blank</div>)

		return (
			<div>
				<h2>Datail</h2>
				<div>
					{this.props.isSelected? isSelected:blank}
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