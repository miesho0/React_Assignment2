import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader/Loader';

export default function MealDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getMealDetails() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      setMeal(data.meals[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMealDetails();
  }, [id]);

  if (loading) return <Loader />;
  if (!meal) return <p className="text-center mt-10">Meal not found!</p>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient) ingredients.push({ ingredient, measure });
  }

  return (
    <>
      <h1 className="text-4xl font-bold mb-6">{meal.strMeal}</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3 flex flex-col gap-4 ">
          <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full rounded-2xl mb-4" />
          <div className="flex gap-4 text-center  justify-center">
            {meal.strYoutube && (
              <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg" >
                <span>youtube</span> </a>)}
            {meal.strSource && (
              <a href={meal.strSource} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg" >
                <span>source</span> </a>)}
          </div></div>
        <div className="lg:w-1/3">
          <p className="font-Pacifico">{meal.strInstructions}</p>
        </div>
        <div className="lg:w-1/3 bg-white p-8 rounded-2xl shadow-inner h-full">
          <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
          <table className="w-full text-left">
            <tbody>
              {ingredients.map((ing, idx) => (
                <tr key={idx} className="border-b last:border-b-0">
                  <td className="py-1">{ing.ingredient}</td>
                  <td className="py-1 text-right">{ing.measure}</td></tr>))}</tbody></table></div></div>
    </>
  );
}
