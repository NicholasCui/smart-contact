const Counter = artifacts.require('Counter');

contract('Counter', function (accounts) {
  let counterInstance;
  it('Counter', function() {
    return Counter.deployed()
      .then(function(instance) {
        counterInstance = instance;
        return counterInstance.count();
      }).then(function() {
        return counterInstance.counter();
      }).then(function(count) {
        assert.equal(count, 1);
      });
  });
});