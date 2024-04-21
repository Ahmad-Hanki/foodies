
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";


import fs from "node:fs";// same as const fs = require('fs');npm

import { redirect  } from "next/navigation";

const db = sql("meals.db");


export const getMeals = () => {
  //throw new Error('soothing went wrong')
  return db.prepare("SELECT * FROM meals").all();
};

export function getMeal(slug) {
  return db.prepare(`SELECT * FROM meals WHERE slug = ?`).get(slug);
}


export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".")[1];
  const fileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (err) => {
    if (err) {
      throw new Error("saving image went wrong");
    }
  });

  // store in db
  meal.image = `/images/${fileName}`; // need the path


  db.prepare(
    `
    INSERT INTO meals 
    (
        title, summary, instructions, creator, creator_email, image, slug 
    )
    VALUES (
        @title,
        @summary,
        @instructions,
        @creator,
        @creator_email,
        @image,
        @slug
    )
    `
  ).run(meal);

  redirect('/');
}
