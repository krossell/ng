!function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="/scripts/",e(0)}([function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(1),i=r(o);n(3),n(4),function(t){function e(t,e){t.when("/",{template:"qgrid demo page"}).when("/sandbox",{templateUrl:"sandbox/index.html",controller:i.default,controllerAs:"$ctrl"}),e.html5Mode(!1).hashPrefix("!")}function n(){}t.module("demo",["ngRoute","qgrid"]).config(e).controller("Demo.Controller",n),e.$inject=["$routeProvider","$locationProvider"],n.$inject=[]}(angular)},function(t,e){"use strict";function n(t){this.rows=[],this.columns=[{key:"firstName",title:"First Name"},{key:"lastName",title:"Last Name"},{key:"birthDate",title:"Date of Birth"},{key:"location",title:"Location"},{key:"zipCode",title:"Zip"}],t.get("/data/people.100.json").then(function(t){this.rows=t})}Object.defineProperty(e,"__esModule",{value:!0}),e.default=n,n.$inject=["$http"]},function(t,e){"use strict";function n(){}Object.defineProperty(e,"__esModule",{value:!0}),e.default={templateUrl:"qgrid.html",controller:n,bindings:{rows:"<",columns:"<"}},n.$inject=[]},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(2),i=r(o);!function(t){function e(t){t.put("qgrid.html",n(6))}t.module("qgrid",[]).component("qGrid",i.default).run(e),e.$inject=["$templateCache"]}(angular)},function(t,e,n){"use strict";n(5),function(t){function e(){}t.module("qgrid").run(e),e.$inject=["$templateCache"]}(angular)},function(t,e){},function(t,e){t.exports='<div class="qgrid">\r\n\t<table>\r\n\t\t<thead>\r\n\t\t<tr>\r\n\t\t\t<th ng-repeat="$column in $ctrl.columns track by $index">\r\n\t\t\t\t<label>{{$column.title}}</label>\r\n\t\t\t</th>\r\n\t\t</tr>\r\n\t\t</thead>\r\n\t\t<tbody>\r\n\t\t<tr ng-repeat="$row in $ctrl.rows">\r\n\t\t\t<td ng-repeat="$column in $ctrl.columns track by $index">\r\n\t\t\t\t{{$row[$column.key]}}\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t\t</tbody>\r\n\t\t<tfoot>\r\n\t\t</tfoot>\r\n\t</table>\r\n</div>'}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vYnVuZGxlLmpzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAxYWFlZDA5ZTZmZGYzMGUyNzU5ZSIsIndlYnBhY2s6Ly8vLi9kZW1vL2luZGV4LmpzIiwid2VicGFjazovLy8uL2RlbW8vc2FuZGJveC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9ncmlkL2dyaWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy90aGVtZXMvZGVmYXVsdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9ncmlkL2dyaWQuaHRtbCJdLCJuYW1lcyI6WyJtb2R1bGVzIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwiaW5zdGFsbGVkTW9kdWxlcyIsImV4cG9ydHMiLCJtb2R1bGUiLCJpZCIsImxvYWRlZCIsImNhbGwiLCJtIiwiYyIsInAiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0Iiwib2JqIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJfaW5kZXgiLCJfaW5kZXgyIiwiYW5ndWxhciIsIlNldHVwIiwiJHJvdXRlUHJvdmlkZXIiLCIkbG9jYXRpb25Qcm92aWRlciIsIndoZW4iLCJ0ZW1wbGF0ZSIsInRlbXBsYXRlVXJsIiwiY29udHJvbGxlciIsImNvbnRyb2xsZXJBcyIsImh0bWw1TW9kZSIsImhhc2hQcmVmaXgiLCJDb250cm9sbGVyIiwiY29uZmlnIiwiJGluamVjdCIsIiRodHRwIiwidGhpcyIsInJvd3MiLCJjb2x1bW5zIiwia2V5IiwidGl0bGUiLCJnZXQiLCJ0aGVuIiwiZGF0YSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJiaW5kaW5ncyIsIl9ncmlkIiwiX2dyaWQyIiwiJHRlbXBsYXRlQ2FjaGUiLCJwdXQiLCJjb21wb25lbnQiLCJydW4iXSwibWFwcGluZ3MiOiJDQUFTLFNBQVVBLEdDSW5CLFFBQUFDLEdBQUFDLEdBR0EsR0FBQUMsRUFBQUQsR0FDQSxNQUFBQyxHQUFBRCxHQUFBRSxPQUdBLElBQUFDLEdBQUFGLEVBQUFELElBQ0FFLFdBQ0FFLEdBQUFKLEVBQ0FLLFFBQUEsRUFVQSxPQU5BUCxHQUFBRSxHQUFBTSxLQUFBSCxFQUFBRCxRQUFBQyxJQUFBRCxRQUFBSCxHQUdBSSxFQUFBRSxRQUFBLEVBR0FGLEVBQUFELFFBdkJBLEdBQUFELEtBcUNBLE9BVEFGLEdBQUFRLEVBQUFULEVBR0FDLEVBQUFTLEVBQUFQLEVBR0FGLEVBQUFVLEVBQUEsWUFHQVYsRUFBQSxLRE1NLFNBQVNJLEVBQVFELEVBQVNILEdFNUNoQyxZRm9EQyxTQUFTVyxHQUF1QkMsR0FBTyxNQUFPQSxJQUFPQSxFQUFJQyxXQUFhRCxHQUFRRSxRQUFTRixHRWxEeEYsR0FBQUcsR0FBQWYsRUFBQSxHRmdES2dCLEVBQVVMLEVBQXVCSSxFRTlDdENmLEdBQVEsR0FDUkEsRUFBUSxHQUVSLFNBQVdpQixHQU1WLFFBQVNDLEdBQU1DLEVBQWdCQyxHQUM5QkQsRUFDRUUsS0FBSyxLQUNMQyxTQUFVLG9CQUVWRCxLQUFLLFlBQ0xFLFlBQWEscUJBQ2JDLHFCQUNBQyxhQUFjLFVBR2hCTCxFQUNFTSxXQUFVLEdBQ1ZDLFdBQVcsS0FJZCxRQUFTQyxNQXRCVFgsRUFBUWIsT0FBTyxRQUFTLFVBQVcsVUFDakN5QixPQUFPWCxHQUNQTSxXQUFXLGtCQUFtQkksR0FFaENWLEVBQU1ZLFNBQVcsaUJBQWtCLHFCQWlCbkNGLEVBQVdFLFlBSVRiLFVGOENHLFNBQVNiLEVBQVFELEdHL0V2QixZQUdlLFNBQVN5QixHQUFXRyxHQUNsQ0MsS0FBS0MsUUFDTEQsS0FBS0UsVUFDSEMsSUFBSyxZQUFhQyxNQUFPLGVBQ3pCRCxJQUFLLFdBQVlDLE1BQU8sY0FDeEJELElBQUssWUFBYUMsTUFBTyxrQkFDekJELElBQUssV0FBWUMsTUFBTyxhQUN4QkQsSUFBSyxVQUFXQyxNQUFPLFFBR3pCTCxFQUFNTSxJQUFJLHlCQUNSQyxLQUFLLFNBQVVDLEdBQ2ZQLEtBQUtDLEtBQU9NLElIb0VkQyxPQUFPQyxlQUFldEMsRUFBUyxjQUM5QnVDLE9BQU8sSUFFUnZDLEVBQVFXLFFHbkZlYyxFQUR4QkEsRUFBV0UsU0FBVyxVSGlHaEIsU0FBUzFCLEVBQVFELEdJbkd2QixZQWVBLFNBQVN5QixNSjJGUlksT0FBT0MsZUFBZXRDLEVBQVMsY0FDOUJ1QyxPQUFPLElBRVJ2QyxFQUFRVyxTSXZHUlMsWUFBYSxhQUNiQyxXQUFZSSxFQUNaZSxVQUNDVixLQUFNLElBQ05DLFFBQVMsTUFJWE4sRUFBV0UsWUptSEwsU0FBUzFCLEVBQVFELEVBQVNILEdBRS9CLFlBTUEsU0FBU1csR0FBdUJDLEdBQU8sTUFBT0EsSUFBT0EsRUFBSUMsV0FBYUQsR0FBUUUsUUFBU0YsR0t6SXhGLEdBQUFnQyxHQUFBNUMsRUFBQSxHTHVJSzZDLEVBQVNsQyxFQUF1QmlDLElLcklyQyxTQUFXM0IsR0FNVixRQUFTQyxHQUFNNEIsR0FDZEEsRUFBZUMsSUFBSSxhQUFjL0MsRUFBUSxJQU4xQ2lCLEVBQVFiLE9BQU8sWUFDYjRDLFVBQVUsUUFEWkgsRUFBQS9CLFNBRUVtQyxJQUFJL0IsR0FFTkEsRUFBTVksU0FBVyxtQkFJZmIsVUwySUcsU0FBU2IsRUFBUUQsRUFBU0gsR010SmhDLFlBRUFBLEdBQVEsR0FFUixTQUFXaUIsR0FNVixRQUFTQyxNQUpURCxFQUFRYixPQUFPLFNBQ2I2QyxJQUFJL0IsR0FFTkEsRUFBTVksU0FBVyxtQkFLZmIsVU4wSkcsU0FBU2IsRUFBUUQsS0FNakIsU0FBU0MsRUFBUUQsR085S3ZCQyxFQUFBRCxRQUFBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbi8qKioqKiovIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9LFxuLyoqKioqKi8gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuLyoqKioqKi8gXHRcdFx0bG9hZGVkOiBmYWxzZVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4vKioqKioqLyBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqL1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9zY3JpcHRzL1wiO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuLyoqKioqKi8gfSlcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyAoW1xuLyogMCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXHRcblx0dmFyIF9pbmRleCA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cdFxuXHR2YXIgX2luZGV4MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luZGV4KTtcblx0XG5cdGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cdFxuXHRfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fKDQpO1xuXHRcblx0KGZ1bmN0aW9uIChhbmd1bGFyKSB7XG5cdFx0YW5ndWxhci5tb2R1bGUoJ2RlbW8nLCBbJ25nUm91dGUnLCAncWdyaWQnXSkuY29uZmlnKFNldHVwKS5jb250cm9sbGVyKCdEZW1vLkNvbnRyb2xsZXInLCBDb250cm9sbGVyKTtcblx0XG5cdFx0U2V0dXAuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInLCAnJGxvY2F0aW9uUHJvdmlkZXInXTtcblx0XHRmdW5jdGlvbiBTZXR1cCgkcm91dGVQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcblx0XHRcdCRyb3V0ZVByb3ZpZGVyLndoZW4oJy8nLCB7XG5cdFx0XHRcdHRlbXBsYXRlOiAncWdyaWQgZGVtbyBwYWdlJ1xuXHRcdFx0fSkud2hlbignL3NhbmRib3gnLCB7XG5cdFx0XHRcdHRlbXBsYXRlVXJsOiAnc2FuZGJveC9pbmRleC5odG1sJyxcblx0XHRcdFx0Y29udHJvbGxlcjogX2luZGV4Mi5kZWZhdWx0LFxuXHRcdFx0XHRjb250cm9sbGVyQXM6ICckY3RybCdcblx0XHRcdH0pO1xuXHRcblx0XHRcdCRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZShmYWxzZSkuaGFzaFByZWZpeCgnIScpO1xuXHRcdH1cblx0XG5cdFx0Q29udHJvbGxlci4kaW5qZWN0ID0gW107XG5cdFx0ZnVuY3Rpb24gQ29udHJvbGxlcigpIHt9XG5cdH0pKGFuZ3VsYXIpO1xuXG4vKioqLyB9LFxuLyogMSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXHRcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdFx0dmFsdWU6IHRydWVcblx0fSk7XG5cdGV4cG9ydHMuZGVmYXVsdCA9IENvbnRyb2xsZXI7XG5cdENvbnRyb2xsZXIuJGluamVjdCA9IFsnJGh0dHAnXTtcblx0ZnVuY3Rpb24gQ29udHJvbGxlcigkaHR0cCkge1xuXHRcdHRoaXMucm93cyA9IFtdO1xuXHRcdHRoaXMuY29sdW1ucyA9IFt7IGtleTogJ2ZpcnN0TmFtZScsIHRpdGxlOiAnRmlyc3QgTmFtZScgfSwgeyBrZXk6ICdsYXN0TmFtZScsIHRpdGxlOiAnTGFzdCBOYW1lJyB9LCB7IGtleTogJ2JpcnRoRGF0ZScsIHRpdGxlOiAnRGF0ZSBvZiBCaXJ0aCcgfSwgeyBrZXk6ICdsb2NhdGlvbicsIHRpdGxlOiAnTG9jYXRpb24nIH0sIHsga2V5OiAnemlwQ29kZScsIHRpdGxlOiAnWmlwJyB9XTtcblx0XG5cdFx0JGh0dHAuZ2V0KCcvZGF0YS9wZW9wbGUuMTAwLmpzb24nKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHR0aGlzLnJvd3MgPSBkYXRhO1xuXHRcdH0pO1xuXHR9XG5cbi8qKiovIH0sXG4vKiAyICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQndXNlIHN0cmljdCc7XG5cdFxuXHQvLyBpbXBvcnQgR3JpZE1vZGVsIGZyb20gJy4vZ3JpZC5tb2RlbCc7XG5cdC8vIGltcG9ydCBVdGlsaXR5IGZyb20gJy4uLy4uL3NlcnZpY2VzL3V0aWxpdHknO1xuXHRcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdFx0dmFsdWU6IHRydWVcblx0fSk7XG5cdGV4cG9ydHMuZGVmYXVsdCA9IHtcblx0XHR0ZW1wbGF0ZVVybDogJ3FncmlkLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6IENvbnRyb2xsZXIsXG5cdFx0YmluZGluZ3M6IHtcblx0XHRcdHJvd3M6ICc8Jyxcblx0XHRcdGNvbHVtbnM6ICc8J1xuXHRcdH1cblx0fTtcblx0XG5cdFxuXHRDb250cm9sbGVyLiRpbmplY3QgPSBbXTtcblx0ZnVuY3Rpb24gQ29udHJvbGxlcigpIHtcblx0XHQvL3RoaXMubW9kZWwgPSBuZXcgR3JpZE1vZGVsKCk7XG5cdFx0Ly8gVE9ETzogaW52ZXN0aWdhdGUgaG93IHRvIHRyYWNrIGNoYW5nZXMgaW4gdGhpcyBjYXNlXG5cdFx0Ly8gb3IgZ2V0IHJpZCBvZiAkc2NvcGUgb3Igb2YgR3JpZE1vZGVsXG5cdFx0Ly9VdGlsaXR5LmFzc2lnbih0aGlzLm1vZGVsLCAkc2NvcGUpO1xuXHR9XG5cbi8qKiovIH0sXG4vKiAzICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cdFxuXHR2YXIgX2dyaWQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXHRcblx0dmFyIF9ncmlkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dyaWQpO1xuXHRcblx0ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblx0XG5cdChmdW5jdGlvbiAoYW5ndWxhcikge1xuXHRcdGFuZ3VsYXIubW9kdWxlKCdxZ3JpZCcsIFtdKS5jb21wb25lbnQoJ3FHcmlkJywgX2dyaWQyLmRlZmF1bHQpLnJ1bihTZXR1cCk7XG5cdFxuXHRcdFNldHVwLiRpbmplY3QgPSBbJyR0ZW1wbGF0ZUNhY2hlJ107XG5cdFx0ZnVuY3Rpb24gU2V0dXAoJHRlbXBsYXRlQ2FjaGUpIHtcblx0XHRcdCR0ZW1wbGF0ZUNhY2hlLnB1dCgncWdyaWQuaHRtbCcsIF9fd2VicGFja19yZXF1aXJlX18oNikpO1xuXHRcdH1cblx0fSkoYW5ndWxhcik7XG5cbi8qKiovIH0sXG4vKiA0ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cdFxuXHRfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xuXHRcblx0KGZ1bmN0aW9uIChhbmd1bGFyKSB7XG5cdFxuXHRcdGFuZ3VsYXIubW9kdWxlKCdxZ3JpZCcpLnJ1bihTZXR1cCk7XG5cdFxuXHRcdFNldHVwLiRpbmplY3QgPSBbJyR0ZW1wbGF0ZUNhY2hlJ107XG5cdFx0ZnVuY3Rpb24gU2V0dXAoKSAvKiR0ZW1wbGF0ZUNhY2hlKi97XG5cdFx0XHQvLyBoZXJlJ2xsIGJlIGN1c3RvbSB0ZW1wbGF0ZXNcblx0XHR9XG5cdH0pKGFuZ3VsYXIpO1xuXG4vKioqLyB9LFxuLyogNSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0Ly8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuLyoqKi8gfSxcbi8qIDYgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdG1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJxZ3JpZFxcXCI+XFxyXFxuXFx0PHRhYmxlPlxcclxcblxcdFxcdDx0aGVhZD5cXHJcXG5cXHRcXHQ8dHI+XFxyXFxuXFx0XFx0XFx0PHRoIG5nLXJlcGVhdD1cXFwiJGNvbHVtbiBpbiAkY3RybC5jb2x1bW5zIHRyYWNrIGJ5ICRpbmRleFxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0PGxhYmVsPnt7JGNvbHVtbi50aXRsZX19PC9sYWJlbD5cXHJcXG5cXHRcXHRcXHQ8L3RoPlxcclxcblxcdFxcdDwvdHI+XFxyXFxuXFx0XFx0PC90aGVhZD5cXHJcXG5cXHRcXHQ8dGJvZHk+XFxyXFxuXFx0XFx0PHRyIG5nLXJlcGVhdD1cXFwiJHJvdyBpbiAkY3RybC5yb3dzXFxcIj5cXHJcXG5cXHRcXHRcXHQ8dGQgbmctcmVwZWF0PVxcXCIkY29sdW1uIGluICRjdHJsLmNvbHVtbnMgdHJhY2sgYnkgJGluZGV4XFxcIj5cXHJcXG5cXHRcXHRcXHRcXHR7eyRyb3dbJGNvbHVtbi5rZXldfX1cXHJcXG5cXHRcXHRcXHQ8L3RkPlxcclxcblxcdFxcdDwvdHI+XFxyXFxuXFx0XFx0PC90Ym9keT5cXHJcXG5cXHRcXHQ8dGZvb3Q+XFxyXFxuXFx0XFx0PC90Zm9vdD5cXHJcXG5cXHQ8L3RhYmxlPlxcclxcbjwvZGl2PlwiXG5cbi8qKiovIH1cbi8qKioqKiovIF0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBidW5kbGUuanMiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvc2NyaXB0cy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxYWFlZDA5ZTZmZGYzMGUyNzU5ZSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFNhbmRib3ggZnJvbSAnLi9zYW5kYm94L2luZGV4JztcblxucmVxdWlyZSgnLi4vc3JjL2luZGV4Jyk7XG5yZXF1aXJlKCcuLi9zcmMvdGhlbWVzL2RlZmF1bHQvaW5kZXgnKTtcblxuKGZ1bmN0aW9uIChhbmd1bGFyKSB7XG5cdGFuZ3VsYXIubW9kdWxlKCdkZW1vJywgWyduZ1JvdXRlJywgJ3FncmlkJ10pXG5cdFx0LmNvbmZpZyhTZXR1cClcblx0XHQuY29udHJvbGxlcignRGVtby5Db250cm9sbGVyJywgQ29udHJvbGxlcik7XG5cblx0U2V0dXAuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInLCAnJGxvY2F0aW9uUHJvdmlkZXInXTtcblx0ZnVuY3Rpb24gU2V0dXAoJHJvdXRlUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XG5cdFx0JHJvdXRlUHJvdmlkZXJcblx0XHRcdC53aGVuKCcvJywge1xuXHRcdFx0XHR0ZW1wbGF0ZTogJ3FncmlkIGRlbW8gcGFnZSdcblx0XHRcdH0pXG5cdFx0XHQud2hlbignL3NhbmRib3gnLCB7XG5cdFx0XHRcdHRlbXBsYXRlVXJsOiAnc2FuZGJveC9pbmRleC5odG1sJyxcblx0XHRcdFx0Y29udHJvbGxlcjogU2FuZGJveCxcblx0XHRcdFx0Y29udHJvbGxlckFzOiAnJGN0cmwnXG5cdFx0XHR9KTtcblxuXHRcdCRsb2NhdGlvblByb3ZpZGVyXG5cdFx0XHQuaHRtbDVNb2RlKGZhbHNlKVxuXHRcdFx0Lmhhc2hQcmVmaXgoJyEnKTtcblx0fVxuXG5cdENvbnRyb2xsZXIuJGluamVjdCA9IFtdO1xuXHRmdW5jdGlvbiBDb250cm9sbGVyKCkge1xuXHR9XG5cbn0pKGFuZ3VsYXIpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vZXNsaW50LWxvYWRlciEuL2RlbW8vaW5kZXguanMiLCIndXNlIHN0cmljdCc7XG5cbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGh0dHAnXTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbnRyb2xsZXIoJGh0dHApIHtcblx0dGhpcy5yb3dzID0gW107XG5cdHRoaXMuY29sdW1ucyA9IFtcblx0XHR7a2V5OiAnZmlyc3ROYW1lJywgdGl0bGU6ICdGaXJzdCBOYW1lJ30sXG5cdFx0e2tleTogJ2xhc3ROYW1lJywgdGl0bGU6ICdMYXN0IE5hbWUnfSxcblx0XHR7a2V5OiAnYmlydGhEYXRlJywgdGl0bGU6ICdEYXRlIG9mIEJpcnRoJ30sXG5cdFx0e2tleTogJ2xvY2F0aW9uJywgdGl0bGU6ICdMb2NhdGlvbid9LFxuXHRcdHtrZXk6ICd6aXBDb2RlJywgdGl0bGU6ICdaaXAnfVxuXHRdO1xuXG5cdCRodHRwLmdldCgnL2RhdGEvcGVvcGxlLjEwMC5qc29uJylcblx0XHQudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuXHRcdFx0dGhpcy5yb3dzID0gZGF0YTtcblx0XHR9KTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2VzbGludC1sb2FkZXIhLi9kZW1vL3NhbmRib3gvaW5kZXguanMiLCIndXNlIHN0cmljdCc7XG5cbi8vIGltcG9ydCBHcmlkTW9kZWwgZnJvbSAnLi9ncmlkLm1vZGVsJztcbi8vIGltcG9ydCBVdGlsaXR5IGZyb20gJy4uLy4uL3NlcnZpY2VzL3V0aWxpdHknO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cdHRlbXBsYXRlVXJsOiAncWdyaWQuaHRtbCcsXG5cdGNvbnRyb2xsZXI6IENvbnRyb2xsZXIsXG5cdGJpbmRpbmdzOiB7XG5cdFx0cm93czogJzwnLFxuXHRcdGNvbHVtbnM6ICc8J1xuXHR9XG59O1xuXG5Db250cm9sbGVyLiRpbmplY3QgPSBbXTtcbmZ1bmN0aW9uIENvbnRyb2xsZXIoKSB7XG5cdC8vdGhpcy5tb2RlbCA9IG5ldyBHcmlkTW9kZWwoKTtcblx0Ly8gVE9ETzogaW52ZXN0aWdhdGUgaG93IHRvIHRyYWNrIGNoYW5nZXMgaW4gdGhpcyBjYXNlXG5cdC8vIG9yIGdldCByaWQgb2YgJHNjb3BlIG9yIG9mIEdyaWRNb2RlbFxuXHQvL1V0aWxpdHkuYXNzaWduKHRoaXMubW9kZWwsICRzY29wZSk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9lc2xpbnQtbG9hZGVyIS4vc3JjL2NvbXBvbmVudHMvZ3JpZC9ncmlkLmpzIiwiaW1wb3J0IEdyaWQgZnJvbSAnLi9jb21wb25lbnRzL2dyaWQvZ3JpZCc7XG5cbihmdW5jdGlvbiAoYW5ndWxhcikge1xuXHRhbmd1bGFyLm1vZHVsZSgncWdyaWQnLCBbXSlcblx0XHQuY29tcG9uZW50KCdxR3JpZCcsIEdyaWQpXG5cdFx0LnJ1bihTZXR1cCk7XG5cblx0U2V0dXAuJGluamVjdCA9IFsnJHRlbXBsYXRlQ2FjaGUnXTtcblx0ZnVuY3Rpb24gU2V0dXAoJHRlbXBsYXRlQ2FjaGUpIHtcblx0XHQkdGVtcGxhdGVDYWNoZS5wdXQoJ3FncmlkLmh0bWwnLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvZ3JpZC9ncmlkLmh0bWwnKSk7XG5cdH1cbn0pKGFuZ3VsYXIpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vZXNsaW50LWxvYWRlciEuL3NyYy9pbmRleC5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnJlcXVpcmUoJy4vYm9keS5zY3NzJyk7XHJcblxyXG4oZnVuY3Rpb24gKGFuZ3VsYXIpIHtcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ3FncmlkJylcclxuXHRcdC5ydW4oU2V0dXApO1xyXG5cclxuXHRTZXR1cC4kaW5qZWN0ID0gWyckdGVtcGxhdGVDYWNoZSddO1xyXG5cdGZ1bmN0aW9uIFNldHVwKC8qJHRlbXBsYXRlQ2FjaGUqLykge1xyXG5cdFx0Ly8gaGVyZSdsbCBiZSBjdXN0b20gdGVtcGxhdGVzXHJcblx0fVxyXG5cclxufSkoYW5ndWxhcik7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9lc2xpbnQtbG9hZGVyIS4vc3JjL3RoZW1lcy9kZWZhdWx0L2luZGV4LmpzIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcInFncmlkXFxcIj5cXHJcXG5cXHQ8dGFibGU+XFxyXFxuXFx0XFx0PHRoZWFkPlxcclxcblxcdFxcdDx0cj5cXHJcXG5cXHRcXHRcXHQ8dGggbmctcmVwZWF0PVxcXCIkY29sdW1uIGluICRjdHJsLmNvbHVtbnMgdHJhY2sgYnkgJGluZGV4XFxcIj5cXHJcXG5cXHRcXHRcXHRcXHQ8bGFiZWw+e3skY29sdW1uLnRpdGxlfX08L2xhYmVsPlxcclxcblxcdFxcdFxcdDwvdGg+XFxyXFxuXFx0XFx0PC90cj5cXHJcXG5cXHRcXHQ8L3RoZWFkPlxcclxcblxcdFxcdDx0Ym9keT5cXHJcXG5cXHRcXHQ8dHIgbmctcmVwZWF0PVxcXCIkcm93IGluICRjdHJsLnJvd3NcXFwiPlxcclxcblxcdFxcdFxcdDx0ZCBuZy1yZXBlYXQ9XFxcIiRjb2x1bW4gaW4gJGN0cmwuY29sdW1ucyB0cmFjayBieSAkaW5kZXhcXFwiPlxcclxcblxcdFxcdFxcdFxcdHt7JHJvd1skY29sdW1uLmtleV19fVxcclxcblxcdFxcdFxcdDwvdGQ+XFxyXFxuXFx0XFx0PC90cj5cXHJcXG5cXHRcXHQ8L3Rib2R5PlxcclxcblxcdFxcdDx0Zm9vdD5cXHJcXG5cXHRcXHQ8L3Rmb290PlxcclxcblxcdDwvdGFibGU+XFxyXFxuPC9kaXY+XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL2dyaWQvZ3JpZC5odG1sXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=