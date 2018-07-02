import React, { Component } from 'react'

export default class MovieList extends Component {

	render () {
		return (
			<div> { this.renderMoviesUl() } </div>
		)
	}

	renderMoviesUl () {
		const movieList = this.props.data.slice(0,10).map(movie => {
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
		Object.keys(data).forEach((key, i) => {
			if (key == 'ratings') {
				movieData.push(this.renderRatingsUl(data[key], id))
			} else {
				movieData.push(<li key = { i }> { data[key] } </li>)
			}
		})
	return movieData
	}

	renderRatingsUl (data, id) {
		const ratingsUl = <ul key = {'rating' + id}> Ratings 
			{ this.renderRatingsData(data) }
		</ul>
		return ratingsUl
	}

	renderRatingsData (data) {
		let movieRatings = []
		data.map((ratings, i) => {
			movieRatings.push(<li key = {'rating' + i}> { ratings.Source }: { ratings.Value } </li> )
		})
	return movieRatings
	}
}