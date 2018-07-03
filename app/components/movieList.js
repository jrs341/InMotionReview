import React, { Component } from 'react'

export default class MovieList extends Component {

	render () {
		return (
			<div> { this.renderMoviesUl() } </div>
		)
	}

	renderMoviesUl () {
		const movieList = this.props.data.slice(0,5).map(movie => {
			return <ul key = {movie._id}>
			<label> Title:  </label>
			<input type = 'text'
				value = { movie.title }
				disabled = 'true'
				style = {{border: 'none'}} />
				<button>
				</button>
				<button>
				</button>
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
				movieData.push(<li key = { i }>
					<label>{key.charAt(0).toUpperCase() + key.slice(1)}: </label>
					<input type = 'text'
						value = { data[key] } 
						disabled = 'true'
						style = {{ border: 'none' }} />
					</li>)
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
		let myRating = true
		if (data.length === 0) {
			myRating = false
		}
		data.map(obj => {
			if (!Object.hasOwnProperty('myRating')) {
				myRating = false
			}
		})
		data.map((ratings, i) => {
			if (ratings.myRating){
				movieRatings.push(<li key = {'rating' + i}>
					My Rating
					<input type = 'text' 
						value = { ratings.Value }
						disabled = 'true'
						style = {{border: 'none'}} />
					</li> )
			} 
			movieRatings.push(<li key = {'rating' + i}> { ratings.Source }: { ratings.Value } </li> )
		})
		console.log('** !myRating **', !myRating)
		if (!myRating){
			movieRatings.unshift(<li key = {'myRating'}>
				My Rating: 
				<input type = 'text' 
					value = ' Not yet rated'
					disabled = 'true'
					style = {{border: 'none'}} />
				</li> )
		}
	return movieRatings
	}
}