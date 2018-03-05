/**
 * @file 面包屑
 * @author zhaoran
 * @date 2015-06-08
 */

angular.module('cmsDirective').directive('crumb', function($rootScope, $state){

	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {},
		template: __inline('./crumb.html'),
		link: function(scope, elem, attr){

			updateCrumbs();

			$rootScope.$on('$stateChangeSuccess', function(){
				updateCrumbs();
			});

			function updateCrumbs(){

				var current = $state.$current;

				var crumbs = [];

				do{
					if(current.self.custom && current.self.custom.crumb){

						crumbs.unshift(current.self.custom.crumb);
					}
				}while(current = current.parent)

				scope.crumbs = crumbs;
			}



		}
	};
});
