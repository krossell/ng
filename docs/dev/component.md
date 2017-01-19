# ng components and directives 

## [RootComponent](https://github.com/klumba12/qgrid/blob/master/src/components/root.component.js)
used as entry point in component building, emits onInit when model reference was changes that triggers new transclusion on whole component reinitialization

## [Component](https://github.com/klumba12/qgrid/blob/master/src/components/component.js)
incapsulate $onInit and $onDestroy methods, by providing onInit and onDestroy method to derivatives

## [ModelComponent](https://github.com/klumba12/qgrid/blob/master/src/components/model.component.js)
used to synchronize model and ng component scopes, scope properties should have name modelname + [P]ropertyName

## [Directive](https://github.com/klumba12/qgrid/blob/master/src/components/model.component.js)
should be used when no need to have garbage markup in compiled template