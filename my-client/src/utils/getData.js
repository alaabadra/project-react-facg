const checkResponse = (response) => {
    if (response.status !== 200) {
        return {
            error: `Error with request with status code ${response.status} type ${response.statusText}`
        };
    }
    return response.json();
}
const getData = (url) => {
    return (
        fetch(url)
        .then(res => checkResponse(res))
    );
};

export default getData;
