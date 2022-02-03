import { resetAndMockDB } from 'utils/testUtils';
import { mockData } from 'utils/mockData';

const { MOCK_SUBJECTS: subject } = mockData;

describe('/subject route tests ', () => {
    let server;
    beforeEach(async () => {
        server = await resetAndMockDB(async allDbs => {
            allDbs.subjects.$queryInterface.$useHandler(function (query) {
                if (query === 'findById') {
                    return subject;
                }
            });
        });
    });
    it('should return 200', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/subjects/1'
        });
        expect(res.statusCode).toEqual(200);
    });

    it('should return all the subjects ', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/subjects'
        });

        expect(res.statusCode).toEqual(200);
        const subjectOne = res.result.results[0];
        expect(subjectOne.id).toEqual(subject.id);
        expect(subjectOne.name).toEqual(subject.name);
        expect(res.result.total_count).toEqual(1);
    });

    it('should return the subjects which has particular name', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/subjects?name=naeem'
        });

        expect(res.statusCode).toEqual(200);
        const subjectOne = res.result.results[0];
        expect(subjectOne.id).toEqual(subject.id);
        expect(subjectOne.name).toEqual(subject.name);
    });

    it('should return badImplementation if findAllSubjects fails', async () => {
        server = await resetAndMockDB(async allDbs => {
            allDbs.subjects.$queryInterface.$useHandler(function (query) {
                if (query === 'findById') {
                    return null;
                }
            });
            allDbs.subjects.findAll = () =>
                new Promise((resolve, reject) => {
                    reject(new Error());
                });
        });
        const res = await server.inject({
            method: 'GET',
            url: '/subjects'
        });
        expect(res.statusCode).toEqual(500);
    });

    it('should add one subject', async () => {
        let payload = { name: 'test' };
        const res = await server.inject({
            method: 'POST',
            url: '/subjects',
            payload
        });
        expect(res.statusCode).toEqual(200);
        expect(res.result.name).toEqual(payload.name);
    });

    it('should update one subject', async () => {
        let payload = { updatedName: 'test' };
        const res = await server.inject({
            method: 'PATCH',
            url: '/subjects/1',
            payload
        });
        expect(res.statusCode).toEqual(200);
        expect(res.result.id).toEqual('1');
    });

    it('should delete one subject', async () => {
        const res = await server.inject({
            method: 'DELETE',
            url: '/subjects/1'
        });
        expect(res.statusCode).toEqual(200);
        expect(res.result.message).toEqual('Successfully deleted');
    });
});
