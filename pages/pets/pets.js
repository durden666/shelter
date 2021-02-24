const petsList = document.querySelector('.friends__list'),
      currentButton = document.querySelector('.current-page'),
      prevButton = document.querySelector('.left-arrow'),
      nextButton = document.querySelector('.right-arrow'),
      firstPageButton = document.querySelector('.first-arrow'),
      lastPageButton = document.querySelector('.last-arrow'),
      file = '../../assets/pets.json';
  
  let pets = [], 
      matrix = [0, 1, 2, 3, 4, 5, 6, 7]; // order pets
 
// ================================================================//
//                   CHECK WINDOWS SIZE                            //
//=================================================================//
const getWindowSize = () => {
  if (document.body.offsetWidth >= 1280) {
    cardsCount = 8;
  } else if (document.body.offsetWidth >= 768) {
    cardsCount = 6;
  } else {
    cardsCount = 3;
  } 
  return quantity = Math.floor(pets.length / cardsCount);
}

// ================================================================//
//                          FETCH FILE                             //
//=================================================================//
fetch(file)
  .then(response => response.json())
  .then(responsePets => {
    pets = getItems(responsePets);
    getWindowSize();
    displayList(pets, petsList, cardsCount, currentPage);
    settingPagination(pets, petsList, cardsCount);
  });

// ================================================================//
//                        SHUFFLE ITEM                             //
//=================================================================//
const shuffle = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const getIndex = () => {
  let index = [];
  let uniqueIndex;
  for (let i = 0; i < 8; i++) {
    uniqueIndex = shuffle(0, 7);
    while (index.indexOf(uniqueIndex) !== -1) {
      uniqueIndex = shuffle(0, 7);
    }
    index.push(uniqueIndex);
  }
  return index;
}

const getItems = (items) => {
  let getItem = [],
      indexes= [];

    matrix.forEach(el => {
    items.push(items[el]);
  });

  for (let i = 0; i < 6; i++) {
    indexes = getIndex();
    indexes.forEach(el => {
      getItem.push(items[el]);
    });
  }
  return getItem;
}


let currentPage = 1,
    cardsCount,
    quantity,
    currentPosition = 0;

const displayList = (items, wrapper, itemsToShow, page) => {
  wrapper.innerHTML = '';
  page--;

  let start = currentPosition;
  let end = start + itemsToShow;
  let paginatedItems = items.slice(start, end);

  for (let i = 0; i < paginatedItems.length; i++) {
    let item = paginatedItems[i];
    wrapper.insertAdjacentHTML('beforeend', 
    `<li class="friends__item">
      <article class="friends__item-article">
        <img
          class="article__image"
          src="${item.img}"
          alt="${item.type} ${item.name}"
        >
        <h3 class="article__title">
          ${item.name}
        </h3>
        <a href = "javascript:void(0)"
           class="friends__item-button">
           Learn more
        </a>
      </article>
    </li>`);
  }

  document.querySelectorAll('.friends__item').forEach(item => {
    item.addEventListener('click', () => {
      popupContent.innerHTML = '';
      generateCard(item, pets);
      popup.classList.add('visible');
      document.body.classList.add('lock');
    });
  });

  setTimeout(() => {
    document.querySelectorAll('.friends__item').forEach(el => {
      el.classList.add('hid');
    });
  }, 200);
}

// ================================================================//
//                        SETTING  Pagination                      //
//=================================================================//
const settingPagination = () => {
  if (currentPage === 1) {
    prevButton.removeEventListener('click', prevPage);
    prevButton.classList.add('inactive');
    firstPageButton.removeEventListener('click', firstPage);
    firstPageButton.classList.add('inactive');
    currentPosition = 0;
  } else {
    prevButton.addEventListener('click', prevPage);
    prevButton.classList.remove('inactive');
    firstPageButton.addEventListener('click', firstPage);
    firstPageButton.classList.remove('inactive');
  }
  if (currentPage >= quantity) {
    lastPageButton.removeEventListener('click', lastPage);
    lastPageButton.classList.add('inactive');
    nextButton.removeEventListener('click', nextPage);
    nextButton.classList.add('inactive');
  } else {
    lastPageButton.addEventListener('click', lastPage);
    lastPageButton.classList.remove('inactive');
    nextButton.addEventListener('click', nextPage);
    nextButton.classList.remove('inactive');
  }
  currentButton.innerText = currentPage;
}

