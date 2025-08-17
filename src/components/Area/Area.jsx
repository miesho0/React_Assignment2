import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

export default function Area() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [selectedArea, setSelectedArea] = useState("All");
  const [meals, setMeals] = useState([]);

  async function getAreas() {
    try {
      setLoading(true);
      setErrMsg("");
      const { data } = await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
      setAreas(data.meals || []);
      getMealsByArea("All");
    } catch (error) {
      setErrMsg(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function getMealsByArea(area) {
    try {
      setLoading(true);
      setErrMsg("");
      let url = "";
      if (area === "All") {
        url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
      } else {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
      }
      const { data } = await axios.get(url);
      setMeals(data.meals || []);
    } catch (error) {
      setErrMsg(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAreas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-6">
      {loading && <Loader />}
      {errMsg && <p className="text-center text-red-500">{errMsg}</p>}
      {!loading && (<ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
        <li className={`cursor-pointer px-4 py-2 rounded-full border transition-all duration-200 shadow-sm ${selectedArea === "All"
          ? "bg-black text-white border-black"
          : "bg-neutral-100 text-gray-800 border-gray-300 hover:bg-white"}`}
          onClick={() => { setSelectedArea("All"); getMealsByArea("All"); }}>All</li>
        {areas.map((area, index) => (
          <li key={index}
            className={`cursor-pointer px-4 py-2 rounded-full border transition-all duration-200 shadow-sm ${selectedArea === area.strArea
              ? "bg-black text-white border-black"
              : "bg-neutral-100 text-gray-800 border-gray-300 hover:bg-white"}`}
            onClick={() => {
              setSelectedArea(area.strArea);
              getMealsByArea(area.strArea);
            }}>
            {area.strArea}
          </li>
        ))}
      </ul>
      )}
      {meals.length > 0 && (
        <>
          {selectedArea !== "All" && (
            <h3 className="text-2xl font-semibold mb-4 text-center">
              Meals with {selectedArea}
            </h3>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-20 pt-10">
            {meals.map((meal) => (
              <div key={meal.idMeal} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl hover:scale-105 transition-transform duration-300">
                <img src={meal.strMealThumb} alt={meal.strMeal} className="w-40 h-40 rounded-full object-cover -mt-16 shadow-md hover:rotate-360 transition-all duration-700" />
                <h3 className="font-semibold text-lg mt-4">{meal.strMeal}</h3>
                <p className="text-green-600 text-sm mt-1">
                  {meal.strArea || 'Unknown'}</p>
                <Link to={`/meal/${meal.idMeal}`}
                  className="mt-4 bg-green-500 text-white px-6 py-2 rounded-full font-medium hover:bg-green-600 transition-colors duration-300">View Recipe</Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}  
