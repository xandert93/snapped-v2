import { lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { PATHS } from './constants/routing-constants';

import { reauthenticate } from './features/auth/state/auth-actions';
import { selectIsAuthenticating } from './features/auth/state/auth-selectors';
import { useMountEffect } from './hooks';

import { ErrorBoundary } from './components';

import { Snackbar } from './features/snackbar/components';
import { Layout, ThemeProvider } from './features/ui/components';
import { ProtectedRoute, PublicRoute } from './features/auth/components';
import { LoadingScreen } from './features/user/components';

// when full app working, uncomment and see what total bundle is vs. code split:
// import { AuthPage,  ActivationPage, HomePage, ProfilePage, AccountPage, ExplorePage, SnapPage, SearchPage, NotFoundPage } from '../../../pages';
const AuthPage = lazy(() => import('./pages/AuthPage'));
const ActivationPage = lazy(() => import('./pages/ActivationPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));
const ExplorePage = lazy(() => import('./pages/ExplorePage'));
const SnapPage = lazy(() => import('./pages/SnapPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const SubscriptionPage = lazy(() => import('./pages/SubscriptionPage'));

const BasketPage = lazy(() => import('./pages/Commerce/BasketPage'));
const ShopPage = lazy(() => import('./pages/Commerce/ShopPage'));
const ProductPage = lazy(() => import('./pages/Commerce/ProductPage'));
const OrdersPage = lazy(() => import('./pages/Commerce/OrdersPage'));
const OrderDetailsPage = lazy(() => import('./pages/Commerce/OrderDetailsPage'));
const CheckoutSettledPage = lazy(() => import('./pages/Commerce/CheckoutSettledPage'));

export const App = () => {
  const dispatch = useDispatch();

  const isAuthenticating = useSelector(selectIsAuthenticating);
  useMountEffect(() => dispatch(reauthenticate()));

  if (isAuthenticating)
    return (
      <ThemeProvider>
        <LoadingScreen />
      </ThemeProvider>
    );
  else
    return (
      <ThemeProvider>
        <Layout>
          <ErrorBoundary>
            <Suspense fallback={<LoadingScreen />}>
              <Switch>
                <PublicRoute path={PATHS.AUTH} component={AuthPage} />
                <Route exact path={PATHS.ACTIVATION} component={ActivationPage} />
                <ProtectedRoute exact path={PATHS.HOME} component={HomePage} />
                <ProtectedRoute exact path={PATHS.SNAP} component={SnapPage} />
                <ProtectedRoute path={PATHS.EXPLORE} component={ExplorePage} />
                <ProtectedRoute path={PATHS.ACCOUNT} component={AccountPage} />
                <ProtectedRoute path={PATHS.SUBSCRIPTION} component={SubscriptionPage} />
                {/* 
                
                <ProtectedRoute path={PATHS.SHOP} component={ShopPage} />
                <ProtectedRoute path={PATHS.PRODUCT} exact component={ProductPage} />
                <ProtectedRoute path={PATHS.BASKET} component={BasketPage} />
                <ProtectedRoute path={PATHS.CHECKOUT_SETTLED} component={CheckoutSettledPage} />
                <ProtectedRoute path={PATHS.ORDERS} exact component={OrdersPage} />
                <ProtectedRoute path={PATHS.ORDER_DETAILS} component={OrderDetailsPage} />
                
                */}
                <ProtectedRoute path={PATHS.PROFILE} component={ProfilePage} />
                {/*PATHS.PROFILE needs to be last or will match everything*/}
                {/* <ProtectedRoute exact path={PATHS.SEARCH} component={SearchPage} />
              
                */}
                <Route component={NotFoundPage} />
              </Switch>
            </Suspense>
          </ErrorBoundary>
        </Layout>
        <Snackbar />
      </ThemeProvider>
    );
};

/*NOTES:

//***I think <Route ordering is really important to prevent certain clashes. E.g place /snap/:snapId above /:username since they will clash.
I think if /:username was "exact", then it wouldn't clash. But I don't want to use "exact" as it prevents nested <Route>s. In fact,
given the *sensitivity* of /:username (matches with absolutely anything!), it appears that it should appear near bottom

- The <Redirect/> from "/camera-roll" to ".../public" is considered good 
practice in the event someone manually navigates to "/camera-roll". 
They are now redirected to the <ProtectedRoute/> above it.

Also eventually consider (not implemented by twitter nor instagram, incidentally):
https://stackoverflow.com/questions/48437381/react-router-v4-redirect-to-all-lowercase-url

*/
