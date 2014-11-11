angular.module('realtime')
    .constant('ENV', 'dev')
    .constant('RELEASE', '1234567890abcd')
    .constant('GIGYA_API_KEY', '3_lPMEj5VTPtlW1i_uRZZdKHZPMzey0AVcOrKC_wittdLLOwJQPxbcDi7MEYDhwQ75') //LOCAL
//    .constant('GIGYA_API_KEY', '3_tQKJmyO5u50bQaNljqWymBh6uezUx-yvPK6kDyblgAUXK7V6Y-_aPghiLfHEUmNr​') //LIVE
    .constant('OMNITURE_SCRIPT', '//d1w8ihwdzwigdq.cloudfront.net/omniture/s_code_uk_lon_prem_prof_dash_qa.js')
    .config(function($logProvider, ENV) { $logProvider.debugEnabled(ENV == 'dev'); });