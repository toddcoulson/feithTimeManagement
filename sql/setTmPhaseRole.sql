UPDATE fdd.tm2_role_project_lookup
SET
HOURLY_RATE = {hourly_rate},
CLASSIFICATION = {classification}
WHERE
role_id = {role_id}


Bind Variables for setTmPhaseRole
classification [String]
hourly_rate [Decimal]
role_id [String]