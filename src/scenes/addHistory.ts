import { Scenes } from 'telegraf';
import { MyContext } from '../interfaces/IMyContext';
import { cancelKeyboard, exitKeyBoard, saveCancelKeyboard } from '../keyboard';
import * as GoogleSheetsService from '../services/googleSheetsService';

export const AddHistory = new Scenes.BaseScene<MyContext>('addHistory');
AddHistory.enter((ctx) => {
    ctx.scene.session.isInputTitle = false;
    ctx.scene.session.story = {
        title: '',
        body: '',
    };
    ctx.reply('Вы вошли в меню создания истории!\nВведите название истории', exitKeyBoard());
    if (ctx.message?.message_id) {
        ctx.scene.session.prevMessage = ctx.update.update_id;
    }
});

AddHistory.on('text', (ctx) => {
    try {
        ctx.deleteMessage(ctx.update.message.message_id - 1);
        if (!ctx.scene.session.isInputTitle) {
            const data = ctx.message?.text;
            ctx.scene.session.story.title = data;
            ctx.reply(`Вы ввели название: ${data}\nНапишите историю`, cancelKeyboard());
            ctx.scene.session.isInputTitle = true;
        } else {
            const data = ctx.message?.text;
            ctx.scene.session.story.body = data;
            const title = ctx.scene.session.story.title;
            ctx.reply(`Вы ввели название: ${title}\nВы ввели историю: ${data}`, saveCancelKeyboard());
            ctx.scene.session.isInputTitle = true;
        }
        ctx.deleteMessage(ctx.update.message.message_id);
    } catch (error) {
        ctx.reply('Произошла ошибка', exitKeyBoard());
    }
});

AddHistory.action('save', async (ctx) => {
    try {
        const title = ctx.scene.session.story.title;
        const bodyStory = ctx.scene.session.story.body;
        if (!title || !bodyStory) {
            throw new Error('Invalid data');
        }

        await GoogleSheetsService.append(ctx.from?.id || 0, ctx.from?.username || 'default', title, bodyStory);
        if (ctx.update.callback_query.message?.message_id) {
            ctx.deleteMessage(ctx.update.callback_query.message?.message_id);
        }
        ctx.reply('История успешно добавлена!', exitKeyBoard());
    } catch (err) {
        ctx.reply('Произошла ошибка при добавлении истории', exitKeyBoard());
    }
});
AddHistory.action('cancel', async (ctx) => {
    ctx.scene.session.story.title = '';
    ctx.scene.session.story.body = '';
    ctx.scene.session.isInputTitle = false;
    if (ctx.update.callback_query.message?.message_id) {
        ctx.deleteMessage(ctx.update.callback_query.message?.message_id);
    }

    ctx.reply('Данные очищены!');
    ctx.scene.enter('main');
});

AddHistory.action('exit', async (ctx) => {
    if (ctx.update.callback_query.message?.message_id) {
        ctx.deleteMessage(ctx.update.callback_query.message?.message_id);
    }
    ctx.scene.enter('main');
});
