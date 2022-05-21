import { useContext, Fragment } from 'react';
import SHOP_DATA from '../../shop-data'; 

import { CategoriesContext } from '../../context/categories.context';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

import {Routes, Route} from 'react-router-dom'; 

import './shop-styles.scss'; 

const Shop = () => {



   
    return (
        <Routes>
            <Route index element={<CategoriesPreview/>} />
            <Route path=":category" element={<Category/>} />
        </Routes>
        
    )

}

export default Shop; 