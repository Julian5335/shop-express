import App from './core/app';
import routers from './routers';

new App()
    .connectToDb()
    .addRouters(routers)
    .run()