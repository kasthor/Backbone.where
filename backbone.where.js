_.extend( Backbone.Collection.prototype,{
  where: function( conditions ){
    function _check_conditions( conditions, item ){
      for( var key in conditions ) {
        if( key == '$not' ) {
          return ! _check_conditions( conditions[key], item );
        } else if ( key == '$or' ) {
          var _result = _( conditions[key] ).collect( function( _conditions ){ 
            return _check_conditions( _conditions, item );
          } )
          return _.any( _result );
        } else if( _.isArray( conditions[ key ] ) ){
          if ( ! _.include( conditions[key], item.get( key ) ) ){ return false; }
        } else{ 
          if ( conditions[key] !== item.get(key) ) return false;  
        }
      }  

      return true;
    }

    return this.filter( function( item ){
      return _check_conditions( conditions, item );
    });
  } 
})
