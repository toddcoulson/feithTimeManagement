INSERT INTO fdd.TM2_TIME_ENTRY_ITEM
(TIME_ENTRY_ID,
 USR_ID,
 CUSTOMER_ID,
 PROJECT_ID,
 PHASE_ID,
 TASK_NAME,
 ENTRY_DATE,
 SUBMIT_DATE,
 HOURS_WORKED,
 TYPE_OF_HOURS,
 ROLE_ID,
 COMMENTS,
 CUSR,
 CTIME,
 MUSR,
 MTIME)
VALUES
({time_entry_id},
 {usr_id},
 {customer_id},
 {project_id},
 {phase_id},
 {task_name},
 fdd.iso_to_date({entry_date}),
 to_char(sysdate, 'dd-mon-yyyy hh:miam'),
 {hours_worked},
 {type_of_hours},
 {role_id},
 {comments},
 fdd.my_usr_id(),
 to_date(sysdate, 'yyyy/mm/dd:hh:mi:ssam'),
 fdd.my_usr_id(),
 to_date(sysdate, 'yyyy/mm/dd:hh:mi:ssam'));



Bind Variables for addTmTimeEntryItem
time_entry_id [Integer]
customer_id [Integer]
project_id [Integer]
phase_id [Integer]
task_name [String]
role_id [Integer]
submitted_status [String]
hours_worked [Decimal]
comments [String]
usr_id [Integer]
entry_date [String]
type_of_hours [String]