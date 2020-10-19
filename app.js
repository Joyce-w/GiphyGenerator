    
// Allow the user to search for a GIF and when the form is submitted, make an AJAX request to the Giphy API and return a single GIF
 
$("#searchForm").on("submit", async function handleSearch(evt) {
    
    evt.preventDefault();

    let searchVal = $("#searchTerm").val();
    if (searchVal === '') {
        alert("You didn't search anything!")
        return;
    }

    console.log(searchVal)
    searchGif(searchVal)

    let results = await searchGif(searchVal);

    populateGifs(results)
});

// Once the Giphy API has responded with data, append the GIF to the page
async function searchGif(searchVal) {

    let searchResult = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=uWKJbVAOQOeeTNzq9vaX7AzHfW8ISmYK&q=${searchVal}&limit=25&offset=0&rating=g&lang=en`)

    let resultsLength = searchResult.data.data.length;
    let randomNum = Math.floor(Math.random()* (resultsLength + 1)) 

    let results = searchResult.data.data[randomNum]

    return results.images.original.url
   
}

// Allow the user to search for as many GIFs as they would like and keep appending them to the page

 function populateGifs(results) {
     $('.populatedGifs').prepend(`<img src=${results}/>`)
     $('#searchForm')[0].reset()
}

// Allow the user to remove all of the GIFs by clicking a button
$('#removeGifs').on("click", function (click) {
    click.preventDefault();
    console.log('you clicked the clear gif btn')
    $('.populatedGifs').empty();
});
