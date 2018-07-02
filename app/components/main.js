import React, { Component } from 'react'
import SearchForm from './searchForm'
import MovieList from './movieList'

export default class Main extends Component {

  render () {
    return (
    	<div>
	        <h1> My Movies </h1>
			<SearchForm />
			<MovieList />
    	</div>
    )
  }
}