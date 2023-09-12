'use client'
import React from 'react';
import CategoryGames from '../../../../components/CategoryGames/page';

const CategoryPage = () => {
  const category = window.location.pathname.split('/').pop();

  return (
    <div>
      <h1>Games in Category: {category}</h1>
      <CategoryGames category={category as string} />
    </div>
  );
};

export default CategoryPage;
