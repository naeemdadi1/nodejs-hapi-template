import { subjects } from 'models';

const ATTRIBUTES = ['id', 'name'];
export const findAllSubjects = async (where, limit, page) => {
    const totalCount = await subjects.count({ where });
    const subjectResponse = await subjects.findAll({
        attributes: ATTRIBUTES,
        where,
        offset: limit * (page - 1),
        limit: limit
    });
    return {
        totalCount,
        results: subjectResponse
    };
};

export const findOneSubject = async id =>
    await subjects.findOne({ where: { id }, attributes: ATTRIBUTES });

export const addOneSubject = async name => await subjects.create({ name });

export const updateOneSubject = (id, updatedName) =>
    subjects
        .update({ name: updatedName }, { where: { id } })
        .then(() => findOneSubject(id));

export const deleteOneSubject = async id =>
    await subjects.destroy({ where: { id } });
