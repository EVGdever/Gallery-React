import {useState, useCallback} from 'react';

function getClass(obj) {
    return {}.toString.call(obj).slice(8, -1);
}

/**
 * this is my http custom hook for fetching request
 * @return {Object}
 */
export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true);
        try {
            const fetchObj = {method};
            if (getClass(body) === 'FormData') {
                fetchObj['body'] = body;
            } else {
                headers['Content-type'] = 'application/json';
            }

            fetchObj['headers'] = headers;

            const response = await fetch(url, fetchObj);
            const data = response.json();

            setLoading(false);
            return data;
        }
        catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, []);

    const clearError = useCallback(() => setError(null),[]);

    return ({ loading, request, error, clearError });
};
