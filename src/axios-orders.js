import axios from "axios";

const instance = axios.create({
    baseURL: "https://react-my-burger-4e1ad-default-rtdb.firebaseio.com/"
    // baseURL: "https://react-my-burger-3db24-default-rtdb.europe-west1.firebasedatabase.app/"
})

export default instance;
