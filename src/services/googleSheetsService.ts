import { google } from 'googleapis';

const client = new google.auth.GoogleAuth({
    keyFilename: 'C:/Project/pp/bot/cert.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth: client });
const spreadsheetId = process.env.SPREADSHEET_ID || '';

export const append = async (id: number, username: string, title: string, bodyStory: string) => {
    await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'qwert!A:C',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            values: [[id, username, title, bodyStory, '']],
        },
    });
};

export const getData = async () => {
    return await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'qwert!A:E',
    });
};