import { Children } from 'react'

import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Meals from './components/Meals/Meals';
import Ingrediant from './components/Ingrediant/Ingrediant';
import Notfound from './components/Notfound/Notfound';
import Area from './components/Area/Area';
import MealDetails from './components/MealDetails/MealDetails';

function App() {


  let router = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        { index: true, element: <Meals /> },
        { path: "Ingrediant", element: <Ingrediant /> },
        { path: "Area", element: <Area /> },
          { path: "meal/:id", element: <MealDetails /> },
        { path: "*", element: <Notfound /> }
      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={router}> </RouterProvider>
    </>
  )
}

export default App
