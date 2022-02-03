import { resetAndMockDB } from 'utils/testUtils';
import { mockData } from 'utils/mockData';

describe('subject daos', () => {
    const { MOCK_SUBJECTS: mockSubject } = mockData;
    const attributes = ['id', 'name'];

    describe('Find All Subjects', () => {
        let spy;
        let where = {};
        let page = 1;
        let limit = 10;
        let offset = (page - 1) * limit;

        it('should find all the subjects', async () => {
            const { findAllSubjects } = require('daos/subjectsDao');
            const { results } = await findAllSubjects(limit, page);
            const firstSubject = results[0];
            expect(firstSubject.id).toEqual(mockSubject.id);
            expect(firstSubject.name).toEqual(mockSubject.name);
        });

        it('should call find all with correct parameters', async () => {
            await resetAndMockDB(db => {
                spy = jest.spyOn(db.subjects, 'findAll');
            });
            const { findAllSubjects } = require('daos/subjectsDao');
            await findAllSubjects(where, limit, page);
            expect(spy).toBeCalledWith({
                attributes,
                where,
                offset,
                limit
            });
            jest.clearAllMocks();
            page = 2;
            limit = 5;
            offset = (page - 1) * limit;
            await findAllSubjects(where, limit, page);
            expect(spy).toBeCalledWith({
                attributes,
                where,
                offset,
                limit
            });
        });

        it('should call count with an empty object', async () => {
            await resetAndMockDB(db => {
                spy = jest.spyOn(db.subjects, 'count');
            });
            const { findAllSubjects } = require('daos/subjectsDao');
            await findAllSubjects(where, limit, page);
            expect(spy).toBeCalledWith({ where });
        });
    });

    describe('Find One Subject', () => {
        let spy;

        it('should find a subject by Id', async () => {
            const { findOneSubject } = require('daos/subjectsDao');
            const subject = await findOneSubject(mockSubject.id);
            expect(subject.name).toEqual(mockSubject.name);
        });

        it('should call find One with correct parameters', async () => {
            await resetAndMockDB(db => {
                spy = jest.spyOn(db.subjects, 'findOne');
            });
            const { findOneSubject } = require('daos/subjectsDao');
            let subjectId = 1;
            await findOneSubject(subjectId);
            expect(spy).toBeCalledWith({
                attributes,
                where: {
                    id: subjectId
                }
            });
            jest.clearAllMocks();
            subjectId = 2;
            await findOneSubject(subjectId);
            expect(spy).toBeCalledWith({
                attributes,
                where: {
                    id: subjectId
                }
            });
        });
    });

    describe('add one subject', () => {
        let spy;
        it('should add one subject on calling addOneSubject', async () => {
            await resetAndMockDB(db => {
                spy = jest.spyOn(db.subjects, 'create');
            });
            const { addOneSubject } = require('daos/subjectsDao');
            const newSubject = 'test';
            await addOneSubject(newSubject);
            expect(spy).toBeCalledWith({ name: newSubject });
        });
    });

    describe('update one subject', () => {
        let spy;
        it('should update subject on calling updateOneSubject', async () => {
            await resetAndMockDB(db => {
                spy = jest.spyOn(db.subjects, 'update');
            });
            const { updateOneSubject } = require('daos/subjectsDao');
            const id = 5;
            const updatedName = 'test';
            await updateOneSubject(id, updatedName);
            expect(spy).toBeCalledWith(
                { name: updatedName },
                { where: { id } }
            );
        });
    });

    describe('delete one subject', () => {
        let spy;
        it('should delete subject on calling deleteOneSubject', async () => {
            await resetAndMockDB(db => {
                spy = jest.spyOn(db.subjects, 'destroy');
            });
            const { deleteOneSubject } = require('daos/subjectsDao');
            const id = 1;
            await deleteOneSubject(id);
            expect(spy).toBeCalledWith({ where: { id } });
        });
    });
});
