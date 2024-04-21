import React from 'react'
import classes from './meals-grid.module.css'
import MealItem from './meal-item'

function MealsGrid( {meals} ) {
  return (
    <ul>
        {meals?.map(meal => {
            return (
                <li className={classes.meals} key={meal.id}>
                    {<MealItem {...meal}/>}
                </li>
            )
        })}
    </ul>
  )
}

export default MealsGrid