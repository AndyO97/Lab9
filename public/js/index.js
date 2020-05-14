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

function deleteBookmarkFetch( id ){
    let url = `/api/bookmark/${id}`;

    let settings = {
        method : 'DELETE',
        headers : {
            Authorization : `Bearer ${API_TOKEN}`,
            'Content-Type' : 'application/json'
        },
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

function updateBookmarkFetch( id, title, description, url2, rating ){
    let url = `/api/bookmark/${id}`;

    let data = {
        id : id,
        title : title,
        description : description,
        url : url2,
        rating : Number(rating)
    }

    let settings = {
        method : 'PATCH',
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

function getBookmarkFetch( title ){
    let url = `/api/bookmark?title=${title}`;


    let settings = {
        method : 'GET',
        headers : {
            Authorization : `Bearer ${API_TOKEN}`,
            'Content-Type' : 'application/json'
        },

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
                results.innerHTML += `<div> Bookmark: </div>`;
                results.innerHTML += `<div> Id: ${responseJSON[0].id} </div>`;
                results.innerHTML += `<div> Title: ${responseJSON[0].title} </div>`;
                results.innerHTML += `<div> Description: ${responseJSON[0].description} </div>`;
                results.innerHTML += `<div> Url: ${responseJSON[0].url} </div>`;
                results.innerHTML += `<div> Rating: ${responseJSON[0].rating} </div>`;
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
                results.innerHTML += `<div> Id: ${responseJSON[i].id} </div>`;
                results.innerHTML += `<div> Title: ${responseJSON[i].title} </div>`;
                results.innerHTML += `<div> Description: ${responseJSON[i].description} </div>`;
                results.innerHTML += `<div> Url: ${responseJSON[i].url} </div>`;
                results.innerHTML += `<div> Rating: ${responseJSON[i].rating} </div>`;
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


function watchDeleteBookmarkForm(){
    let bookmarksForm = document.querySelector( '.delete-bookmark-form' );

    bookmarksForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();
        let id = document.getElementById( 'delete-bookmarkId' ).value;

        deleteBookmarkFetch( id );
    })
}

function watchUpdateBookmarkForm(){
    let bookmarksForm = document.querySelector( '.update-bookmark-form' );

    bookmarksForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();
        let id = document.getElementById( 'update-bookmarkId' ).value;
        let title = document.getElementById( 'update-bookmarkTitle' ).value;
        let description = document.getElementById( 'update-bookmarkDescription' ).value;
        let url2 = document.getElementById( 'update-bookmarkUrl' ).value;
        let rating = document.getElementById( 'update-bookmarkRating' ).value;

        updateBookmarkFetch( id, title, description, url2, rating );
    })
}

function watchGetBookmarkForm(){
    let bookmarksForm = document.querySelector( '.get-bookmark-form' );

    bookmarksForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();
        let id = document.getElementById( 'get-bookmarkTitle' ).value;
        
        getBookmarkFetch( id );
    })
}

function init(){
    watchBookmarksForm();
    watchAddBookmarkForm();
    watchDeleteBookmarkForm();
    watchUpdateBookmarkForm();
    watchGetBookmarkForm();
}

init();