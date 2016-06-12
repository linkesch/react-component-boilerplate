var testsContext = require.context('./test', true, /\.spec\.js$/);
testsContext.keys().forEach(testsContext);

var srcContext = require.context('./src/js', true, /\.js$/);
srcContext.keys().forEach(srcContext);
