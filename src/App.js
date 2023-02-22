import {BrowserRouter, Redirect, Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import PopularPage from './components/PopularPage'
import SearchPage from './components/SearchPage'
import AccountDetails from './components/AccountDetails'
import MovieDetails from './components/MovieDetails'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/popular" component={PopularPage} />
      <ProtectedRoute exact path="/movies/:id" component={MovieDetails} />
      <ProtectedRoute exact path="/search" component={SearchPage} />
      <ProtectedRoute exact path="/account" component={AccountDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
