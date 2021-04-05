const API_TOKEN ="6f77266a9895e21186f9e8561bada26c";

export function getFilmsFromApiWithSearchedText (text,page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text+'&page='+page
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => console.error(error))
  }

  export function getImageFromApi (name) {
    return 'https://image.tmdb.org/t/p/w300' + name
  }