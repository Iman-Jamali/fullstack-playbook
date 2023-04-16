How to duplicate a row in a table

If `table_1` has a row with auto increment id and tow other columns `name` and `age` then a new row with same columns  with new a `id` can be created by:

```sql
INSERT INTO table_1 (name, age)
SELECT  name, age
FROM table_1 WHERE id = 3;
```
