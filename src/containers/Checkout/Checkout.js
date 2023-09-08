import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data")
    }

    render() {

        let summary = <Redirect to="/" />


        if(this.props.ings) {
            // کن redirect بود (سفارش با موفقیت تکمیل شده بود) کاربر را به صفحه اصلی true برابر purchased یعنی اگر
            // در غیر این صورت هنوز در فرآیند خرید هستیم
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;

            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                        ingredients={this.props.ings} 
                    />
                    <Route 
                        path={this.props.match.url + "/contact-data"} 
                        component={ContactData}
                    />
                </div>
            )
        } 

        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout)

