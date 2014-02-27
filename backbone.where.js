_.extend( Backbone.Collection.prototype,{
  where: function( conditions ){
    var self = this;
    return self.filter( function( item ){
      return Backbone.Collection.match_conditions( item, conditions );
    });
  }
})

_.extend( Backbone.Collection, {
  match_conditions: function( item, conditions ){
    var self = this;
    for( var key in conditions ) {
      if( key == '$not' ) {
        return ! Backbone.Collection.match_conditions( item, conditions[key] );
      } else if ( key == '$or' ) {
        var _result = _( conditions[key] ).collect( function( _conditions ){ 
          return Backbone.Collection.match_conditions( item, _conditions );
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
