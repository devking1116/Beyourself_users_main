import axios from 'axios';
import authHeader from './auth-header';
import { Base_Url } from "./../utils/utils";

class APIService {
    login(auth) {
        return axios.post(Base_Url + '/auth/login', auth);
    }
    googleAuth(user) {
        return axios.post(Base_Url + '/auth/googleAuth', { user });
    }
    facebookAuth(user) {
        return axios.post(Base_Url + '/auth/facebookAuth', user);
    }
    register(info) {
        return axios.post(Base_Url + '/auth/register', info);
    }
    forgotpassword(email) {
        return axios.post(Base_Url + '/auth/forgotpassword', { email });
    }
    getProfile(email) {
        return axios.get(Base_Url + '/user/profile', { headers: authHeader(), params: { email: email } });
    }
    updatedProfile(email, newemail, firstname, lastname) {
        return axios.post(Base_Url + '/user/profile', { email, newemail, firstname, lastname }, { headers: authHeader() });
    }
    updatedPassword(email, oldPassword, newPassword) {
        return axios.post(Base_Url + '/user/password', { email, oldPassword, newPassword }, { headers: authHeader() });
    }
    getProProfile(id) {
        return axios.post(Base_Url + '/user/professionalprofile', { id }, { headers: authHeader() });
    }
    getGifts() {
        return axios.get(Base_Url + '/user/gifts', { headers: authHeader() });
    }
    getPromos() {
        return axios.get(Base_Url + '/user/promos', { headers: authHeader() });
    }
    getUserSubscription(email) {
        return axios.get(Base_Url + '/user/subscription', { headers: authHeader(), params: { email: email } });
    }
    getAccountConfirm(token) {
        return axios.get(Base_Url + '/auth/confirm', { headers: authHeader(), params: { token: token } });
    }
    createSubscription(data) {
        return axios.post(Base_Url + '/user/createSubscription', data, { headers: authHeader() });
    }
    createStripeOrder(data) {
        return axios.post(Base_Url + '/user/createStripeOrder', data, { headers: authHeader() });
    }
    createGiftSubscription(data) {
        return axios.post(Base_Url + '/user/createGiftSubscription', data, { headers: authHeader() });
    }
    cancelSubscription(data) {
        return axios.post(Base_Url + '/user/cancelSubscription', data, { headers: authHeader() });
    }
    activateGiftCode(data) {
        return axios.post(Base_Url + '/user/activateGiftCode', data, { headers: authHeader() });
    }
    changePayment(data) {
        return axios.post(Base_Url + '/user/changePayment', data, { headers: authHeader() });
    }
    checkStripeUser(data) {
        return axios.post(Base_Url + '/user/checkStripeUser', data, { headers: authHeader() });
    }
    requestUpdateprofessional(data) {
        return axios.post(Base_Url + '/user/requestUpdateprofessional', data, { headers: authHeader() });
    }
    updateProProfile(data) {
        return axios.post(Base_Url + '/user/updateprofessional', data, { headers: authHeader() });
    }
    searchLocation(searchKey) {
        return axios.post(Base_Url + '/user/searchlocation', { searchKey }, { headers: authHeader() });
    }
}

export default new APIService();