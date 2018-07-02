import React, { Component } from 'react'
import axios from 'axios'

export default class SearchForm extends Component {
	constructor() {
		super()

		this.state = {
			value: ''
		}
	this.handleChange = this.handleChange.bind(this)
	this.searchMovies = this.searchMovies.bind(this)
	}

	render () {
		return (
			<form action = '/searchMovies' onSubmit = { this.searchMovies }
				id = 'searchForm'>
	      		<input type = 'text'
	      			placeholder = 'Search..' 
	      			name = 'search'
	      			onChange = { this.handleChange }/>
	      		<button type = 'submit'>Submit</button>
	      		<button type = 'button'
	      			id = 'cancelButton'
	      			>Cancel 
	      		</button>
	    	</form>
		)
	}

	handleChange (event) {
		console.log('change event', event.target.value)
		this.setState({value: event.target.value})
	}

	searchMovies () {
	console.log('search movies req')
    return axios({
      type: 'GET',
      url: '/searchMovies'
      //url: '/searchMovies/' + this.state.value
    }).then((res) => {
      if (res.data == '') {
      	console.log('response if', res.data )
        //this.updateSearchResultInfo('Sorry we did not find that email in out records, please try a different email or fill out the customer information form')
        //postRoute = '/submitCustomer'
      } else {
        //this.updateSearchResponse(response.data)
        console.log('response else', res.data)
        //foundCustomer = true
        //this.updateSearchResultInfo('Please verfiy all of your information is still correct.')
        //postRoute = '/updateCustomer'
      }
    })
    event.preventDefault()
  }
}