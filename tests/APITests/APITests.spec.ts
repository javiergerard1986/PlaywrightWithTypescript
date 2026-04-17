import {test, expect} from '@playwright/test';

const REPO = 'PWAPITESTREPO';
const USER = 'javiergerard1986';

test.beforeAll(async ({ request }) => {
    const response = await request.post('user/repos', {
        data: {
            "name": `${REPO}`,
            "description": "This is your first repo!"
        }
    });
    expect(response.status).toBeTruthy();
});

test.skip('Create an issue in the Github repository', async ({ request }) => {
    await test.step('Create issue in Repository', async () => {
        const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, { 
        data: {
            title: 'Bug1',
            body: 'Description1'
        }
    })

    expect(newIssue.ok()).toBeTruthy();
    });

    await test.step('Verify that we can retrieve the created issue', async () => {
        const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
        expect(issues.ok()).toBeTruthy(); 

        expect(await issues.json()).toContainEqual(expect.objectContaining({
            title: "Bug1",
            body: "Description1"
        }));    
    })

})

test.skip('Request to create a feature', async ({ request }) => {
    
    await test.step('Request to create feature into github repository', async () => {
        const newFeature = await request.post(`/repos/${USER}/${REPO}/issues`, {
            data: {
                title: 'Feature1',
                body: 'Description1'
            }});
        expect(newFeature.ok()).toBeTruthy();
    })

    await test.step('Verify that the feature request was created', async () => {
        const features = await request.get(`/repos/${USER}/${REPO}/issues`);
        expect(features.ok()).toBeTruthy();
        expect(await features.json()).toContainEqual(expect.objectContaining({
            title: 'Feature1',
            body: 'Description1'
        }));  
    })

});

test.afterAll(async ({ request }) => {
    const response = await request.delete(`/repos/${USER}/${REPO}`)
    expect(response.ok()).toBeTruthy();
})
    

