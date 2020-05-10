import httpService from '../services/HttpService';

class DoctorApi {
    static listAllDoctors(callback) {
        let url = `/doctors`;

        return httpService.get(url, callback);
    }

    static getDoctor(doctorId, callback) {
        let url = `/doctors/${doctorId}`;

        return httpService.get(url, callback);
    }

    static addDoctor(doctor, callback) {
        let url = `/doctors`;

        return httpService.post(url, doctor, callback);
    }

    static deleteDoctor(doctorId, callback) {
        let url = `/doctors/${doctorId}/delete`;
        let data = {
            doctorId
        };

        return httpService.post(url, data, callback);
    }

}

export default DoctorApi;