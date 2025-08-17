import React from 'react'
import { Category } from '../Category/Category';

export function CategoryList({ categories, activeCategory, setActiveCategory }) {
  return (
<ul className="flex gap-2 overflow-x-auto flex-wrap py-7">
  <Category category={null} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
  {categories.map(cat => (
    <Category key={cat.idCategory} category={cat} activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>))}
</ul>)}
