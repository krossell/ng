import angular from 'angular';
import Grid from './components/grid/grid';
import Body from './components/body/body';
import CellTemplate from './components/cell/cell.template';
import Cell from './components/cell/cell';
import HeadTemplate from './components/head/head.template';
import Head from './components/head/head';
import Model from './core/infrastructure/model';
import DataModel from './core/grid/data.model';
import SelectionModel from './core/grid/selection.model';
import BodyModel from './core/body/body.model';
import CellModel from './core/cell/cell.model';
import HeadModel from './core/head/head.model';

Model.register('data', DataModel)
	.register('selection', SelectionModel)
	.register('body', BodyModel)
	.register('cell', CellModel)
	.register('head', HeadModel);

export default angular
	.module('qgrid', [])
	.component('qGrid', Grid)
	.component('qGridHead', HeadTemplate)
	.directive('qGridCoreHead', () => Head)
	.component('qGridBody', Body)
	.component('qGridTd', CellTemplate)
	.directive('qGridCoreTd', () => Cell)
	.service('qgrid', () => () => new Model())
	.run(Setup)
	.name;

Setup.$inject = ['$templateCache'];
function Setup($templateCache) {
	$templateCache.put('qgrid.html', require('./components/grid/grid.html'));
}