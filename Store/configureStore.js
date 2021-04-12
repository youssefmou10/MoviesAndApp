// Store/configureStore.js

import { createStore } from 'redux';
import toggleFavorite from './Redecers/favoriteReducers'

export default createStore(toggleFavorite)