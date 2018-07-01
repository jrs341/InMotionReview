
	renderMoviesUl = (data) => {
		data.slice(0,3).map((movie, i) => {
			console.log(i)
			const node = document.createElement('UL')
			node.setAttribute('class', movie.imdbId)
			document.querySelector('div.movieList').appendChild(node)
			renderMovieData(movie)
		})
	}

	renderMovieData = (data) => {
		console.log(data)
		for(var key in data) {
			console.log('li')
			const li = document.createElement('LI')         
			const textnode = document.createTextNode(data[key])
			li.appendChild(textnode)
			document.querySelector('ul.' + data.imdbId).appendChild(li)
		}
	}
$(document).ready(() => {

})