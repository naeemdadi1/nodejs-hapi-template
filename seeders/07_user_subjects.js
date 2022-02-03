module.exports = {
    up: queryInterface => {
        const range = require('lodash/range');
        const user_subjects = range(1, 6).map((value, index) => ({
            user_id: (index % 2) + 1,
            subject_id: value
        }));
        return queryInterface.bulkInsert('user_subjects', user_subjects, {});
    },
    down: queryInterface => queryInterface.bulkDelete('user_subjects', null, {})
};
