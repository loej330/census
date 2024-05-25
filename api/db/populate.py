def make(filename):
    file = open(filename, 'r')
    reader = iter(file.readlines())

    sql = ""
    while (line:=next(reader, "").strip()) != "":
        if line[:2] == '[[' and line[-2:] == ']]':
            sql = sql[:-1] + ';'
            table = line[2:-2]
            columns = next(reader).strip().split(", ")
            sql += f"\nDELETE FROM {table};"
            sql += f"\nINSERT INTO {table} ({', '.join(columns)}) VALUES "
        else: sql += f"\n({', '.join(line.split(', '))}),"

    print(sql)

make("./api/db/csv/data.csv")
