SELECT
SUM(hours_worked) hours_worked
FROM
fdd.tm2_time_entry_item
WHERE
project_id = {project_id}

Bind Variables for getTmSumHoursWorkedProject
project_id [Integer]