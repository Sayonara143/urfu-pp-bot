import { Scenes } from 'telegraf';
import { MyContext } from '../interfaces/IMyContext';
import { getMainMenu } from '../keyboard';

export const Main = new Scenes.BaseScene<MyContext>('main');

Main.enter((ctx) => {
    ctx.reply('Вы вошли в главное меню!', getMainMenu());
    if (ctx.message?.message_id) {
        ctx.deleteMessage(ctx.message.message_id);
    }
});

Main.action('addHistory', async (ctx) => {
    if (ctx.update.callback_query.message?.message_id) {
        ctx.deleteMessage(ctx.update.callback_query.message?.message_id);
    }
    ctx.scene.enter('addHistory');
});
Main.action('getMyHistory', async (ctx) => {
    if (ctx.update.callback_query.message?.message_id) {
        ctx.deleteMessage(ctx.update.callback_query.message?.message_id);
    }
    ctx.scene.enter('getMyHistory');
});
Main.action('getRandomHistory', async (ctx) => {
    if (ctx.update.callback_query.message?.message_id) {
        ctx.deleteMessage(ctx.update.callback_query.message?.message_id);
    }
    ctx.scene.enter('getRandomHistory');
});
