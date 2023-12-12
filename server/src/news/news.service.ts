import { Injectable } from '@nestjs/common';
import { NewsRepository } from './news-repository/news.repository';

@Injectable()
export class NewsService {
  constructor(private newsRepository: NewsRepository) {}

  getNews() {
    return this.newsRepository.getNews();
  }
}
