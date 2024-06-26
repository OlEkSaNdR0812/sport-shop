import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
      req.user = req.user; // Assuming user is set by Passport
    } else {
      req.user = null;
    }
    next();
  }
}
