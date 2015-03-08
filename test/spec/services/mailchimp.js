'use strict';

describe('Service: Mailchimp', function () {

  // load the service's module
  beforeEach(module('ftwApp'));

  // instantiate service
  var Mailchimp;
  beforeEach(inject(function (_Mailchimp_) {
    Mailchimp = _Mailchimp_;
  }));

  it('should do something', function () {
    expect(!!Mailchimp).toBe(true);
  });

});
