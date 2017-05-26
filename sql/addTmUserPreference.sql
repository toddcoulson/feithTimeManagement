DECLARE
l_is_matching_row Integer;
BEGIN
SELECT COUNT(*) INTO l_is_matching_row FROM fdd.TM2_USER_PREFERENCES
WHERE USR_ID = {usr_id};
IF(l_is_matching_row = 0)THEN
INSERT INTO fdd.TM2_USER_PREFERENCES
(USR_ID,
 DATE_VALUE,
 LAST_NUMBER_ENTRIES,
 START_DATE,
 END_DATE)
VALUES(
    {usr_id},
    '1month',
    15,
    to_date(sysdate-30),
    to_date(sysdate));
COMMIT;
END IF;
EXCEPTION
when DUP_VAL_ON_INDEX
then ROLLBACK;
end;


Bind Variables for addTmUserPreference
usr_id [Integer]