import { defineEventHandler } from 'h3';
import axios from 'axios';
import * as cheerio from 'cheerio';

interface Recipe {
  title: string;
  image: string;
  slug: string;
  calory: string | null;
  duration: string | null;
  difficulty: string | null;
}

interface Header {
  title: string;
  description: string;
}

interface Category {
  label: string;
  slug: string;
}

interface Pagination {
  currentPage: number;
  totalPage: number;
}

export default defineEventHandler(async (event) => {
  const { slug } = event.context.params as { slug: string };
  const query = getQuery(event); // Untuk mengambil query parameter
  const currentPage = parseInt(query.page as string) || 1; // Default halaman 1

  if (!slug) {
    return {
      status_code: 400,
      message: 'Slug is required',
      header: null,
      categories: [],
      pagination: {
        currentPage: 0,
        totalPage: 0,
      },
      data: [],
    };
  }

  const url = `https://www.masakapahariini.com/resep/${slug}/page/${currentPage}/`;

  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);

    // Scrape header
    const header: Header = {
      title: $('._page-header .title').text().trim(),
      description: $('._page-header .description').text().trim(),
    };

    // Scrape categories
    const categories: Category[] = [];
    $('._category-select .dropdown-menu .dropdown-item').each(
      (_index, element) => {
        const label = $(element).text().trim();
        const link = $(element).attr('href') || '';
        const slug = link.split('/').filter(Boolean).pop() || '';
        if (label && slug) {
          categories.push({ label, slug });
        }
      }
    );

    // Scrape recipes
    const recipes: Recipe[] = [];
    $('._recipe-card').each((_index, element) => {
      const title = $(element).find('.card-title a').text().trim();
      const image = $(element).find('.thumbnail img').attr('data-src') || '';
      const link = $(element).find('.card-title a').attr('href') || '';
      const slug = link.split('/').filter(Boolean).pop() || '';
      const duration = $(element)
        .find('.btn.item .icon-clock + span')
        .text()
        .trim();
      const cal = $(element).find('.icon_fire').text().trim();
      const difficulty = $(element).find('.icon_difficulty').text().trim();

      recipes.push({
        title,
        image,
        slug,
        duration: duration || null,
        calory: cal || null,
        difficulty: difficulty || null,
      });
    });

    // Scrape pagination
    const totalPage = parseInt(
      $('._pagination-button .last').attr('href')?.split('/page/')[1] || '1'
    );

    return {
      status_code: 200,
      message: 'Success',
      pagination: {
        currentPage,
        totalPage,
      },
      data: { categories, header, recipes },
    };
  } catch (error: any) {
    return {
      status_code: error.response?.status || 500,
      message: error.message || 'An error occurred',
      header: null,
      categories: [],
      pagination: {
        currentPage: 0,
        totalPage: 0,
      },
      data: [],
    };
  }
});
