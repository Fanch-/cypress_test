import { CETAUTOMATIX } from "./config";
import { getLauncher } from "./runnerConf";
import cypress from "cypress";
import minimist from  'minimist'
import fetch from "node-fetch";

const argv = minimist(process.argv.slice(2));

// get the commit message from travis
const commitMsg = argv.commitMsg
const qaeApi = argv.qaeApi
// parse the FT -> "feat(identity): this is my commit"
const regex = /(\()(.*)(\))/
// -> identity
const target = commitMsg.match(regex)[2]

/**
 * Run logic *
 * Cypress as a node module;
 * env is the property to set cypress global vars => get them using Cypress.env('var')
 * CI to 'true' to call QAE API
 */
if (qaeApi === 'false'){
    cypress.run({
        //using runnerConf.js
        spec: getLauncher[target].tests,
        env: {qaeApi: qaeApi}
    }).then((results) => {
        setFailure(results)
    })
} else {
    /**
     * Start a testRun
     */
    const body = {
        platform: 'web',
        env: "preprod",
        version: 'test',
        os: "LINUX",
        // urlPr: 'Pr_url',
        browser: "electron",
        browserVersion: "80",
        machine: "travis",
        tag: "cypress,testProject",
        slackRoom: getLauncher[target].slackRoom,
        branch: "master",
        blocking: true
    }
    fetch(`${CETAUTOMATIX}/singleTestrun`, {
        method: "POST",
        body: JSON.stringify(body),
    }).then(response => {
        return httpManagement(response);
    }).then(resp => {

        const {reportId} = resp

        cypress.run({
                spec: getLauncher[target].tests,
                env: {qaeApi: 'true', reportId: reportId}
            }).then((results) => {
            /**
             * Stop  a report
             */
            fetch(`${CETAUTOMATIX}/rapport/${reportId}/stop`, {
                method: "PUT"
            }).then(response => {
                return httpManagement(response);
            })
            // we should manage video upload here, using QAE NAS -> roméo future challenge is to use aws s3 bucket
            setFailure(results);
        })

    }).catch((err) => {
        console.log(err)
        //exit 1 to return failure
        process.exit(1)
    })
}

/**
 * Manage cypress failure
 * @param results of cypress promise
 */
const setFailure = function(results) {
    if (results.totalFailed > 0) {
        //exit 1 to return failure -> cypress return 0 even if there are tests in failure
        process.exit(1)
    }
}

/**
 * Manage bad responses from server
 * @param response
 * @returns {Promise<T>}
 */
const httpManagement = function(response) {
    if (!response.ok) {
        return response.json()
            .catch(() => {
                throw new Error(response.status);
            })
            .then((data) => {
                throw new Error(JSON.stringify(data));
            })
    }
}