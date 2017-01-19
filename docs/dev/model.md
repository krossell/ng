## [model](https://github.com/klumba12/qgrid/blob/master/src/core/infrastrucure/model.js)

* `agnostic` doesn't know anything about ui environment
* `immutable` by convention any commitment should be immutable, it also applies for arrays and objects
* `observable` provides modelName + 'Changed' event system

## [ModelBinder](https://github.com/klumba12/qgrid/blob/master/src/core/infrastructure/model.bind.js)
used to synchronize model and ng component scopes, scope properties should have name modelname + [P]ropertyName
