import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";
import MealsLoadingPage from "./loading-out";


export const metadata = { // for search engines or shown when sharing links
    title: 'All Meals',
    description: 'Browse the meals.',
  };


function MealsPage() {

  async function Meals() {
    const meals = await getMeals();
    return <MealsGrid meals={meals} />;
  }

  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious Meals, Created
          <span className={classes.highlight}> BY YOU </span>{" "}
        </h1>
        <p>Choose your favorite recipe and cook it yourself</p>
        <p className={classes.cta}>
          <Link href={"/meals/share"}>Share Your Own Meal</Link>
        </p>
      </header>
      <main className={classes.main}>

        <Suspense fallback={<MealsLoadingPage/> }>
             <Meals/>
        </Suspense>
       
      </main>
    </>
  );
}

export default MealsPage;
