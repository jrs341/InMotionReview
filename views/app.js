
	renderMoviesUl = (data) => {
		data.slice(0,2).map((movie, i) => {
			const node = document.createElement('UL')
			//const node = $('<ul>', {
				//text: movie.title,
				//class: movie.imdbId
			//}).append('.movieList')
			node.setAttribute('class', movie.imdbId)
			node.innerHTML = movie.title
			document.querySelector('div#movieList').appendChild(node)
			renderMovieData(movie)
		})
	}

	renderMovieData = (data) => {
		const id = data.imdbId
		data = {
			genre: data.genre,
			actors: data.actors,
			year: data.year,
			ratings: data.ratings
		}

		for (var key in data) {
			if (key == 'ratings') {
				renderRatingsUl(data[key], id)
			} else {
			const li = document.createElement('LI')         
			const textnode = document.createTextNode(data[key])
			li.appendChild(textnode)
			document.querySelector('ul.' + id).appendChild(li)
			}
		}
	}

	renderRatingsUl = (data, id) => {
		const ratingUl = document.createElement('UL')
		const ratingUlId = 'rating' + id
		ratingUl.setAttribute('class', ratingUlId)
		ratingUl.innerHTML = 'Ratings' 
		if (data.length > 0){        
		document.querySelector('ul.' + id).appendChild(ratingUl)
		renderRatingsData(data, ratingUlId)
		} else {

		}
	}

	renderRatingsData = (data, id) => {
		data.map((ratings, i) => {
			const li = document.createElement('LI')
			const textnode = document.createTextNode(ratings.Source + ': ' + ratings.Value)
			li.appendChild(textnode)
			document.querySelector('ul.' + id).appendChild(li)
		})
	}

	cancel = () => {
		//$('#searchForm')[0].reset()
	}

//$(document).ready(() => {
	//renderMoviesUl()
	//cancel()
//})