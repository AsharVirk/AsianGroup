import reporter from "cucumber-html-reporter";

const options ={
	theme: 'bootstrap',
	jsonDir: './src/report/json/',
	output: './src/report/html/cucumber-html-report.html',
	reportSuiteAsScenarios:true,
	launchReport:true,
	storeScreenshots:true,
	screenshotsDirectory: './src/report/screenshots/',
	scenarioTimestamp:true,
	
};
//this function is used to generate cucumber-html-report.html file using the cucumber-report.json file according to the options
reporter.generate(options);
