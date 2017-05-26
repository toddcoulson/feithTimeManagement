SELECT
r.ROLE_CODE,
ROLE_NAME,
CLASSIFICATION,
rpl.ROLE_ID,
PHASE_ID,
NEGOTIATED,
ROLE_HOURS,
STANDARD_RATE,
CLEARANCE_RATE
FROM fdd.tm2_roles r
INNER JOIN fdd.tm2_role_project_lookup rpl ON r.role_code = rpl.role_code
WHERE PHASE_ID = {phase_id}


Bind Variables for getTmPhaseRoles
phase_id [Integer]