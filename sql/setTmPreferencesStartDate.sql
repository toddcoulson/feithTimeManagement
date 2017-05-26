update fdd.tm2_user_preferences set
start_date = fdd.iso_to_date({start_date})
where
usr_id = {usr_id}


Bind Variables for setTmPreferencesStartDate
start_date [String]
usr_id [Integer]