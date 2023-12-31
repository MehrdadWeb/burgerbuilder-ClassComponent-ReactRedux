import React, {Component} from "react";
import { connect } from "react-redux";

import axios from "../../axios-orders";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler.js";
import * as actions from "../../store/actions/index";

// Burger.js + BurgerIngredient.js => نمایش همبرگر
export class BurgerBuilder extends Component {
    // هستند که Local UI State جزء error و loading و purchasing
    // نمی بینم redux نیازی به واگذاری آن ها به
    state = {
        purchasing: false,
    }
    // دریافت شده و در مرورگر نمایش داده شود Firebase صدا زده شود و محتویات اولیه از onInitIngredients می خواهیم زمانی که برنامه بارگذاری شد، سریعا
    componentDidMount() {

        this.props.onInitIngredients();

    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
                    .map(igKey => {
                        return ingredients[igKey]
                    })
                    .reduce((sum, el) => {
                        return sum + el;
                    }, 0)
        
        return sum > 0
    }

    purchaseHandler = () => {

        if(this.props.isAuthenticated) {
            this.setState({purchasing: true})
        } else {
            this.props.onSetAuthRedirectPath("/checkout")
            this.props.history.push("/auth")
        }

    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHander = () => {
        this.props.onInitPurchase();
        this.props.history.push("/checkout")
    }
    
    render() {

        const disabledInfo = {
            ...this.props.ings
        }
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        
        if(this.props.ings) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                            ingredientAdded={this.props.onIngredientAdded}
                            ingredientRemoved={this.props.onIngredientRemoved}
                            disabled={disabledInfo}
                            price={this.props.price}
                            purchaseable={this.updatePurchaseState(this.props.ings)}
                            ordered={this.purchaseHandler}
                            isAuth={this.props.isAuthenticated}
                    />
                </Auxiliary>
            )
            {/* OrderSummary.js  => نمایش خلاصه ی سفارش به کاربر */ }
            orderSummary = <OrderSummary 
                                ingredients={this.props.ings}
                                purchaseCancelled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContinueHander}
                                price={this.props.price}
                            />
        }



        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)( withErrorHandler(BurgerBuilder, axios) );
