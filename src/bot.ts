import { session, Telegraf, Scenes } from 'telegraf';

import 'dotenv/config';
import { getStartMenu } from './keyboard';
import { AddHistory } from './scenes/addHistory';
import { Main } from './scenes/main';
import { MyContext } from './interfaces/IMyContext';
import { GetMyHistory } from './scenes/getMyHistory';
import { GetRandomHistory } from './scenes/getRandomHistory';

const Stage = Scenes.Stage;
const bot = new Telegraf<MyContext>(process.env.BOT_TOKEN || '');
// Создаем экземпляр клиента Google API

const stage = new Stage<MyContext>([AddHistory, Main, GetMyHistory, GetRandomHistory]);
stage.hears('exit', (ctx) => ctx.scene.leave());


bot.use(session());
bot.use(stage.middleware());

bot.start((ctx) => {
    const name = ctx.message.from.username || 'пользователь';
    ctx.reply(`Привествую вас, ${name}`, getStartMenu());
});

bot.action('mainMenu', async (ctx) => {
    ctx.scene.enter('main');
    if (ctx.update.callback_query.message?.message_id) {
        ctx.deleteMessage(ctx.update.callback_query.message?.message_id);
    }
});

// Запускаем бота
bot.launch();
