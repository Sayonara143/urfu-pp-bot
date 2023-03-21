import {  Scenes } from 'telegraf';
import { exitKeyBoard } from '../keyboard';
import * as GoogleSheetsService from '../services/googleSheetsService';

export const GetRandomHistory = new Scenes.BaseScene<Scenes.SceneContext>('getRandomHistory');
const random = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

GetRandomHistory.enter(async (ctx) => {
    try {
        const res = await GoogleSheetsService.getData()
        if (res.data.values) {
            const dataHistory = res.data.values[random(0,res.data.values.length-1)];
            const title = dataHistory[2]
            const story = dataHistory[3]
            ctx.reply(`Название: ${title}\nИсторию: ${story}`,exitKeyBoard());
        } else {
            ctx.reply('No data found');
        }
    } catch (err) {
        // Если произошла ошибка, отправляем сообщение об ошибке
        console.error(err);
        ctx.reply('Произошла ошибка', exitKeyBoard());
    }
});

GetRandomHistory.action('exit', async (ctx) => {
    if (ctx.update.callback_query.message?.message_id) {
        ctx.deleteMessage(ctx.update.callback_query.message?.message_id);
    }
    ctx.scene.enter('main');
});
