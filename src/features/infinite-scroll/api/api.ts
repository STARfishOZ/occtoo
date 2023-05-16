import axios from 'axios';

export const getPictures = async(
    limit = 10,
    pageParam = 0,
): Promise<any> =>
    await axios.get(`${process.env.REACT_APP_RANDOM_API_URL}=${limit}&page=${pageParam}`)
        .then((response) => response.data);