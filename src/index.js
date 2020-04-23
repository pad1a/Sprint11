import "./pages/index.css";
import Api from "./scripts/api.js";
import Card from "./scripts/card.js";
import CardList from "./scripts/cardlist.js";
import FormValidator from "./scripts/formvalidator.js";
import Popup from "./scripts/popup.js";
import UserInfo from "./scripts/userinfo.js";

const serverUrl = process.env.NODE_ENV === 'development' ? 'http://praktikum.tk/cohort9' : 'https://praktikum.tk/cohort9';
const config = {
    baseUrl: serverUrl,
    //baseUrl: 'http://95.216.175.5/cohort9',
    headers: {
        authorization: 'd21470e7-5fbe-45dc-9fc0-d7a0f2775604',
        'Content-Type': 'application/json'
    }
};
const api = new Api(config);
const userInfo = new UserInfo(
    document.querySelector('.user-info__name'),
    document.querySelector('.user-info__job'),
    document.querySelector('.user-info__photo')
);

userInfo.create();
api.getUserInfo().then((data) => {
    userInfo.updateUserInfo(data.name, data.about, data.avatar);
});

const popupShowImage = new Popup(document.getElementById('bigimage'));
const popupAdd = new Popup(document.getElementById('newplace'), document.forms.new);
const popupProfile = new Popup(document.getElementById('profile'), document.forms.profile, userInfo);
const cardlist = new CardList(
    document.querySelector('.places-list'),
    popupShowImage,
    (name, link, popupimage) => {
        const cardItem = new Card(name, link, popupimage);
        cardItem.create();
        return cardItem;
    });

api.getInitialCards()
    .then((data) => {
        cardlist.render(data);
    });

document.forms.new.addEventListener('submit', (event) => {
    event.preventDefault();
    const cardItem = new Card(
        document.forms.new.elements.name.value,
        document.forms.new.elements.link.value,
        popupShowImage
    );
    cardItem.create();
    cardlist.addCard(cardItem);
    popupAdd.close();
    document.forms.new.reset();
});

const popupProfileValidate = new FormValidator(document.getElementById('profile'));
popupProfileValidate.setEventListeners(document.querySelector('#username'));
popupProfileValidate.setEventListeners(document.querySelector('#about'));
document.querySelector('.user-edit__button').addEventListener('click', (event) => {
    popupProfile.open(event);
});

const popupAddValidate = new FormValidator(document.getElementById('newplace'));
popupAddValidate.setEventListeners(document.querySelector('#nameplace'));
popupAddValidate.setEventListeners(document.querySelector('#linkplace'));
document.querySelector('.user-info__button').addEventListener('click', (event) => {
    popupAdd.open(event);
});

// Слушатель кнопки сохранить в профиле
document.forms.profile.addEventListener('submit', (event) => {
    event.preventDefault();
    userInfo.updateUserInfo(document.forms.profile.name.value, document.forms.profile.about.value);
    api.setUserInfo(document.forms.profile.name.value, document.forms.profile.about.value);
    popupProfile.close();
});
