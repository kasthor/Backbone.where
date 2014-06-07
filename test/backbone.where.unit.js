(function(){

  var collection,
      a123, a231, a312;

  module("Backbone.Subgroup", {
    setup: function(){
      collection = new Backbone.Collection( [ 
        { a: 1, b: 2, c: 3 },
        { a: 2, b: 3, c: 1 },
        { a: 3, b: 1, c: 2 },
        { a: 1, b: 3, c: 2 }
      ] );
    }
  })

  test("return an array", function(){
    var _test = collection.where( { a: 1 } );

    ok( _test instanceof Array );
  });

  test("regular where works normally", function(){
    var _test = collection.where( { a: 1 } )

    ok( _(_test).all( function(m){ return m.get("a") == 1 }) );
  });

  // AND

  test( "can do .AND. queries" , function(){
    var _test = collection.where({ a: 1, b: 2 }) 

    ok( _test.length > 0 );
    ok( _(_test).all( function(m){ return m.get("a") == 1 && m.get("b") == 2 }) );
  });

  test( "can do explicit .AND. queries", function(){
    var _test = collection.where({ $and: [{ a: 1 }, { b: 2 }] })

    ok( _test.length > 0 );
    ok( _(_test).all( function(m){ return m.get("a") == 1 && m.get("b") == 2 }) );
  })

  // NOT

  test("can do .NOT. queries", function(){
    var _test = collection.where({ $not: { a: 1} }) 

    ok( _test.length > 0 );
    ok( _(_test).all( function(m){ return m.get("a") != 1 }) );
  });

  test('can do .NOT. ( .AND. ) ', function(){
    var _test = collection.where({ $not: { a: 1, b: 2}});

    ok( _test.length > 0 );
    ok( _(_test).all( function(m){ return ! ( m.get("a") == 1 && m.get("b") == 2 ) }) );
  })
  // OR

  test("can do .OR. queries", function(){
    var _test = collection.where({ $or: [ {a: 1}, { a: 2}] })  

    ok( _test.length > 0 );
    ok( _(_test).all( function(m){ return m.get("a") != 3 } ) );
  });

  test("can do implicit .IN. queries", function(){
    var _test = collection.where({ a: [ 1, 2 ] });

    ok( _test.length > 0 );
    ok( _(_test).all( function(m){ return m.get("a") != 3 } ) );
  });

  test("can eval .LT. condition", function(){
    var _test = collection.where({ b: { $lt: 3 } });

    ok( _test.length > 0 );
    ok( _(_test).all( function(m){ return m.get("b") < 3 } ) );
  });

  test("can eval .LTE. condition", function(){
    var _test = collection.where({ b: { $lte: 3 } });

    ok( _test.length > 0 );
    ok( _(_test).all( function(m){ return m.get("b") <= 3 } ) );
  });

  test("can eval .GT. condition", function(){
    var _test = collection.where({ b: { $gt: 2 } });

    ok( _test.length > 0 );
    ok( _(_test).all( function(m){ return m.get("b") > 2 } ) );
    console.log( _test) 
  });

  test("can eval .GTE. condition", function(){
    var _test = collection.where({ b: { $gte: 2 } });

    ok( _test.length > 0 );
    ok( _(_test).all( function(m){ return m.get("b") >= 2 } ) );
  });

  test("can eval .NE. condition", function(){
    var _test = collection.where({ b: { $ne: 2 } });

    ok( _test.length > 0 );
    ok( _(_test).all( function(m){ return m.get("b") != 2 } ) );
  });

}).call(this);
