INSERT INTO fdd.TM2_PROJECT_ITEM
(PROJECT_ID,
 CUSTOMER_ID,
 PROJECT_NAME,
 PROJECT_STATUS,
 STATUS_DATE,
 DESCRIPTION,
 CATEGORY,
 PRICE_MODEL,
 BILLING_FREQUENCY,
 BILL_TYPE,
 CUSR,
 CTIME,
 MUSR,
 MTIME)
VALUES
({project_id},
 {customer_id},
 {project_name},
 {project_status},
 sysdate,
 {description},
 {category},
 {price_model},
 {billing_frequency},
 {bill_type},
 fdd.my_usr_id(),
 sysdate,
 fdd.my_usr_id(),
 sysdate);


Bind Variables for addTmNewProject
project_id [Integer]
customer_id [Integer]
project_name [String]
project_status [String]
status_date [String]
project_manager_id [Integer]
description [String]
category [String]
price_model [String]
billing_frequency [String]
bill_type [String]