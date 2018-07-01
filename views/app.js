
	renderMovies = (data) => {
		console.log('***** movie data *****', data)
		const movies = data.map((movie, i) => {
			'<ul><li>movie.title</li></ul>'
		})
		document.querySelector("#test").innerHTML = movies	
	}