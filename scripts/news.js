'use strict';

const newsContainer = document.getElementById('news-container');
const navPageContainer = document.getElementById('nav-page-num');
const pageNumber = document.getElementById('page-num');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

let currentUser = JSON.parse(getFromStorage('CURRENT_USER')) || {};

//-----------------------------------------------------
// FUNCTIONS
//-----------------------------------------------------

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
            </div>
          `;
    newsContainer.insertAdjacentHTML('beforeend', html);
  });
};

//////////////////////////////////////
// Function: Render articles per page
async function renderPage(country, category, pageSize, page) {
  try {
    currentUser = parseUser(currentUser);
    const data = await currentUser.fetchNews(country, category, pageSize, page);
    const lastPage = Math.ceil(data.totalResults / pageSize);
    renderArticles(data.articles);
    // show navigation page button
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

//-----------------------------------------------------
// EVENT HANDLERS
//-----------------------------------------------------

//_____________________________
// * Case 1: User is logged in
if (Object.keys(currentUser).length > 0) {
  // Initialize Page

  const country = 'us';
  const category = currentUser.newsSettings.category;
  const pageSize = currentUser.newsSettings.pageSize;
  let currentPage = 1;
  renderPage(country, category, pageSize, currentPage);

  /////////////////////////////////
  // Click Next Button
  btnNext.addEventListener('click', function (e) {
    currentPage++;
    renderPage(country, category, pageSize, currentPage);
  });

  /////////////////////////////////
  // Click Previous Button
  btnPrev.addEventListener('click', function (e) {
    currentPage--;
    renderPage(country, category, pageSize, currentPage);
  });

  //___________________________________
  // ** Case 2: User is NOT logged in
} else {
  // Show login request
  newsContainer.innerHTML = `Please login to watch the news. →
  <a href = "../pages/login.html">Click here to Login</a>
  `;
}
