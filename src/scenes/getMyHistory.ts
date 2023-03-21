import {  Scenes } from 'telegraf';
import { exitKeyBoard } from '../keyboard';
import * as GoogleSheetsService from '../services/googleSheetsService';

export const GetMyHistory = new Scenes.BaseScene<Scenes.SceneContext>('getMyHistory');

GetMyHistory.enter(async (ctx) => {
    try {
        const res = await GoogleSheetsService.getData()
        if (res.data.values) {
            const filteredData = res.data.values.filter(
                (row) => row[0] !== 'User ID' && row[0] === ctx.from?.id.toString(),
            );

            if (filteredData.length > 0) {
                let message = 'Твои истории:\n';
                filteredData.forEach((row) => {
                    message += `- ${row[2]}\n`;
                });
                ctx.reply(message, exitKeyBoard());
            } else {
                ctx.reply('Я не нашел твои истории', exitKeyBoard());
            }
        } else {
            ctx.reply('No data found', exitKeyBoard());
        }
    } catch (err) {
        // Если произошла ошибка, отправляем сообщение об ошибке
        console.error(err);
        ctx.reply('Произошла ошибка', exitKeyBoard());
    }
});

GetMyHistory.action('exit', async (ctx) => {
    if (ctx.update.callback_query.message?.message_id) {
        ctx.deleteMessage(ctx.update.callback_query.message?.message_id);
    }
    ctx.scene.enter('main');
});
