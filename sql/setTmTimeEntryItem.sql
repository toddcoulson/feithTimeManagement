UPDATE fdd.TM2_TIME_ENTRY_ITEM SET
USR_ID = {usr_id},
CUSTOMER_ID = {customer_id},
PROJECT_ID = {project_id},
PHASE_ID = {phase_id},
TASK_NAME = {task_name},
ENTRY_DATE = fdd.iso_to_date({entry_date}),
SUBMIT_DATE = to_char(sysdate, 'dd-mon-yyyy hh:miam'),
HOURS_WORKED = {hours_worked},
TYPE_OF_HOURS = {type_of_hours},
ROLE_ID = {role_id},
COMMENTS = {comments},
CUSR = fdd.my_usr_id(),
CTIME = to_date(sysdate, 'yyyy/mm/dd:hh:mi:ssam'),
MUSR = fdd.my_usr_id(),
MTIME = to_date(sysdate, 'yyyy/mm/dd:hh:mi:ssam')
WHERE
TIME_ENTRY_ID = {time_entry_id}



Bind Variables for setTmTimeEntryItem
usr_id [Integer]
customer_id [Integer]
project_id [Integer]
phase_id [Integer]
task_name [String]
entry_date [String]
hours_worked [Decimal]
type_of_hours [String]
role_id [Integer]
comments [String]
time_entry_id [Integer]