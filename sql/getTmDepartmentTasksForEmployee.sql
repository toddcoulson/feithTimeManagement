SELECT
DEPARTMENT_ID,
dt.TASK_NAME,
DEPT, e.NAME, e.fss_department
FROM fdd.TM2_DEPT_TASK_LOOKUP dt
INNER JOIN
fdd.TM_DEPT_LOOKUP d
ON dt.department_id = d.dept_idx
INNER JOIN fdd.employees e
on e.fss_department = d.dept
WHERE usr_id = {usr_id}



Bind Variables for getTmDepartmentTasksForEmployee
usr_id [Integer]