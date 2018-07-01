
	renderMoviesUl = (data) => {
		data.slice(0,3).map((movie, i) => {
			const node = document.createElement('UL')
			node.setAttribute('class', movie.imdbId)
			document.querySelector('div.movieList').appendChild(node)
			renderMovieData(movie)
		})
	}

	renderMovieData = (data) => {
		console.log('data', data)
		for(var key in data) {
			if (key == '_id' || key == 'imdbId'){
			} else if (key == 'ratings') {
				if (data[key].length > 0) {
					renderRatingsUl(data[key], data.imdbId)
				}
			} else {
			const li = document.createElement('LI')         
			const textnode = document.createTextNode(data[key])
			li.appendChild(textnode)
			document.querySelector('ul.' + data.imdbId).appendChild(li)
			}
		}
	}

	renderRatingsUl = (data, id) => {
		const ratingUl = document.createElement('UL')
		const ratingUlId = 'rating' + id
		ratingUl.setAttribute('class', ratingUlId)         
		document.querySelector('ul.' + id).appendChild(ratingUl)
		renderRatingsData(data, ratingUlId)
	}

	renderRatingsData = (data, id) => {
		data.map((ratings, i) => {
			const li = document.createElement('LI')
			const textnode = document.createTextNode(ratings.Source + ': ' + ratings.Value)
			li.appendChild(textnode)
			document.querySelector('ul.' + id).appendChild(li)
		})
	}

$(document).ready(() => {

})