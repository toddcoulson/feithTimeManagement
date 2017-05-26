update fdd.tm2_phase_item set
end_date = fdd.iso_to_date({end_date})
where
phase_id = {phase_id}


Bind Variables for setTmPhaseItemEndDate
end_date [String]
phase_id [Integer]