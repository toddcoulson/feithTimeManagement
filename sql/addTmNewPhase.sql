INSERT INTO fdd.TM2_PHASE_ITEM
(PHASE_ID,
 PHASE_NAME,
 PHASE_STATUS,
 PHASE_STATUS_DATE,
 PROJECT_ID,
 START_DATE,
 END_DATE,
 ESTIMATED_HOURS,
 BUDGET,
 DESCRIPTION,
 CUSR,
 CTIME,
 MUSR,
 MTIME)
VALUES
({phase_id},
 {phase_name},
 {phase_status},
 sysdate,
 {project_id},
 fdd.iso_to_date({start_date}),
 fdd.iso_to_date({end_date}),
 {estimated_hours},
 {budget},
 {description},
 fdd.my_usr_id(),
 sysdate,
 fdd.my_usr_id(),
 sysdate);



Bind Variables for addTmNewPhase
phase_id [Integer]
phase_name [String]
phase_status [String]
phase_status_date [String]
project_id [Integer]
start_date [String]
end_date [String]
estimated_hours [Integer]
budget [Integer]
description [String]