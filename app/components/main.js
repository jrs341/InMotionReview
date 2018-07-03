import React, { Component } from 'react'
import axios from 'axios'

import AddMovieForm from './addMovieForm'
import MovieList from './movieList'

export default class Main extends Component {
	constructor(props) {
		super(props)

		this.state ={
			data: [],
			newdata: [],
			display: 'none',
			label: 'Add Movie',
			searchText: ''
		}

		this.addMovie = this.addMovie.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.searchMovies = this.searchMovies.bind(this)
		this.updateState = this.updateState.bind(this)
	}

	componentDidMount () {
		axios.get ('https://api.mlab.com/api/1/databases/inmotion/collections/movies?apiKey=xBN2j2F0BU9C9AlgWOLzP0tLZKsATO1W')
			.then(res => {
				if (typeof(Storage) !== 'undefined') {
    			localStorage.setItem('movies', JSON.stringify(res.data))
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
    //TODO fix this
    cancelSearch () {
    	// const allMovies = JSON.parse(localStorage.getItem('movies'))
    	// console.log('allMovies', allMovies)
    	document.querySelector('#searchBox').value = ''
    	// console.log(JSON.parse(localStorage.getItem('movies')))
    	// const refreshMovies = []
    	// allMovies.slice(0,5).map(obj => {
    	// 	console.log(obj)
    	// 	refreshMovies.push(obj)
    	// })
    	// this.setState({newdata: refreshMovies})
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
	      // TODO fix this
	      } else {
	        this.setState({data: res.data})
	      }
	    })
  	}

  	updateState (newData) {
  		const data = this.state.data
  		data.unshift(newData)
    	this.setState({data: data})
  	}

  render () {
    return (
    	<div>
    		<h1> My Movies </h1>
	      		<input type = 'text'
	      			id = 'searchBox'
	      			placeholder = 'Search..' 
	      			onChange = { this.handleChange }/>
	      		<button type = 'submit'
	      			onClick = { this.searchMovies }>
	      			Submit
	      		</button>
	      		<button type = 'button'
	      			onClick = { this.cancelSearch }>
	      			Cancel
	      		</button>
	      		<button type = 'button'
	      			onClick = { this.addMovie }>
	      			{ this.state.label }
	      		</button>
	      	<AddMovieForm display = { this.state.display }
	      		updateParent = {this.updateState}/>
			<MovieList data = { this.state.data }/>
    	</div>
    )
  }
}