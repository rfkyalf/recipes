import axios from 'axios';
import * as cheerio from 'cheerio';
import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    const url = 'https://www.masakapahariini.com/';
    const response = await axios.get(url);

    if (response.status !== 200) {
      return {
        status_code: response.status,
        message: 'Failed to fetch the URL',
        data: [],
      };
    }

    const $ = cheerio.load(response.data);

    // Scraping categories
    const categories: Array<{ title: string; image: string; slug: string }> =
      [];
    $('section._categories-list ul > li').each((_, element) => {
      const title = $(element).find('p a').text().trim();
      const image =
        $(element).find('picture img').attr('data-src') ||
        $(element).find('picture img').attr('src');
      const slug =
        $(element).find('p a').attr('href')?.split('/').filter(Boolean).pop() ||
        '';

      if (title && image && slug) {
        categories.push({ title, image, slug });
      }
    });

    // Scraping newest_recipe
    const newestRecipes: Array<{
      title: string;
      image: string;
      slug: string;
      duration: string;
      difficulty: string;
    }> = [];

    $('section._recipes-list .row > div').each((_, element) => {
      const title = $(element).find('h3.card-title a').text().trim();
      const image =
        $(element).find('picture img').attr('data-src') ||
        $(element).find('picture img').attr('src');
      const slug =
        $(element)
          .find('h3.card-title a')
          .attr('href')
          ?.split('/')
          .filter(Boolean)
          .pop() || '';
      const duration = $(element)
        .find('a.btn.item:has(.icon-clock) span')
        .text()
        .trim();
      const difficulty = $(element)
        .find('a.btn.item.icon_difficulty')
        .text()
        .trim();

      if (title && image && slug) {
        newestRecipes.push({
          title,
          image,
          slug,
          duration: duration || 'Unknown',
          difficulty: difficulty || 'Unknown',
        });
      }
    });

    return {
      status_code: 200,
      message: 'Success',
      data: {
        categories,
        newestRecipes,
      },
    };
  } catch (error) {
    return {
      status_code: 500,
      message: 'An error occurred while scraping data',
      data: [],
    };
  }
});
