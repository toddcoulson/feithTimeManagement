SELECT
b.usr_id, b.phase_id, percent_complete, phase_name, usr_name
FROM fdd.TM2_budget_notify_item b
INNER JOIN
fdd.user_info ui
ON ui.usr_id = b.usr_id
INNER JOIN
fdd.TM2_phase_item pi
ON pi.phase_id = b.phase_id
WHERE {usr_id}= b.usr_id


Bind Variables for getTmBudgetNotifications
usr_id [Integer]