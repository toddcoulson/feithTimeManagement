SELECT
usr_id,
usr_name,
usr_desc,
u.usr_type,
pgi.grp_email as usr_email
from fdd.user_info u
inner join fdd.group_info pgi on u.private_grp = pgi.grp_id
WHERE u.usr_type = 'W'
OR u.usr_type IS null
Order By usr_id