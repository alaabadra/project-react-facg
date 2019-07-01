const addStudent = (username, data) => {
    localStorage.setItem(username, JSON.stringify(data));
}

const getStudent = (username) => {
    return localStorage.getItem(username);
}
export {addStudent, getStudent};