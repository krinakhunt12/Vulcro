import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import store from './reduxStore';

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export const getStore = () => store;
