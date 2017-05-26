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
where
({customer_id} = c.cust_id or {customer_id} is null) AND
(project_id = {project_id} or {project_id} is null)


Bind Variables for getTmProjectDetails
customer_id [Integer]
project_id [Integer]