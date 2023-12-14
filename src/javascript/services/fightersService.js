import callApi from '../helpers/apiHelper';

class FighterService {
    #endpoint = 'fighters.json';

    #endpointDetails;

    async getFighters() {
        try {
            const apiResult = await callApi(this.#endpoint);
            return apiResult;
        } catch (error) {
            throw error;
        }
    }

    async getFighterDetails(id) {
        this.endpointFighterDetails = `details/fighter/${id}.json`;
        try {
            const apiResult = await callApi(this.endpointFighterDetails);
            return apiResult;
        } catch (error) {
            throw error;
        }
    }
}

const fighterService = new FighterService();

export default fighterService;
