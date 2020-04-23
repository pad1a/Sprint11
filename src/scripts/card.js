// Класс, создающий карточку
export default class Card {
  constructor(name, link, image, isMyCard, cardId, removeCard) {
    this.name = name;
    this.link = link;
    this.popupBigImage = image;
    this.isMyCard = isMyCard;
    this.cardId = cardId;
    this.removeCard = removeCard;
  }

  setEventListeners(element, event) {
    this.cardElement
      .querySelector(element)
      .addEventListener('click', event.bind(this));
  }

  bigImage(event) {
    this.popupBigImage.open(event);
  }

  like(event) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }

  remove(event) {
    event.preventDefault();
    const tItem = event.target.closest(".place-card");
    const tContainer = event.target.closest(".places-list");
    tContainer.removeChild(tItem);
    this.removeCard(this.cardId);
  }

  create() {
    // div карточки
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('place-card');
    // кнопки
    //if (this.isMyCard) {
      const delButtonElement = document.createElement('button');
      delButtonElement.classList.add('place-card__delete-icon');
    //}
    const likeButtonElement = document.createElement('button');
    likeButtonElement.classList.add('place-card__like-icon');
    // div картинки
    const imageLink = document.createElement('div');
    imageLink.classList.add('place-card__image');
    imageLink.style.backgroundImage = `url('${this.link}')`;
    // тайтл
    const titleElement = document.createElement('h3');
    titleElement.classList.add('place-card__name');
    titleElement.textContent = this.name;
    // div тайтла
    const titleBox = document.createElement('div');
    titleBox.classList.add('place-card__description');
    // собираем блок картинки
    if (this.isMyCard){
      imageLink.appendChild(delButtonElement);
    }
    // собираем блок тайтла
    titleBox.appendChild(titleElement);
    titleBox.appendChild(likeButtonElement);
    // собираем карточку
    cardContainer.appendChild(imageLink);
    cardContainer.appendChild(titleBox);
    this.cardElement = cardContainer;
    return cardContainer;
  }
}
