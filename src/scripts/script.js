const config = {
    baseUrl: 'http://95.216.175.5/cohort9',
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


/**
 * Здравствуйте
 * Хорошая работа по классу Api
 * но надо немного доработать.
 * Во первых переменной config не место в файле Api там должен быть только класс
 * В классе CardList вы обращаетесь к переменной cardlist, что является грубыи нарушением.
 *
 *
 * Обращаться в классе на прямую к глобальным переменым, является очень плохой практикой и грубейшим нарушением ООП
 * Лучшим решением является передачи переменной через метод, в качестве параметров, или при инициализации класса,
 * но если вы будете передавать при инициализации класса, тогда надо лучше передавать как объект
 * На самом деле объявлять переменные вне класса, работая в рамках ООП, тоже плохая практика
 * Класс должен быть самодостаточным и обладать всеми своиствами которые необходимы для работы класса
 *
 * Приведу пример, если же вы всё же объявили переменную вне класса
 const myValue = 'какое значение которое надо передать в класса';
 // Дальше идёт наш класс
 class MyClass {
      constructor(object){ 
      // здесь мы передаём параметр при инициализации класса
       this.value = object.value;
      }
      setValue(name){
      // здесь мы тоже передаём параметр , но просто перезаписываем переменную, если есть такая необходимость
         this.value = name
      }
     }
 // на практике это выглядит так
 const myExClass = new MyClass({value:myValue})
 // здесь мы перезаписываем нашу переменную.
 myExClass.setValue(name);

 // По сути это является инкапсуляция в ООП. Мы не имеем прямого доступа к  this.value, значение срыто в классе
 // если ваш класс возьмёт другой разработчик к себе в проект и захочет переиспользовать, у него не возникнет проблем
 // или ошибок
 *
 // ** Готово
 *
 *
 * Взаимодействие с классом Api в самом лучшем варианте лучше делать как я написал в примере ниже, это в файле script
 const container = document.querySelector('.places-list'); // место куда записывать карточки
 const cards = []; // массив с карточками
 const words = {ru: { validationLenght: 'Должно быть от 2 до 30 символов'}};
 const config = {authorization: "ключ",ip: "http://95.216.175.5/cohort7",}; // настройки
 const api = new Api(config);
 const card = new Card(api);
 const validation = new FormValidator({words:words});
 const cardList = new CardList({card:card, api:api});
 cardList.render(container, cards);
 const popupCard = new PopupCard({ validation:validation,api:api});
 const popupProfile = new PopupProfile({ validation:validation,api:api});
 const popupImage = new PopupImage();
 *
 *
 * Класс Api это отдельный класс, который ничего не знает о других классах и методах
 * Вы можете только получать данные из этого класса и использовать эти данные.
 * Представьте, что я дам Вам другой класс(допустим DataBase) к внутренностям которого вы не будете иметь доступ и даже прочитать этот файл не сможете
 * предварительно скажу, что у него есть несколько методов  getInitialCards deleteCard addCard, editUserInfo, setUserInfo и так далее
 * Который только возвращает/записывает данные, а вы можете получить только обращаясь к этим методам.
 * Соответственно в классе нельзя реализовать такие методы как querySelector или обратиться к другому классу, а только обратиться к методам сервера или базы.
 * Получается отдельная обязанность. Таким же способом Вы обращаетесь к серверу. Вы не знаете, что на сервере, даже язык программирования, но вы знаете методы
 * к которым обращаетесь и способ обращения. Это и есть обязанность отдельного класса.

 *
 */

/* Я понимаю что изначально код получился очень грязный и запутанный, т.к. все было подано постепенно сначала мы писали функции
потом из них делали классы и т.д. но то что вы предложили сделать в script.js мне пришлось бы все переписывать. У меня как минимум попап
не так реализован, сейчас за него отвечает один класс а у вас три разных. На это уйдет очень много времени. Изначально наверное надо
было дать задание написать все по новой а не переделывать из старого это было бы понятней и чище.
Сейчас я почистил код от лишних глобальных переменных, в классах нет вызова глобальных переменных, api класс работает только с сервером.
Не знаю что тут можно еще быстро улучшить не начиная заново :(
*/

/** 
 * Здравствуйте. 
 * Все приходит с опытом )
 * Работа принимается
 * 
 */