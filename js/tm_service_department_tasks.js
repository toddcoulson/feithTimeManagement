app.service('departmentTasksService',['$q', '$http', '$rootScope', 'coreService',
                                      function($q, $http, $rootScope, coreService){
                                          //base functionality begin
                                          var self = this;
                                          var departments;
                                          var tasks;
                                          var deptTasks;
                                          this.deptTasks = function(){
                                              return deptTasks;
                                          }
                                          this.tasks = function(){
                                              return tasks;
                                          }
                                          this.departments = function(){
                                              return departments;
                                          }
                                          this.getDepartmentTasks = function(){
                                              var deferred = $q.defer();
                                              $http({
                                                  url: sql + 'getTmDepartmentTasks',
                                                  method: 'GET'
                                              }).then(function(response) {
                                                  if (response.data.success) {
                                                      if(debug) console.log("successful retrival of department tasks")
                                                      deptTasks = response.data.resultSet;
                                                  }else{
                                                      if(debug) console.log("error" + response.status, response.data);
                                                  }
                                                  deferred.resolve();
                                              }).catch(function(response) {
                                                  if(debug) console.error('error', response.status, response.data);
                                              });
                                              return deferred.promise;
                                          }
                                          this.getDepartmentTasksForEmployee = function(usr_id){
                                              console.log("user id:", usr_id)
                                              var deferred = $q.defer();
                                              $http({
                                                  url: sql + 'getTmDepartmentTasksForEmployee',
                                                  method: 'POST',
                                                  data:{usr_id:usr_id}
                                              }).then(function(response) {
                                                  if (response.data.success) {
                                                      if(debug) console.log("successful retrival of department tasks for department",
                                                                            response.data.resultSet)
                                                      deptTasks = response.data.resultSet;
                                                  }else{
                                                      if(debug) console.log("error" + response.status, response.data);
                                                  }
                                                  deferred.resolve();
                                              }).catch(function(response) {
                                                  if(debug) console.error('error', response.status, response.data);
                                              });
                                              return deferred.promise;
                                          }
                                          /*this method should move to phase service*/
                                          this.removeDeptTask = function(department_id, task_name){
                                              var deferred = $q.defer();
                                              $http({
                                                  url: sql + 'rmTmDepartmentTasks',
                                                  method: 'POST',
                                                  data:{department_id:department_id, task_name:task_name}
                                              }).then(function(response) {
                                                  if (response.data.success) {
                                                      if(debug) console.log("successful removal of department task")
                                                          }else{
                                                              if(debug) console.log("error" + response.status, response.data);
                                                          }
                                                  deferred.resolve();
                                              }).catch(function(response) {
                                                  if(debug) console.error('error', response.status, response.data);
                                              });
                                              return deferred.promise;
                                          }
                                          this.getDepartments = function(newRole){
                                              var deferred = $q.defer();
                                              $http({
                                                  url: sql + 'getTmDepartments',
                                                  method: 'GET'
                                              }).then(function(response) {
                                                  if (response.data.success) {
                                                      if(debug) console.log("successful retrival of departments")
                                                      departments = response.data.resultSet;
                                                  }else{
                                                      if(debug) console.log("error" + response.status, response.data);
                                                  }
                                                  deferred.resolve();
                                              }).catch(function(response) {
                                                  if(debug) console.error('error', response.status, response.data);
                                              });
                                              return deferred.promise;
                                          }
                                          this.addDepartmentTask = function(task_name, department_id){
                                              var deferred = $q.defer();
                                              $http({
                                                  url: sql + 'addTmDepartmentTask',
                                                  method: 'POST',
                                                  data:{task_name:task_name, department_id:department_id}
                                              }).then(function(response) {
                                                  if (response.data.success) {
                                                      if(debug) console.log("successful addition of task")
                                                          }else{
                                                              if(debug) console.log("error" + response.status, response.data);
                                                          }
                                                  deferred.resolve();
                                              }).catch(function(response) {
                                                  if(debug) console.error('error', response.status, response.data);
                                              });
                                              return deferred.promise;
                                          }
                                      }]);