const FULL_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.';
const MAX_LENGTH = 380;
const MIN_LENGTH = 50;

let isFetching = false;
let currentPage = 1;
let cardsCounter = 0;

const fetchData = async (page = 1, limit = 9) => {
  return (await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)).json();
};

const createCard = (id, header, imageSrc, description) => {
  const div = document.createElement('div');
  div.setAttribute('class', 'col-lg-6 mb-4');
  div.innerHTML = `
    <div class="card p-0 h-100">
      <img src=${imageSrc} class="card-img-top" alt="card">
        <div class="card-body p-4">
          <h5 class="card-title dark-text"><strong>${header}</strong></h5>
          <p class="card-text text-secondary collapse card-description" id="collapseId${id}" aria-expanded="false">
            ${description}
          </p>
          <a role="button" class="collapsed text-decoration-none dark-text ${description.length < 80 && 'd-none'}" data-bs-toggle="collapse" href="#collapseId${id}" role="button" aria-expanded="false" aria-controls="collapseId${id}"></a>
        </div>
        <div class="card-footer bg-white p-3 d-flex gap-3">
          <button class="btn btn-primary">Save to collection</button>
          <button class="btn btn-outline-primary">Share</button>
        </div>
   </div>
`;
  return div;
};

const updateCounter = () => {
  const counter = document.getElementById('cardCounter');
  counter.innerText = `${cardsCounter} items`;
};

const generateDescription = () => {
  const descriptionLength = Math.floor(Math.random() * (MAX_LENGTH - MIN_LENGTH + 1) + MIN_LENGTH);
  return FULL_TEXT.slice(0, descriptionLength);
};

const showSpinner = () => {
  const spinner = document.getElementById('spinner');
  spinner.classList.remove('d-none');
  spinner.classList.add('d-flex');
};

const hideSpinner = () => {
  const spinner = document.getElementById('spinner');
  spinner.classList.remove('d-flex');
  spinner.classList.add('d-none');
};

const appendCards = (data) => {
  const root = document.getElementById('cardsContainer');
  
  for (let i = 0; i < data.length; i++) {
    const {id, author, download_url} = data[i];
    root.appendChild(createCard(id, author, download_url, generateDescription()));
  }
  updateCounter();
};

const fetchImages = async () => {
  showSpinner();
  isFetching = true;
  const data = await fetchData(currentPage);
  cardsCounter += data.length;
  appendCards(data);
  currentPage++;
  isFetching = false;
  hideSpinner();
};

document.addEventListener("DOMContentLoaded", async () => {
  await fetchImages();
});

window.addEventListener("scroll", async () => {
  if (isFetching) return;

  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    await fetchImages();
  }
});
