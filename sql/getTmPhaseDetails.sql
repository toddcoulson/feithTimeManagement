SELECT
phase_id,
phase_name,
phase_status,
fdd.date_to_iso(phase_status_date) as phase_status_date,
fdd.date_to_iso(start_date) as start_date,
fdd.date_to_iso(end_date) as end_date,
estimated_hours,
budget,
description,
cusr,
ctime,
musr,
mtime
FROM fdd.tm2_phase_item
where phase_id = {phase_id}



Bind Variables for getTmPhaseDetails
phase_id [Integer]