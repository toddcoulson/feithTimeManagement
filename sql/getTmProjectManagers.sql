SELECT
pm.PROJECT_ID,
pm.USR_ID,
u.usr_name,
u.usr_desc,
pgi.grp_email as usr_email,
u.usr_type
FROM
FDD.TM2_PROJECT_MANAGERS pm
INNER JOIN
FDD.TM2_PROJECT_ITEM proj
ON pm.project_id = proj.project_id
INNER JOIN
FDD.USER_INFO u
ON u.usr_id = pm.usr_id
inner join fdd.group_info pgi on u.private_grp = pgi.grp_id
WHERE
pm.project_id = {project_id}



Bind Variables for getTmProjectManagers
project_id [Integer]