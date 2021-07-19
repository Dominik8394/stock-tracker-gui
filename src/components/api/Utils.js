import axios from 'axios';

/**
 * Checks if the server is running
 * @returns Http status code 200
 */
export const serverIsUp = async () => {
    return axios.get('http://localhost:3001/api/server/health')
    .then(res => {
        return res.status;
    });
}