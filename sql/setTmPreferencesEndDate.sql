update fdd.tm2_user_preferences set
end_date = fdd.iso_to_date({end_date})
where
usr_id = {usr_id}
Bind Variables for setTmPreferencesEndDate
usr_id [Integer]
end_date [String]