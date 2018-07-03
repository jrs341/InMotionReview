import React, { Component } from 'react'

export default class addMovieForm extends Component {
	constructor(props){
		super(props)

		this.state = {
			disabled: true,
			newMovie: {
				title: '',
				genera: '',
				actors: '',
				year: '',
				ratings: {
					Source: 'myRating',
					Value: ''
				}
			}
		}

		this.handleChange = this.handleChange.bind(this)
		this.reset = this.reset.bind(this)
		this.submitNewMovie = this.submitNewMovie.bind(this)
	}

	reset () {
		const newMovie = this.state.newMovie
		Object.keys(newMovie).forEach(key => {
			if (key == 'myRating') {
			newMovie[key].Value = ''
			}
			newMovie[key] = ''
		})
		this.setState({newMovie: newMovie, disabled: true})
	}

	handleChange (key, event) {
		this.setState({disabled: false})
		const newMovie = this.state.newMovie
		if (key == 'myRating') {
			newMovie[key].Value = event.target.value
		}
		newMovie[key] = event.target.value
		this.setState({newMovie: newMovie})
		console.log('movie state', this.state.newMovie)
	}

	renderMovieForm () {
		const inputs = []
		Object.keys(this.state.newMovie).forEach((key, i) => {
			inputs.push(<div key = { i }
				style={{display: this.props.display}}>
				<label htmlFor = { key }>
				{key.charAt(0).toUpperCase() + key.slice(1)}
				</label>
				<input 
					key = { key }
					type = 'text'
					onChange = {this.handleChange.bind(this, key)} 
				/>
				</div>)
		})
		return inputs
	}

	submitNewMovie () {
		console.log(this.state.newMovie)
	}

	render() {
		return (
			<div>
				{ this.renderMovieForm() }
				<button type = 'button'
					name = 'submitNewMove'
					style = {{display: this.props.display}}
					disabled = { this.props.disabled}
					onClick = { this.submitNewMovie }>
					Submit Movie
				</button>
				<button type = 'button'
					name = 'reset'
					style = {{display: this.props.display}}
					onClick = { this.reset }>
					Reset
				</button>
			</div>
		)
	}
}