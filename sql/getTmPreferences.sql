SELECT
usr_id,
date_value,
fdd.date_to_iso(start_date) as start_date,
fdd.date_to_iso(end_date) as end_date,
last_number_entries
FROM fdd.tm2_user_preferences
where usr_id = {usr_id}


Bind Variables for getTmPreferences
usr_id [Integer]