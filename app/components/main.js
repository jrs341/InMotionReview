import React, { Component } from 'react'
import axios from 'axios'

import SearchForm from './searchForm'
import MovieList from './movieList'

export default class Main extends Component {
	constructor(props) {
		super(props)

		this.state ={
			data: [],
			searchText: ''
		}

		this.handleChange = this.handleChange.bind(this)
		this.searchMovies = this.searchMovies.bind(this)
	}

	componentDidMount () {
		axios.get ('https://api.mlab.com/api/1/databases/inmotion/collections/movies?apiKey=xBN2j2F0BU9C9AlgWOLzP0tLZKsATO1W')
			.then(res => {
				if (typeof(Storage) !== 'undefined') {
    			localStorage.setItem('movies', JSON.stringify({'data': res.data}))
    			localStorage.setItem('storage', true)
  				this.setState({data: res.data})
			} else {
				this.setState({data: res.data})
			}	
		})
    }

    handleChange (event) {
		this.setState({searchText: event.target.value})
	}

	searchMovies () {
	    return axios({
	    	type: 'GET',
	    	url: '/search/' + this.state.searchText
	    }).then((res) => {
	      if (res.data == '') {
	      
	      } else {
	        this.setState({data: res.data})
	      }
	    })
	    event.preventDefault()
  	}

  render () {
    return (
    	<div>
    		<h1> My Movies </h1>
	      		<input type = 'text'
	      			placeholder = 'Search..' 
	      			name = 'search'
	      			onChange = { this.handleChange }/>
	      		<button type = 'submit'
	      			value = 'Submit'
	      			onClick = { this.searchMovies }>
	      			Submit
	      		</button>
	      		<button type = 'button'
	      			id = 'cancelButton'
	      			value = 'Cancel'>
	      			Cancel
	      		</button>
			<MovieList data = { this.state.data }/>
    	</div>
    )
  }
}