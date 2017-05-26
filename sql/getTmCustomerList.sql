SELECT name,
cust_id,
contact1,
contact2
FROM (SELECT name,
      cust_id,
      contact1,
      contact2,
      Row_number() OVER(PARTITION BY cust_id ORDER BY name) rn
      FROM fdd.customer_info_fc) t
WHERE rn = 1
ORDER BY name