SELECT
ROLE_ID,
rpl.PHASE_ID,
HOURLY_RATE,
NEGOTIATED,
ROLE_HOURS,
ROLE_BUDGET,
proj.project_name,
pi.phase_name
FROM fdd.tm2_role_project_lookup rpl
INNER JOIN
fdd.tm2_phase_item pi
ON rpl.phase_id = pi.phase_id
INNER JOIN
fdd.tm2_project_item proj
ON pi.project_id = proj.project_id
WHERE {proj_id} = proj.project_id OR
{phase_id} = pi.phase_id


Bind Variables for getTmProjectRoles
proj_id [Integer]
phase_id [Integer]