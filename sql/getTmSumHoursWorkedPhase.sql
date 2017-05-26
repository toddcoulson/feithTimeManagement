SELECT
SUM(hours_worked) hours_worked
FROM
fdd.tm2_time_entry_item
WHERE
project_id = {project_id}
AND
phase_id = {phase_id}


Bind Variables for getTmSumHoursWorkedPhase
phase_id [Integer]
project_id [Integer]