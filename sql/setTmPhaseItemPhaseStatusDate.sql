update fdd.tm2_phase_item set
phase_status_date = fdd.iso_to_date({status_date})
where
phase_id = {phase_id}


Bind Variables for setTmPhaseItemPhaseStatusDate
status_date [String]
phase_id [Integer]