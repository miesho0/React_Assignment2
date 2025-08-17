import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';

export default function MealsList({ activeCategory }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMeals() {
      try {
        setLoading(true);
        let url = '';
        if (activeCategory === 'All') {
          url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        } else {
          url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${activeCategory}`;
        }

        const { data } = await axios.get(url);
        setMeals(data.meals || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchMeals();
  }, [activeCategory]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader />
      </div>
    );
  }

  if (!meals || meals.length === 0) {
    return <p className="text-center text-xl py-20">No meals found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-20">
      {meals.map((meal) => (
        <div
          key={meal.idMeal}
          className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl hover:scale-105 transition-transform duration-300"
        >
          <img src={meal.strMealThumb} alt={meal.strMeal}  className="w-40 h-40 rounded-full object-cover -mt-16 shadow-md hover:rotate-360 transition-all duration-700"/>
          <h3 className="font-semibold text-lg mt-4">{meal.strMeal}</h3>
          <p className="text-green-600 text-sm mt-1"> {meal.strArea || 'Unknown'} </p>
          <Link to={`/meal/${meal.idMeal}`} className="mt-4 bg-green-500 text-white px-6 py-2 rounded-full font-medium hover:bg-green-600 transition-colors duration-300" >View Recipe</Link>
        </div>
      ))}
    </div>
  );
}
