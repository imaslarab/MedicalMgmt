import httpService from '../services/HttpService';

class PatientApi {
    static listAllPatients(callback) {
        let url = `/patient`;

        return httpService.get(url, callback);
    }

    static addPatient(patient, callback) {
        let url = `/patient`;

        return httpService.post(url, patient, callback);
    }

    static deletePatient(patientId, callback) {
        let url = `/patient/${patientId}/delete`;
        let data = {
            patientId
        };

        return httpService.post(url, data, callback);
    }

}

export default PatientApi;