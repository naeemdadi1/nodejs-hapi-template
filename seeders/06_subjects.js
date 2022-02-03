module.exports = {
    up: queryInterface => {
        const range = require('lodash/range');
        const subjects = range(1, 6).map((value, index) => ({
            name: `subject_name_${index}`
        }));
        return queryInterface.bulkInsert('subjects', subjects, {});
    },
    down: queryInterface => queryInterface.bulkDelete('subjects', null, {})
};
