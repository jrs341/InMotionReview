import React, { Component } from 'react'
import axios from 'axios'

import AddMovieForm from './addMovieForm'
import MovieList from './movieList'

export default class Main extends Component {
	constructor(props) {
		super(props)

		this.state ={
			data: [],
			display: 'none',
			label: 'Add Movie',
			searchText: ''
		}

		this.addMovie = this.addMovie.bind(this)
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

    addMovie () {
    	this.setState({display: this.state.display == 'none'
    		? ''
    		: 'none',
    		label: this.state.label == 'Cancel'
    		? 'Cancel'
    		: 'Add Movie'
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
	      		<button type = 'button'
	      			id = 'addMovie'
	      			onClick = { this.addMovie }>
	      			{ this.state.label }
	      		</button>
	      	<AddMovieForm display = { this.state.display }/>
			<MovieList data = { this.state.data }/>
    	</div>
    )
  }
}