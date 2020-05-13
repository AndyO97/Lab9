const API_TOKEN = '2abbf7c3-245b-404f-9473-ade729ed4653';

function addBookmarkFetch( title, description, url2, rating ){
    let url = '/api/bookmarks';

    let data = {
        title : title,
        description : description,
        url : url2,
        rating : Number(rating)
    }

    let settings = {
        method : 'POST',
        headers : {
            Authorization : `Bearer ${API_TOKEN}`,
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify( data )
    }

    let results = document.querySelector( '.results' );

    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            fetchBookmarks();
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
}

function fetchBookmarks(){

    let url = '/api/bookmarks';
    let settings = {
        method : 'GET',
        headers : {
            Authorization : `Bearer ${API_TOKEN}`
        }
    }
    let results = document.querySelector( '.results' );

    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            results.innerHTML = "";
            for ( let i = 0; i < responseJSON.length; i ++ ){
                results.innerHTML += `<div> Bookmark ${i+1}: </div>`;
                results.innerHTML += `<div> ${responseJSON[i].id} </div>`;
                results.innerHTML += `<div> ${responseJSON[i].title} </div>`;
                results.innerHTML += `<div> ${responseJSON[i].description} </div>`;
                results.innerHTML += `<div> ${responseJSON[i].url} </div>`;
                results.innerHTML += `<div> ${responseJSON[i].rating} </div>`;
            }
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
    
}

function watchBookmarksForm(){
    let bookmarksForm = document.querySelector( '.bookmarks-form' );

    bookmarksForm.addEventListener( 'submit', ( event ) => {
        event.preventDefault();

        fetchBookmarks();
    });
}

function watchAddBookmarkForm(){
    let bookmarksForm = document.querySelector( '.add-bookmark-form' );

    bookmarksForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();
        let title = document.getElementById( 'bookmarkTitle' ).value;
        let description = document.getElementById( 'bookmarkDescription' ).value;
        let url2 = document.getElementById( 'bookmarkUrl' ).value;
        let rating = document.getElementById( 'bookmarkRating' ).value;

        addBookmarkFetch( title, description, url2, rating );
    })
}

function init(){
    watchBookmarksForm();
    watchAddBookmarkForm();
}

init();