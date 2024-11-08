import { ApiError} from "./types/Error";

export const getError = (error: ApiError) => {
    return error.response && error.response.data.message ? error.response.data.message : error.message;
}