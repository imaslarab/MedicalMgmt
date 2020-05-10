import httpService  from "./HttpService";
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

    getUserDetail() {
        let user = {
            userId: storageRepository.getItem(StorageKeys.UserId),
            name: storageRepository.getItem(StorageKeys.UserName),
            email: storageRepository.getItem(StorageKeys.Email),
        }
        return user;
    }

    login(value, password) {
        let request = {
            email: value,
            password: password
        };

        let url = '/login';
        
        return httpService.post(url, request, (response) => {
            storageRepository.setItem(StorageKeys.UserName, response.name);
            storageRepository.setItem(StorageKeys.UserId, response.id);
            storageRepository.setItem(StorageKeys.Email, response.email);
            storageRepository.setItem(StorageKeys.UserRole, response.role);

            window.location.href = "/";
        });
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
