import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CategoryList } from '../CategoryList/CategoryList';
import MealsList from '../MealsList/MealsList';
import Loader from '../Loader/Loader';
import Footer from '../Footer/Footer';

export default function Meals() {
  const [Category, setCategory] = useState([]);
 const [ActiveCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(false);
  const [errMsg, setError] = useState("");

async function getCategory() {
  try {
    setLoading(true);
    setError("");
    const { data } = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
    setCategory(data.categories);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      {loading && <Loader />}
      {errMsg && <p className='text-center text-4xl text-red-600 pt-20'>{errMsg}</p>}
      {!loading && !errMsg && (
        <>
          <CategoryList categories={Category} activeCategory={ActiveCategory} setActiveCategory={setActiveCategory}/>
          <div className='my-10'> <MealsList activeCategory={ActiveCategory} /> </div>
        </>
      )}
    </>
  );
}
