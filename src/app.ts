import App from './core/app';
import userRouter from './user/routers/user-router';

const routers = [
    { url: '/api/user', router: userRouter }
]

new App(routers)
    .run()