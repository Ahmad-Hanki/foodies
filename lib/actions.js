"use server";
import { redirect } from "next/navigation"; // Import the redirect function from next/router
// all the functions now will be treated like a server

import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(title) {
  return title.trim() === "" || !title;
}

export async function shareMeal(prevState, formData) { /// it should accept to parameters bcs of useFormState
  // automatically will reserve this formData
  console.log('ohai')
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    isInvalidText(meal.creator_email) || !meal.creator_email.includes('@') ||
    meal.image.size === 0
  ) {
    return {
        message: 'Invalid Input',
    }
  }

  await saveMeal(meal);
  revalidatePath('/meals'); // stop the aggressive caching
  redirect('/meals');
}
