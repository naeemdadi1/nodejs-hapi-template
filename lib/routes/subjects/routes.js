import Joi from '@hapi/joi';
import {
    findOneSubject,
    findAllSubjects,
    addOneSubject,
    updateOneSubject,
    deleteOneSubject
} from 'daos/subjectsDao';
module.exports = [
    {
        path: '/',
        method: 'GET',
        handler: async (req, h) => {
            const { name, limit, page } = req.query;
            const where = {};
            if (name) {
                where.name = name;
            }
            const { totalCount, results } = await findAllSubjects(
                where,
                limit,
                page
            );
            return h.response({
                results,
                totalCount
            });
        },
        options: {
            auth: false,
            plugins: {
                pagination: {
                    enabled: true
                },
                query: {
                    pagination: true
                }
            }
        }
    },
    {
        path: '/{subjectId}',
        method: 'GET',
        handler: (req, res) => {
            const subjectId = req.params.subjectId;
            return findOneSubject(subjectId);
        },
        options: {
            auth: false
        }
    },
    {
        path: '/',
        method: 'POST',
        handler: (req, h) => {
            const { name } = req.payload;
            return addOneSubject(name);
        },
        options: {
            auth: false,
            validate: {
                payload: Joi.object({
                    name: Joi.string().required()
                })
            }
        }
    },
    {
        path: '/{subjectId}',
        method: 'PATCH',
        handler: async (req, h) => {
            const { updatedName } = req.payload;
            const { subjectId } = req.params;
            return await updateOneSubject(subjectId, updatedName);
        },
        options: {
            auth: false,
            validate: {
                payload: Joi.object({
                    updatedName: Joi.string().required()
                })
            }
        }
    },
    {
        path: '/{subjectId}',
        method: 'DELETE',
        handler: (req, h) => {
            const { subjectId } = req.params;
            deleteOneSubject(subjectId);
            return h.response({ message: `Successfully deleted` });
        },
        options: {
            auth: false
        }
    }
];
