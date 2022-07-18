import UserModel from '@/resources/user/user.model';
import token from '@/utils/token';

class UserService {
    private user = UserModel;

    /*
     *Register a new user
     * Return token: string
     */
    public async register(
        username: string,
        email: string,
        password: string,
        role: string
    ): Promise<string | Error> {
        try {
            const user = await this.user.create({
                username,
                email,
                password,
                role,
            });
            const accessToken = token.createToken(user);
            return accessToken;
        } catch (error) {
            throw new Error('Unable to create user');
        }
    }

    /*
     *Attempt to login user
     */
    public async login(
        email: string,
        password: string
    ): Promise<string | Error> {
        try {
            const user = await this.user.findOne({ email });

            if (!user) {
                throw new Error(
                    'Unable to find user with that Email Address !'
                );
            }

            if (await user.isValidPassword(password)) {
                return token.createToken(user);
            }else {
                throw new Error('Wrong Credentials')
            }
        } catch (error) {
            throw new Error('Something went wrong !');
        }
    }
}

export default UserService;
