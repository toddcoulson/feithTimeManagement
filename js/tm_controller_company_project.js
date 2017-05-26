app.controller('CompanyProjectController', ['$scope', '$rootScope', '$modal', '$http',
                                            '$filter', '$q', '$routeParams', 'GetCustomersService', 'coreService',
                                            'projectService','myProjects',
                                            function($scope, $rootScope, $modal, $http, $filter, $q, $routeParams,
                                                      GetCustomersService, coreService, projectService,myProjects){
                                                $scope.gcs = GetCustomersService;
                                                $scope.core = coreService;
                                                $scope.myProjects = myProjects.value();
                                                $scope.projects = [];
                                                $scope.selectedCustomer = {};
                                                $scope.project = {};
                                                $scope.phase = {};
                                                $scope.init = function(){
                                                    if($rootScope.companies.length == 0){
                                                        $scope.gcs.getCustomerList($scope.companies).then(function(){
                                                            $rootScope.companies = $scope.gcs.companies;
                                                        });
                                                    }
                                                    $scope.getProjectList();
                                                };
                                                $scope.getProjectList = function(){
                                                    if($scope.myProjects){                                                        projectService.getProjectsForCompanyMyProjects($rootScope.currentUser.userId).then(function(){
                                                            $scope.projects = projectService.projectList();
                                                        });
                                                    }else{
                                                        projectService.getAllProjects().then(function(){
                                                            $scope.projects = projectService.projectList();
                                                        });
                                                    }
                                                    console.log($scope.projects);
                                                }
                                                $scope.showNewProjectModal=function(){
                                                    var newProjectModalInstance = $modal.open({
                                                        templateUrl: obj+'tm_modal_project_details.html',
                                                        controller: newProjectModalInstanceCtrl,
                                                        backdrop: "static",
                                                        keyboard: false,
                                                        resolve: {
                                                            companies: function () {
                                                                return $rootScope.companies;
                                                            },
                                                        }
                                                    });
                                                };
                                                var newProjectModalInstanceCtrl = function($rootScope, $scope, $modalInstance,
                                                                                            GetNewIdService, coreService, projectService){
                                                    $scope.core = coreService;
                                                    $scope.prs = projectService;
                                                    $scope.editing = true;
                                                    $scope.newProject = true;
                                                    $scope.project = {project_status:$rootScope.statuses[0].value,
                                                                      status_date: $rootScope.today,
                                                                      bill_type: $rootScope.billings[0].value,
                                                                      billing_frequency: $rootScope.frequencies[0].value,
                                                                      price_model: $rootScope.priceModels[0].value,
                                                                      category: $rootScope.categories[0].value
                                                                     };
                                                    $scope.form = {};
                                                    $scope.form.project={};
                                                    $scope.submitNewProject = function(){
                                                        GetNewIdService.returnUniqueID().then(function(){
                                                            $scope.prs.addNewProject({
                                                                project_id: GetNewIdService.newID,
                                                                customer_id: $scope.project.selectedCustomer.cust_id,
                                                                project_name: $scope.project.project_name,
                                                                project_status: $scope.project.project_status,
                                                                status_date: isoDateToDatabase($scope.project.status_date),
                                                                description: $scope.project.description,
                                                                category: $scope.project.category,
                                                                price_model: $scope.project.price_model,
                                                                billing_frequency: $scope.project.billing_frequency.value,
                                                                bill_type: $scope.project.bill_type
                                                            });
                                                        });
                                                        $modalInstance.close();
                                                    };
                                                    $scope.clear = function(){
                                                        $modalInstance.dismiss('clear');
                                                    };
                                                    $scope.cancel = function(){
                                                        $modalInstance.dismiss('cancel');
                                                    };
                                                    $scope.onlyNumbers = /^\d+$/;
                                                };
                                                $scope.init();
                                            }]);