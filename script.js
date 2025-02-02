console.log('olá');
console.log('bem vindo ao meu mundo');

const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlist');

function requestApi(searchTerm) {
  const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => displayResults(result));
}

function displayResults(result) {
  resultPlaylist.classList.add('hidden');
  const artistName = document.getElementById('artist-name');
  const artistImage = document.getElementById('artist-img');

  result.forEach((element) => {
    artistName.innerText = element.name;
    artistImage.src = element.urlImg;
  });

  resultArtist.classList.remove('hidden');
}

document.addEventListener('input', function () {
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm === '') {
    resultArtist.classList.add('hidden');
    resultPlaylist.classList.remove('hidden');
    return
  } 
  requestApi(searchTerm);
});

/* seleção de temas */

const themeButton = document.getElementById('theme-button');
const themeSelection = document.getElementById('theme-selection');

const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  document.body.setAttribute('data-theme', savedTheme);
}

themeButton.addEventListener('click', () => {
  if (themeSelection.style.display === 'grid') {
    themeSelection.style.display = 'none';
  } else {
    themeSelection.style.display = 'grid';
  }

  themeSelection.querySelectorAll('.theme-option').forEach((option) => {
    option.addEventListener('click', () => {
      const selectedTheme = option.getAttribute('data-theme');
      document.body.setAttribute('data-theme', selectedTheme);
      localStorage.setItem('theme', selectedTheme);
      themeSelection.style.display = 'none';
    });
  });
});