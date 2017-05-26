update fdd.tm2_project_item set
project_status = {project_status},
status_date = (SYSDATE)
where
project_id = {project_id}


Bind Variables for setTmProjectItemProjectStatus
project_id [Integer]
project_status [String]