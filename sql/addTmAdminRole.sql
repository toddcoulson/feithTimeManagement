insert into fdd.tm2_roles (
    role_code,
    role_name,
    standard_rate,
    clearance_rate
) values (
    {role_code},
    {role_name},
    {standard_rate},
    {clearance_rate}
);

Bind Variables for addTmAdminRole
role_code [String]
role_name [String]
standard_rate [Decimal]
clearance_rate [Decimal]