SELECT
pi.phase_id,
pi.project_id,
phase_name,
phase_status,
fdd.date_to_iso(phase_status_date) as phase_status_date,
fdd.date_to_iso(start_date) as start_date,
fdd.date_to_iso(end_date) as end_date,
estimated_hours,
budget,
pi.description,
pi.cusr,
pi.ctime,
pi.musr,
pi.mtime
FROM
fdd.tm2_phase_item pi
INNER JOIN fdd.tm2_project_item proj ON pi.project_id = proj.project_id
WHERE
{project_id}= pi.project_id and
({phase_id} = pi.phase_id or {phase_id} is null)


Bind Variables for getTmProjectPhase
project_id [Integer]
phase_id [Integer]