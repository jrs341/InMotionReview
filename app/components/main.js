import React, { Component } from 'react'
import axios from 'axios'

import SearchForm from './searchForm'
import MovieList from './movieList'

export default class Main extends Component {
	constructor() {
		super()

		this.state ={
			data: []
		}
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

  render () {
    return (
    	<div>
    		<h1> My Movies </h1>
			<SearchForm />
			<MovieList data = { this.state.data }/>
    	</div>
    )
  }
}