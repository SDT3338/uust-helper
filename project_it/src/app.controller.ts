import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service.js';
import {extname} from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import express from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/lost/:id')
  getLost(@Param('id') id: number) {
    return this.appService.getLostById(id);
  }
  @Get('/api/losts')
  getLosts(
    @Query('page') page: number = 1,
    @Query('count') count: number = 10,
  ) {
    return this.appService.getLosts(page, count);
  }
  @Post('/api/lost')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './photos',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async postLost(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: express.Response,
  ) {
    if (!body.description || !body.phone || !file) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error:
          'Все поля (description, phone, photo) обязательны для заполнения',
      });
    }

    try {
      const photoPath = `/photos/${file.filename}`;

      const createdLost = await this.appService.createLost({
        description: body.description,
        phone: body.phone,
        photo: photoPath,
      });

      return res.status(HttpStatus.CREATED).json({
        error: false,
        id: createdLost.id,
        description: createdLost.description,
        photo: createdLost.photo,
        phone: createdLost.phone,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: 'Ошибка при создании объявления',
      });
    }
  }
}
