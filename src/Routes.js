import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  SignIn as SignInView,
  Profile as ProfileView,
  ProProfile as ProProfileView,
  Subscription as SubscriptionView,
  Payment as PaymentView,
  Confirm as ConfirmView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/auth"
      />
      <Route path="/auth" exact>
        <SignInView />
      </Route>
      <Route path='/subscription' >
        <SubscriptionView />
      </Route>
      <Route path='/profile' >
        <ProfileView />
      </Route>
      <Route path='/pro-profile' >
        <ProProfileView />
      </Route>
      <Route path='/payment' >
        <PaymentView />
      </Route>
      <Route path='/confirm/:token' >
        <ConfirmView />
      </Route>
    </Switch>
  );
};

export default Routes;
