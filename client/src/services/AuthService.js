import {httpService}  from "./HttpService";
import {utilService} from "./UtilService";
import {StorageKeys, storageRepository} from "./StorageRepository";

class AuthService {
    constructor() {
        this.refreshTokenPromise = null;
    }

    isLoggedIn() {
        let userId = storageRepository.getItem(StorageKeys.UserId);
        if (userId) {
            return true;
        }

        return false;
    }

    getRequestId() {
        return utilService.getRandomString(24);
    }

    getUserId() {
        let userId = storageRepository.getItem(StorageKeys.UserId);
        let email = storageRepository.getItem(StorageKeys.Email);

        if (!userId) {
            this.logout();
        }

        return userId;
    }

    setUserId(userId) {
        storageRepository.setItem(StorageKeys.UserId, userId);
    }

    getUserRole() {
        return storageRepository.getItem(StorageKeys.UserRole);
    }


    login(value, password) {
        let request = {};
        request.email = value;
        request.password = password;
        
        storageRepository.setItem(StorageKeys.UserName, "test");
        storageRepository.setItem(StorageKeys.UserId, "123123");
        storageRepository.setItem(StorageKeys.Email, value);

        switch(password) {
            case 'doctor':
            case 'admin':
                storageRepository.setItem(StorageKeys.UserRole, "doctor");
                window.location.href = "/";
                break;
            case 'patient':
            default:
                storageRepository.setItem(StorageKeys.UserRole, "patient");
                window.location.href = "/";
                break;
        }
        

        // return httpService.login("/auth/login", request)
        // .then((response) => {
        //     if (response.status === 'OK' && response.data) {
        //     if (response.data.accountLocked === true) {
        //         return {status: 'ERROR', accountLocked: response.data.accountLocked};
        //     } else {
        //         const authResult = response.data.authToken;

        //         this.saveCredentials(authResult);
        //         const url = '/users/' + this.getUserId() + '/user';

        //         return httpService.get(url).then((res) => {
        //         if (res.data) {
        //             const userName = res.data.fullName;
        //             const identifier = this.getIdentifier(res.data);
        //             storageRepository.setItem(StorageKeys.UserName, userName);
        //             storageRepository.setItem(StorageKeys.Email, identifier);
        //         }
        //         return res;
        //         });
        //     }
        //     } else {
        //     return {status: 'ERROR', error: response.error};
        //     }
        // });
    }


    saveCredentials(authResult) {
        //save in local storage
        storageRepository.setItem(StorageKeys.AccessToken, authResult.accessToken);
        storageRepository.setItem(StorageKeys.RefreshToken, authResult.refreshToken);
        storageRepository.setItem(StorageKeys.UserId, authResult.userID);
    }

    logout() {
        const data = {
            userId: storageRepository.getItem(StorageKeys.UserId)
        }
        storageRepository.clear();

        window.location.href = '/login';
    }
}

const authService = new AuthService();
export default authService;
