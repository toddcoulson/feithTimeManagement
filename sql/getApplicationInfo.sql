select
distinct app_info.*,
case
when mg.grp_id > 0
then 'true'
else 'false'
end as acc_bsd_on_app_info_and_grp_nm
from
fdd.fss_application_info app_info
left join fdd.group_info gi on lower(gi.grp_name) like lower(app_info.group_name ||
                                                             '%')
left join fdd.my_groups mg on mg.grp_id = gi.grp_id
where
application_name = {application_name};
srv_type = {srv_type} or {srv_type} is null


Bind Variables for getServerInfo
srv_type [String]