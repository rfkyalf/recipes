// server/api/recipes.ts
import axios from 'axios';
import * as cheerio from 'cheerio';
import { defineEventHandler } from 'h3';

interface Recipe {
  title: string;
  image: string;
  slug: string;
  calory: string | null;
  duration: string | null;
  difficulty: string | null;
}

interface Pagination {
  currentPage: number;
  totalPage: number;
}

interface ResponseData {
  status_code: number;
  message: string;
  data: Recipe[];
  pagination: Pagination;
}

export default defineEventHandler(async (event): Promise<ResponseData> => {
  try {
    const query = getQuery(event);
    const currentPage = parseInt(query.page as string) || 1;
    const url = `https://www.masakapahariini.com/resep/page/${currentPage}/`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const recipes: Recipe[] = [];

    // Scrape recipes
    $('section._recipes-list .row > div').each((_, element) => {
      const recipeElement = $(element);
      const title = recipeElement.find('h3.card-title a').text().trim();
      const image =
        recipeElement.find('picture img').attr('data-src') ||
        recipeElement.find('picture img').attr('src') ||
        '';
      const href = recipeElement.find('h3.card-title a').attr('href') || '';
      const slug = href.split('/resep/').pop()?.replace(/\/$/, '') || '';
      const duration = recipeElement
        .find('a.btn.item:has(.icon-clock) span')
        .text()
        .trim();
      const cal = recipeElement.find('a.btn.item.icon_fire').text().trim();
      const difficulty = recipeElement
        .find('a.btn.item.icon_difficulty')
        .text()
        .trim();

      if (title && image && slug) {
        recipes.push({
          title,
          image,
          slug,
          duration: duration || null,
          calory: cal || null,
          difficulty: difficulty || null,
        });
      }
    });

    // Get pagination information
    const paginationElement = $('div._pagination-button');

    // Get current page
    const activePage =
      parseInt(paginationElement.find('a.page-numbers.active').text().trim()) ||
      1;

    // Get total pages from "Akhir" button
    const lastPageHref = paginationElement.find('a.last').attr('href') || '';
    const totalPage = parseInt(
      lastPageHref.split('/page/').pop()?.replace('/', '') || '1'
    );

    return {
      status_code: 200,
      message: 'Success',
      pagination: {
        currentPage: activePage,
        totalPage: totalPage,
      },
      data: recipes,
    };
  } catch (error) {
    console.error('Scraping error:', error);
    return {
      status_code: 500,
      message:
        error instanceof Error
          ? error.message
          : 'An error occurred while scraping data',
      data: [],
      pagination: {
        currentPage: 0,
        totalPage: 0,
      },
    };
  }
});
