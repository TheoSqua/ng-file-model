(function () {
	angular.module('ng-file-model', [])
	.directive("ngFileModel", [function () {
		return {
			scope: {
				ngFileModel: "="
			},
			link: function (scope, element, attributes) {
				element.bind("change", function (changeEvent) {
					var reader = new FileReader();
					reader.onload = function (loadEvent) {
						scope.$apply(function () {
							for (var i=0; i< changeEvent.target.files.length; i++) {
								var eventSplit = loadEvent.target.result.split(',');
								var ngFileModel = {
									lastModified: changeEvent.target.files[i].lastModified,
									lastModifiedDate: changeEvent.target.files[i].lastModifiedDate,
									name: changeEvent.target.files[i].name,
									size: changeEvent.target.files[i].size,
									type: changeEvent.target.files[i].type,
									data: eventSplit[1]
								};
								scope.ngFileModel.push(ngFileModel);
							}
							element.value = '';
						});
					};
					reader.readAsDataURL(changeEvent.target.files[0]);
				});
			}
		};
