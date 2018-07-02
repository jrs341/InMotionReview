import React, { Component } from 'react'

export default class SearchForm extends Component {
	render () {
		return (
			<form action = '/search'
				id = 'searchForm'>
	      		<input type = 'text'
	      			placeholder = 'Search..' 
	      			name = 'search'/>
	      		<button type = 'submit'>Submit</button>
	      		<button type = 'button'
	      			id = 'cancelButton'
	      			>Cancel 
	      		</button>
	    	</form>
		)
	}
}