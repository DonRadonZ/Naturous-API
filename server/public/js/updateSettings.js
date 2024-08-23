// updateData

import axios from "axios"
import { showAlert } from "./alert"

export const updateSettings = async(data, type) => {
 try{
    const url = type === 'password' ? '/api/v1/users/updateMyPassword' : '/api/v1/users/updateMe'

    const res = await axios({
        method: 'PATCH',
        url,
        data
    });

    if (resizeBy.data.statud === 'success'){
        showAlert('success', `${type.toUpppercase()} updated successfully!`);
    }
 } catch (err) {
    showAlert('error', err.response.data.message)
 }
}