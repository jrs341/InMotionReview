import React, { Component } from 'react'
import axios from 'axios'

import Input from './input'

export default class MovieList extends Component {
	constructor() {
		super()

		this.state = {
			editMovie: {
				id: '',
				title: '',
				genre: '',
				actors: '',
				ratings: {
					Source: 'myRating',
					Value: ''
				}
			}
		}

		this.onChange = this.onChange.bind(this)
		this.deleteMovie = this.deleteMovie.bind(this)
		this.updateMovie = this.updateMovie.bind(this)
	}

	onChange (event) {
		console.log(event.target.value)
		const id = event.target.id
		console.log(this.state.editMovie)
		const editMovie = this.state.editMovie
		console.log('** event id **', id)
		const key = id.substr(0, id.indexOf('/'))
		console.log('** key **', key)
		console.log(id.substr(1, id.indexOf('/')))
		editMovie[key] = event.target.value
		this.setState({editMovie: editMovie })
		console.log(this.state.editMovie)
	}

	deleteMovie (event) {
		const params = new URLSearchParams()
		params.append('id', event.target.id)
		axios.post('/deleteMovie', params)
			.then((res) => {
				console.log('axios res', res)
			})
			.catch((err) =>{
				console.log('axios error', err)
			})
	}

	// getMovieId (event) {
	// 	const id = event.target.id
	// 	const updateMovie = this.state.updateMovie
	// 	console.log('** event id **', id)
	// 	const key = id.substr(0, id.indexOf('/'))
	// 	console.log('** key **', key)
	// 	updateMovie[key] = event.target.value
	// 	this.setState({updateMovie: updateMovie })
	//}

	updateMovie (event) {
		const id = event.target.id
		console.log('** update id **', id)
	}

	render () {
		return (
			<div> { this.renderMoviesUl() } </div>
		)
	}

	renderMoviesUl () {
		const movieList = this.props.data.slice(0,5).map(movie => {
			return <ul key = { movie._id }>
				<button
					id = { movie._id }
					onClick = { this.updateMovie }>
					Update
				</button>
				<button
					id = { movie._id }
					onClick = { this.deleteMovie }>
					Delete
				</button>
				<input type = 'text'
					id = { 'title/' + movie._id }
					label = 'Title:'
					placeholder = { movie.title }
					style = {{border: 'none',
						display: 'inline'}} 
					onChange = { this.onChange }/>
			 	{ this.renderMovieData(movie, movie._id) }
			</ul>
		})
		return movieList
	}

	renderMovieData (data, id) {
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
						id = { key + '/' + id }
						placeholder = { data[key] } 
						onChange = { this.onChange }
						style = {{ border: 'none' }} />
					</li>)
			}
		})
	return movieData
	}

	renderRatingsUl (data, id) {
		const ratingsUl = <ul key = {'rating' + id}> Ratings 
			{ this.renderRatingsData(data, id) }
		</ul>
		return ratingsUl
	}

	renderRatingsData (data, id) {
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
						id = { 'myRating/' + id } 
						placeholder = { ratings.Value }
						onChange = { this.onChange }
						style = {{border: 'none'}} />
					</li> )
			} 
			movieRatings.push(<li key = { ratings.Source + '/' + i}> { ratings.Source }: { ratings.Value } </li> )
		})
		if (!myRating){
			movieRatings.unshift(<li key = {'myRating'}>
				My Rating: 
				<input type = 'text' 
					id = { 'myRating' + id }
					placeholder = ' Not yet rated'
					onChange = { this.onChange }
					style = {{border: 'none'}} />
				</li> )
		}
	return movieRatings
	}
}