import { Router, Request, Response, NextFunction } from 'express';

import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';

import validate from '@/resources/post/post.validation';
import PostService from '@/resources/post/post.service';

import validationMiddleware from '@/middleware/validation.middleware';

class PostController implements Controller {
    public path = '/posts';
    public router = Router();
    private PostService = new PostService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
            this.create
        );
        this.router.get(`${this.path}`, this.findAll);
        this.router.patch(`${this.path}/:id`, this.update);
    }
    /* CRUD => CREATE */
    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { title, body } = req.body;
            const post = await this.PostService.create(title, body);
            res.status(201).json({ post });
        } catch (error) {
            next(new HttpException(400, 'Cannot create post'));
        }
    };
    /* CRUD => READ ALL */
    private findAll = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const post = await this.PostService.findAll();
            if (post) {
                res.status(200).json({ post });
            }
        } catch (error) {
            next(new HttpException(404, 'Collection not found'));
        }
    };
    /* CRUD => UPDATE */
    private update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const id = req.params.id;
            const body = req.body;
            const postUpdated = await this.PostService.update(id, body);
            return res.status(200).json({ postUpdated });
        } catch (error) {
            next(new HttpException(400, 'Cannot create post'));
        }
    };
}

export default PostController;
