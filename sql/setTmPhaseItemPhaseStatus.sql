update fdd.tm2_phase_item set
phase_status = {phase_status},
phase_status_date = (SYSDATE)
where
phase_id = {phase_id}


Bind Variables for setTmPhaseItemPhaseStatus
phase_status [String]
phase_id [Integer]