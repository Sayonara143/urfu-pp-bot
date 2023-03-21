import { Markup } from 'telegraf';

export function getMainMenu() {
    return Markup.inlineKeyboard(
        [
            Markup.button.callback('Мои истории', 'getMyHistory'),
            Markup.button.callback('Добавить историю', 'addHistory'),
            Markup.button.callback('Посмотреть рандомную историию', 'getRandomHistory'),
        ],
        { columns: 2 },
    );
}

export function getStartMenu() {
    return Markup.inlineKeyboard([Markup.button.callback('Главное меню', 'mainMenu')], { columns: 1 });
}

export function yesNoKeyboard() {
    return Markup.inlineKeyboard([Markup.button.callback('Да', 'yes'), Markup.button.callback('Нет', 'no')], {
        columns: 2,
    });
}

export function exitKeyBoard() {
    return Markup.inlineKeyboard([Markup.button.callback('Выйти', 'exit')], { columns: 1 });
}

export function saveCancelKeyboard() {
    return Markup.inlineKeyboard(
        [Markup.button.callback('Сохранить', 'save'), Markup.button.callback('Отменить', 'cancel')],
        { columns: 2 },
    );
}

export function cancelKeyboard() {
    return Markup.inlineKeyboard([Markup.button.callback('Отменить', 'cancel')], { columns: 2 });
}
