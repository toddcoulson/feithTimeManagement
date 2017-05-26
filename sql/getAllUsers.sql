select
*
from
fdd.user_info ui
inner join fdd.group_info pgi on pgi.grp_id = ui.private_grp
where
(usr_name = {usr_name} or {usr_name} is null)


Bind Variables for getAllUsers
usr_name [String]