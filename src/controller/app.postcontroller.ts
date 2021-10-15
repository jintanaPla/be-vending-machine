import { Controller,Body,Headers,HttpCode,Param,Post,Get} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { ProductRequest } from '../models/request/product.request';
import { UpdateRequest } from '../models/request/update.request'
import { request } from 'http';
import { response } from 'express';
import { AdminLoginRequest } from 'src/models/request/admin.login.request';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}
  

  @HttpCode(200)
  @Get('/getAllProduct')
  async getallproduct(
  ) {
      return await this.postService.getAllProduct();
  }

  @HttpCode(200)
  @Post('/locationProduct')
  async locationProduct(
    @Body() request: ProductRequest
  ) {
      return await this.postService.locationProduct(request);
  }

  @HttpCode(200)
  @Post('/updateProduct')
  async updateProduct(
    @Body() request: UpdateRequest
  ) {
      return await this.postService.updateProduct(request);
  }

  @HttpCode(200)
  @Post('/adminLogin')
  async adminLogin(
    @Body() request: AdminLoginRequest
  ) {
      return await this.postService.loginAdmin(request);
  }

  @HttpCode(200)
  @Get('/productAlert')
  async productLessThan() {
      return await this.postService.productLessThan();
  }

}