// ================================================================//
//                          DISPLAY PAGE                           //
//=================================================================//
const prevPage = () => {
  currentPage -= 1;
  currentPosition -= cardsCount;
  settingPagination(petsList);
  displayList(pets, petsList, cardsCount, currentPage);
}
const nextPage = () => {
  currentPage += 1;
  currentPosition += cardsCount;
  settingPagination(petsList);
  displayList(pets, petsList, cardsCount, currentPage);
}

const firstPage = () => {
  currentPage = 1;
  currentPosition += cardsCount;
  settingPagination(petsList);
  displayList(pets, petsList, cardsCount, currentPage);
}

const lastPage = () => {
  currentPage = quantity;
  currentPosition += cardsCount;
  settingPagination(petsList);
  displayList(pets, petsList, cardsCount, currentPage);
}


// ================================================================//
//                          LISTENER PAGE                          //
//=================================================================//
prevButton.addEventListener('click', prevPage);
nextButton.addEventListener('click', nextPage);
firstPageButton.addEventListener('click', firstPage);
lastPageButton.addEventListener('click', lastPage);

// ================================================================//
//                     POPUP  GENERATE                             //
//=================================================================//
const popupBlackout = document.querySelector('.popup__blackout');
const popup = document.querySelector('.popup');
const popupContent = document.querySelector('.popup__content');
const closeButton = document.querySelector('.popup__close');

const generateCard = (card, data) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i]['name'] === card.children[0].children[1].innerText) {
      popupContent.insertAdjacentHTML('beforeend', 
      `<div class="popup__column">
          <img src="${data[i].img}" alt="">
      </div>
      <div class="popup__column">
        <h2 class="popup__title">
          ${data[i].name}
        </h2>
        <p class="popup__pet-type">
          ${data[i].type} - ${data[i].breed}
        </p>
        <p class="popup__pet-description">
          ${data[i].description}
        </p>
        <ul class="popup__list-info">
          <li class="popup__list-item">
            <span class="list-item__bold">
              Age: 
            </span>
            <span class="list-item__normal">
              ${data[i].age}
            </span>
          </li>
          <li class="popup__list-item">
            <span class="list-item__bold">
              Inoculations: 
            </span>
            <span class="list-item__normal">
              ${data[i].inoculations}
            </span>
          </li>
          <li class="popup__list-item">
            <span class="list-item__bold">
              Diseases: 
            </span>
            <span class="list-item__normal">
              ${data[i].diseases}
            </span>
          </li>
          <li class="popup__list-item">
            <span class="list-item__bold">
              Parasites: 
            </span>
            <span class="list-item__normal">
              ${data[i].parasites}
            </span>
          </li>
        </ul>
      </div>`);
      return;
    }
  }
}

// ================================================================//
//                        CLOSE  POPUP                             //
//=================================================================//
closeButton.addEventListener('click', () => {
  popup.classList.remove('visible');
  document.body.classList.remove('lock');
});

popupBlackout.addEventListener('click', () => {
  popup.classList.remove('visible');
  document.body.classList.remove('lock');
});

// ================================================================//
//                        BURGER MENU                              //
//=================================================================//

// burgen button
const toggleBtn = document.getElementById('mobile-toggle-btn');

// hidden logo
const logo = document.querySelector('.logo')
toggleBtn.addEventListener('click', () => {
    if ([...logo.classList].includes('hidden')) {
      logo.classList.remove('hidden')
    } else {
      logo.classList.add('hidden')
    }
});

//  blackout page
const blackout = document.querySelector('.header__blackout')
toggleBtn.addEventListener('click', () => {
    if ([...blackout.classList].includes('active')) {
      blackout.classList.remove('active')
    } else {
      blackout.classList.add('active')
    }
});

// block scrool
const hiddenBody = document.querySelector('body')
toggleBtn.addEventListener('click', () => {
    if ([...hiddenBody.classList].includes('hidden')) {
      hiddenBody.classList.remove('hidden')
    } else {
      hiddenBody.classList.add('hidden')
    }
});

// active burger__menu
const Nav = document.querySelector('.menu')
toggleBtn.addEventListener('click', () => {
    if ([...Nav.classList].includes('active')) {
      Nav.classList.remove('active')
    } else {
      Nav.classList.add('active')
    }
  });

// hidden blackout
  blackout.addEventListener('click', () => {
    Nav.classList.remove('active');
    blackout.classList.remove('active');
    hamburger.classList.remove('active');
    hiddenBody.classList.remove('hidden');
    logo.classList.remove('hidden');
  });

//  transform hamburger
  const hamburger = document.querySelector('.hamburger')
  toggleBtn.addEventListener('click', () => {
    if ([...hamburger.classList].includes('active')) {
      hamburger.classList.remove('active')
    } else {
      hamburger.classList.add('active')
    }
  });
  
