_.extend( Backbone.Collection.prototype,{
  where: function( conditions ){
    var self = this;
    return self.filter( function( item ){
      return self.match_conditions( conditions, item );
    });
  },
  match_conditions: function( conditions, item ){
    var self = this;
    for( var key in conditions ) {
      if( key == '$not' ) {
        return ! self.match_conditions( conditions[key], item );
      } else if ( key == '$or' ) {
        var _result = _( conditions[key] ).collect( function( _conditions ){ 
          return self.match_conditions( _conditions, item );
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
})
