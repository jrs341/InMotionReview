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
		const movieList = this.state.data.slice(0,10).map(movie => {
			return <ul key = {movie._id}> {movie.title} 
			 	{ this.renderMovieData(movie) }
			</ul>
		})
		return movieList
	}

	renderMovieData (data) {
		const id = data.imdbId
		data = {
			genre: data.genre,
			actors: data.actors,
			year: data.year,
			ratings: data.ratings
		}
		let movieData = []
		Object.keys(data).forEach((key) => {
			if (key == 'ratings') {
				movieData.push(this.renderRatingsUl(data[key]))
			} else {
				movieData.push(<li> { data[key] } </li>)
			}
		})
	return movieData
	}

	renderRatingsUl (data) {
		const ratingsUl = <ul> Ratings 
			{ this.renderRatingsData(data) }
		</ul>
		return ratingsUl
	}

	renderRatingsData (data) {
		let movieRatings = []
		data.map((ratings, i) => {
			movieRatings.push(<li> { ratings.Source } ': ' { ratings.Value } </li> )
		})
	return movieRatings
	}
}