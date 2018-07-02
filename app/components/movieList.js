import React, { Component } from 'react'
import axios from 'axios'

export default class MovieList extends Component {
	constructor() {
		super()

		this.state ={
			data: []
		}
	}
	componentDidMount () {
    		axios.get ('https://api.mlab.com/api/1/databases/inmotion/collections/movies?apiKey=xBN2j2F0BU9C9AlgWOLzP0tLZKsATO1W')
    			.then(res => {
    				//console.log(res.data)
    				this.setState({data: res.data})
    			})
      	}

	render () {
		return (
			<div>
			<h1> movie list </h1>
			<div> { this.renderMoviesUl() } </div>
			</div>
		)
	}

	renderMoviesUl () {
		const movieList = this.state.data.slice(0,2).map(movie => {
			return <ul key = {movie._id}> {movie.title} 
			 	{ this.renderMovieData(movie) }
			</ul>
		})
		console.log(movieList)
		return movieList
	}

	renderMovieData (data) {
		console.log('data1', data)
		const id = data.imdbId
		data = {
			genre: data.genre,
			actors: data.actors,
			year: data.year,
			ratings: data.ratings
		}
		let movieData = []
		Object.keys(data).forEach((key) => {
			console.log('data key', data[key])
			if (key == 'ratings') {

			} else {
				movieData.push(<li> { data[key] } </li>)
			}
		})
	console.log(movieData)
	return movieData
	}
}