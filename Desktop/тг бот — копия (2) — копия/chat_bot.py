import sqlite3
from telegram import Update, ReplyKeyboardMarkup, InlineKeyboardButton, InlineKeyboardMarkup, InputFile
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, CallbackQueryHandler, filters, ContextTypes
import logging
import openpyxl
import os

# Включаем логирование
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)

# Инициализация базы данных
def init_db():
    conn = sqlite3.connect('vacancies.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS vacancies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            salary TEXT,
            functions TEXT,
            knowledge TEXT,
            required_experience TEXT
        )
    ''')
    conn.commit()
    conn.close()

# Функция для получения вакансий из базы данных с фильтрацией по опыту
def get_vacancies_by_experience(experience):
    conn = sqlite3.connect('vacancies.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM vacancies WHERE required_experience = ?", (experience,))
    vacancies = cursor.fetchall()
    conn.close()
    return vacancies

# Инициализация базы данных
init_db()

# Заполнение таблицы вакансий (раскомментируйте при первом запуске)
def populate_vacancies():
    conn = sqlite3.connect('vacancies.db')
    cursor = conn.cursor()
    
    vacancies = [
        ("Мидл разработчик", "80,000 - 120,000 руб.", "Разработка приложений, участие в проектировании.", "1-3 года", "1-3 года"),
        ("Ведущий разработчик", "120,000 - 180,000 руб.", "Ведение проектов, управление командой.", "3-5 лет", "3-5 лет"),
        ("Архитектор ПО", "150,000 - 250,000 руб.", "Проектирование систем, выбор технологий.", "5+ лет", "5+ лет"),
    ]
    
    cursor.executemany('INSERT INTO vacancies (name, salary, functions, knowledge, required_experience) VALUES (?, ?, ?, ?, ?)', vacancies)
    conn.commit()
    conn.close()

# Заполнение вакансий (раскомментируйте при первом запуске)
# populate_vacancies()

# Функция для создания Excel файла
def create_excel(vacancies, experience):
    filename = f'vacancies_{experience}.xlsx'
    workbook = openpyxl.Workbook()
    sheet = workbook.active
    sheet.title = "Вакансии"

    # Заголовки
    headers = ["Название", "Оплата", "Функции", "Знания", "Требуемый опыт"]
    sheet.append(headers)

    # Заполнение данными
    for vacancy in vacancies:
        sheet.append([vacancy[1], vacancy[2], vacancy[3], vacancy[4], vacancy[5]])

    workbook.save(filename)
    return filename

# Функция для удаления Excel файлов
def delete_excel_files():
    for filename in os.listdir('.'):
        if filename.endswith('.xlsx'):
            os.remove(filename)
            logging.info(f'Удален файл: {filename}')

# ID бота оператора
OPERATOR_CHAT_ID = '5771722959'  # ID чата оператора

# Функция старт
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    keyboard = [
        ["Подбор вакансии", "Вопрос оператору"],
        ["/stop"]
    ]
    reply_markup = ReplyKeyboardMarkup(keyboard, resize_keyboard=True)

    await update.message.reply_text('Привет! Я ваш бот для подбора вакансий. Чем могу помочь?', reply_markup=reply_markup)

# Функция остановки бота
async def stop(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    delete_excel_files()  # Удаление всех Excel файлов
    
    # Отправка фото перед остановкой
    with open('./ib.webp', 'rb') as photo:
        await context.bot.send_photo(chat_id=update.message.chat_id, photo=InputFile(photo), caption='До скорой встречи!')

    await update.message.reply_text(
        'Бот остановлен. Все созданные файлы Excel удалены. Спасибо за использование! Нажмите "Старт", чтобы начать заново.',
        reply_markup=ReplyKeyboardMarkup(
            [["/start"]],
            resize_keyboard=True
        )
    )
    await context.bot.stop()

# Функция для обработки текстовых сообщений
async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    text = update.message.text.strip().lower()

    if text == "подбор вакансии":
        experience_keyboard = [
            ["Нет опыта", "1-3 года"],
            ["3-5 лет", "5+ лет"],
            ["/stop"]
        ]
        reply_markup = ReplyKeyboardMarkup(experience_keyboard, resize_keyboard=True)
        await update.message.reply_text('Какой у вас опыт в сфере IT?', reply_markup=reply_markup)

    elif text in ["нет опыта", "1-3 года", "3-5 лет", "5+ лет"]:
        logging.info(f"Запрос вакансий для опыта: {text}")
        vacancies = get_vacancies_by_experience(text)
        logging.info(f"Найденные вакансии: {vacancies}")

        if not vacancies:
            await update.message.reply_text(
                'Извините, нет доступных вакансий для вашего уровня опыта.\n'
                'Вы можете просмотреть вакансии [здесь](https://example.com/vacancies).',
                parse_mode='Markdown'
            )
            return
        
        response = 'Вот доступные вакансии:\n\n'
        for vacancy in vacancies:
            response += f"**Название:** {vacancy[1]}\n" \
                        f"**Оплата:** {vacancy[2]}\n" \
                        f"**Функции:** {vacancy[3]}\n" \
                        f"**Знания:** {vacancy[4]}\n" \
                        f"**Требуемый опыт:** {vacancy[5]}\n\n"
        
        await update.message.reply_text(response)

        # Создание Excel файла
        excel_file = create_excel(vacancies, text)

        # Кнопка для скачивания
        keyboard = [[InlineKeyboardButton("Скачать вакансии", callback_data=excel_file)]]
        reply_markup = InlineKeyboardMarkup(keyboard)
        await update.message.reply_text('Вы можете скачать файл с вакансиями:', reply_markup=reply_markup)

    elif text == "вопрос оператору":
        await update.message.reply_text('Пожалуйста, напишите ваш вопрос, и я передам его оператору.')
        context.user_data['waiting_for_question'] = True

    elif context.user_data.get('waiting_for_question'):
        operator_message = f"Вопрос от пользователя {update.message.from_user.id}: {text}"
        await context.bot.send_message(chat_id=OPERATOR_CHAT_ID, text=operator_message)
        
        await update.message.reply_text('Ваш вопрос отправлен оператору. Спасибо!')
        context.user_data['waiting_for_question'] = False

    else:
        # Обработка некорректного ввода
        if 'waiting_for_question' in context.user_data and context.user_data['waiting_for_question']:
            await update.message.reply_text('Пожалуйста, напишите ваш вопрос, и я передам его оператору.')
        else:
            keyboard = [
                ["Подбор вакансии", "Вопрос оператору"],
                ["/stop"]
            ]
            reply_markup = ReplyKeyboardMarkup(keyboard, resize_keyboard=True)
            await update.message.reply_text(
                'Извините, я не понимаю ваш ответ. Пожалуйста, выберите один из предложенных вариантов:',
                reply_markup=reply_markup
            )

# Функция для обработки нажатия кнопки "Скачать"
async def button_callback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    query = update.callback_query
    await query.answer()

    # Получаем имя файла из callback_data
    filename = query.data
    with open(filename, 'rb') as file:
        await context.bot.send_document(chat_id=query.from_user.id, document=InputFile(file, filename=filename))
    
    # Удаляем файл после отправки
    os.remove(filename)

    # Показать клавиатуру после отправки документа
    keyboard = [
        ["Вопрос оператору", "/stop"]
    ]
    reply_markup = ReplyKeyboardMarkup(keyboard, resize_keyboard=True)
    await context.bot.send_message(chat_id=query.from_user.id, text='Вы можете задать вопрос оператору или остановить бота.', reply_markup=reply_markup)

# Функция для обработки команды помощи
async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    help_text = (
        "Доступные команды:\n"
        "/start - Начать диалог с ботом\n"
        "/stop - Остановить бота\n"
        "Подбор вакансии - Узнать о доступных вакансиях\n"
        "Вопрос оператору - Задать вопрос оператору"
    )
    await update.message.reply_text(help_text)

# Основная функция для запуска бота
if __name__ == '__main__':
    application = ApplicationBuilder().token('7925119146:AAFBP_-JKrbK1rD1l4VfVv-Ez7DCXtPUZu0').build()

    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("stop", stop))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    application.add_handler(CallbackQueryHandler(button_callback))

    # Запуск бота
    application.run_polling()
