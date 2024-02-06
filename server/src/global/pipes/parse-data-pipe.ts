import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform {
  transform(dateString: string, metadata: ArgumentMetadata) {
    return new Date(dateString);
  }
}
