SELECT DISTINCT
project_id,
customer_id,
c.name company_name,
project_name,
project_status,
fdd.date_to_iso(status_date) as status_date,
description,
category,
price_model,
billing_frequency,
bill_type
FROM fdd.tm2_project_item p
INNER JOIN fdd.customer_info_fc c ON p.customer_id = c.cust_id
where EXISTS(SELECT *
             FROM fdd.tm2_project_managers pm
             WHERE pm.usr_id={usr_id}
             AND pm.project_id = p.project_id);


Bind Variables for getTmProjectDetailsMyProjects
usr_id [Integer]