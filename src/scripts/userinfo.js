//Класс работы с информацией юзера
class UserInfo {
    constructor(username, userjob, avatar) {
        this.userName = username;
        this.userJob = userjob;
        this.avatarElement = avatar;
    }

    setUserInfo(name, about, avatar) {
        this.name = name;
        this.about = about;
        this.avatar = avatar;
    }

    getUserInfo() {
        return {name: this.name, about: this.about};
    }

    updateUserInfo(name, about, avatar) {
        this.setUserInfo(name, about, avatar);
        this.userName.textContent = this.name;
        this.userJob.textContent = this.about;
        if (avatar) {
            this.avatarElement.style.backgroundImage = `url('${avatar}')`;
        }

    }

    create() {
        this.setUserInfo(this.userName.textContent, this.userJob.textContent);
    }
}

