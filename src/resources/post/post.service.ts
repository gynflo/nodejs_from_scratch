import PostModel from '@/resources/post/post.model';
import Post from '@/resources/post/post.interface';

class PostService {
    private post = PostModel;
    /* CRUD => CREATE */
    public async create(title: string, body: string): Promise<Post> {
        try {
            const post = await this.post.create({ title, body });
            return post;
        } catch (error) {
            throw new Error('Unable to create post');
        }
    }
    /* CRUD => READ ALL */
    public async findAll(): Promise<{} | void> {
        try {
            return await this.post.find();
        } catch (error) {
            throw new Error('No items found in the collection');
        }
    }
    /* CRUD => UPDATE */
    public async update(id: string, body: Post) {
        try {
            return await this.post.findByIdAndUpdate(id, {
                $set: body,
            });
        } catch (error) {
            throw new Error('Unable to create post');
        }
    }

    /* CRUD => DELETE */
    public async delete(id: string) {
        try {
            return await this.post.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('No Item');
        }
    }
}

export default PostService;
