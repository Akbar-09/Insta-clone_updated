import re

with open('../database_dump.sql', 'r', encoding='utf-8', errors='ignore') as f:
    tables = []
    for line in f:
        match = re.search(r'CREATE TABLE public\."?(\w+)"?', line)
        if match:
            tables.append(match.group(1))

print("Found tables:", sorted(list(set(tables))))
