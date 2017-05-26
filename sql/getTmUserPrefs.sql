SELECT
up.USR_ID,
USE_FILTER,
LAST_NUMBER_ENTRIES,
START_DATE,
END_DATE,
usr_name
FROM fdd.tm2_user_preferences up
INNER JOIN
fdd.user_info ui
ON up.usr_id = ui.usr_id
WHERE {usr_id}= up.usr_id