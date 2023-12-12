import { Injectable } from '@nestjs/common';
import { getNewsJsonPath } from 'data/news';
import * as fs from 'fs/promises';

type News = {
  title: string;
  text: string;
  imageUrl: string;
};

@Injectable()
export class NewsRepository {
  async getNews(): Promise<News[]> {
    const news: News[] = JSON.parse(await fs.readFile(getNewsJsonPath(), { encoding: 'utf-8' })).news;
    return news;
  }
}
