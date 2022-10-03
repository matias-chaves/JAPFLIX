let url = "https://japceibal.github.io/japflix_api/movies-data.json"
let dataMovies = [];
let inputSearch = document.getElementById('inputBuscar');
let btnBuscar = document.getElementById('btnBuscar')


btnBuscar.addEventListener('click',searchBar)

fetch(url)
    .then(response=>response.json())
    .then(data=> {
        dataMovies = data
    })


    .catch(error=>console.log(error))


function showMoviesSearch(params) {

    let htmlshowlist="";

    for (let i = 0; i < params.length; i++) {

        let numero = Math.floor(params[i].vote_average/2)
        let stars ="";

        for (let s = 0; s < 5; s++) {
            if(s < numero){
                stars +=`<span class="fa fa-star checked"></span>`
            }else{
                stars +=`<span class="fa fa-star"</span>`
            }
        }

        htmlshowlist += `


        <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasExample${i}" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">${params[i].title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <div>
            ${params[i].overview}
            </div>
        </div>

        <hr style="margin-left:16px;margin-right:16px;">

        <div style="padding:16px; display:flex;justify-content:space-between;" class="offcanvas-footer">
            <div>
                ${params[i].genres.map(genre => genre.name).join(" - ")}
            </div>

            <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              More
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Year:${params[i].release_date.substr(0,4)}</a></li>
              <li><a class="dropdown-item" href="#">Runtime:${params[i].runtime}mins</a></li>
              <li><a class="dropdown-item" href="#">Budget:$${params[i].budget}</a></li>
              <li><a class="dropdown-item" href="#">Revenue:$${params[i].revenue}</a></li>
            </ul>
          </div>
        </div>
        </div>

        <a data-bs-toggle="offcanvas" href="#offcanvasExample${i}" aria-controls="offcanvasExample" style="text-decoration:none;">

        <li id="list_item" class="list-group-item-action list-group-item cursor-active">
        <div id="title_stars">
            <strong>${params[i].title}</strong>
            <small>${stars}</small>
        </div>
        <div>
            <small id="tagline">${params[i].tagline}</small>
        </div>
        </li>
        </a>
        `
    }
    document.getElementById('lista').innerHTML = htmlshowlist
}

function searchBar() {
    let moviesearch = dataMovies;
    console.log(inputSearch.value);

    if(inputSearch.value == ""){
        alert("Ingrese un valor")

    }else{
        moviesearch = moviesearch.filter(a => a.title.toLowerCase().includes(inputSearch.value.toLowerCase())||
        a.tagline.toLowerCase().includes(inputSearch.value.toLowerCase()) ||
        a.overview.toLowerCase().includes(inputSearch.value.toLowerCase()) || a.genres.some(genre => genre.name.toLowerCase() == inputSearch.value.toLowerCase()))
        
        showMoviesSearch(moviesearch);
    }
}






