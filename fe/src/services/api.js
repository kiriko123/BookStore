import axios from '../utils/axios-customize.js'

export const callRegister = ({name, email, password, confirmPassword, firstName}) => {
    return axios.post('/api/v1/auth/register', {name, email, password, confirmPassword, firstName});
}
export const callLogin = ({ username, password}) => {
    return axios.post('/api/v1/auth/login', {username, password});
}
export const callFetchAccount = () =>{
    return axios.get("/api/v1/auth/account");
}
export const callForgot = ({ email }) =>{
    return axios.post("/api/v1/auth/forgot", {email});
}
export const callLogout = () => {
    return axios.post("/api/v1/auth/logout");
}
export const callFetchListUser = (query) =>{
    return axios.get(`/api/v1/user?${query}`);
}
export const callDeleteUser = (userId) =>{
    return axios.delete(`/api/v1/user/${userId}`);
}
export const callCreateUser = ({name, firstName, email, password, passwordConfirm, age, gender, address, phoneNumber}) => {
    return axios.post('/api/v1/user', {name, firstName, email, password, passwordConfirm, age, gender, address, phoneNumber});
}
export const callBulkCreateUser = (data) => {
    return axios.post('/api/v1/user/bulk-create', data);
}
export const callUpdateUser = ({id, name, firstName, email, age, gender, address, phoneNumber, enabled}) => {
    return axios.put(`/api/v1/user`, {id, name, firstName, email, age, gender, address, phoneNumber, enabled});
}
export const callUploadFile = (file, folder) => {
    // Tạo FormData để đính kèm tệp
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    return axios.post('/api/v1/files', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
export const callChangePassword = ({email, password, newPassword, confirmPassword }) => {
    return axios.post('/api/v1/auth/change-password',{email, password, newPassword, confirmPassword})
}
export const callUpdateInfo = ({id, firstName, name, userAvatar, gender, age, phoneNumber, address}) => {
    return axios.post('/api/v1/auth/update-info', {id, firstName, name, imageUrl: userAvatar, gender, age, phoneNumber, address});
};

export const callFetchBooks = (query) =>{
    return axios.get(`/api/v1/book?${query}`);
}
export const callFetchCategory = () => {
    return axios.get(`/api/v1/category/all`);
}

export const callFetchAllCategory = (query) => {
    return axios.get(`/api/v1/category?${query}`);
}

export const callCreateCategory = ({name}) => {
    return axios.post('/api/v1/category', {name});
}

export const callDeleteCategory = (categoryId) => {
    return axios.delete(`/api/v1/category/${categoryId}`);
}

export const callUpdateCategory = ({id, name, active}) => {
    return axios.put(`/api/v1/category`, {id, name, active});
}

export const callCreateBook = ({name, author, price, quantity, soldQuantity, thumbnail, categoryName, sliders}) => {
    return axios.post('api/v1/book', {name, author, price, quantity, soldQuantity, thumbnail, categoryName, sliders})
}
export const callDeleteBook = (bookId) =>{
    return axios.delete(`/api/v1/book/${bookId}`);
}
export const callUpdateBook = ({id, name, author, price, quantity, soldQuantity, thumbnail, categoryName, sliders, active}) => {
    return axios.put('api/v1/book', {id, name, author, price, quantity, soldQuantity, thumbnail, categoryName, sliders, active})
}
export const callFetchBookById = (id) => {
    return axios.get(`api/v1/book/${id}`)
}
export const callPlaceOrder = (data) => {
    return axios.post('/api/v1/order', {
        ...data
    })
}

export const callOrderHistory = (id) => {
    return axios.get(`/api/v1/order/${id}`);
}
export const callGetAllOrder = (query) => {
    return axios.get(`/api/v1/order?${query}`);
}
export const callCheckOut = (data) => {
    return axios.post('/api/v1/payment/create-payment-intent', data);
}
export const callCountAllUserOrderAndTotalPrice = () => {
    return axios.get('/api/v1/statistics/count-all-user-order-and-total-price');
}
export const callRevenueStatistics = () => {
    return axios.get('/api/v1/statistics/revenueStatistics');
}

export const callRevenueStatisticsByDate = () => {
    return axios.get('/api/v1/statistics/revenue-statistics-by-date');
}
export const callCountBookSold = () => {
    return axios.get('/api/v1/statistics/count-book-sold');
}
export const callFindRevenueStatisticsByMonthAndYear = () => {
    return axios.get('/api/v1/statistics/find-revenue-statistics-by-month-and-year');
}
export const callCategoryBookCount = () => {
    return axios.get('/api/v1/statistics/category-book-count');
}
export const callCountUserOrder = () => {
    return axios.get('/api/v1/statistics/count-user-order');
}
