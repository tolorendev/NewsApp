'use strict';

const inputSearch = document.getElementById('input-query');
const btnSearch = document.getElementById('btn-submit');
const newsContainer = document.getElementById('news-container');

const navPageContainer = document.getElementById('nav-page-num');
const pageNumber = document.getElementById('page-num');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

const pageSize = 5;
let currentPage = 1;
let keyword;

//-----------------------------------------------------
// FUNCTIONS
//-----------------------------------------------------

//////////////////////////////////
// Function: Search news
async function searchNews(keyword, pageSize, page) {
  try {
    const url =
      `https://newsapi.org/v2/everything?` +
      `q=${keyword}&` +
      `pageSize=${pageSize}&` +
      `page=${page}&` +
      `apiKey=46732a4f19664c4db0fa2f443bf6e500`;
    console.log(url);
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`Something wrong! ERROR ${response.status}`);
    const data = await response.json();
    if (data.totalResults === 0) {
      alert('Can not find information!. Try another keyword.');
      throw new Error('Canot find news!');
    }
    return data;
  } catch (err) {
    throw err;
  }
}
/////////////////////////////////
// Function: Render articles
const renderArticles = function (articles) {
  newsContainer.innerHTML = '';
  articles.forEach(a => {
    const html = `
  <div class="card flex-row flex-wrap">
	  <div class="card mb-3" style="">
		  <div class="row no-gutters">
			  <div class="col-md-4">
				  <img src="${a.urlToImage ? a.urlToImage : ''}"
					class="card-img"
					alt="${a.title}">
			  </div>
			  <div class="col-md-8">
				  <div class="card-body">
					  <h5 class="card-title">${a.title}</h5>
					  <p class="card-text">${a.content ? a.content : '\n'}</p>
					  <a href="${a.url ? a.url : ''}" target="_blank"
						class="btn btn-primary">View</a>
          </div>
        </div>
      </div>
    </div>
  </div> `;
    newsContainer.insertAdjacentHTML('beforeend', html);
  });
};

//////////////////////////////////////
// Function: Render articles per page
async function renderPage(keyword, pageSize, page) {
  try {
    const data = await searchNews(keyword, pageSize, page);
    renderArticles(data.articles);
    const lastPage = Math.ceil(data.totalResults / pageSize);
    // Show navigation page button
    navPageContainer.removeAttribute('hidden');
    if (page === 1) {
      btnPrev.style.display = 'none';
      btnNext.style.display = 'block';
      pageNumber.textContent = page;
    } else if (page === lastPage) {
      btnPrev.style.display = 'block';
      btnNext.style.display = 'none';
      pageNumber.textContent = page;
    } else {
      btnPrev.style.display = 'block';
      btnNext.style.display = 'block';
      pageNumber.textContent = page;
    }
  } catch (err) {
    console.error(err.message);
  }
}

/////////////////////////////////
// Function: Search keyword
const searchKeyword = function () {
  //take data
  keyword = inputSearch.value.trim();
  // validate data
  if (!keyword) {
    alert('Please enter information for searching!');
    return;
  }
  currentPage = 1;
  renderPage(keyword, pageSize, currentPage);
};

//-----------------------------------------------------
// EVENT HANDLERS
//-----------------------------------------------------

/////////////////////////////////
// Search: Click Search Button
btnSearch.addEventListener('click', searchKeyword);

/////////////////////////////////
// Search: Press "Enter" at keyword input area
inputSearch.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    searchKeyword();
  }
});

/////////////////////////////////
// Click Next Button
btnNext.addEventListener('click', function (e) {
  currentPage++;
  renderPage(keyword, pageSize, currentPage);
});

/////////////////////////////////
// Click Previous Button
btnPrev.addEventListener('click', function (e) {
  currentPage--;
  renderPage(keyword, pageSize, currentPage);
});
