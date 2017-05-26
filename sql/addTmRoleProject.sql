INSERT INTO fdd.TM2_role_project_lookup
(ROLE_ID,
 ROLE_CODE,
 PHASE_ID,
 CLASSIFICATION,
 NEGOTIATED,
 ROLE_HOURS)
VALUES
({role_id},
 {role_code},
 {phase_id},
 {classification},
 {negotiated},0)


Bind Variables for addTmRoleProject
role_id [Integer]
phase_id [Integer]
negotiated [Decimal]
classification [String]
role_code [String]