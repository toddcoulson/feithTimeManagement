SELECT
pm.PHASE_ID,
pm.USR_ID,
pm.is_developer,
u.usr_name,
u.usr_desc,
pgi.grp_email as usr_email,
u.usr_type
FROM
FDD.TM2_phase_employees pm
INNER JOIN
FDD.TM2_PHASE_ITEM proj
ON pm.PHASE_ID = proj.PHASE_ID
INNER JOIN
FDD.USER_INFO u
ON u.usr_id = pm.usr_id
inner join fdd.group_info pgi on u.private_grp = pgi.grp_id
WHERE
pm.PHASE_ID = {phase_id}



Bind Variables for getTmPhaseEmployees
phase_id [Integer]
is_developer [Integer]