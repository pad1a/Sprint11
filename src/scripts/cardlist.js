//Класс для хранения и отрисовки карточек.
export default class CardList {
    constructor(container, popupimage, createcarditem) {
        this.container = container;
        this.massive = [];
        this.popUpImage = popupimage;
        this.createcarditem = createcarditem;

    }

    addCard(cardItem) {
        cardItem.setEventListeners('.place-card__like-icon', cardItem.like);
        cardItem.setEventListeners('.place-card__delete-icon', cardItem.remove);
        cardItem.setEventListeners('.place-card__image', cardItem.bigImage);
        this.massive.push(cardItem);
        this.container.appendChild(cardItem.cardElement);
    }

    render(initCards) {
        for (let i = 0; i < initCards.length; i++) {
            this.addCard(this.createcarditem(initCards[i].name, initCards[i].link, this.popUpImage));

        }
    }
}
