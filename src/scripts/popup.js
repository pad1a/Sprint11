//Класс открытия закрытия попапа.
class Popup {
    constructor(element, form = null, userinfo = null) {
        this.popupElement = element;
        this.formElement = form;
        this.userinfoElement = userinfo;
    }

    setEventListeners() {
        this.popupElement
            .querySelector('.popup__close')
            .addEventListener('click', this.close.bind(this));
    }


    open(event) {
        this.setEventListeners();
        const imagePopupStyle = event.target.style.backgroundImage.slice(5, -2);
        if (event.target.classList.contains('user-info__button')) {
            this.popupElement.classList.add('popup_is-opened');
            const popUpButtonAdd = this.formElement.querySelector('.popup__button');
            popUpButtonAdd.setAttribute('disabled', true);
            popUpButtonAdd.classList.add('popup__button_disabled');
        } else if (event.target.classList.contains('user-edit__button')) {
            this.popupElement.classList.add('popup_is-opened');
            const {name, about} = this.userinfoElement.getUserInfo();

            this.formElement.elements.name.value = name;
            this.formElement.elements.about.value = about;
        } else if (event.target.classList.contains('place-card__image')) {
            this.popupElement.classList.add('popup_is-opened');
            const popUpContentImage = document.querySelector('.popupbigimg');
            popUpContentImage.src = imagePopupStyle;
        }
    }

    close() {
        this.popupElement.classList.remove('popup_is-opened');
        if (this.formElement) {
            this.formElement.reset();
        }

    }
}
