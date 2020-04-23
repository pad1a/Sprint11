//Класс для хранения и отрисовки карточек.
export default class CardList {
    constructor(container, popupimage, createcarditem, userId, removeCards) {
        this.container = container;
        this.massive = [];
        this.popUpImage = popupimage;
        this.createcarditem = createcarditem;
        this.userId = userId;
        this.removeCard = removeCards;
    }

    addCard(cardItem, isMyCard) {
        cardItem.setEventListeners('.place-card__like-icon', cardItem.like);
        if (isMyCard) {
            cardItem.setEventListeners('.place-card__delete-icon', cardItem.remove);
        }
        cardItem.setEventListeners('.place-card__image', cardItem.bigImage);
        this.massive.push(cardItem);
        this.container.appendChild(cardItem.cardElement);

    }

    render(initCards) {
        for (let i = 0; i < initCards.length; i++) {

            const isMyCard = initCards[i].owner._id === this.userId;
            //console.log(isMyCard, initCards[i].owner._id, this.userId);
            this.addCard(
                this.createcarditem(
                    initCards[i].name,initCards[i].link, this.popUpImage, isMyCard, initCards[i]._id, this.removeCard
                ), isMyCard, initCards[i]._id
            );
        }
    }
}
