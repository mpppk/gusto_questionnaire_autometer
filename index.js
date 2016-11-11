const co = require('co');
const GustoAutometer = require('./GustoAutometer'); 

co(function * (){
  const gusto = new GustoAutometer('./setting.yml');
  yield gusto.insertCode();
  yield gusto.agreeTerms();

  while(true){
    yield gusto.wait(1000);
    let qs = yield gusto.extractQuestion();
    qs = Array.isArray(qs) ? qs : [qs];
    yield gusto.validateQuestions(qs);
    yield gusto.inputAnswer(qs);
  }
});