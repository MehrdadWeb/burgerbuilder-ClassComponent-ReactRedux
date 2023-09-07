import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios-orders";

export function addIngredient(name) {

    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }

}

export function removeIngredient(name) {

    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }

}

export function fetchIngredientsFailed () {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export function setIngredients(ingredients) {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export function initIngredients() {

    return dispatch => {
        axios.get(`/ingredients.json`)
            .then(response => {
                dispatch(setIngredients(response.data))
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed())
            })
    }

}