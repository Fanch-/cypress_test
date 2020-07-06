const identityFolder = 'cypress/integration/ft_identity/'

// conf by FT
// hooks for slack are defined in https://review.leboncoin.ci/admin/repos/devtest/api-cetautomatix -> Channel enum
export const getLauncher = {
    test: {
        tests : 'cypress/integration/examples/**',
        slackRoom: 'lbc-devtest-bot'
    },
    authent:  {
        tests : 'cypress/integration/ft_authent/**',
        slackRoom: 'fanch',
    },
    identity: {
        tests : `${identityFolder}account.spec.js,${identityFolder}escrowForm.spec.js,${identityFolder}login.spec.js`,
        slackRoom : 'cypress-test'
    }
}