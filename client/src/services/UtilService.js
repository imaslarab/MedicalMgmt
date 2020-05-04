class UtilService {
    constructor() {
        this.uid_map = {'uid': 0};
    }

    possessiveFirstName(fullName) {
        let firstName = '';
    
        const names = fullName.trim().split(' ');
        if (names[0][names[0].length-1] === 's') {
            firstName = `${names[0]}’`;
        } else {
            firstName = `${names[0]}’s`;
        }

        return firstName;
    }

    getRandomString(length = 24) {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
    
        return text;
    }

    formatDate(date) {
        date = new Date(date);
        let weekDay = date.toLocaleString('en-us', {  weekday: 'short' });
        let month = date.getMonth() + 1;
        let day = date.getDate();
    
        return weekDay + '. ' + month + '/' + day;
    }

    dateToTimestamp(date) {
        return new Date(date);
    }
}

export const utilService = new UtilService();
