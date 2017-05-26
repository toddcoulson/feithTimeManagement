SELECT
SUM(hours_worked) total_day_hours
FROM
fdd.tm2_time_entry_item
WHERE
usr_id = {usr_id}
AND
entry_date = fdd.iso_to_date({entry_date})

Bind Variables for getTmHoursWorkedEmployeeDate
usr_id [Integer]
entry_date [String]