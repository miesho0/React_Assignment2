export function Category({ category, activeCategory, setActiveCategory }) {
  const categoryName = category ? category.strCategory : 'All';

  return (
    <li className={`cursor-pointer px-4 py-2 rounded-full border transition-all duration-200 shadow-sm ${activeCategory === categoryName
      ? 'bg-black text-white border-black'
      : 'bg-neutral-100 text-gray-800 border-gray-300 hover:bg-white'}`}
      onClick={() => setActiveCategory(categoryName)}>
      {categoryName}
    </li>
  )
}
