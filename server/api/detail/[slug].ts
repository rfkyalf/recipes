import { defineEventHandler, createError } from 'h3';
import axios from 'axios';
import * as cheerio from 'cheerio';

interface Ingredient {
  amount: string;
  item: string;
}

interface Step {
  number: number;
  image: string | null;
  description: string;
}

interface RecipeDetail {
  title: string;
  description: string;
  image: string | null;
  duration: string | null;
  calories: string | null;
  difficulty: string | null;
  servings: string | null;
  ingredients: Ingredient[];
  steps: Step[];
}

interface ResponseData {
  status_code: number;
  message: string;
  data: RecipeDetail | null;
}

function cleanText(text: string): string {
  return text
    .replace(/\s+/g, ' ') // Replace multiple spaces/newlines with single space
    .trim();
}

function scrapeRecipeDetails($: cheerio.CheerioAPI): RecipeDetail {
  const title = $('header._section-title h1').text().trim();
  const description = $('div.excerpt').text().trim();
  const image =
    $('div .image-wrapper picture source').attr('data-srcset') || null;
  const duration =
    $('a.btn.item:has(.icon-clock) span').first().text().trim() || null;
  const calories = $('a.btn.item.icon_fire').text().trim() || null;
  const difficulty =
    $('a.btn.item.icon_difficulty').first().text().trim() || null;
  const servings = $('#portions-value').text().trim() || null;

  // Get ingredients with better text cleaning
  const ingredients: Ingredient[] = [];
  $('._recipe-ingredients .d-flex').each((_, element) => {
    const amount = $(element).find('.part').text().trim();
    // Get all text content including linked text
    const item = cleanText($(element).find('.item').text());

    if (amount && item) {
      ingredients.push({ amount, item });
    }
  });

  // Get steps
  const steps: Step[] = [];
  $('._recipe-steps .step').each((index, element) => {
    const $step = $(element);
    const image =
      $step.find('div .thumbnail picture img').attr('data-src') || null;
    const description = cleanText($step.find('.content p').text());

    if (description) {
      steps.push({
        number: index + 1,
        image,
        description,
      });
    }
  });

  return {
    title,
    description,
    image,
    duration,
    calories,
    difficulty,
    servings,
    ingredients,
    steps,
  };
}

export default defineEventHandler(async (event): Promise<ResponseData> => {
  const { slug } = event.context.params as { slug: string };

  if (!slug || typeof slug !== 'string') {
    throw createError({
      statusCode: 400,
      message: 'Slug is required and must be a string.',
    });
  }

  try {
    const url = `https://www.masakapahariini.com/resep/${slug}/`;
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);

    const recipeDetails = scrapeRecipeDetails($);

    if (!recipeDetails.title) {
      return {
        status_code: 404,
        message: 'Recipe not found.',
        data: null,
      };
    }

    return {
      status_code: 200,
      message: 'Success',
      data: recipeDetails,
    };
  } catch (error) {
    console.error('Scraping error:', error);
    return {
      status_code: 500,
      message:
        error instanceof Error
          ? error.message
          : 'An error occurred while scraping data',
      data: null,
    };
  }
});
