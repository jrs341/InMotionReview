import React, { Component } from 'react'

export default class addMovieForm extends Component {
	constructor(props){
		super(props)

		this.state = {
			newMovie: {
				title: '',
				genera: '',
				actors: '',
				ratings: {
					Source: '',
					Value: ''
				}
			}
		}
	}

	onChange (event, key) {
		this.setState({key: event.target.value})
	}

	renderMovieForm () {
		const inputs = []
		Object.keys(this.state.newMovie).forEach((key, i) => {
			inputs.push(<div key = { i }>
				<label htmlFor = { key }>
				{key.charAt(0).toUpperCase() + key.slice(1)}
				</label>
				<input 
					key = { key }
					type = 'text' 
				/>
				</div>)
		})
		return inputs
	}

	render() {
		return (
			<div>
				{ this.renderMovieForm() }
			</div>
		)
	}
}