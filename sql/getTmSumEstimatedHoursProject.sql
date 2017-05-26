SELECT
SUM(role_hours) estimated_hours
FROM
fdd.tm2_role_project_lookup role
INNER JOIN
fdd.TM2_Phase_Item phase
ON role.phase_id = phase.phase_id
WHERE
phase.project_id = {project_id}


Bind Variables for getTmSumEstimatedHoursProject
project_id [Integer]