export const StorageKeys = {
    UserId: "userId",
    UserName: "userName",
    Email: "email",
    UserRole: "userRole",
};

let storage = require('store')

class StorageRepository {

    getItem(key) {
        let data = storage.get(key);
        if (data) {
            return data.replace(/"/g, "");
        } else {
            return "";
        }
    }

    getObject(key) {
        let data = storage.get(key);
        return data;
    }

    setItem(key, data) {
    storage.set(key, data);
    }

    removeItem(key) {
    storage.remove(key);
    }

    clear() {
    storage.clearAll();
    }
}

export const storageRepository = new StorageRepository();
