INSERT INTO fdd.TM2_WORK_ORDER_ITEM
(WO_ID,
 WO_DATE,
 WO_DESCRIPTION,
 PHASE_ID)
VALUES
({wo_id},
 fdd.iso_to_date({wo_date}),
 {wo_description},
 {phase_id});


Bind Variables for addTmWorkOrderItem
wo_id [Integer]
wo_date [String]
wo_description [String]
phase_id [Integer]