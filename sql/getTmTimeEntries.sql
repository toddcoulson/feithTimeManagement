SELECT DISTINCT
time_entry_id,
u.usr_desc,
u.usr_id,
cust.name company_name,
proj.project_name,
ph.phase_name,
r.role_code,
r.role_id,
task_name,
r.classification,
fdd.date_to_iso(tei.entry_date) entry_date,
tei.submit_date,
tei.hours_worked,
tei.type_of_hours,
tei.comments
FROM
fdd.tm2_time_entry_item tei
INNER JOIN
FDD.USER_INFO u
ON u.usr_id = tei.usr_id
INNER JOIN
fdd.customer_info_fc cust
ON tei.customer_id = cust.cust_id
INNER JOIN
fdd.tm2_project_item proj
ON tei.project_id = proj.project_id
INNER JOIN
fdd.tm2_phase_item ph
ON tei.phase_id = ph.phase_id
INNER JOIN
fdd.tm2_role_project_lookup r
ON tei.role_id = r.role_id
WHERE
({usr_id} = tei.usr_id OR {usr_id} is null)
AND
({project_id} = proj.project_id OR {project_id} is null)
AND
({phase_id} = ph.phase_id OR {phase_id} is null)
AND (
    (entry_date between fdd.iso_to_date({min_date}) and fdd.iso_to_date({max_date}))
    OR
    ({min_date} is null OR {max_date} is null)
)
order by entry_date desc;
Bind Variables for getTmTimeEntries
usr_id [Integer]
project_id [Integer]
phase_id [Integer]
min_date [String]
max_date [String]