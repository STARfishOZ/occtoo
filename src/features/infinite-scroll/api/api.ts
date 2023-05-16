import axios from 'axios';
import { ListItem } from '../types/infinite-scroll.types';

export const getPictures = async(
    limit = 5,
    pageParam = 0,
): Promise<ListItem[]> =>
    await axios.get(`${process.env.REACT_APP_RANDOM_API_URL}=${limit}&page=${pageParam}`)
        .then((response) => response.data);