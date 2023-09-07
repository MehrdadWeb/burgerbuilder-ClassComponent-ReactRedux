import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export function purchaseBurgerSuccess(orderId, orderData) {

    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: orderId,
        orderData: orderData
    }

}

export function purchaseBurgerFail(error) {

    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }

}

export function purchaseBurgerStart() {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export function purchaseBurger(orderData, token) {
    
    return dispatch => {

        dispatch(purchaseBurgerStart())

        axios.post(`/orders.json?auth=${token}`, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error))
            })
    }

}

export function purchaseInit() {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export function fetchOrdersSuccess(orders) {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export function fetchOrdersFail(error) {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export function fetchOrdersStart() {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export function fetchOrders(token, userId) {

    return dispatch => {
        dispatch(fetchOrdersStart())

        // const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;

        // axios.get(`/orders.json${queryParams}`)
        axios.get('/orders.json')
            .then(res => {
                
                const fetchedOrders = [];
                for(let key in res.data) {
                    fetchedOrders.push({
                        id: key,
                        ...res.data[key]
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders))
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err))
            })

    }

    

}