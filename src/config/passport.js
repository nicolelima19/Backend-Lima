import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { getUserById, getUserEmail, registerUser } from '../services/user.js';

export const initializePassport = () => {
    passport.use('github', new GitHubStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile._json.email;
            const user = await getUserEmail(email);

            if (user) return done(null, user);

            const newUser = {
                name: profile._json.name,
                email,
                password: ''
            };

            const result = await registerUser({ ...newUser });
            return done(null, result);

        } catch (error) {
            return done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await getUserById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};
