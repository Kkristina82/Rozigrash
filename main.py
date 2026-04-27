import asyncio
import instaloader
import pandas as pd
from aiogram import Bot, Dispatcher, types
from aiogram.utils import executor
from openpyxl.styles import Font, Alignment, Border, Side, PatternFill
import os

# --- ТВОЇ ДАНІ ---
TOKEN = "8650205673:AAFHrBrUaisrXuqwU9Ww60o54zWOkp2POyk"
ADMIN_ID = 7443699603
INSTA_USER = "smm.zar@ukr.net"
INSTA_PW = "roma020307"

# Ініціалізація
bot = Bot(token=TOKEN, parse_mode="HTML")
dp = Dispatcher(bot)
L = instaloader.Instaloader()

def create_pretty_excel(data, filename):
    """Створює Excel з гарним оформленням"""
    df = pd.DataFrame(data, columns=['№', 'Нікнейм', 'Коментар'])
    df.to_excel(filename, index=False)
    
    # Додаємо стиль через openpyxl
    from openpyxl import load_workbook
    wb = load_workbook(filename)
    ws = wb.active
    
    # Стиль шапки
    header_fill = PatternFill(start_color="333333", end_color="333333", fill_type="solid")
    header_font = Font(color="FFFFFF", bold=True, size=12)
    thin_border = Border(left=Side(style='thin'), right=Side(style='thin'), 
                         top=Side(style='thin'), bottom=Side(style='thin'))
    
    for cell in ws[1]:
        cell.fill = header_fill
        cell.font = header_font
        cell.alignment = Alignment(horizontal="center")
        cell.border = thin_border

    # Автопідбір ширини колонок та рамки для контенту
    for row in ws.iter_rows(min_row=2):
        for cell in row:
            cell.border = thin_border
            cell.alignment = Alignment(horizontal="left", vertical="center")

    dims = {}
    for row in ws.rows:
        for cell in row:
            if cell.value:
                dims[cell.column_letter] = max((dims.get(cell.column_letter, 0), len(str(cell.value))))
    for col, value in dims.items():
        ws.column_dimensions[col].width = value + 5

    wb.save(filename)

@dp.message_handler(commands=['start'])
async def start(message: types.Message):
    await message.answer("👋 Вітаю! Я допоможу з розіграшем.\n\n"
                         "Просто надішліть мені <b>посилання на пост</b> в Instagram.")

@dp.message_handler()
async def handle_link(message: types.Message):
    if "instagram.com" not in message.text:
        await message.answer("❌ Це не схоже на посилання Instagram.")
        return

    url = message.text
    status_msg = await message.answer("🔄 Заходжу в Instagram... зачекайте.")

    try:
        # Авторизація (виконується один раз або при потребі)
        try:
            L.load_session_from_file(INSTA_USER)
        except:
            L.login(INSTA_USER, INSTA_PW)
            L.save_session_to_file()

        # Отримання даних поста
        shortcode = url.split("/")[-2] if url.endswith("/") else url.split("/")[-1]
        post = instaloader.Post.from_shortcode(L.context, shortcode)

        await status_msg.edit_text("⏳ Збираю коментарі та формую список...")

        participants = []
        count = 0

        for comment in post.get_comments():
            count += 1
            username = comment.owner.username
            text = comment.text
            participants.append([count, f"@{username}", text])
            
            # Сповіщення про кожного нового (якщо учасників багато - краще вимкнути)
            if count <= 50: # обмежуємо сповіщення, щоб не спамити
                await bot.send_message(
                    ADMIN_ID, 
                    f"🔔 <b>Учасник №{count}</b>\n👤 @{username}\n💬 {text}"
                )
            
            await asyncio.sleep(0.1) # маленька пауза для стабільності

        # Створення файлу
        filename = f"rozigrash_{shortcode}.xlsx"
        create_pretty_excel(participants, filename)

        # Надсилаємо готовий файл
        with open(filename, 'rb') as file:
            await bot.send_document(
                ADMIN_ID, 
                file, 
                caption=f"✅ Збір завершено!\n📊 Всього учасників: <b>{count}</b>\n\nФайл оформлено та готово."
            )
        
        os.remove(filename) # видаляємо тимчасовий файл
        await status_msg.delete()

    except Exception as e:
        await message.answer(f"❌ Виникла помилка: {str(e)}\n\n"
                             f"Перевірте, чи акаунт Instagram не заблоковано.")

if __name__ == '__main__':
    print("Бот запущений...")
    executor.start_polling(dp, skip_updates=True)
