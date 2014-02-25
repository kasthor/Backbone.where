Backbone.where
==============

Introduction
------------

Backbone offers a great collection that can be used for storing models, but the way to query doesn't allow too much complexity, for a start this module offers a way to do .OR. .NOT. and .IN. querys to the backbone models

For simplicity a query hash similar to MongoDB has been implemented

Sample Usage:
-------------


- __Not__

   _field != 'value'_

```javascript
   models.where( { $not: { field: 'value' } } );
```

- __Or__

   _field == 'value' OR field2 == 'other value'_

```javascript
   models.where( { $or: [ {field: 'value'}, {field2: 'other value' } ] } );
```

- __In ( implicit )__ 

   _field IN ( 'value1', 'value2' )_

```javascript
   models.where( { field: [ 'value1', 'value2' ]} );
```

