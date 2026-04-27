import asyncio
import instaloader
import pandas as pd
from aiogram import Bot, Dispatcher, types
from aiogram.utils import executor
from openpyxl.styles import Font, Alignment, Border, Side, PatternFill
import os
import sys

# Виправлення для Windows/Linux середовищ
if sys.platform == 'win32':
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

# --- ТВОЇ ДАНІ ---
TOKEN = "8650205673:AAFHrBrUaisrXuqwU9Ww60o54zWOkp2POyk"
ADMIN_ID = 7443699603
INSTA_USER = "smm.zar@ukr.net"
INSTA_PW = "roma020307"

bot = Bot(token=TOKEN, parse_mode="HTML")
dp = Dispatcher(bot)
L = instaloader.Instaloader()

def create_pretty_excel(data, filename):
    df = pd.DataFrame(data, columns=['№', 'Нікнейм', 'Коментар'])
    df.to_excel(filename, index=False)
    
    from openpyxl import load_workbook
    wb = load_workbook(filename)
    ws = wb.active
    
    header_fill = PatternFill(start_color="333333", end_color="333333", fill_type="solid")
    header_font = Font(color="FFFFFF", bold=True, size=12)
    thin_border = Border(left=Side(style='thin'), right=Side(style='thin'), 
                         top=Side(style='thin'), bottom=Side(style='thin'))
    
    for cell in ws[1]:
        cell.fill = header_fill
        cell.font = header_font
        cell.alignment = Alignment(horizontal="center")
        cell.border = thin_border

    for row in ws.iter_rows(min_row=2):
        for cell in row:
            cell.border = thin_border
            cell.alignment = Alignment(horizontal="left", vertical="center")

    wb.save(filename)

@dp.message_handler(commands=['start'])
async def start(message: types.Message):
    await message.answer("👋 Бот запущений і готовий! Скиньте посилання на пост.")

@dp.message_handler()
async def handle_link(message: types.Message):
    if "instagram.com" not in message.text:
        return

    url = message.text
    status_msg = await message.answer("🔄 Обробка... Зачекайте.")

    try:
        # Спроба завантажити сесію, щоб не логінитись щоразу
        try:
            L.load_session_from_file(INSTA_USER)
        except:
            L.login(INSTA_USER, INSTA_PW)
            L.save_session_to_file()

        shortcode = url.split("/")[-2] if url.endswith("/") else url.split("/")[-1]
        post = instaloader.Post.from_shortcode(L.context, shortcode)

        participants = []
        count = 0

        for comment in post.get_comments():
            count += 1
            username = comment.owner.username
            text = comment.text
            participants.append([count, f"@{username}", text])
            
            if count <= 30: # Обмеження сповіщень, щоб не спамити
                await bot.send_message(ADMIN_ID, f"🔔 №{count} — @{username}")
            
            await asyncio.sleep(0.2)

        filename = f"results_{shortcode}.xlsx"
        create_pretty_excel(participants, filename)

        with open(filename, 'rb') as file:
            await bot.send_document(ADMIN_ID, file, caption=f"✅ Готово! Учасників: {count}")
        
        os.remove(filename)
        await status_msg.delete()

    except Exception as e:
        await message.answer(f"❌ Помилка: {str(e)}")

if __name__ == '__main__':
    print("Бот запущений...")
    executor.start_polling(dp, skip_updates=True)
