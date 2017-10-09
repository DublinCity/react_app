import React from 'react'
import ContactInfo from './ContactInfo'
import ContactDetail from './ContactDetail'

export default class Contact extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
        		keyword:'',
        		selectedKey:-1,
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
        };
        // this.handleChange = this.handleChange.bind(this)
        // this.handleClick = this.handleClick.bind(this)
    }

    handleChange(e) {
    	this.setState({keyword:e.target.value})
    }

    handleClick(key) {
    	this.setState({selectedKey:key})
    	console.log(this)
    }
    
    render() {
        const mapToComponents = (data) => {
        	data.sort()
        	data = data.filter((contact) => {
        		return contact.name.indexOf(this.state.keyword) > -1
        	})	
            return data.map((contact, i) => {
                return (<ContactInfo onClick={() => this.handleClick(i)} contact={contact} key={i}/>);
            });
        };
     
        return (
            <div>
                <h1>Contact!!</h1>
                <input 
                	name="keyword"
                	placeholder="search"
                	value={this.state.keyword}
                	onChange={(e) => this.handleChange(e)} 
                />
                <div>{mapToComponents(this.state.contactData)}</div>
                <ContactDetail isSelected={this.state.selectedKey} contact={this.state.contactData[this.state.selectedKey]}/>
            </div>
        );
    }
}