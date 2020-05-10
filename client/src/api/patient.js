import httpService from '../services/HttpService';

class PatientApi {
    static listAllPatients(callback) {
        let url = `/patients`;

        return httpService.get(url, callback);
    }

    static getPatient(patientId, callback) {
        let url = `/patients/${patientId}`;

        return httpService.get(url, callback);
    }

    static addPatient(patient, callback) {
        let url = `/patients`;

        return httpService.post(url, patient, callback);
    }

    static editPatient(patientId, patient, callback) {
        let url = `/patients/${patientId}`;

        return httpService.put(url, patient, callback);
    }

    static deletePatient(patientId, callback) {
        let url = `/patients/${patientId}`;

        return httpService.delete(url, callback);
    }

}

export default PatientApi;