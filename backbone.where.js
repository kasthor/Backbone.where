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
    var _eval = _(conditions).collect( function( _condition, key ){ 
      if( key == '$not' ) {
        return ! Backbone.Collection.match_conditions( item, _condition );
      } else if ( key == '$or' ) {
        var _result = _( _condition ).collect( function( _conditions ){ 
          return Backbone.Collection.match_conditions( item, _conditions );
        } )
        return _.any( _result );
      } else if ( key == '$and' ) { 
        var _result = _( _condition ).collect( function( _conditions ){ 
          return Backbone.Collection.match_conditions( item, _conditions );
        } )
        return _.all( _result );
      } else if( _.isArray( _condition ) ){
        return _.include( _condition, item.get( key ) )
      } else{ 
        return _condition == item.get(key)
      }
    });

    return _.all( _eval );
  }
})
