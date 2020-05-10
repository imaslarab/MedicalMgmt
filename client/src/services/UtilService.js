class UtilService {
    constructor() {
        this.uid_map = {'uid': 0};
    }

    getAgeFromDob(birthday) {
        birthday = new Date(birthday);
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch

        return Math.abs(ageDate.getUTCFullYear() - 1970);
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
    
        return weekDay + '. ' + this.formatDateString(date);
    }

    formatDBDate(date) {
        date = new Date(date);
        let year = date.getFullYear().toString().substr(-2)
        let month = date.toLocaleDateString('en-us', {  month: 'short' })
        let day = date.getDate();
    
        return day + '-' + month + '-' + year;
    }

    formatTimeFromDate(date) {
        date = new Date(date);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    formatDateString(date) {
        date = new Date(date);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
    
        return month + '/' + day + '/' + year;
    }

    dateToTimestamp(date) {
        return new Date(date);
    }
}

export const utilService = new UtilService();
