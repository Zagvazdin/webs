import pandas as pd

# Открытие файла Excel и чтение всех листов
xls = pd.ExcelFile(r'C:\Users\Сергей\Desktop\full\1\forD\сектор.xlsx')
sheet_names = xls.sheet_names

# Чтение данных из первого листа
df1 = pd.read_excel(xls, sheet_names[0])

# Чтение данных из второго листа
df2 = pd.read_excel(xls, sheet_names[1])

# Создаем словарь, который сопоставляет первые два столбца df2 со значением третьего столбца df2
value_map = {}
for i in range(len(df2)):
    key = (str(df2.iloc[i, 0]), str(df2.iloc[i, 1]))
    value_map[key] = df2.iloc[i, 2]

# Создаем новый DataFrame, объединяя данные из df1 и значения из value_map
new_df = df1.copy()
new_df['Продано'] = [value_map.get((str(new_df.iloc[i, 0]), str(new_df.iloc[i, 1])), 0) for i in range(len(new_df))]

# Сохраняем обновленный DataFrame в новый файл Excel
new_df.to_excel(r'C:\Users\Сергей\Desktop\full\1\forD\updated_сектор.xlsx', index=False)

# Читаем данные из файла "updated_сектор"
updated_df = pd.read_excel(r'C:\Users\Сергей\Desktop\full\1\forD\updated_сектор.xlsx')

# Находим все ключи, которые есть в value_map, но не в updated_df
missing_keys = set(value_map.keys()) - set(zip(updated_df['Название клиента'], updated_df['Адрес']))

# Добавляем недостающие строки в updated_df
for key in missing_keys:
    updated_df = updated_df._append({'Название клиента': key[0], 'Адрес': key[1], 'Планы': 0, 'Продано': value_map[key]}, ignore_index=True)

# Сохраняем обновленный DataFrame "updated_df" в новый файл Excel
updated_df.to_excel(r'C:\Users\Сергей\Desktop\full\1\forD\updated_сектор.xlsx', index=False)

print('Все отработало без ошибок 1 сектор')
