SELECT DISTINCT
time_entry_id,
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
fdd.customer_info_fc cust ON tei.customer_id = cust.cust_id
INNER JOIN
fdd.tm2_project_item proj ON tei.project_id = proj.project_id
INNER JOIN
fdd.tm2_phase_item ph ON tei.phase_id = ph.phase_id
INNER JOIN
fdd.tm2_role_project_lookup r ON tei.role_id = r.role_id
WHERE EXISTS (SELECT *
              FROM fdd.tm2_project_managers pm
              WHERE tei.project_id = pm.project_id
              AND pm.usr_id = {usr_id});


Bind Variables for getTmTimeEntriesMyProjects
usr_id [Integer]