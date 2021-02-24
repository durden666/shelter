const sliderTrack = document.querySelector('.slider__track'),
      slides = document.querySelectorAll('.gallery__item'),
      buttons = document.querySelectorAll('.slider__arrow'),
      file = '../../assets/pets.json';

let pets = [],
    prev = [1, 2, 3],
    newElements = [];

const insertItems = (newElements) => {
  let i = 0;
  newElements.forEach(el => {
    slides[i].insertAdjacentHTML('beforeend', 
    `<article class="gallery__item-article">
        <img class="article__image"
          src="${pets[el].img}"
          alt="">
        <h3 class="article__title">
          ${pets[el].name}
        </h3>
        <a href="javascript:void(0)"
           class="gallery__button">
           Learn more
        </a>
    </article>`);
    i += 1;
  });
  slides.forEach(slide => {
    slide.classList.add('hid');
  })
}

fetch(file)
  .then(response => response.json())
  .then(responsePets => {
    pets = responsePets;
    insertItems(prev);
  });
 
// ================================================================//
//                        SHUFFLE                                 //
//=================================================================//
const shuffle = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const getRandElem = () => {
  let randElem;
  newElements = [];
  for (let i = 0; i < 3; i++) {
    randElem = shuffle(0, 7);
    while (prev.indexOf(randElem) !== -1 || newElements.indexOf(randElem) !== -1) {
      randElem = shuffle(0, 7);
    }
    newElements.push(randElem);
  }
  prev = newElements.slice();
}

deletePrev = () => {
  slides.forEach(slide => {
    slide.classList.remove('hid');
  });

  setTimeout(() => {
    slides.forEach(slide => {
      slide.firstChild ? slide.removeChild(slide.firstChild) : 0
    });
  }, 300);
}


buttons.forEach(item => {
  item.addEventListener('click', () => {
    getRandElem();
    deletePrev();
    setTimeout(() => {
      insertItems(newElements);
    }, 300);
  });
});

// ================================================================//
//                        POPUP                                    //
//=================================================================//
const closeButton = document.querySelector('.popup__close'),
      popup = document.querySelector('.popup'),
      popupBlackout = document.querySelector('.popup__blackout'),
      popupContent = document.querySelector('.popup__content');

document.querySelectorAll('.gallery__item').forEach(item => {
  item.addEventListener('click', () => {
    popupContent.innerHTML = '';
    createCard(item);
    popup.classList.add('visible');
    document.body.classList.add('lock');
  });
});
// create card
createCard = (card) => {
  pets.forEach(item => {
    if (item['name'] === card.children[0].children[1].innerText) {
      popupContent.insertAdjacentHTML('beforeend', 
      `<div class="popup__column">
          <img src="${item.img}" alt="${item.type} ${item.name}">
      </div>
      <div class="popup__column">
          <h2 class="popup__title">
            ${item.name}
          </h2>
          <p class="popup__pet-type">
            ${item.type} - ${item.breed}
          </p>
          <p class="popup__pet-description">
            ${item.description}
          </p>
          <ul class="popup__list-info">
              <li class="popup__list-item"><span class="list-item__bold">
                Age: </span><span class="list-item__normal">${item.age}</span>
              </li>
              <li class="popup__list-item"><span class="list-item__bold">
                Inoculations: </span><span class="list-item__normal">${item.inoculations}</span>
              </li>
              <li class="popup__list-item"><span class="list-item__bold">
                Diseases: </span><span class="list-item__normal">${item.diseases}</span>
              </li>
              <li class="popup__list-item"><span class="list-item__bold">
                Parasites: </span><span class="list-item__normal">${item.parasites}</span>
              </li>
          </ul>
      </div>`);
    }
  });
}
// ================================================================//
//                        CLOSE POPUP                              //
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
  
