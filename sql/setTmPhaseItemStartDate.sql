update fdd.tm2_phase_item set
start_date = fdd.iso_to_date({start_date})
where
phase_id = {phase_id}


Bind Variables for setTmPhaseItemStartDate
start_date [String]
phase_id [Integer]